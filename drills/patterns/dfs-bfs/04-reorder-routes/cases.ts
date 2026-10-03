import type { Case } from "#harness/verify.ts";

/**
 * Deterministic pseudo-random road network — same every run. City i > 0
 * joins a random earlier city by a road of random direction; road order is
 * scrambled so it does not leak the tree's shape.
 */
function scrambledRoads(n: number): number[][] {
  let x = 1466;
  // High bits: the low bits of this generator repeat with a short period.
  const next = (mod: number) =>
    Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % mod;
  const roads: number[][] = [];
  for (let i = 1; i < n; i++) {
    const p = next(i);
    roads.push(next(2) === 0 ? [p, i] : [i, p]);
  }
  for (let i = roads.length - 1; i > 0; i--) {
    const j = next(i + 1);
    [roads[i], roads[j]] = [roads[j]!, roads[i]!];
  }
  return roads;
}

const outward = Array.from({ length: 2999 }, (_, i) => [i, i + 1]);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<[number, number[][]], number>[] = [
  {
    name: "example 1",
    args: [6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]],
    want: 3,
  },
  {
    name: "example 2",
    args: [5, [[1, 0], [1, 2], [3, 2], [3, 4]]],
    want: 2,
  },
  {
    name: "example 3: already all inbound",
    args: [3, [[1, 0], [2, 0]]],
    want: 0,
  },
  {
    name: "two cities, road leads away from 0",
    args: [2, [[0, 1]]],
    want: 1,
    edge: true,
  },
  {
    name: "two cities, road already leads to 0",
    args: [2, [[1, 0]]],
    want: 0,
    edge: true,
  },
  {
    name: "a chain already pointing inward: every road is reached against its direction",
    args: [4, [[3, 2], [1, 0], [2, 1]]],
    want: 0,
    edge: true,
  },
  {
    name: "star with mixed directions",
    args: [5, [[0, 1], [2, 0], [0, 3], [4, 0]]],
    want: 2,
    edge: true,
  },
  {
    name: "3000-city chain, every road leading away from 0",
    args: [3000, outward],
    want: 2999,
    edge: true,
  },
  {
    name: "400 cities, scrambled roads",
    args: [400, scrambledRoads(400)],
    want: 198,
    edge: true,
  },
];
