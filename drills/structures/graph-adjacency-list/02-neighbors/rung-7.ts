import { TODO } from "#harness/verify.ts";
import type { GraphState } from "../spec.ts";

/**
 * Rung 7 — Whole-API Capstone. Cold and timed.
 *
 * Both operations have now appeared across this set. From ../API.md, state
 * the invariant and each operation's complexity, then write the whole Graph
 * class from scratch and export it.
 *
 * Fill the scaffolded complexity values before writing the implementation.
 */

export const complexity: Record<string, string> = {
  addEdge: "O(1) amortized",
  neighbors: "O(deg(v) log deg(v))",
};

export class Graph {
  private readonly state: GraphState;

  constructor(directed: boolean) {
    this.state = {
      directed,
      adj: new Map<number, Set<number>>(),
    };
  }

  addEdge(u: number, v: number): void {
    let forward = this.state.adj.get(u) ?? new Set<number>();
    forward.add(v);
    this.state.adj.set(u, forward);
    if (!this.state.directed) {
      let reverse = this.state.adj.get(v) ?? new Set<number>();
      reverse.add(u);
      this.state.adj.set(v, reverse);
    }
  }

  neighbors(v: number): number[] {
    let neighbors = this.state.adj.get(v) ?? new Set<number>();
    return [...neighbors].sort((a, b) => a - b);
  }
}
