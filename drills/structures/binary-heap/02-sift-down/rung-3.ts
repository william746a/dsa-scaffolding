import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The invariant-maintaining step is gone. Everything around it stands.
 *
 * Target operation: siftDown()
 * Invariant to preserve: every node is <= both of its children.
 * Full API and layout: ../API.md
 */
export class MinHeap {
  private a: number[] = [];

  get size(): number {
    return this.a.length;
  }

  peek(): number | undefined {
    return this.a[0];
  }

  push(value: number): void {
    this.a.push(value);
    this.siftUp(this.a.length - 1);
  }

  pop(): number | undefined {
    if (this.a.length === 0) return undefined;
    const top = this.a[0]!;
    const last = this.a.pop()!;
    if (this.a.length > 0) {
      this.a[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private swap(i: number, j: number): void {
    const t = this.a[i]!;
    this.a[i] = this.a[j]!;
    this.a[j] = t;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = this.parent(i);
      if (this.a[p]! <= this.a[i]!) break;
      this.swap(p, i);
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.a.length;
    // The value at index i may be larger than its descendants. Everything
    // else in the array already satisfies the invariant. Children of i live
    // at 2i+1 and 2i+2, and either may be missing.
    // TODO: walk i downward, restoring the invariant, and stop as soon as it
    // holds. Note there are two candidates to compare against at each step,
    // and swapping with the wrong one leaves the invariant broken.
    TODO("restore the heap invariant along a path from i down to a leaf");
  }
}
