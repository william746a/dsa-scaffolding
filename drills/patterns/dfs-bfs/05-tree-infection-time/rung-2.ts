import { TODO } from "#harness/verify.ts";
import type { TreeNode } from "../tree-node.ts";

/**
 * Rung 2 — Supporting Logic.
 * One helper call is missing.
 */
export function amountOfTime(root: TreeNode | null, start: number): number {
  const graph = new Map<number, number[]>();
  const addEdge = (u: number, v: number): void => {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u)!.push(v);
    graph.get(v)!.push(u);
  };

  const walk: TreeNode[] = root ? [root] : [];
  while (walk.length > 0) {
    const node = walk.pop()!;
    for (const child of [node.left, node.right]) {
      if (child) {
        walk.push(child);
        TODO("record that infection can pass between node and child");
      }
    }
  }

  const infectedAt = new Map<number, number>([[start, 0]]);
  const queue = [start];
  let minutes = 0;

  for (let head = 0; head < queue.length; head++) {
    const v = queue[head]!;
    const t = infectedAt.get(v)!;
    minutes = Math.max(minutes, t);
    for (const w of graph.get(v) ?? []) {
      if (!infectedAt.has(w)) {
        infectedAt.set(w, t + 1);
        queue.push(w);
      }
    }
  }

  return minutes;
}
