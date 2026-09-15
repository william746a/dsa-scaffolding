import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Full Body.
 * One whole function body, contract only.
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
  // Precondition: head starts an arbitrary singly linked list, sorted or
  // not. insertOne is available and correct.
  // Postcondition: returns the head of the same nodes, sorted ascending.
  // O(n^2) time, O(1) extra space.
  TODO("the whole insertionSortList body");
}
