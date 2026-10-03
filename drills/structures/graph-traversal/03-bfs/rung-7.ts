import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Whole-API Capstone. Cold and timed. See ../API.md.
 *
 * All three operations have now appeared across this set. State each one's
 * complexity in the scaffolded values before writing the implementation,
 * then write all three functions from scratch.
 */

export const complexity: Record<string, string> = {
  dfs: "",
  dfsIterative: "",
  bfs: "",
};

export function dfs(graph: number[][], start: number): number[] {
  return TODO("return the depth-first visit order from start");
}

export function dfsIterative(graph: number[][], start: number): number[] {
  return TODO("return the depth-first visit order from start, without recursion");
}

export function bfs(graph: number[][], start: number): number[] {
  return TODO("return the fewest-edges distance from start to every vertex");
}
