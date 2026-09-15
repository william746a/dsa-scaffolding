import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The invariant-maintaining step is gone. Everything around it stands.
 *
 * Target operation: insertOne()
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
  // `node` is a single detached node — ignore whatever is currently in
  // node.next. Everything reachable from sortedHead is already sorted.
  // TODO: walk prev forward to node's correct position, then splice node in
  // right after prev. Write the two pointer writes in an order that never
  // drops the rest of the sorted list.
  while (prev.next != null && prev.next.val <= node.val) {
    prev = prev.next;
  }
  let temp = prev.next;
  prev.next = node;
  node.next = temp;
  return dummy.next!;
}

export function insertionSortList(head: ListNode | null): ListNode | null {
  let sorted: ListNode | null = null;
  let cur = head;
  while (cur !== null) {
    const rest = cur.next;
    sorted = insertOne(sorted, cur);
    cur = rest;
  }
  return sorted;
}
