import { TODO } from "#harness/verify.ts";

/** One way out of a city: where it leads, and 1 if it follows the road's direction. */
type Step = [city: number, forward: number];

/**
 * Rung 2 — Supporting Logic.
 * One line of setup is missing.
 */
export function minReorder(n: number, connections: number[][]): number {
  const graph: Step[][] = Array.from({ length: n }, () => []);
  for (const road of connections) {
    const a = road[0]!;
    const b = road[1]!;
    TODO("record the way out of a along this road, as a Step");
    graph[b]!.push([a, 0]);
  }

  const seen = new Array<boolean>(n).fill(false);
  seen[0] = true;
  const queue = [0];
  let flips = 0;

  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    for (const [w, forward] of graph[v]!) {
      if (!seen[w]) {
        seen[w] = true;
        flips += forward;
        queue.push(w);
      }
    }
  }

  return flips;
}
