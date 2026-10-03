import { TODO } from "#harness/verify.ts";

/** One way out of a city: where it leads, and 1 if it follows the road's direction. */
type Step = [city: number, forward: number];

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every city enters `queue` exactly once, across the
 * single road joining it to the cities already reached, and `flips` counts
 * how many of the roads crossed so far must be reversed for traffic to
 * reach city 0.
 */
export function minReorder(n: number, connections: number[][]): number {
  const graph: Step[][] = Array.from({ length: n }, () => []);
  for (const road of connections) {
    const a = road[0]!;
    const b = road[1]!;
    graph[a]!.push([b, 1]);
    graph[b]!.push([a, 0]);
  }

  const seen = new Array<boolean>(n).fill(false);
  seen[0] = true;
  const queue = [0];
  let flips = 0;

  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    for (const [w, forward] of graph[v]!) {
      // TODO: w is one road away from v. Keep the invariant above.
      TODO("account for the road from v to w");
    }
  }

  return flips;
}
