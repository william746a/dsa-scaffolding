import { TODO } from "#harness/verify.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line.
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
    const rest = cur.next;
    sorted = insertOne(sorted, cur);
    cur = rest;
  }
  return sorted;
}
