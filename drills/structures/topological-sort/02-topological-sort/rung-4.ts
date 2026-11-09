import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Supplied and working — the operation from 01-in-degrees. */
function inDegrees(graph: Adjacency): number[] {
  const counts = new Array<number>(graph.length).fill(0);
  for (let v = 0; v < graph.length; v++) {
    for (const w of graph[v]!) {
      counts[w] = counts[w]! + 1;
    }
  }
  return counts;
}

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the operation from ordered behavioral checkpoints.
 *
 * Target operation: topologicalSort()
 * Invariant to preserve: no vertex is placed before a vertex that has an
 * edge into it, and every vertex is placed at most once.
 * Full API and representation: ../API.md
 */
export function topologicalSort(graph: Adjacency): number[] {
  // 1. Learn, for every vertex, how many vertices it is still waiting on.
  //    (`inDegrees` above is yours.)
  const remaining = inDegrees(graph);

  // 2. A vertex that waits on nothing can be placed right away. There may be
  //    several, and vertex 0 is not necessarily one of them. Make each of
  //    them available to place before anything else happens.
  const queue: number[] = [];
  for (let v: number = 0; v < graph.length; v++) {
    if (remaining[v]! === 0) queue.push(v);
  }

  // 3. While anything is available: place one, then account for the edges
  //    leaving it, so that a vertex becomes available exactly when nothing it
  //    waits on is left — and never more than once.
  const order: number[] = [];
  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    order.push(v);
    for (const w of graph[v]!) {
      remaining[w] = remaining[w]! - 1;
      if (remaining[w]! === 0) queue.push(w);
    }
  }

  // 4. Only a complete order is an answer.
  return order.length === graph.length ? order : [];
}
