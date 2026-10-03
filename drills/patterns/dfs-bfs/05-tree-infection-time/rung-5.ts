import { TODO } from "#harness/verify.ts";
import type { TreeNode } from "../tree-node.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: infection starts at the node valued `start` at minute 0 and each
 * minute spreads to every uninfected node adjacent to an infected one — its
 * parent as well as its children. Return the minute the last node falls.
 * Node values are unique but are not 0..n-1.
 * Invariant: each node's infection minute is settled the first time it is
 * reached, and no node is examined twice.
 * Required behavior, unordered: let infection travel toward the root as
 * well as away from it; examine nodes in the order they were infected;
 * begin at start at minute 0; keep the latest minute seen.
 *
 * Target: O(n) time and extra space.
 */
export function amountOfTime(root: TreeNode | null, start: number): number {
  return TODO("the whole function body");
}
