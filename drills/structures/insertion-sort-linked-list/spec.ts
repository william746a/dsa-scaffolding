/** Shared contract for every insertion-sort-on-a-linked-list drill in this set. */

import type { Case } from "#harness/verify.ts";

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function arrayToList(values: readonly number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i]!, head);
  return head;
}

/** Bug submissions can splice a cycle into the list; fail loudly instead of hanging. */
const MAX_LIST_NODES = 10_000;

export function listToArray(head: ListNode | null): number[] {
  const out: number[] = [];
  let n = head;
  let steps = 0;
  while (n !== null) {
    if (steps++ > MAX_LIST_NODES) {
      throw new Error(
        `listToArray: didn't reach null within ${MAX_LIST_NODES} nodes — the list is probably cyclic`,
      );
    }
    out.push(n.val);
    n = n.next;
  }
  return out;
}

export type SortFn = (head: ListNode | null) => ListNode | null;

/** Runs sortFn against a plain array and reports a plain array back. */
export function drive(sortFn: SortFn, values: readonly number[]): number[] {
  return listToArray(sortFn(arrayToList(values)));
}

/** Deterministic pseudo-random values — same every run, no seeding library. */
function scrambled(n: number): number[] {
  const out: number[] = [];
  let x = 98765;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push((x % 1000) - 500);
  }
  return out;
}

const stress = scrambled(150);

export const cases: readonly Case<[readonly number[]], number[]>[] = [
  { name: "single element", args: [[5]], want: [5] },
  { name: "already sorted", args: [[1, 2, 3, 4]], want: [1, 2, 3, 4] },
  { name: "reverse sorted", args: [[5, 4, 3, 2, 1]], want: [1, 2, 3, 4, 5] },
  { name: "two elements needing a swap", args: [[2, 1]], want: [1, 2] },
  { name: "empty list", args: [[]], want: [], edge: true },
  {
    name: "duplicates all come back out",
    args: [[3, 1, 3, 2, 1]],
    want: [1, 1, 2, 3, 3],
    edge: true,
  },
  {
    name: "negative and positive mixed",
    args: [[0, -3, 5, -1, 2]],
    want: [-3, -1, 0, 2, 5],
    edge: true,
  },
  { name: "all equal", args: [[4, 4, 4, 4]], want: [4, 4, 4, 4], edge: true },
  {
    name: "150 scrambled values sort correctly",
    args: [stress],
    want: [...stress].sort((a, b) => a - b),
    edge: true,
  },
];
