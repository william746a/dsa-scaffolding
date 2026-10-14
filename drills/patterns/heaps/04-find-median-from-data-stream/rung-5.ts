import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the class without ordered checkpoints. Declare whatever state
 * you need.
 *
 * Contract: addNum(num) records one more value; values may repeat and arrive
 * in any order. findMedian() returns the middle value of everything recorded
 * so far, or the mean of the two middle values when the count is even. It is
 * only called once at least one value has been recorded, and it changes
 * nothing.
 * Invariant: the values so far are split into a smaller half and a larger
 * half; nothing in the smaller half exceeds anything in the larger half, and
 * the two counts never differ by more than one.
 * Required behavior, unordered: an even count answers with the mean of two
 * values; the values next to the middle can be read without searching; a new
 * value ends up on the side of the split where it belongs; neither side
 * outgrows the other; an odd count answers with a single value.
 *
 * Target: O(log n) per addNum, O(1) per findMedian, O(n) space.
 */
export class MedianFinder {
  private lower = new PriorityQueue<number>((a, b) => b - a);
  private upper = new PriorityQueue<number>((a, b) => a - b);
  
  constructor() {}

  addNum(num: number): void {
    if (this.lower.size == 0 || num <= this.lower.peek()!) {
      this.lower.push(num);
    } else {
      this.upper.push(num);
    }

    if (this.lower.size > this.upper.size + 1) {
      this.upper.push(this.lower.pop()!);
    } else if (this.upper.size > this.lower.size) {
      this.lower.push(this.upper.pop()!);
    }
  }

  findMedian(): number {
    if (this.lower.size > this.upper.size) return this.lower.peek()!;
    return (this.lower.peek()! + this.upper.peek()!) / 2;
  }
}
