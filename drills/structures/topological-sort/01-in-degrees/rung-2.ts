import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 2 — Supporting Logic.
 * One lookup is missing.
 *
 * Target operation: inDegrees()
 * Invariant to preserve: after the loop has handled vertices 0..v, counts[x]
 * is the number of edges leaving those vertices that end at x.
 * Full API and representation: ../API.md
 */
export function inDegrees(graph: Adjacency): number[] {
  const counts = new Array<number>(graph.length).fill(0);

  for (let v = 0; v < graph.length; v++) {
    const out: number[] = graph[v]!;
    for (const w of out) {
      counts[w] = counts[w]! + 1;
    }
  }

  return counts;
}
