/** Shared contract for every graph-traversal drill in this set. */

import type { Case } from "#harness/verify.ts";

/**
 * The representation: `graph[v]` lists the vertices `v` reaches directly, in
 * the order they must be explored. Vertices are `0 .. graph.length - 1`.
 */
export type Adjacency = number[][];

export type DfsOperation = (graph: Adjacency, start: number) => number[];
export type BfsOperation = (graph: Adjacency, start: number) => number[];

/** Test-side builder: n vertices, each edge one-way, lists in edge order. */
function directed(n: number, edges: readonly (readonly [number, number])[]): Adjacency {
  const g: Adjacency = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) if (!g[u]!.includes(v)) g[u]!.push(v);
  return g;
}

/** Test-side builder: n vertices, each edge mirrored, lists in edge order. */
function undirected(n: number, edges: readonly (readonly [number, number])[]): Adjacency {
  return directed(n, edges.flatMap(([u, v]) => [[u, v], [v, u]] as const));
}

/** Deterministic pseudo-random graph — same every run, no seeding library. */
function scrambledGraph(n: number, m: number): Adjacency {
  let x = 797;
  const next = () => (x = (x * 1103515245 + 12345) % 2147483648);
  const edges: [number, number][] = [];
  // High bits: the low bits of this generator repeat with a short period.
  const pick = () => Math.floor(next() / 65536) % n;
  for (let i = 0; i < m; i++) edges.push([pick(), pick()]);
  return undirected(n, edges);
}

const chain = undirected(
  2000,
  Array.from({ length: 1999 }, (_, i) => [i, i + 1] as const),
);
const scrambled = scrambledGraph(40, 45);

/** API.md's first worked example. */
const exampleA = undirected(5, [[0, 1], [0, 2], [1, 3], [2, 4]]);
/** API.md's second worked example. */
const exampleB = directed(4, [[0, 1], [1, 2], [2, 0], [3, 0]]);

export const dfsCases: readonly Case<[Adjacency, number], number[]>[] = [
  {
    name: "undirected tree: each branch finished before the next begins",
    args: [exampleA, 0],
    want: [0, 1, 3, 2, 4],
  },
  {
    name: "directed cycle: stops at the start, never reaches 3",
    args: [exampleB, 0],
    want: [0, 1, 2],
  },
  {
    name: "single vertex, no edges",
    args: [[[]], 0],
    want: [0],
    edge: true,
  },
  {
    name: "self-loop is not a second visit",
    args: [[[0]], 0],
    want: [0],
    edge: true,
  },
  {
    name: "explores in list order, not numeric order",
    args: [[[2, 1], [], []], 0],
    want: [0, 2, 1],
    edge: true,
  },
  {
    name: "a vertex first reached through an earlier sibling is visited there",
    args: [directed(4, [[0, 1], [0, 2], [1, 2], [1, 3]]), 0],
    want: [0, 1, 2, 3],
    edge: true,
  },
  {
    name: "start in the second of two components",
    args: [undirected(6, [[0, 1], [1, 2], [3, 4], [4, 5]]), 4],
    want: [4, 3, 5],
    edge: true,
  },
  {
    name: "undirected triangle: every edge leads back somewhere visited",
    args: [undirected(3, [[0, 1], [1, 2], [2, 0]]), 0],
    want: [0, 1, 2],
    edge: true,
  },
  {
    name: "2000-vertex path, walked end to end",
    args: [chain, 0],
    want: Array.from({ length: 2000 }, (_, i) => i),
    edge: true,
  },
  {
    name: "40 vertices, 45 scrambled undirected edges",
    args: [scrambled, 0],
    want: [
      0, 24, 7, 35, 25, 30, 2, 38, 12, 36, 17, 39, 3, 37, 32, 23,
      8, 5, 19, 18, 14, 6, 21, 29, 22, 4, 33, 16, 20, 27, 11, 34,
    ],
    edge: true,
  },
];

/**
 * dfsIterative honors the same contract as dfs, plus one case recursion
 * cannot pass: a path deeper than JavaScript's call stack. LeetCode graph
 * problems routinely allow 10^5 vertices or more.
 */
const deepPath = directed(
  100_000,
  Array.from({ length: 99_999 }, (_, i) => [i, i + 1] as const),
);

export const dfsIterativeCases: readonly Case<[Adjacency, number], number[]>[] = [
  ...dfsCases,
  {
    name: "100,000-vertex path: deeper than the call stack allows",
    args: [deepPath, 0],
    want: Array.from({ length: 100_000 }, (_, i) => i),
    edge: true,
  },
];

export const bfsCases: readonly Case<[Adjacency, number], number[]>[] = [
  {
    name: "undirected tree: distance is depth",
    args: [exampleA, 0],
    want: [0, 1, 1, 2, 2],
  },
  {
    name: "directed cycle: 3 cannot be reached",
    args: [exampleB, 0],
    want: [0, 1, 2, -1],
  },
  {
    name: "single vertex, no edges",
    args: [[[]], 0],
    want: [0],
    edge: true,
  },
  {
    name: "self-loop does not change the start's distance",
    args: [[[0]], 0],
    want: [0],
    edge: true,
  },
  {
    name: "a long way round listed first must not set the distance",
    args: [directed(4, [[0, 1], [0, 3], [1, 2], [2, 3]]), 0],
    want: [0, 1, 2, 1],
    edge: true,
  },
  {
    name: "every vertex at one distance is examined before any farther one",
    args: [directed(5, [[0, 1], [0, 2], [1, 3], [2, 4], [4, 3]]), 0],
    want: [0, 1, 1, 2, 2],
    edge: true,
  },
  {
    name: "start in the second of two components",
    args: [undirected(6, [[0, 1], [1, 2], [3, 4], [4, 5]]), 4],
    want: [-1, -1, -1, 1, 0, 1],
    edge: true,
  },
  {
    name: "directed: edges cannot be walked backwards",
    args: [directed(3, [[1, 0], [2, 1]]), 1],
    want: [1, 0, -1],
    edge: true,
  },
  {
    name: "2000-vertex path, measured from the far end",
    args: [chain, 1999],
    want: Array.from({ length: 2000 }, (_, i) => 1999 - i),
    edge: true,
  },
  {
    name: "40 vertices, 45 scrambled undirected edges",
    args: [scrambled, 0],
    want: [
      0, -1, 5, 2, 5, 5, 6, 2, 5, -1, -1, 7, 5, -1, 6, -1, 3, 4, 5, 6,
      5, 6, 8, 4, 1, 4, -1, 6, -1, 7, 4, -1, 4, 4, 6, 3, 5, 3, 4, 3,
    ],
    edge: true,
  },
];
