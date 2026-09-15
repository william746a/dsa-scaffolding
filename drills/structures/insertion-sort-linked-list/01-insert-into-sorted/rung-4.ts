import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Full Body.
 * One whole function body, contract only.
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
  // Precondition: sortedHead starts an already-sorted list; node is a single
  // detached node (its existing .next is irrelevant going in).
  // Postcondition: returns the head of a sorted list containing every node
  // from sortedHead plus node, exactly once. O(n).
  let dummy = new ListNode(0, sortedHead);
  let prev = dummy;
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
