import type { Case } from "#harness/verify.ts";

type Args = [n: number, edges: number[][], restricted: number[]];

/**
 * Deterministic pseudo-random tree plus restricted set — same every run.
 * Node i > 0 hangs off a random earlier node; each edge's endpoint order and
 * the edge list order are scrambled so neither leaks the tree's shape.
 */
function scrambledTree(n: number, restrictedCount: number): Args {
  let x = 2368;
  // High bits: the low bits of this generator repeat with a short period.
  const next = (mod: number) =>
    Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % mod;
  const edges: number[][] = [];
  for (let i = 1; i < n; i++) {
    const p = next(i);
    edges.push(next(2) === 0 ? [p, i] : [i, p]);
  }
  for (let i = edges.length - 1; i > 0; i--) {
    const j = next(i + 1);
    [edges[i], edges[j]] = [edges[j]!, edges[i]!];
  }
  const restricted = new Set<number>();
  while (restricted.size < restrictedCount) restricted.add(1 + next(n - 1));
  return [n, edges, [...restricted]];
}

const chain = Array.from({ length: 2999 }, (_, i) => [i + 1, i]);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<Args, number>[] = [
  {
    name: "example 1: restricted 4 and 5",
    args: [7, [[0, 1], [1, 2], [3, 1], [4, 0], [0, 5], [5, 6]], [4, 5]],
    want: 4,
  },
  {
    name: "example 2: restricted 4, 2, 1",
    args: [7, [[0, 1], [0, 2], [0, 5], [0, 4], [3, 2], [6, 5]], [4, 2, 1]],
    want: 3,
  },
  {
    name: "every neighbor of 0 is restricted",
    args: [4, [[0, 1], [0, 2], [0, 3]], [1, 2, 3]],
    want: 1,
    edge: true,
  },
  {
    name: "edges listed child-first still connect both ways",
    args: [4, [[1, 0], [2, 1], [3, 2]], [3]],
    want: 3,
    edge: true,
  },
  {
    name: "a restricted leaf removes only itself",
    args: [5, [[0, 1], [1, 2], [1, 3], [3, 4]], [2]],
    want: 4,
    edge: true,
  },
  {
    name: "3000-node path, restricted halfway",
    args: [3000, chain, [1500]],
    want: 1500,
    edge: true,
  },
  {
    name: "400-node scrambled tree, 40 restricted",
    args: scrambledTree(400, 40),
    want: 303,
    edge: true,
  },
];
