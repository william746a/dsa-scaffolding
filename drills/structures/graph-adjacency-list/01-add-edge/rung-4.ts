import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Full Body.
 * One whole method body, contract only.
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
    // Postcondition: v ∈ neighbors(u). If this graph is undirected, also
    // u ∈ neighbors(v). Adding the same edge twice changes nothing further.
    // O(1) amortized.
    TODO("the whole addEdge body");
  }

  neighbors(v: number): number[] {
    const s = this.adj.get(v);
    if (!s) return [];
    return [...s].sort((a, b) => a - b);
  }
}
