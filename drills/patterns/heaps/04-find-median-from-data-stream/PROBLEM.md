# Find Median from Data Stream

*LeetCode 295 — Hard*

The **median** is the middle value in an ordered integer list. If the size of
the list is even, there is no middle value, and the median is the mean of the
two middle values.

- For example, for `arr = [2,3,4]`, the median is `3`.
- For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the `MedianFinder` class:

- `constructor()` — initializes the `MedianFinder` object, holding no values.
- `addNum(num)` — adds the integer `num` from the data stream to the data
  structure.
- `findMedian()` — returns the median of all elements so far.

## Example

```
MedianFinder()
addNum(1)            values so far: [1]
addNum(2)            values so far: [1, 2]
findMedian()   → 1.5   (1 + 2) / 2
addNum(3)            values so far: [1, 2, 3]
findMedian()   → 2.0
```

In this harness, a scripted sequence reports only what `findMedian()`
returns: the example above yields `[1.5, 2]`.

LeetCode accepts answers within `10^-5` of the actual answer. Here every
expected median is a whole number or ends in `.5`, so the comparison is exact.

## Constraints

- `-10^5 <= num <= 10^5`
- There will be at least one element in the data structure before calling
  `findMedian`.
- At most `5 * 10^4` calls will be made to `addNum` and `findMedian`.
- Values arrive in arbitrary order and may repeat.

## Target

O(log n) per `addNum`, O(1) per `findMedian`. O(n) space.

## Environment

As on LeetCode's TypeScript runtime, a priority queue is available:
`import { PriorityQueue } from "../priority-queue.ts";` — its API is in the
header of that file.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
