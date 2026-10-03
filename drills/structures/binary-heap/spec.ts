/** Shared contract for every MinHeap operation drill in this set. */

import type { Case } from "#harness/verify.ts";

export interface Heap {
  readonly size: number;
  peek(): number | undefined;
  push(value: number): void;
  pop(): number | undefined;
}

export type HeapCtor = new () => Heap;

export type Op =
  | readonly ["push", number]
  | readonly ["pop"]
  | readonly ["peek"]
  | readonly ["size"];

export type Out = number | undefined;

/** Runs a scripted sequence against a heap and collects everything observable. */
export function drive(Ctor: HeapCtor, ops: readonly Op[]): Out[] {
  const h = new Ctor();
  const out: Out[] = [];
  for (const op of ops) {
    switch (op[0]) {
      case "push":
        h.push(op[1]);
        break;
      case "pop":
        out.push(h.pop());
        break;
      case "peek":
        out.push(h.peek());
        break;
      case "size":
        out.push(h.size);
        break;
    }
  }
  return out;
}

export type SiftUpOperation = (a: number[], i: number) => void;
export type SiftDownOperation = (a: number[], i: number) => void;

/** Exercise siftUp in isolation against a prepared array. */
export function driveSiftUp(
  siftUp: SiftUpOperation,
  initial: readonly number[],
  i: number,
): number[] {
  const a = [...initial];
  siftUp(a, i);
  return a;
}

/** Exercise siftDown in isolation against a prepared array. */
export function driveSiftDown(
  siftDown: SiftDownOperation,
  initial: readonly number[],
  i: number,
): number[] {
  const a = [...initial];
  siftDown(a, i);
  return a;
}

const push = (...vs: number[]): Op[] => vs.map((v) => ["push", v] as const);
const drain = (n: number): Op[] => Array.from({ length: n }, () => ["pop"] as const);

/** Deterministic pseudo-random values — same every run, no seeding library. */
function scrambled(n: number): number[] {
  const out: number[] = [];
  let x = 12345;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push(x % 1000);
  }
  return out;
}

const stress = scrambled(200);

export const cases: readonly Case<[readonly Op[]], Out[]>[] = [
  {
    name: "push 5,3,8 then peek",
    args: [[...push(5, 3, 8), ["peek"]]],
    want: [3],
  },
  {
    name: "push 5,3,8 then drain past empty",
    args: [[...push(5, 3, 8), ...drain(4)]],
    want: [3, 5, 8, undefined],
  },
  {
    name: "push 2, pop, push 1, peek",
    args: [[...push(2), ["pop"], ...push(1), ["peek"]]],
    want: [2, 1],
  },
  {
    name: "empty heap: peek, pop, size",
    args: [[["peek"], ["pop"], ["size"]]],
    want: [undefined, undefined, 0],
    edge: true,
  },
  {
    name: "duplicates all come back out",
    args: [[...push(4, 4, 1, 4), ...drain(4)]],
    want: [1, 4, 4, 4],
    edge: true,
  },
  {
    name: "already-ascending input (sift-up never swaps)",
    args: [[...push(1, 2, 3, 4, 5), ...drain(5)]],
    want: [1, 2, 3, 4, 5],
    edge: true,
  },
  {
    name: "descending input (sift-up swaps to the root every time)",
    args: [[...push(5, 4, 3, 2, 1), ...drain(5)]],
    want: [1, 2, 3, 4, 5],
    edge: true,
  },
  {
    name: "interleaved push/pop keeps size honest",
    args: [[...push(9, 1), ["pop"], ...push(7), ["size"], ["pop"], ["pop"], ["size"]]],
    want: [1, 2, 7, 9, 0],
    edge: true,
  },
  {
    name: "200 scrambled values drain in sorted order",
    args: [[...push(...stress), ...drain(stress.length)]],
    want: [...stress].sort((a, b) => a - b),
    edge: true,
  },
];

export const siftUpCases: readonly Case<[readonly number[], number], number[]>[] = [
  {
    name: "bubbles a violating leaf up past two ancestors",
    args: [[1, 5, 2, 9, 6, 0], 5],
    want: [0, 5, 1, 9, 6, 2],
  },
  {
    name: "value already satisfies the invariant: no movement",
    args: [[1, 2, 3], 2],
    want: [1, 2, 3],
  },
  {
    name: "root index has nowhere to go",
    args: [[5], 0],
    want: [5],
    edge: true,
  },
  {
    name: "equal to parent stays put (invariant uses <=)",
    args: [[2, 2, 2], 2],
    want: [2, 2, 2],
    edge: true,
  },
  {
    name: "bubbles all the way to the root",
    args: [[3, 4, 5, 6, 7, 1], 5],
    want: [1, 4, 3, 6, 7, 5],
    edge: true,
  },
];

export const siftDownCases: readonly Case<[readonly number[], number], number[]>[] = [
  {
    name: "root sinks two levels, taking the smaller child each time",
    args: [[9, 2, 3, 4, 5], 0],
    want: [2, 4, 3, 9, 5],
  },
  {
    name: "value already satisfies the invariant: no movement",
    args: [[1, 5, 6], 0],
    want: [1, 5, 6],
  },
  {
    name: "single element has no children",
    args: [[5], 0],
    want: [5],
    edge: true,
  },
  {
    name: "only a left child exists at this node",
    args: [[5, 10, 3, 1], 1],
    want: [5, 1, 3, 10],
    edge: true,
  },
  {
    name: "equal children stay put (invariant uses strict <)",
    args: [[1, 1, 1], 0],
    want: [1, 1, 1],
    edge: true,
  },
];
