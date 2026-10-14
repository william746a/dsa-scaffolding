import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 6 — Interface Skeleton.
 * Exact interface only. Implement it in O(n log n) time and O(n) extra
 * space. There are no strategy cues here.
 */
export function minMeetingRooms(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
  const endings = new PriorityQueue<number>((a, b) => a - b);
  let numRooms = 0;

  for (const meeting of sorted) {
    const start = meeting[0]!;
    const end = meeting[1]!;
    while (endings.size > 0 && endings.peek()! <= start) endings.pop();
    endings.push(end);
    numRooms = Math.max(numRooms, endings.size);
  }
  
  return numRooms;
}
