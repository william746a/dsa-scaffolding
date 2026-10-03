import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export function minMeetingRooms(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
  const ends = new PriorityQueue<number>((a, b) => a - b);
  let most = 0;

  for (const meeting of sorted) {
    const start = meeting[0]!;
    const end = meeting[1]!;
    while (ends.size > 0 && ends.peek()! <= start) ends.pop();
    ends.push(end);
    most = Math.max(most, ends.size);
  }

  return TODO("hand back the answer the function has already computed");
}
