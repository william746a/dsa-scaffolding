import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/** An occupied chair: when its occupant leaves, and which chair it is. */
type Taken = [leaving: number, chair: number];

/**
 * Rung 2 — Supporting Logic.
 * One choice is missing.
 */
export function smallestChair(times: number[][], targetFriend: number): number {
  const targetArrival = times[targetFriend]![0]!;
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
    const chair: number = TODO(
      "the smallest chair unoccupied right now — and it must not be offered " +
        "to anyone else afterwards",
    );
    if (arrival === targetArrival) return chair;
    taken.push([leaving, chair]);
  }

  return -1; // unreachable: targetFriend always arrives
}
