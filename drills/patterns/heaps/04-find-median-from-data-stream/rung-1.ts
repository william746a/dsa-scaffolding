import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export class MedianFinder {
  private lower = new PriorityQueue<number>((a, b) => b - a);
  private upper = new PriorityQueue<number>((a, b) => a - b);

  constructor() {}

  addNum(num: number): void {
    if (this.lower.size === 0 || num <= this.lower.peek()!) this.lower.push(num);
    else this.upper.push(num);

    if (this.lower.size > this.upper.size + 1) this.upper.push(this.lower.pop()!);
    else if (this.upper.size > this.lower.size) this.lower.push(this.upper.pop()!);
  }

  findMedian(): number {
    if (this.lower.size > this.upper.size) {
      return this.lower.peek()!;
    }
    return (this.lower.peek()! + this.upper.peek()!) / 2;
  }
}
