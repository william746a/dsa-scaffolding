import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the class from ordered behavioral checkpoints.
 *
 * Target: O(log n) per reserve and unreserve, O(n) space.
 */
export class SeatManager {
  private returned: PriorityQueue<number> = TODO(
    "a pool of seats that were given back, able to surface its smallest",
  );
  private next: number = TODO("the lowest seat number that has never been handed out");

  constructor(n: number) {}

  reserve(): number {
    if (TODO("whether any given-back seat is still unclaimed")) {
      return TODO("the smallest given-back seat, no longer in the pool");
    }
    return TODO("the lowest never-issued seat, which from now on counts as issued");
  }

  unreserve(seatNumber: number): void {
    TODO("make seatNumber available to a later reserve()");
  }
}
