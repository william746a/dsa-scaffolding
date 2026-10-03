import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body.
 *
 * Implement neighbors only. Required behaviors, in no prescribed order:
 * return [] for an unknown vertex; return a fresh array; preserve uniqueness;
 * and order the result ascending. Target complexity: O(deg(v) log deg(v)).
 */
export function neighbors(state: GraphState, v: number): number[] {
  let stored = state.adj.get(v);
  if (!stored) return [];
  return [...stored].sort((a, b) => a - b);
}
