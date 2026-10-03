import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body. Implement dfsIterative from its contract.
 *
 * Contract: exactly dfs's — every vertex reachable from `start`, each once,
 * in depth-first visit order following `graph[v]`'s list order — and the
 * function must not call itself. Paths can be 100,000 vertices deep.
 * Invariant: no vertex is processed twice.
 * Required behaviors, unordered: keep the waiting vertices yourself instead
 * of on the call stack; skip a vertex that was already visited by another
 * route; record each vertex when it is visited; reproduce list order
 * exactly; start from `start`.
 * Target: O(V + E).
 */
export function dfsIterative(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const stack: number[] = [start];

  while (stack.length > 0) {
    const v: number = stack.pop()!;

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
