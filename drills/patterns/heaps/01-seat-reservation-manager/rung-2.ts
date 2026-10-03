import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 2 — Supporting Logic.
 * One method body is missing.
 */
export class SeatManager {
  private returned = new PriorityQueue<number>((a, b) => a - b);
  private next = 1;

  constructor(n: number) {}

  reserve(): number {
    if (this.returned.size > 0) return this.returned.pop()!;
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    TODO("make seatNumber available to a later reserve()");
  }
}
