import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the class from ordered behavioral checkpoints.
 *
 * Target: O(log n) per reserve and unreserve, O(n) space.
 */
export class SeatManager {
  private returned: PriorityQueue<number> = 
    new PriorityQueue<number>((a, b) => a - b);
  private next: number = 1;

  constructor(n: number) {}

  reserve(): number {
    if (this.returned.size > 0) {
      return this.returned.pop()!;
    }
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    this.returned.push(seatNumber);
  }
}
