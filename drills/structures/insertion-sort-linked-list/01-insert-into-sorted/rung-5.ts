/**
 * Rung 5 — Blank Page. Cold and timed.
 *
 * You get ../API.md and nothing else. Write insertionSortList from scratch
 * — bring whatever helpers you need (a ListNode class, an insertion helper,
 * whatever shape you like) — and export it.
 *
 * State the complexity BEFORE you write the code — the harness checks it
 * first, and an implementation you cannot characterise has not cleared this
 * rung. Fill in and export:
 *
 *   export const complexity = { insertionSortList: "" };
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
    let dummy: ListNode | null = new ListNode(0, sortedHead);
    let prev: ListNode | null = dummy;
    while (prev.next !== null && prev.next.val <= node.val) {
        prev = prev.next;
    }
    let temp: ListNode | null = prev.next;
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
};

export const complexity: Record<string, string> = {
    insertionSortList: "O(n^2)"
};
