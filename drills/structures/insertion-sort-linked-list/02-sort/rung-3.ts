import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The invariant-maintaining step is gone. Everything around it stands.
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
    // `cur` is the next unsorted node; `sorted` holds everything placed so
    // far. insertOne will overwrite cur's .next as part of splicing it in.
    // TODO: consume cur into sorted without losing your place in the rest
    // of the unsorted input, then move on to what's left.
    TODO("consume cur into the sorted portion and move on to what's left");
  }
  return sorted;
}
