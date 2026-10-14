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
  const targetArrival: number = times[targetFriend]![0]!;
  const byArrival: number[][] = [...times].sort((a, b) => a[0]! - b[0]!);
  const free: PriorityQueue<number> = new PriorityQueue<number>((a, b) => a - b);
  const taken: PriorityQueue<Taken> = new PriorityQueue<Taken>((a, b) => a[0]! - b[0]!);
  let nextChair: number = 0;

  for (const friend of byArrival) {
    const arrival = friend[0]!;
    const leaving = friend[1]!;
    while (taken.size > 0 && taken.peek()![0] <= arrival) free.push(taken.pop()![1]);
    const chair: number = free.size > 0 ? free.pop()! : nextChair++;
    if (targetArrival == arrival) return chair;
    taken.push([leaving, chair]);
  }

  return -1; // unreachable: targetFriend always arrives
}
