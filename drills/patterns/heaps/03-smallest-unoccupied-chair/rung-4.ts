import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/** An occupied chair: when its occupant leaves, and which chair it is. */
type Taken = [leaving: number, chair: number];

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @param times        times[i] = [arrival, leaving] for friend i; arrivals
 *                     are distinct, input order is arbitrary
 * @param targetFriend the friend whose chair to report
 * @returns the chair number targetFriend sits on
 *
 * Target: O(n log n) time, O(n) extra space.
 */
export function smallestChair(times: number[][], targetFriend: number): number {
  const targetArrival: number = TODO("a way to recognise targetFriend after reordering");
  const byArrival: number[][] = TODO("the friends, in the order they arrive");
  const free: PriorityQueue<number> = TODO(
    "vacated chairs, able to surface the smallest",
  );
  const taken: PriorityQueue<Taken> = TODO(
    "occupied chairs, able to surface whichever will be vacated soonest",
  );
  let nextChair: number = TODO("the lowest chair nobody has sat on yet");

  for (const friend of byArrival) {
    const arrival = friend[0]!;
    const leaving = friend[1]!;
    TODO("every chair vacated by `arrival` is available again");
    const chair: number = TODO("the smallest chair available right now, now claimed");
    if (TODO("this friend is targetFriend")) return chair;
    TODO("this chair stays occupied until `leaving`");
  }

  return -1; // unreachable: targetFriend always arrives
}
