import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 * The step that IS the traversal is gone. Everything around it stands.
 *
 * Target operation: dfsIterative()
 * Invariant to preserve: no vertex is processed twice. The vertex on top of
 * `stack` is always the one the recursive dfs would visit next — or one that
 * has since been visited by another route. A vertex joins `order` exactly
 * once, when it is visited.
 * Full API and representation: ../API.md
 */
export function dfsIterative(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const stack = [start];

  while (stack.length > 0) {
    const v = stack.pop()!;

    // TODO: v has just come off the stack. Keep the invariant above: decide
    // whether v is visited now, and if so, leave the stack so that what the
    // recursive dfs would do next is what comes off it next. `seen`,
    // `order`, `graph`, and `stack` are yours.
    if (seen.has(v)) continue;
    order.push(v);
    seen.add(v);
    const next = graph[v] ?? [];

    for (let i = next.length - 1; i >= 0; i--) {
      const w = next[i]!;
      if (!seen.has(w)) stack.push(w);
    }
  }

  return order;
}
