import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 6 — Interface Skeleton. Only dfsIterative's body is blank. */
export function dfsIterative(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const stack: number[] = [start];

  while (stack.length > 0) {
    const v = stack.pop()!;

    if (seen.has(v)) continue;

    seen.add(v);
    order.push(v);

    const w = graph[v] ?? [];
    for (let i = w.length - 1; i >= 0; i--) {
      const x = w[i]!;
      if (!seen.has(x)) stack.push(x);
    }
  }

  return order;
}
