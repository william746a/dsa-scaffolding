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

/** Rung 6 — Interface Skeleton. Only topologicalSort's body is blank. */
export function topologicalSort(graph: Adjacency): number[] {
  return TODO("implement topologicalSort");
}
