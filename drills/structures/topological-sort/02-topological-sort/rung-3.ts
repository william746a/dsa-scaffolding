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
 * Rung 3 — Signature Move.
 * The step that IS the sort is gone. Everything around it stands.
 *
 * Target operation: topologicalSort()
 * Invariant to preserve: `remaining[x]` is the number of vertices with an
 * edge into x that have not yet been taken off `queue`. A vertex is in
 * `queue` only when that number is zero for it, and it is added exactly once
 * — so every vertex with an edge into it is placed in `order` before it is.
 * Full API and representation: ../API.md
 */
export function topologicalSort(graph: Adjacency): number[] {
  const remaining = inDegrees(graph);
  const queue: number[] = [];
  for (let v = 0; v < graph.length; v++) {
    if (remaining[v] === 0) queue.push(v);
  }

  const order: number[] = [];
  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    order.push(v);
    for (const w of graph[v]!) {
      // TODO: v has just been taken off `queue` and placed in `order`; w is
      // a vertex v has an edge to. Keep the invariant above. `remaining` and
      // `queue` are yours.
      remaining[w] = remaining[w]! - 1;
      if (remaining[w] === 0) {
        queue.push(w);
      }
    }
  }

  return order.length === graph.length ? order : [];
}
