/**
 * Case running. The guidelines forbid taking a self-report as correct, so
 * every rung is judged by executing the learner's code against the stated
 * examples plus at least one edge case — checkCases refuses to pass a suite
 * whose author supplied no edge case.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

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
      const actual = fn(...(structuredClone(c.args) as unknown as Args));
      if (opts.equals) {
        assert.ok(
          opts.equals(actual, c.want),
          `got ${fmt(actual)}, want ${fmt(c.want)}`,
        );
      } else {
        assert.deepEqual(actual, c.want);
      }
    });
  }
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
