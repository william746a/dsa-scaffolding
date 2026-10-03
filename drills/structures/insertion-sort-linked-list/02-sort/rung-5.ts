import { TODO } from "#harness/verify.ts";

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

/**
 * Rung 5 — Independent Full Body.
 * Required behaviors, unordered: consume every original node exactly once,
 * keep the accumulated portion sorted, preserve access to unprocessed nodes,
 * and return the sorted head. O(n^2) time and O(1) extra space.
 */
export function insertionSortList(head: ListNode | null): ListNode | null {
  return TODO("the whole insertionSortList body");
}
