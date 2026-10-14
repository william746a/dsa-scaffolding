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
  private returned = new PriorityQueue<number>((a, b) => a - b);
  private next: number = 1;
  constructor(n: number) {}

  reserve(): number {
    if (this.returned.size > 0) return this.returned.pop()!;
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    this.returned.push(seatNumber);
  }
}
