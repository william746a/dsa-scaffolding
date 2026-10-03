import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 *
 * Invariant: the result is a fresh ascending array with no duplicates, and
 * an unknown vertex yields an empty array.
 */
export function neighbors(state: GraphState, v: number): number[] {
  const stored = state.adj.get(v);
  if (!stored) return [];
  return [...stored].sort((a, b) => a - b);
}
