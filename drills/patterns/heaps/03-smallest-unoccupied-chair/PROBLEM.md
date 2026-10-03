# The Number of the Smallest Unoccupied Chair

*LeetCode 1942 — Medium*

There is a party where `n` friends numbered `0` to `n - 1` are attending.
There is an infinite number of chairs, numbered `0` to infinity. When a
friend arrives at the party, they sit on the **unoccupied chair with the
smallest number**.

- For example, if chairs `0`, `1`, and `5` are occupied when a friend
  arrives, they will sit on chair `2`.

When a friend leaves the party, their chair becomes unoccupied at that
moment. If another friend arrives at that **same moment**, they can sit in
that chair.

You are given a 0-indexed 2D integer array `times` where
`times[i] = [arrival_i, leaving_i]`, the arrival and leaving times of the
`i`th friend, and an integer `targetFriend`. All arrival times are
**distinct**.

Return the chair number that friend `targetFriend` will sit on.

## Examples

**Example 1**

```
times = [[1,4],[2,3],[4,6]], targetFriend = 1   →   1

t=1  friend 0 arrives, sits on chair 0
t=2  friend 1 arrives, sits on chair 1
t=3  friend 1 leaves; chair 1 is free
t=4  friend 0 leaves; chair 0 is free
t=4  friend 2 arrives, sits on chair 0
Friend 1 sat on chair 1.
```

**Example 2**

```
times = [[3,10],[1,5],[2,6]], targetFriend = 0   →   2

t=1  friend 1 arrives, sits on chair 0
t=2  friend 2 arrives, sits on chair 1
t=3  friend 0 arrives, sits on chair 2
t=5  friend 1 leaves; chair 0 is free
t=6  friend 2 leaves; chair 1 is free
t=10 friend 0 leaves; chair 2 is free
Friend 0 sat on chair 2.
```

## Constraints

- `n == times.length`
- `2 <= n <= 10^4`
- `times[i].length == 2`
- `1 <= arrival_i < leaving_i <= 10^5`
- `0 <= targetFriend <= n - 1`
- Each `arrival_i` is distinct.

## Target

O(n log n) time, O(n) extra space.

## Environment

As on LeetCode's TypeScript runtime, a priority queue is available:
`import { PriorityQueue } from "../priority-queue.ts";` — its API is in the
header of that file.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
