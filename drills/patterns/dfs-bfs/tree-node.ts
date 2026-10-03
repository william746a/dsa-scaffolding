/**
 * Supplied runtime library for this set — not a drill, not learner-edited.
 *
 * LeetCode's TypeScript runtime predefines this class for binary-tree
 * problems; this is the local stand-in.
 *
 *   import { TreeNode } from "../tree-node.ts";
 *
 * `fromLevelOrder` builds a tree from LeetCode's level-order notation, the
 * same `[1,5,3,null,4]` arrays the problem statements use.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/** Build a tree from level order; `null` marks a missing child. */
export function fromLevelOrder(values: readonly (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] == null) return null;
  const root = new TreeNode(values[0]);
  const parents = [root];
  let i = 1;
  for (let head = 0; head < parents.length && i < values.length; head++) {
    const parent = parents[head]!;
    const left = values[i++];
    if (left != null) parents.push((parent.left = new TreeNode(left)));
    const right = i < values.length ? values[i++] : null;
    if (right != null) parents.push((parent.right = new TreeNode(right)));
  }
  return root;
}
