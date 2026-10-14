import type { Case } from "#harness/verify.ts";

/** The public surface every rung's MedianFinder exposes. */
export interface Medians {
  addNum(num: number): void;
  findMedian(): number;
}

export type MediansCtor = new () => Medians;

export type Op = readonly ["addNum", number] | readonly ["findMedian"];

/** Build a MedianFinder, run the script, and collect every findMedian() result. */
export function drive(Ctor: MediansCtor, ops: readonly Op[]): number[] {
  const m = new Ctor();
  const out: number[] = [];
  for (const op of ops) {
    if (op[0] === "addNum") m.addNum(op[1]);
    else out.push(m.findMedian());
  }
  return out;
}

const M = ["findMedian"] as const;
const A = (num: number) => ["addNum", num] as const;

/** Add each value in turn, asking for the median after every one. */
const askingEachTime = (...nums: number[]): Op[] => nums.flatMap((n) => [A(n), M]);

/**
 * Deterministic stream of `count` values in [-1000, 1000] — same every run —
 * with the median asked after every `every` adds.
 */
function scrambledStream(count: number, every: number): Op[] {
  const out: Op[] = [];
  let x = 295;
  const next = () => (x = (x * 1103515245 + 12345) % 2147483648);
  for (let i = 1; i <= count; i++) {
    out.push(A((next() % 2001) - 1000));
    if (i % every === 0) out.push(M);
  }
  return out;
}

/** The statement's example, plus edge cases the statement does not give. */
export const cases: readonly Case<[readonly Op[]], number[]>[] = [
  {
    name: "statement example: 1, 2, ask, 3, ask",
    args: [[A(1), A(2), M, A(3), M]],
    want: [1.5, 2],
  },
  {
    name: "a single value is its own median",
    args: [[A(5), M]],
    want: [5],
    edge: true,
  },
  {
    name: "asking twice in a row changes nothing",
    args: [[A(1), A(3), M, M, A(2), M, M]],
    want: [2, 2, 2, 2],
    edge: true,
  },
  {
    name: "ascending stream — every new value is the largest so far",
    args: [askingEachTime(1, 2, 3, 4, 5, 6)],
    want: [1, 1.5, 2, 2.5, 3, 3.5],
    edge: true,
  },
  {
    name: "descending stream — every new value is the smallest so far",
    args: [askingEachTime(6, 5, 4, 3, 2, 1)],
    want: [6, 5.5, 5, 4.5, 4, 3.5],
    edge: true,
  },
  {
    name: "all negative",
    args: [askingEachTime(-1, -2, -3, -4, -5)],
    want: [-1, -1.5, -2, -2.5, -3],
    edge: true,
  },
  {
    name: "the same value four times",
    args: [askingEachTime(4, 4, 4, 4)],
    want: [4, 4, 4, 4],
    edge: true,
  },
  {
    name: "duplicates sitting on both sides of the middle",
    args: [askingEachTime(1, 2, 2, 2, 3)],
    want: [1, 1.5, 2, 2, 2],
    edge: true,
  },
  {
    name: "new values landing between the two middle values",
    args: [askingEachTime(1, 9, 5, 4, 6)],
    want: [1, 5, 5, 4.5, 5],
    edge: true,
  },
  {
    name: "alternating high and low — the middle keeps changing sides",
    args: [askingEachTime(10, -10, 9, -9, 8, -8)],
    want: [10, 0, 9, 0, 8, 0],
    edge: true,
  },
  {
    name: "the limits of the value range",
    args: [askingEachTime(-100000, 100000, 100000)],
    want: [-100000, 0, 100000],
    edge: true,
  },
  {
    name: "200-value scrambled stream, asked after every 25 adds",
    args: [scrambledStream(200, 25)],
    want: [-127, -214.5, -218, -122.5, -101, -74.5, -35, -37.5],
    edge: true,
  },
];
