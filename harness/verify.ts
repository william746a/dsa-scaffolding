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
 * Track B Rung 5: complexities must be stated before the code is judged.
 * The learner fills the exported `complexity` map; this asserts it matches.
 */
export function checkComplexity(
  stated: Record<string, string>,
  expected: Record<string, string>,
): void {
  test("complexities stated correctly (before code is judged)", () => {
    for (const [op, want] of Object.entries(expected)) {
      const got = (stated[op] ?? "").replace(/\s+/g, "").toLowerCase();
      assert.equal(
        got,
        want.replace(/\s+/g, "").toLowerCase(),
        `complexity for "${op}": stated ${fmt(stated[op])}, expected ${fmt(want)}`,
      );
    }
  });
}

function fmt(v: unknown): string {
  return typeof v === "string" ? `"${v}"` : JSON.stringify(v);
}
