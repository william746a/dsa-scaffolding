import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @param intervals meetings as [start, end), in no particular order
 * @returns the fewest rooms that let every meeting run
 *
 * Target: O(n log n) time, O(n) extra space.
 */
export function minMeetingRooms(intervals: number[][]): number {
  const sorted: number[][] = TODO("the meetings, in the order they begin");
  const ends: PriorityQueue<number> = TODO(
    "the rooms currently in use, able to surface whichever frees up soonest",
  );
  let most = 0;

  for (const meeting of sorted) {
    const start = meeting[0]!;
    const end = meeting[1]!;
    TODO("every room that is free by `start` is no longer counted as in use");
    TODO("this meeting holds a room until `end`");
    most = TODO("the peak number of rooms in use so far");
  }

  return most;
}
