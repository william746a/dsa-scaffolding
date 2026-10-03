import type { Case } from "#harness/verify.ts";

/** Deterministic pseudo-random meetings — same every run, no seeding library. */
function scrambledMeetings(n: number): number[][] {
  const out: number[][] = [];
  let x = 424242;
  const next = () => (x = (x * 1103515245 + 12345) % 2147483648);
  for (let i = 0; i < n; i++) {
    const start = next() % 10_000;
    out.push([start, start + 1 + (next() % 400)]);
  }
  return out;
}

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<[number[][]], number>[] = [
  { name: "[[0,30],[5,10],[15,20]]", args: [[[0, 30], [5, 10], [15, 20]]], want: 2 },
  { name: "[[7,10],[2,4]] — unordered input", args: [[[7, 10], [2, 4]]], want: 1 },
  { name: "single meeting", args: [[[1, 2]]], want: 1, edge: true },
  {
    name: "back-to-back: ending at t frees the room for a start at t",
    args: [[[1, 5], [5, 10], [10, 15]]],
    want: 1,
    edge: true,
  },
  {
    name: "identical meetings each need their own room",
    args: [[[1, 5], [1, 5], [1, 5]]],
    want: 3,
    edge: true,
  },
  {
    name: "the room that frees soonest is not the one taken most recently",
    args: [[[1, 3], [2, 10], [4, 5]]],
    want: 2,
    edge: true,
  },
  {
    name: "peak overlap happens early, then falls away",
    args: [[[1, 5], [2, 6], [10, 11]]],
    want: 2,
    edge: true,
  },
  {
    name: "one long meeting spanning many short sequential ones",
    args: [[[2, 3], [0, 100], [3, 4], [4, 5], [1, 2]]],
    want: 2,
    edge: true,
  },
  {
    name: "500 scrambled meetings",
    args: [scrambledMeetings(500)],
    want: 19,
    edge: true,
  },
];
