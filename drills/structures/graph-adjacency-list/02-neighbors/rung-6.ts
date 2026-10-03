import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/** Rung 6 — Interface Skeleton. Target: O(deg(v) log deg(v)). */
export function neighbors(state: GraphState, v: number): number[] {
  let stored = state.adj.get(v);
  if (!stored) return [];
  return [...stored].sort((a, b) => a - b);
}
