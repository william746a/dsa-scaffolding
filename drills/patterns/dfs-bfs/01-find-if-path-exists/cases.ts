import type { Case } from "#harness/verify.ts";

type Args = [n: number, edges: number[][], source: number, destination: number];

/** Deterministic pseudo-random simple graph — same every run. */
function scrambledEdges(n: number, m: number): number[][] {
  let x = 1971;
  // High bits: the low bits of this generator repeat with a short period.
  const pick = () => Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % n;
  const seen = new Set<string>();
  const out: number[][] = [];
  while (out.length < m) {
    const u = pick();
    const v = pick();
    const key = u < v ? `${u},${v}` : `${v},${u}`;
    if (u === v || seen.has(key)) continue;
    seen.add(key);
    out.push([u, v]);
  }
  return out;
}

const chain = Array.from({ length: 2999 }, (_, i) => [i, i + 1]);
const scrambled = scrambledEdges(300, 200);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<Args, boolean>[] = [
  {
    name: "triangle, 0 to 2",
    args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2],
    want: true,
  },
  {
    name: "two separate triangles, 0 to 5",
    args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5],
    want: false,
  },
  {
    name: "source is the destination, no edges at all",
    args: [1, [], 0, 0],
    want: true,
    edge: true,
  },
  {
    name: "the only edge is listed destination-first",
    args: [2, [[1, 0]], 0, 1],
    want: true,
    edge: true,
  },
  {
    name: "isolated destination beside a cycle that must still terminate",
    args: [5, [[0, 1], [1, 2], [2, 3], [3, 0]], 1, 4],
    want: false,
    edge: true,
  },
  {
    name: "path must pass back through a vertex's earlier neighbor",
    args: [5, [[3, 4], [0, 1], [2, 3], [1, 2]], 0, 4],
    want: true,
    edge: true,
  },
  {
    name: "3000-vertex path, end to end",
    args: [3000, chain, 0, 2999],
    want: true,
    edge: true,
  },
  {
    name: "300 vertices, 200 scrambled edges — reachable pair",
    args: [300, scrambled, 98, 142],
    want: true,
    edge: true,
  },
  {
    name: "300 vertices, 200 scrambled edges — unreachable pair",
    args: [300, scrambled, 98, 0],
    want: false,
    edge: true,
  },
];
