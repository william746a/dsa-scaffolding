import { TODO } from "#harness/verify.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line.
 *
 * Target operation: neighbors()
 * Invariant to preserve: neighbors(v) is a fresh array, ascending sorted,
 * no duplicates, and [] for a vertex that was never added.
 * Full API and layout: ../API.md
 */
export class Graph {
  private adj = new Map<number, Set<number>>();

  private readonly directed: boolean;

  constructor(directed: boolean) {
    this.directed = directed;
  }

  private ensureVertex(v: number): Set<number> {
    const existing = this.adj.get(v);
    if (existing) return existing;
    const created = new Set<number>();
    this.adj.set(v, created);
    return created;
  }

  private insertOneWay(u: number, v: number): void {
    this.ensureVertex(u).add(v);
  }

  addEdge(u: number, v: number): void {
    this.insertOneWay(u, v);
    if (!this.directed) this.insertOneWay(v, u);
  }

  neighbors(v: number): number[] {
    const s = this.adj.get(v);
    if (!s) return TODO("what neighbors yields for a vertex that was never added — never throw");
    return [...s].sort((a, b) => a - b);
  }
}
