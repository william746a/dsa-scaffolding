import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One guard or index update is missing.
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
  while (TODO("keep going until every input node has been consumed")) {
    // `cur` is guaranteed non-null once the loop is entered.
    const node = cur!;
    const rest = node.next;
    sorted = insertOne(sorted, node);
    cur = rest;
  }
  return sorted;
}
