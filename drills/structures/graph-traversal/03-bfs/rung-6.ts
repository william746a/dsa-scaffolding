import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 6 — Interface Skeleton. Only bfs's body is blank. */
export function bfs(graph: Adjacency, start: number): number[] {
  const distance = new Array<number>(graph.length).fill(-1);
  distance[start] = 0;
  const queue: number[] = [start];

  while (queue.length > 0) {
    const v = queue.shift()!;

    for (const w of graph[v]!) {
      if (distance[w] === -1) {
        distance[w] = distance[v]! + 1;
        queue.push(w);
      }
    }
  }
  
  return distance;
}
