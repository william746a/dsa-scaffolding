import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the function from ordered behavioral checkpoints.
 *
 * Target operation: insertionSortList()
 * Invariant to preserve: the sorted portion stays sorted, and every node
 * from the original input still appears exactly once.
 * Full API and layout: ../API.md
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function insertOne(sortedHead: ListNode | null, node: ListNode): ListNode {
  const dummy = new ListNode(0, sortedHead);
  let prev = dummy;
  while (prev.next !== null && prev.next.val <= node.val) {
    prev = prev.next;
  }
  node.next = prev.next;
  prev.next = node;
  return dummy.next!;
}

export function insertionSortList(head: ListNode | null): ListNode | null {
  let sorted: ListNode | null = null;
  let cur = head;
  while (cur !== null) {
    const remaining = TODO("preserve access to the unprocessed nodes");
    sorted = TODO("incorporate cur into the sorted portion");
    cur = TODO("advance to the preserved unprocessed portion");
  }
  return TODO("the head of the fully sorted list");
}
