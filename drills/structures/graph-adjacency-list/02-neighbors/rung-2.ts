import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One guard or index update is missing.
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
    if (TODO("true exactly when v has no recorded neighbor set at all")) return [];
    return [...s!].sort((a, b) => a - b);
  }
}
