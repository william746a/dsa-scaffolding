import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body. Implement bfs from its contract.
 *
 * Contract: return `distances` of length graph.length, where distances[v] is the fewest
 * edges on any path from `start` to v, or -1 if v cannot be reached.
 * Invariant: no vertex is processed twice, and a vertex's distance is
 * settled the first time it is reached.
 * Required behaviors, unordered: settle each vertex's distance once; examine
 * vertices in the order they were reached; begin from `start` at distance 0;
 * leave unreachable vertices at -1.
 * Target: O(V + E).
 */
export function bfs(graph: Adjacency, start: number): number[] {
  const distances = new Array<number>(graph.length).fill(-1);
  distances[start] = 0;
  const queue: number[] = [start];

  while (queue.length > 0) {
    const v = queue.shift()!;

    for (const w of graph[v] ?? []) {
      if (distances[w] === -1) {
        distances[w] = distances[v]! + 1;
        queue.push(w);
      }
    }
  }
  
  return distances;
}
