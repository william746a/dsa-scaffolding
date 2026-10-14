import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

type Taken = {leaving: number, chair: number};

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: return the chair targetFriend sits on. Each arriving friend takes
 * the smallest-numbered unoccupied chair; a chair vacated at time t is
 * available to a friend arriving at t. Arrivals are distinct; input order is
 * arbitrary.
 * Invariant: when a friend arriving at t chooses, the chairs treated as
 * available are exactly those never used or vacated at or before t.
 * Required behavior, unordered: remember when each occupied chair will be
 * vacated; recognise targetFriend after any reordering; release chairs whose
 * occupants have left; handle friends in the order they arrive; give each
 * arrival the smallest available chair.
 *
 * Target: O(n log n) time, O(n) extra space.
 */
export function smallestChair(times: number[][], targetFriend: number): number {
  const targetArrival: number = times[targetFriend]![0]!;
  const sorted = [...times].sort((a, b) => a[0]! - b[0]!);
  const free = new PriorityQueue<number>((a, b) => a - b);
  const taken = new PriorityQueue<Taken>((a, b) => a.leaving - b.leaving);
  let smallestChair = 0;

  for (const friend of sorted) {
    const start = friend[0]!;
    const end = friend[1]!;

    while (taken.size > 0 && taken.peek()!.leaving <= start) free.push(taken.pop()!.chair);
    const chair = free.size > 0 ? free.pop()! : smallestChair++;
    if (targetArrival == start) return chair;
    taken.push({leaving: end, chair: chair});
  }

  return -1;
}
