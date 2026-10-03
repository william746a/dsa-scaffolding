# Seat Reservation Manager

*LeetCode 1845 — Medium*

Design a system that manages the reservation state of `n` seats numbered from
`1` to `n`.

Implement the `SeatManager` class:

- `constructor(n)` — initializes a `SeatManager` that will manage `n` seats
  numbered `1` to `n`. All seats start available.
- `reserve()` — fetches the **smallest-numbered** unreserved seat, reserves
  it, and returns its number.
- `unreserve(seatNumber)` — makes the seat with the given number available
  again.

## Example

```
SeatManager(5)
reserve()      → 1   all seats available; smallest is 1
reserve()      → 2   available: 2..5
unreserve(2)         available: 2..5
reserve()      → 2   available: 2..5; smallest is 2
reserve()      → 3
reserve()      → 4
reserve()      → 5
unreserve(5)         available: 5
```

In this harness, a scripted sequence reports only what `reserve()` returns:
the example above yields `[1, 2, 2, 3, 4, 5]`.

## Constraints

- `1 <= n <= 10^5`
- `1 <= seatNumber <= n`
- `reserve()` is only called when at least one seat is unreserved.
- `unreserve(seatNumber)` is only called on a seat that is currently
  reserved.
- At most `10^5` calls in total to `reserve` and `unreserve`.

## Target

O(log n) per `reserve` and `unreserve`. O(n) space.

## Environment

As on LeetCode's TypeScript runtime, a priority queue is available:
`import { PriorityQueue } from "../priority-queue.ts";` — its API is in the
header of that file.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
