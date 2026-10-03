import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: return the fewest rooms such that no two meetings sharing a room
 * overlap. Meetings are half-open [start, end): back-to-back meetings may
 * share. Input order is arbitrary.
 * Invariant: whenever a meeting is placed, the rooms counted as in use are
 * exactly those whose meetings have not ended by its start.
 * Required behavior, unordered: release finished rooms, occupy a room for
 * the current meeting, visit meetings in the order they begin, keep the
 * peak of rooms in use.
 *
 * Target: O(n log n) time, O(n) extra space.
 */
export function minMeetingRooms(intervals: number[][]): number {
  return TODO("the whole function body");
}
