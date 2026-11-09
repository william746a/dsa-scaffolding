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
 * Rung 5 — Independent Full Body. Implement topologicalSort from its contract.
 *
 * Contract: an array holding every vertex exactly once, arranged so that for
 * every edge u → v, u comes before v — or [] if the graph has a cycle. Any
 * valid order is accepted. The function must not call itself: paths can be
 * 100,000 vertices deep.
 * Invariant: no vertex is placed before a vertex that has an edge into it,
 * and every vertex is placed at most once.
 * Required behaviors, unordered: start from every vertex that nothing points
 * to, not just vertex 0; place a vertex only once everything with an edge
 * into it has been placed; place each vertex exactly once; return [] on a
 * cycle, self-loops included, even if some vertices could be placed; cope with
 * vertices that nothing points to and that point nowhere; leave `graph`
 * unchanged.
 * Target: O(V + E) time, O(V) auxiliary space. `inDegrees` above is yours.
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
      if (remaining[w] === 0) queue.push(w);
    }
  }

  return order.length === graph.length ? order : [];
}
