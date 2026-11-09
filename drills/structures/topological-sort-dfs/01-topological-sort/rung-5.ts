import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** A suspended visit: the vertex and the next outgoing edge to examine. */
type Frame = { vertex: number; nextEdge: number };

/**
 * Rung 5 — Independent Full Body.
 * Return any complete order respecting every edge, or [] for any cycle.
 * Do not mutate graph. Iterative DFS; O(V + E) time, O(V) auxiliary space.
 *
 * Invariant: a vertex finishes only after all its outgoing work completes;
 * each vertex is recorded once, and every returned order respects every edge.
 *
 * Unordered checklist:
 * - Keep the input unchanged.
 * - Produce a valid order from completed work.
 * - Distinguish a finished shared descendant from an active ancestor.
 * - Cover disconnected and isolated vertices.
 * - Handle paths deeper than the runtime call stack.
 * Full contract: ../API.md
 */
export function topologicalSort(graph: Adjacency): number[] {
  return TODO("implement topologicalSort from the contract");
}
