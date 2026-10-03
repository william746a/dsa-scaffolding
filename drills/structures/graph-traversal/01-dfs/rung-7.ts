import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Blank Page. Cold and timed.
 *
 * From ../API.md, write and export only the operation practiced in this
 * drill:
 *
 *   dfs(graph: number[][], start: number): number[]
 *
 * State its complexity before coding:
 *
 *   export const complexity = { dfs: "" };
 */

export function dfs(graph: number[][], start: number): number[] {
  let seen = new Set<number>();
  let order: number[] = [];

  let visit = (x: number): void => {
    seen.add(x);
    order.push(x);

    for (const w of graph[x] ?? []) {
      if (!seen.has(w)) visit(w);
    }
  }

  visit(start);
  return order;
}

export const complexity: Record<string, string> = {
  dfs: "O(V + E)",
};
