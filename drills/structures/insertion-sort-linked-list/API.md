# Insertion Sort (Linked List) — API Spec

Sort a singly linked list of numbers into ascending order using insertion
sort, implemented from scratch — no arrays, no built-in sort, no allocating a
second list up front.

```ts
class ListNode {
  val: number;
  next: ListNode | null;
}

function insertionSortList(head: ListNode | null): ListNode | null;
// O(n^2) time (worst and average case), O(1) extra space — the existing
// nodes are relinked, not copied.
```

## Harness-facing complexity declaration

This is assessment metadata, not part of the sorting function's runtime API.
The final-rung scaffold supplies this object; fill its blank value before
writing the implementation:

```ts
export const complexity: Record<string, string> = {
  insertionSortList: "",
};
```

Fill the blank with the complexity stated in the public API above. The harness
validates this declaration before it runs behavior cases.

## The invariant

At every point during the algorithm, split the world into two parts: the
**sorted portion** (nodes already placed) and the **remaining input** (nodes
not yet looked at, still in their original order). The sorted portion is
always sorted low to high, on its own. Each step takes the front node off the
remaining input and splices it into its correct position within the sorted
portion — never disturbing the sorted portion's order, and never losing track
of the rest of the remaining input while doing so.

## Observable behavior

| Input | Output |
| :---- | :---- |
| `[]` | `[]` |
| `[5]` | `[5]` |
| `[4, 2, 1, 3]` | `[1, 2, 3, 4]` |
| `[1, 3, 2, 3]` | `[1, 2, 3, 3]` |

Every value that goes in comes back out, duplicates included. Nodes may be
reused in place — there's no requirement to allocate new ones.

## Operations in this set

1. `01-insert-into-sorted` — splice one detached node into its correct place
   within an already-sorted list
2. `02-sort` — the outer pass that peels nodes off the unsorted remainder,
   one at a time, and inserts each into the growing sorted portion

Do not read ahead. `npm run drill` says where you are.
