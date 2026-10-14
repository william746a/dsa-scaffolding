/**
 * Case running. The guidelines forbid taking a self-report as correct, so
 * every rung is judged by executing the learner's code against the stated
 * examples plus at least one edge case — checkCases refuses to pass a suite
 * whose author supplied no edge case.
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { format, isDeepStrictEqual } from "node:util";
import { explain, show } from "./trace.ts";

export interface Case<Args extends readonly unknown[], R> {
  name: string;
  args: Args;
  want: R;
  /** Mark cases that are not from the problem statement's own examples. */
  edge?: boolean;
}

/** Placeholder for a blanked-out rung. Typed `never`, so it fits any slot. */
export function TODO(what: string): never {
  throw new Error(`TODO not implemented: ${what}`);
}

export interface CheckOptions<R> {
  /** Custom comparison, e.g. order-insensitive array equality. */
  equals?: (actual: R, want: R) => boolean;
}

export function checkCases<Args extends readonly unknown[], R>(
  fn: (...args: Args) => R,
  cases: readonly Case<Args, R>[],
  opts: CheckOptions<R> = {},
): void {
  test("case list includes at least one edge case", () => {
    assert.ok(
      cases.some((c) => c.edge),
      "Drill author: add at least one edge case (mark it `edge: true`).",
    );
  });

  for (const c of cases) {
    test(`${c.edge ? "edge" : "example"}: ${c.name}`, () => {
      const args = structuredClone(c.args) as unknown as Args;
      const logged = new Log();
      let actual: R;
      try {
        actual = quietly(logged, () => fn(...args));
      } catch (err) {
        throw new CaseFailure([
          ["input", showArgs(c.args)],
          ["threw", explain(err)],
          ["want", show(c.want)],
          ...logged.rows(),
        ]);
      }
      const ok = opts.equals
        ? opts.equals(actual, c.want)
        : isDeepStrictEqual(actual, c.want);
      if (ok) return;
      throw new CaseFailure([
        ["input", showArgs(c.args)],
        ["got", show(actual)],
        ["want", show(c.want)],
        ...(opts.equals ? [] : firstDifference(actual, c.want)),
        ...logged.rows(),
      ]);
    });
  }
}

type Row = readonly [label: string, text: string];

const LABEL_WIDTH = 9;
const LOG_LIMIT = 40;
const CONSOLE_METHODS = ["log", "info", "debug", "warn", "error"] as const;

/**
 * A failed case, rendered for the learner: what went in, what came out, what
 * was wanted, and whatever the submission printed while handling that case.
 */
export class CaseFailure extends Error {
  override name = "CaseFailure";

  constructor(rows: readonly Row[]) {
    super(
      rows
        .map(([label, text]) =>
          text
            .split("\n")
            .map((line, i) => (i ? "" : label).padEnd(LABEL_WIDTH) + line)
            .join("\n"),
        )
        .join("\n"),
    );
  }
}

/** Console output from one case, kept only as far as it stays readable. */
class Log {
  private lines: string[] = [];
  private dropped = 0;

  add(text: string): void {
    for (const line of text.split("\n")) {
      if (this.lines.length < LOG_LIMIT) this.lines.push(line);
      else this.dropped += 1;
    }
  }

  rows(): Row[] {
    if (this.lines.length === 0) return [];
    const more = this.dropped ? [`… ${this.dropped} more lines`] : [];
    return [["logged", [...this.lines, ...more].join("\n")]];
  }
}

/**
 * Run `body` with console output collected rather than printed, so a failing
 * case shows its own trace and passing cases stay silent.
 */
function quietly<T>(log: Log, body: () => T): T {
  const saved = CONSOLE_METHODS.map((m) => console[m]);
  for (const m of CONSOLE_METHODS) {
    console[m] = (...args: unknown[]) => log.add(format(...args));
  }
  try {
    return body();
  } finally {
    CONSOLE_METHODS.forEach((m, i) => (console[m] = saved[i]!));
  }
}

function showArgs(args: readonly unknown[]): string {
  const shown = args.map(show);
  const oneLine = shown.join(", ");
  return oneLine.includes("\n") || oneLine.length > 96
    ? shown.join(",\n")
    : oneLine;
}

/** For list results, where the two lists part ways. */
function firstDifference(actual: unknown, want: unknown): Row[] {
  if (!Array.isArray(actual) || !Array.isArray(want)) return [];
  if (Math.max(actual.length, want.length) < 4) return [];
  const shared = Math.min(actual.length, want.length);
  for (let i = 0; i < shared; i++) {
    if (!isDeepStrictEqual(actual[i], want[i])) {
      return [["differs", `at index ${i}: got ${show(actual[i])}, want ${show(want[i])}`]];
    }
  }
  if (actual.length === want.length) return [];
  return [["differs", `got ${actual.length} items, want ${want.length}`]];
}

/**
 * Harness-facing Track B declaration. This is assessment metadata, not a
 * method in the structure's runtime API. Every Track B final-rung module must
 * export it as `export const complexity = { ... }`; API.md specifies the exact
 * operation keys required for that rung.
 */
export type ComplexityDeclaration = Readonly<Record<string, string>>;

/** Validate the required Track B `complexity` export before behavior cases. */
export function checkComplexity(
  stated: unknown,
  expected: ComplexityDeclaration,
): void {
  test("complexities stated correctly (before code is judged)", () => {
    const expectedKeys = Object.keys(expected).sort();
    assert.ok(
      stated !== null && typeof stated === "object" && !Array.isArray(stated),
      "Track B final rungs must use `export const complexity = { ... }`. " +
        `Required keys for this rung: ${expectedKeys.join(", ")}. ` +
        "See the Harness-facing complexity declaration in API.md.",
    );

    const declaration = stated as Record<string, unknown>;
    const statedKeys = Object.keys(declaration).sort();
    assert.deepEqual(
      statedKeys,
      expectedKeys,
      "The exported `complexity` object must contain exactly the operation " +
        `keys required for this rung. Received: ${statedKeys.join(", ") || "none"}; ` +
        `required: ${expectedKeys.join(", ")}.`,
    );

    for (const [op, want] of Object.entries(expected)) {
      const value = declaration[op];
      assert.equal(
        typeof value,
        "string",
        `complexity[${JSON.stringify(op)}] must be a string, got ${fmt(value)}`,
      );
      const got = (value as string).replace(/\s+/g, "").toLowerCase();
      assert.equal(
        got,
        want.replace(/\s+/g, "").toLowerCase(),
        `complexity for "${op}": stated ${fmt(value)}, expected ${fmt(want)}`,
      );
    }
  });
}

function fmt(v: unknown): string {
  return typeof v === "string" ? `"${v}"` : JSON.stringify(v);
}
