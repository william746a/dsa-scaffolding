import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 6 — Interface Skeleton. Only dfs's body is blank. */
export function dfs(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];

  const visit = (v: number): void => {
    seen.add(v);
    order.push(v);

    for (const w of graph[v] ?? []) {
      if (!seen.has(w)) visit(w);
    }
  };

  visit(start);
  return order;
}
