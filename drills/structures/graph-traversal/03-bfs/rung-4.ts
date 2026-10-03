import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the operation from ordered behavioral checkpoints.
 *
 * Target operation: bfs()
 * Invariant to preserve: no vertex is processed twice, and a vertex's
 * distance is settled the first time it is reached.
 * Full API and representation: ../API.md
 */
export function bfs(graph: Adjacency, start: number): number[] {
  const distances: number[] = new Array<number>(graph.length).fill(-1);
  distances[start] = 0;
  const queue: number[] = [start];

  for (let head = 0; head < queue.length; head++) {
    const v: number = queue[head]!;
    for (const w of graph[v]!) {
      if (distances[w] === -1) {
        distances[w] = distances[v]! + 1;
        queue.push(w);
      }
    }
  }

  return distances;
}
