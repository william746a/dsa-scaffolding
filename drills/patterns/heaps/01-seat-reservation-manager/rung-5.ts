import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the class without ordered checkpoints. Declare whatever state
 * you need.
 *
 * Contract: seats 1..n start available. reserve() returns the
 * smallest-numbered available seat and marks it reserved. unreserve(s)
 * makes reserved seat s available again.
 * Required behavior, unordered: seats given back become available again;
 * seats never handed out are issued in increasing order; reserve() always
 * answers with the smallest seat available across both.
 *
 * Target: O(log n) per reserve and unreserve, O(n) space.
 */
export class SeatManager {
  constructor(n: number) {
    TODO("set up whatever state reserve() and unreserve() rely on");
  }

  reserve(): number {
    return TODO("the whole reserve body");
  }

  unreserve(seatNumber: number): void {
    TODO("the whole unreserve body");
  }
}
