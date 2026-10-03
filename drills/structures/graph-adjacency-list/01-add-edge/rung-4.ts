import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/** Rung 4 — Guided Reconstruction. Rebuild addEdge in checkpoint order. */
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
