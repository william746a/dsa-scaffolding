import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The invariant-maintaining step is gone. Everything around it stands.
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
    if (!s) return [];
    // s is v's live internal neighbor Set. Mutating what you return must
    // never affect this graph, and two graphs built by adding the same
    // edges in a different order must still produce identical output here.
    // TODO: return a NEW array built from s, sorted ascending by value.
    TODO("a fresh, ascending-sorted copy of v's neighbors");
  }
}
