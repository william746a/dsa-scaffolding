import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Blank Page. Cold and timed.
 *
 * From ../API.md, write and export only the operation practiced in this
 * drill:
 *
 *   dfsIterative(graph: number[][], start: number): number[]
 *
 * State its complexity before coding:
 *
 *   export const complexity = { dfsIterative: "" };
 */

export function dfsIterative(graph: number[][], start: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const stack: number[] = [start];

  while (stack.length > 0) {
    const v = stack.pop()!;

    if (seen.has(v)) continue;

    seen.add(v);
    order.push(v);

    const w = graph[v]!;
    for (let i = w.length - 1; i >=0; i--) {
      const x = w[i]!;
      if (!seen.has(x)) stack.push(x);
    }
  }

  return order;
}

export const complexity: Record<string, string> = {
  dfsIterative: "O(V + E)",
};
