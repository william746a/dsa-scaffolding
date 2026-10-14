import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 3 — Signature Move.
 * The logic that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: nothing in `lower` exceeds anything in `upper`, and
 * `lower` holds as many values as `upper` or exactly one more.
 */
export class MedianFinder {
  private lower = new PriorityQueue<number>((a, b) => b - a);
  private upper = new PriorityQueue<number>((a, b) => a - b);

  constructor() {}

  addNum(num: number): void {
    // TODO: store num so the first half of the invariant above is still true.
    // The counts are repaired by the lines below.
    if (this.lower.size == 0 || num <= this.lower.peek()!) {
      this.lower.push(num);
    } else {
      this.upper.push(num);
    }

    if (this.lower.size > this.upper.size + 1) this.upper.push(this.lower.pop()!);
    else if (this.upper.size > this.lower.size) this.lower.push(this.upper.pop()!);
  }

  findMedian(): number {
    if (this.lower.size > this.upper.size) return this.lower.peek()!;
    return (this.lower.peek()! + this.upper.peek()!) / 2;
  }
}
