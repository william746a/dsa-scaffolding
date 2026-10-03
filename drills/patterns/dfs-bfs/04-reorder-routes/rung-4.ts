import { TODO } from "#harness/verify.ts";

/** One way out of a city: where it leads, and 1 if it follows the road's direction. */
type Step = [city: number, forward: number];

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns the fewest roads to reverse so every city can reach city 0
 *
 * Target: O(n) time and extra space.
 */
export function minReorder(n: number, connections: number[][]): number {
  const graph: Step[][] = Array.from({ length: n }, () => []);
  for (const road of connections) {
    TODO(
      "record this road as a way out of each of its two cities, noting " +
        "for each whether it follows the road's current direction",
    );
  }

  const seen = new Array<boolean>(n).fill(false);
  seen[0] = TODO("whether city 0 has been reached");
  const queue: number[] = TODO("the reached cities not yet examined");
  let flips: number = TODO("roads reversed so far");

  for (let head = 0; head < queue.length; head++) {
    const v: number = TODO("the next reached city to examine, in the order reached");
    for (const [w, forward] of graph[v]!) {
      if (TODO("w has not been reached")) {
        TODO("w is reached across this road, and waits to be examined");
        TODO("the road just crossed is reversed if it leads away from city 0");
      }
    }
  }

  return flips;
}
