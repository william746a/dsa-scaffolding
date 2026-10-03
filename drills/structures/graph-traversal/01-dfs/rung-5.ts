import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body. Implement dfs from its contract.
 *
 * Contract: return every vertex reachable from `start`, each exactly once,
 * in depth-first visit order — neighbors taken in the order `graph[v]` lists
 * them, each unvisited neighbor explored completely before the next.
 * Invariant: no vertex is processed twice.
 * Required behaviors, unordered: record each vertex when first visited;
 * never re-enter a visited vertex; start from `start`; follow list order.
 * Target: O(V + E).
 */
export function dfs(graph: Adjacency, start: number): number[] {
  const seen: Set<number> = new Set<number>();
  const order: number[] = [];

  const visit = (v: number) => {
    seen.add(v);
    order.push(v);

    for (const w of graph[v] ?? []) {
      if (!seen.has(w)) visit(w);
    }
  };

  visit(start);
  return order;
}
