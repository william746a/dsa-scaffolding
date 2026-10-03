# Meeting Rooms II

*LeetCode 253 — Medium*

Given an array of meeting time intervals `intervals` where
`intervals[i] = [start_i, end_i]`, return the minimum number of conference
rooms required so that every meeting has a room for its whole duration.

A meeting occupies its room over `[start, end)`: a meeting that ends at time
`t` and one that starts at time `t` can use the same room.

## Examples

| Input | Output | Why |
| :---- | :---- | :---- |
| `[[0,30],[5,10],[15,20]]` | `2` | `[0,30]` overlaps both others; `[5,10]` and `[15,20]` can share a room |
| `[[7,10],[2,4]]` | `1` | No overlap. Input is not ordered by start time |

## Constraints

- `1 <= intervals.length <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Target

O(n log n) time, O(n) extra space.

## Environment

As on LeetCode's TypeScript runtime, a priority queue is available:
`import { PriorityQueue } from "../priority-queue.ts";` — its API is in the
header of that file.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
