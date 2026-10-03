import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/** An occupied chair: when its occupant leaves, and which chair it is. */
type Taken = [leaving: number, chair: number];

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export function smallestChair(times: number[][], targetFriend: number): number {
  const targetArrival: number = TODO(
    "the arrival time of targetFriend, which still identifies them once " +
      "the input is reordered",
  );
  const byArrival = [...times].sort((a, b) => a[0]! - b[0]!);
  const free = new PriorityQueue<number>((a, b) => a - b);
  const taken = new PriorityQueue<Taken>((a, b) => a[0] - b[0]);
  let nextChair = 0;

  for (const friend of byArrival) {
    const arrival = friend[0]!;
    const leaving = friend[1]!;
    while (taken.size > 0 && taken.peek()![0] <= arrival) {
      free.push(taken.pop()![1]);
    }
    const chair = free.size > 0 ? free.pop()! : nextChair++;
    if (arrival === targetArrival) return chair;
    taken.push([leaving, chair]);
  }

  return -1; // unreachable: targetFriend always arrives
}
