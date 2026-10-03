/**
 * Supplied runtime library for this set — not a drill, not learner-edited.
 *
 * LeetCode's TypeScript runtime ships a priority queue; this is the local
 * stand-in, so a blank-page rung never turns into "implement a heap first."
 * Building one from scratch is its own drill: structures/binary-heap.
 *
 *   import { PriorityQueue } from "../priority-queue.ts";
 *
 *   const q = new PriorityQueue<number>((a, b) => a - b);
 *   q.push(5); q.push(2); q.push(8);
 *   q.peek();  // 2
 *   q.pop();   // 2
 *   q.size;    // 2
 *
 * `compare(a, b)` follows Array.prototype.sort: negative when `a` should come
 * out first. peek/pop return `undefined` on an empty queue.
 *
 *   size  O(1)   peek  O(1)   push  O(log n)   pop  O(log n)
 */
export class PriorityQueue<T> {
  private readonly a: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  get size(): number {
    return this.a.length;
  }

  peek(): T | undefined {
    return this.a[0];
  }

  push(value: T): void {
    const a = this.a;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(a[p]!, a[i]!) <= 0) break;
      [a[p], a[i]] = [a[i]!, a[p]!];
      i = p;
    }
  }

  pop(): T | undefined {
    const a = this.a;
    if (a.length === 0) return undefined;
    const top = a[0]!;
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let best = i;
        if (l < a.length && this.compare(a[l]!, a[best]!) < 0) best = l;
        if (r < a.length && this.compare(a[r]!, a[best]!) < 0) best = r;
        if (best === i) break;
        [a[i], a[best]] = [a[best]!, a[i]!];
        i = best;
      }
    }
    return top;
  }
}
