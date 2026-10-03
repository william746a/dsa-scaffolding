import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export class SeatManager {
  private returned = new PriorityQueue<number>((a, b) => a - b);
  private next: number = TODO("the lowest seat number that has never been handed out");

  constructor(n: number) {}

  reserve(): number {
    if (this.returned.size > 0) return this.returned.pop()!;
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    this.returned.push(seatNumber);
  }
}
