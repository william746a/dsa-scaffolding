import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 * The step that IS the count is gone. Everything around it stands.
 *
 * Target operation: inDegrees()
 * Invariant to preserve: after the loop has handled vertices 0..v, counts[x]
 * is the number of edges leaving those vertices that end at x — for every
 * vertex x, not just the ones v touches. Each edge is counted exactly once.
 * Full API and representation: ../API.md
 */
export function inDegrees(graph: Adjacency): number[] {
  const counts = new Array<number>(graph.length).fill(0);

  for (let v = 0; v < graph.length; v++) {
    // TODO: v is the vertex being handled. Keep the invariant above for the
    // edges that leave v. `counts`, `graph`, and `v` are yours.
    const edges = graph[v]!;
    for (const w of edges) {
      counts[w] = counts[w]! + 1;
    }
  }

  return counts;
}
