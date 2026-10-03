import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every seat in `returned` is smaller than `next`,
 * and no seat numbered `next` or higher has ever been handed out.
 */
export class SeatManager {
  private returned = new PriorityQueue<number>((a, b) => a - b);
  private next = 1;

  constructor(n: number) {}

  reserve(): number {
    // TODO: hand out the smallest seat that is available right now, and
    // leave the invariant above still true afterwards.
    return TODO("return the smallest available seat, now reserved");
  }

  unreserve(seatNumber: number): void {
    this.returned.push(seatNumber);
  }
}
