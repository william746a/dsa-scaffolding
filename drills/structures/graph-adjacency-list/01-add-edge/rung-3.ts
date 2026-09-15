import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The invariant-maintaining step is gone. Everything around it stands.
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
    // Every edge is at least one-way: u -> v must become traversable.
    // TODO: make u -> v traversable — this.insertOneWay(a, b) is yours, and
    // already handles a vertex it has never seen before. Then, only when
    // this graph is NOT directed, make v -> u traversable too.
    TODO("insert the edge one-way, and mirror it when the graph is undirected");
  }

  neighbors(v: number): number[] {
    const s = this.adj.get(v);
    if (!s) return [];
    return [...s].sort((a, b) => a - b);
  }
}
