import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

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
  return TODO("the whole function body");
}
