import { TODO } from "#harness/verify.ts";

/** Rung 6 — Interface Skeleton. Only pop's body is blank. */
export class MinHeap {
  private a: number[] = [];

  get size(): number { return this.a.length; }
  peek(): number | undefined { return this.a[0]; }

  push(value: number): void {
    this.a.push(value);
    this.siftUp(this.a.length - 1);
  }

  pop(): number | undefined {
    return TODO("implement pop");
  }

  private parent(i: number): number { return Math.floor((i - 1) / 2); }

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
