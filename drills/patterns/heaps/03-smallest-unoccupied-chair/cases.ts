import type { Case } from "#harness/verify.ts";

/**
 * Deterministic party of n friends with distinct arrivals — same every run.
 * 7919 is prime and does not divide 5000, so i -> i*7919 mod 5000 is
 * injective for i < 5000.
 */
function scrambledParty(n: number): number[][] {
  const out: number[][] = [];
  let x = 1942;
  const next = () => (x = (x * 1103515245 + 12345) % 2147483648);
  for (let i = 0; i < n; i++) {
    const arrival = ((i * 7919) % 5000) + 1;
    out.push([arrival, arrival + 1 + (next() % 300)]);
  }
  return out;
}

const party = scrambledParty(300);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<[number[][], number], number>[] = [
  {
    name: "[[1,4],[2,3],[4,6]], target 1",
    args: [[[1, 4], [2, 3], [4, 6]], 1],
    want: 1,
  },
  {
    name: "[[3,10],[1,5],[2,6]], target 0 — input not in arrival order",
    args: [[[3, 10], [1, 5], [2, 6]], 0],
    want: 2,
  },
  {
    name: "target arrives first",
    args: [[[1, 10], [2, 3]], 0],
    want: 0,
    edge: true,
  },
  {
    name: "a chair vacated at t is free for an arrival at t",
    args: [[[1, 2], [2, 3]], 1],
    want: 0,
    edge: true,
  },
  {
    name: "nobody leaves before the target: every earlier chair is taken",
    args: [[[1, 100], [2, 100], [3, 100], [4, 100]], 3],
    want: 3,
    edge: true,
  },
  {
    name: "two chairs free by the same arrival; the smaller left later",
    args: [[[1, 5], [2, 4], [6, 7]], 2],
    want: 0,
    edge: true,
  },
  {
    name: "freed chairs come back smallest first, not in order vacated",
    args: [[[1, 5], [2, 10], [3, 4], [6, 20], [7, 20]], 4],
    want: 2,
    edge: true,
  },
  {
    name: "a freed low chair is reused before a fresh higher chair",
    args: [[[1, 3], [2, 10], [4, 10], [5, 10]], 2],
    want: 0,
    edge: true,
  },
  {
    name: "300-friend party, friend who ends up on the highest chair",
    args: [party, 82],
    want: 13,
    edge: true,
  },
  {
    name: "300-friend party, friend 18",
    args: [party, 18],
    want: 10,
    edge: true,
  },
  {
    name: "300-friend party, friend 150",
    args: [party, 150],
    want: 0,
    edge: true,
  },
];
