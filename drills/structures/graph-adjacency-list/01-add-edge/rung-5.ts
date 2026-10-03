import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body.
 *
 * Implement addEdge only. Required behaviors, in no prescribed order:
 * - make u -> v observable;
 * - mirror the edge exactly when the graph is undirected;
 * - tolerate unseen vertices and keep duplicate calls idempotent.
 *
 * Target complexity: O(1) amortized.
 */
export function addEdge(
  state: GraphState,
  u: number,
  v: number,
): void {
  let forward = state.adj.get(u) ?? new Set<number>();
  forward.add(v);
  state.adj.set(u, forward);
  if (!state.directed) {
    let reverse = state.adj.get(v) ?? new Set<number>();
    reverse.add(u);
    state.adj.set(v, reverse);
  }
}
