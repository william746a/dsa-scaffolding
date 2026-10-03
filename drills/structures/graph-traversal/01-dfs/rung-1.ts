import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line.
 *
 * Target operation: dfs()
 * Invariant to preserve: no vertex is processed twice.
 * Full API and representation: ../API.md
 */
export function dfs(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];

  const visit = (v: number): void => {
    seen.add(v);
    order.push(v);
    for (const w of graph[v]!) {
      if (!seen.has(w)) visit(w);
    }
  };

  visit(start);
  return order;
}
