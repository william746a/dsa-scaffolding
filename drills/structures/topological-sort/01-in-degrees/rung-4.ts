import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the operation from ordered behavioral checkpoints.
 *
 * Target operation: inDegrees()
 * Invariant to preserve: at any moment, counts[x] is the number of edges
 * examined so far that end at x.
 * Full API and representation: ../API.md
 */
export function inDegrees(graph: Adjacency): number[] {
  // 1. Prepare one count for every vertex, none of which has seen an edge yet.
  const counts = new Array<number>(graph.length).fill(0);

  // 2. Examine every edge in the graph exactly once. Afterwards each count
  //    reflects the edges that end at its vertex — and nothing else.
  for (let v: number = 0; v < graph.length; v++) {
    const edge = graph[v]!;
    for (const w of edge) {
      counts[w] = counts[w]! + 1;
    }
  }

  // 3. Hand the counts back, indexed by vertex.
  return counts;
}
