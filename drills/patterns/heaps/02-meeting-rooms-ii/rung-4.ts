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
  const sorted: number[][] = [...intervals].sort((a, b) => a[0]! - b[0]!);
  const ends = new PriorityQueue<number>((a, b) => a - b);
  let most = 0;

  for (const meeting of sorted) {
    const start = meeting[0]!;
    const end = meeting[1]!;
    while (ends.size > 0 && ends.peek()! <= start) ends.pop();
    ends.push(end);
    most = Math.max(most, ends.size);
  }

  return most;
}
