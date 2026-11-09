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
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical element.
 *
 * Target operation: topologicalSort()
 * Invariant to preserve: `remaining[x]` is the number of vertices with an
 * edge into x that have not yet been taken off `queue`. A vertex is in
 * `queue` only when that number is zero for it, and it is added exactly once.
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
      remaining[w] = remaining[w]! - 1;
      if (remaining[w] === 0) {
        queue.push(w);
      }
    }
  }

  return order.length === graph.length ? order : [];
}
