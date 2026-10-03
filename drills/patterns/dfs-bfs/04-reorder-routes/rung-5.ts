import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: the roads form a tree over cities 0..n-1, each pointing one way.
 * Return the fewest roads to reverse so that every city can travel to 0.
 * Invariant: every city is reached exactly once, across the single road
 * joining it to the cities already reached.
 * Required behavior, unordered: reach every city from 0 whatever the roads'
 * directions; remember each road's current direction; charge exactly the
 * roads that lead away from 0; examine each city once.
 *
 * Target: O(n) time and extra space.
 */
export function minReorder(n: number, connections: number[][]): number {
  return TODO("the whole function body");
}
