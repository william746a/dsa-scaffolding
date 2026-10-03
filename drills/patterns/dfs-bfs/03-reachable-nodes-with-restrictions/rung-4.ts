import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns how many nodes, 0 included, can be reached from 0 without
 *          visiting a restricted node
 *
 * Target: O(n) time and extra space.
 */
export function reachableNodes(n: number, edges: number[][], restricted: number[]): number {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const e of edges) {
    TODO("record edge e so it can be walked from either end");
  }

  const seen = new Array<boolean>(n).fill(false);
  for (const r of restricted) {
    TODO("the search below must never enter or count r");
  }

  seen[0] = TODO("whether node 0 has been reached");
  let reached: number = TODO("how many nodes count as reached so far");
  const stack: number[] = TODO("the reached nodes not yet examined");

  while (stack.length > 0) {
    const v: number = TODO("a reached node to examine, no longer waiting");
    for (const w of graph[v]!) {
      if (TODO("w may be entered and has not been reached")) {
        TODO("w is reached, counted, and waits to be examined");
      }
    }
  }

  return reached;
}
