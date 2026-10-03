/**
 * Rung 7 — Blank Page. Cold and timed.
 *
 * From ../API.md, write and export only the operation practiced in this
 * drill. Its callable form receives the shared representation first:
 *
 *   addEdge(state: GraphState, u: number, v: number): void
 *
 * State its complexity before coding:
 *
 *   export const complexity = { addEdge: "" };
 */

import type { GraphState } from "../spec.ts";

export function addEdge(
    state:  GraphState,
    u: number,
    v: number
) {
    let forward = state.adj.get(u) ?? new Set<number>();
    forward.add(v);
    state.adj.set(u, forward);
    if (!state.directed) {
        let reverse = state.adj.get(v) ?? new Set<number>();
        reverse.add(u);
        state.adj.set(v, reverse);
    }
};

export const complexity: Record<string, string> = {
    addEdge: "O(1) amortized"
};
