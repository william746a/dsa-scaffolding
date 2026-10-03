import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 * The step that IS the traversal is gone. Everything around it stands.
 *
 * Target operation: bfs()
 * Invariant to preserve: no vertex is processed twice, and a vertex's
 * distance is settled the first time it is reached. Vertices leave `queue`
 * (at `head`) in nondecreasing order of distance.
 * Full API and representation: ../API.md
 */
export function bfs(graph: Adjacency, start: number): number[] {
  const distances = new Array<number>(graph.length).fill(-1);
  distances[start] = 0;
  const queue: number[] = [start];

  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    for (const w of graph[v]!) {
      // TODO: v's distance is settled and w is one edge away from it.
      // Keep the invariant above. `distances` and `queue` are yours.
      if (distances[w]! === -1) {
        distances[w] = distances[v]! + 1;
        queue.push(w);
      }
    }
  }

  return distances;
}
