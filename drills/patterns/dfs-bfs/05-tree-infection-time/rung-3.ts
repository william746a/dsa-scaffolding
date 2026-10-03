import { TODO } from "#harness/verify.ts";
import type { TreeNode } from "../tree-node.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every node enters `queue` at most once; a node's
 * `infectedAt` minute is recorded the first time it is reached and never
 * revised; and nodes leave the queue (at `head`) in nondecreasing order of
 * that minute.
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
        addEdge(node.val, child.val);
        walk.push(child);
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
      // TODO: w is adjacent to v, which was infected at minute t. Keep the
      // invariant above.
      TODO("account for w, adjacent to v");
    }
  }

  return minutes;
}
