import type { Case } from "#harness/verify.ts";
import { fromLevelOrder, type TreeNode } from "../tree-node.ts";

/**
 * Cases carry LeetCode's level-order array, not a built tree: the harness
 * deep-copies arguments, and a deep TreeNode chain overflows that copy.
 * `run` builds the tree after the copy, then calls the submission.
 */
export type Args = [levelOrder: (number | null)[], start: number];

export function run(
  amountOfTime: (root: TreeNode | null, start: number) => number,
): (levelOrder: (number | null)[], start: number) => number {
  return (levelOrder, start) => amountOfTime(fromLevelOrder(levelOrder), start);
}

/** A right-leaning path 1 → 2 → … → n, in level order. */
function rightChain(n: number): (number | null)[] {
  const out: (number | null)[] = [1];
  for (let v = 2; v <= n; v++) out.push(null, v);
  return out;
}

/**
 * Deterministic pseudo-random tree with unique values in 1..10^5 — same
 * every run. Each new node fills a random free child slot of an existing
 * node; the result is written out in level order.
 */
function scrambledTree(n: number): (number | null)[] {
  let x = 2385;
  // High bits: the low bits of this generator repeat with a short period.
  const next = (mod: number) =>
    Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % mod;
  const used = new Set<number>();
  const fresh = (): number => {
    for (;;) {
      // One draw holds only 15 bits; two cover the full 1..10^5 range.
      const v = 1 + ((next(32768) * 32768 + next(32768)) % 100_000);
      if (!used.has(v)) return used.add(v), v;
    }
  };
  type N = { val: number; left: N | null; right: N | null };
  const root: N = { val: fresh(), left: null, right: null };
  const open: [N, "left" | "right"][] = [[root, "left"], [root, "right"]];
  for (let i = 1; i < n; i++) {
    const [slot] = open.splice(next(open.length), 1);
    const node: N = { val: fresh(), left: null, right: null };
    slot![0][slot![1]] = node;
    open.push([node, "left"], [node, "right"]);
  }
  const out: (number | null)[] = [];
  const queue: (N | null)[] = [root];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head]!;
    out.push(node ? node.val : null);
    if (node) queue.push(node.left, node.right);
  }
  while (out.at(-1) === null) out.pop();
  return out;
}

const scrambled = scrambledTree(500);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<Args, number>[] = [
  {
    name: "example 1: start at 3",
    args: [[1, 5, 3, null, 4, 10, 6, 9, 2], 3],
    want: 4,
  },
  {
    name: "example 2: single node",
    args: [[1], 1],
    want: 0,
  },
  {
    name: "start is the deepest leaf: infection has to climb",
    args: [[1, 2, null, 3, null, 4], 4],
    want: 3,
    edge: true,
  },
  {
    name: "start at the root: the answer is the tree's height",
    args: [[1, 2, 3, 4, 5], 1],
    want: 2,
    edge: true,
  },
  {
    name: "the farthest node is below start, not across the root",
    args: [[1, 2, 3, 4, null, null, null, 5], 4],
    want: 3,
    edge: true,
  },
  {
    name: "values are large and sparse, not 0..n-1",
    args: [[100000, 7, 99999], 7],
    want: 2,
    edge: true,
  },
  {
    name: "3000-node path, start in the middle",
    args: [rightChain(3000), 1500],
    want: 1500,
    edge: true,
  },
  {
    name: "500-node scrambled tree",
    args: [scrambled, 8986],
    want: 29,
    edge: true,
  },
];
