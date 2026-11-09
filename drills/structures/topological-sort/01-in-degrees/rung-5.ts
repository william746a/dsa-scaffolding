import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body. Implement inDegrees from its contract.
 *
 * Contract: an array with one entry per vertex, where entry v is the number
 * of edges that end at v, counted across every list in `graph`. The input
 * graph is not modified.
 * Invariant: at any moment, counts[x] is the number of edges examined so far
 * that end at x.
 * Required behaviors, unordered: one entry for every vertex, including
 * vertices nothing points to and vertices that point nowhere; every edge
 * counted exactly once; a self-loop counts toward its own vertex; leave
 * `graph` unchanged.
 * Target: O(V + E).
 */
export function inDegrees(graph: Adjacency): number[] {
  return TODO("the complete operation body");
}
