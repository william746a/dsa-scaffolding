import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/** Rung 1 — Isolated Move. One empty-result return is missing. */
export function neighbors(state: GraphState, v: number): number[] {
  const stored = state.adj.get(v);
  if (!stored) return [];
  return [...stored].sort((a, b) => a - b);
}
