import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 3 — Signature Move.
 * The step that IS the traversal is gone. Everything around it stands.
 *
 * Target operation: dfs()
 * Invariant to preserve: no vertex is processed twice. A vertex joins
 * `order` the moment it is first visited, and everything newly reachable
 * through one neighbor is visited before the next neighbor in list order.
 * Full API and representation: ../API.md
 */
export function dfs(graph: Adjacency, start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];

  const visit = (v: number): void => {
    // TODO: v is being visited right now. Record that, then carry the
    // traversal onward from v, keeping the invariant above. `seen`,
    // `order`, `graph`, and `visit` itself are yours.
    seen.add(v);
    order.push(v);
    for (const w of graph[v] ?? []) {
      if (!seen.has(w)) visit(w);
    }
  };

  visit(start);
  return order;
}
