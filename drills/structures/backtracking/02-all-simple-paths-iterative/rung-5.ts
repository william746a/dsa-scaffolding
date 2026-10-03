import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body.
 * Contract: all start-to-target paths with no repeated vertex, in neighbor-list
 * exploration order. Include endpoints and stop at target. Return [[start]]
 * when endpoints match, [] when target is unreachable. No recursion.
 * Invariant: membership matches the active path; pending visits preserve each
 * vertex's remaining exploration position. Completed results stay unchanged.
 * Required behaviors (unordered): preserve input; independent results; honor
 * endpoint cases; terminate on cycles; follow list order; handle deep graphs.
 * Complexity: O(V + S + L) time, O(V) auxiliary space, O(L) output space.
 * V, S, L are defined in ../API.md.
 */
export function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][] {
  return TODO("the complete operation body");
}
