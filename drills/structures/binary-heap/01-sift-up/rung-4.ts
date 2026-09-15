import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Full Body.
 * One whole method body, contract only.
 *
 * Target operation: siftUp()
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
    // Precondition: the array satisfies the invariant everywhere except
    // possibly at index i, whose value may be too small for its position.
    // Postcondition: the invariant holds everywhere. O(log n).
    TODO("the whole siftUp body");
  }

  private siftDown(i: number): void {
    const n = this.a.length;
    for (;;) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let smallest = i;
      if (l < n && this.a[l]! < this.a[smallest]!) smallest = l;
      if (r < n && this.a[r]! < this.a[smallest]!) smallest = r;
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }
}
