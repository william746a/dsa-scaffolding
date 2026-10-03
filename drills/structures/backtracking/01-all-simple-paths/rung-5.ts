import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body.
 * Contract: enumerate all start-to-target paths with no repeated vertex,
 * in neighbor-list exploration order. Include both endpoints; stop at target.
 * Return [[start]] when endpoints match and [] when target is unreachable.
 * Invariant: membership describes exactly the active path. Recorded paths
 * remain unchanged during later exploration.
 * Required behaviors (unordered): preserve input; keep results independent;
 * respect list order; terminate on cycles; honor both endpoint cases.
 * Complexity: O(V + S + L) time, O(V) auxiliary space, O(L) output space.
 * V, S, L are defined in ../API.md.
 */
export function allSimplePaths(graph: Adjacency, start: number, target: number): number[][] {
  return TODO("the complete operation body");
}
