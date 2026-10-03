import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line.
 *
 * Target operation: dfsIterative()
 * Invariant to preserve: no vertex is processed twice.
 * Full API and representation: ../API.md
 */
export function dfsIterative(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const stack: number[] = TODO("the vertices waiting to be visited, before the traversal begins");

  while (stack.length > 0) {
    const v = stack.pop()!;
    if (seen.has(v)) continue;
    seen.add(v);
    order.push(v);
    const next = graph[v]!;
    for (let i = next.length - 1; i >= 0; i--) {
      if (!seen.has(next[i]!)) stack.push(next[i]!);
    }
  }

  return order;
}
