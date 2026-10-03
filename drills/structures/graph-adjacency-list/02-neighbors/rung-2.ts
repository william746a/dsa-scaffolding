import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/** Rung 2 — Supporting Logic. The absent-vertex guard is missing. */
export function neighbors(state: GraphState, v: number): number[] {
  const stored = state.adj.get(v);
  if (!stored) return [];
  return [...stored!].sort((a, b) => a - b);
}
