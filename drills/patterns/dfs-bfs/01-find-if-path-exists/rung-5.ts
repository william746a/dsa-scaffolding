import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: return true exactly when some path of bi-directional edges joins
 * source to destination (a vertex always reaches itself).
 * Invariant: no vertex is examined twice, and every vertex reachable from
 * source is eventually examined unless the answer is found first.
 * Required behavior, unordered: make every edge walkable from both ends;
 * stop early on reaching destination; remember what has been reached;
 * start from source.
 *
 * Target: O(n + edges.length) time and extra space.
 */
export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  return TODO("the whole function body");
}
