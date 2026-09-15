import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One guard or index update is missing.
 *
 * Target operation: addEdge()
 * Invariant to preserve: after addEdge(u, v), v is in neighbors(u); if the
 * graph is undirected, u is also in neighbors(v).
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
    if (TODO("true exactly when the graph does NOT restrict edges to one direction")) {
      this.insertOneWay(v, u);
    }
  }

  neighbors(v: number): number[] {
    const s = this.adj.get(v);
    if (!s) return [];
    return [...s].sort((a, b) => a - b);
  }
}
