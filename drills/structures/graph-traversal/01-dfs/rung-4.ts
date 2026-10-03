import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the operation from ordered behavioral checkpoints.
 *
 * Target operation: dfs()
 * Invariant to preserve: no vertex is processed twice.
 * Full API and representation: ../API.md
 */
export function dfs(graph: Adjacency, start: number): number[] {
  const seen: Set<number> = new Set<number>();
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
