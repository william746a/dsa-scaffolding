import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 *
 * Invariant: after addEdge(u, v), v is reachable directly from u; when the
 * graph is undirected, u is also reachable directly from v. Duplicate calls
 * do not create duplicate neighbors.
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
