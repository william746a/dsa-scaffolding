import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/** An occupied chair: when its occupant leaves, and which chair it is. */
type Taken = [leaving: number, chair: number];

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: when a friend arriving at `arrival` picks a chair,
 * `free` holds every chair vacated at or before `arrival`, and `taken` holds
 * only chairs whose occupants are still seated.
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

    // TODO: restore the invariant above for this arrival. A chair vacated at
    // the very moment someone arrives counts as vacated.
    TODO("bring free and taken up to date as of `arrival`");

    const chair = free.size > 0 ? free.pop()! : nextChair++;
    if (arrival === targetArrival) return chair;
    taken.push([leaving, chair]);
  }

  return -1; // unreachable: targetFriend always arrives
}
