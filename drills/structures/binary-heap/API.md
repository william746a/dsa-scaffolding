# MinHeap — API Spec

A binary min-heap over `number`, backed by a single array. Implement it from
scratch; no library structures.

```ts
class MinHeap {
  get size(): number;          // O(1)
  peek(): number | undefined;  // O(1)   — smallest value, or undefined if empty
  push(value: number): void;   // O(log n)
  pop(): number | undefined;   // O(log n) — remove and return the smallest
}
```

## The invariant

The array is a complete binary tree stored level by level: the children of
index `i` sit at `2i + 1` and `2i + 2`, its parent at `Math.floor((i - 1) / 2)`.

**Every node's value is ≤ both of its children's values.** Nothing else is
guaranteed — the array is *not* sorted. `[1, 5, 2, 9, 6, 3]` is a valid heap;
so is `[1, 2, 5, 6, 9, 3]`.

Both `push` and `pop` break that invariant on purpose and then repair it —
that repair is the whole structure.

## Observable behavior

| Sequence | Result |
| :---- | :---- |
| `push 5, push 3, push 8, peek` | `3` |
| `push 5, push 3, push 8, pop, pop, pop, pop` | `3, 5, 8, undefined` |
| `push 2, pop, push 1, peek` | `1` |

Duplicates are allowed and must all come back out. `pop` on an empty heap
returns `undefined` and must not throw.

## Operations in this set

1. `01-sift-up` — the repair `push` needs
2. `02-sift-down` — the repair `pop` needs
3. `03-pop` — the extract-min that drives it

Do not read ahead. `npm run drill` says where you are.
