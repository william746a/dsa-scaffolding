import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Full Body.
 * One whole method body, contract only.
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
    // Precondition: the array satisfies the invariant everywhere except
    // possibly at index i, whose value may be too large for its position.
    // Postcondition: the invariant holds everywhere. O(log n).
    TODO("the whole siftDown body");
  }
}
