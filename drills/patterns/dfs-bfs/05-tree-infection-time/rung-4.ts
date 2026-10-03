import { TODO } from "#harness/verify.ts";
import type { TreeNode } from "../tree-node.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns minutes until every node is infected, starting from `start`
 *
 * Target: O(n) time and extra space.
 */
export function amountOfTime(root: TreeNode | null, start: number): number {
  const graph = new Map<number, number[]>();
  const addEdge = (u: number, v: number): void => {
    TODO("infection can pass from u to v, and from v to u");
  };

  const walk: TreeNode[] = root ? [root] : [];
  while (walk.length > 0) {
    const node: TreeNode = TODO("a tree node not yet walked, no longer waiting");
    for (const child of [node.left, node.right]) {
      if (child) {
        TODO("node and child are adjacent, and child will be walked later");
      }
    }
  }

  const infectedAt: Map<number, number> = TODO(
    "the minute each node is infected — known so far only for start",
  );
  const queue: number[] = TODO("infected nodes whose neighbors are still to be examined");
  let minutes = 0;

  for (let head = 0; head < queue.length; head++) {
    const v: number = TODO("the next infected node, in the order infected");
    const t = infectedAt.get(v)!;
    minutes = TODO("the latest infection minute seen so far");
    for (const w of graph.get(v) ?? []) {
      if (TODO("w is not yet infected")) {
        TODO("w is infected one minute after v, and will be examined later");
      }
    }
  }

  return minutes;
}
