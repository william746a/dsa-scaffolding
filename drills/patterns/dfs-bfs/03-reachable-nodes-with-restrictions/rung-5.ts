import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: return how many nodes, node 0 included, can be reached from 0
 * along tree edges without ever visiting a restricted node.
 * Invariant: no node is examined twice, and no restricted node is ever
 * entered or counted.
 * Required behavior, unordered: make every edge walkable from both ends;
 * keep restricted nodes out; count each reached node once; start from 0.
 *
 * Target: O(n) time and extra space.
 */
export function reachableNodes(n: number, edges: number[][], restricted: number[]): number {
  return TODO("the whole function body");
}
