import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 2 — Supporting Logic.
 * The condition governing the reverse insertion is missing.
 * Full public API: ../API.md
 */
export function addEdge(
  state: GraphState,
  u: number,
  v: number,
): void {
  const forward = state.adj.get(u) ?? new Set<number>();
  state.adj.set(u, forward);
  forward.add(v);

  if (!state.directed) {
    const reverse = state.adj.get(v) ?? new Set<number>();
    state.adj.set(v, reverse);
    reverse.add(u);
  }
}
