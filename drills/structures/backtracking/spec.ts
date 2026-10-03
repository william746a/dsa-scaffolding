import assert from "node:assert/strict";
import type { Case } from "#harness/verify.ts";

/** Same representation used by graph-traversal: outgoing neighbors in list order. */
export type Adjacency = number[][];
export type PathsOperation = (
  graph: Adjacency, start: number, target: number,
) => number[][];

/** Test-side adapter; no sibling operation is needed to run this drill. */
export function observe(operation: PathsOperation): PathsOperation {
  return (graph, start, target) => {
    const before = structuredClone(graph);
    const paths = operation(graph, start, target);
    assert.deepEqual(graph, before, "the input graph must remain unchanged");
    assert.equal(new Set(paths).size, paths.length, "returned paths must be independent arrays");
    return paths;
  };
}

export const cases: readonly Case<[Adjacency, number, number], number[][]>[] = [
  {
    name: "example A: branches meet at destination",
    args: [[[1, 2], [3], [3], []], 0, 3],
    want: [[0, 1, 3], [0, 2, 3]],
  },
  {
    name: "example B: cycle and shared intermediate vertices",
    args: [[[1, 2], [2, 3], [1, 3], []], 0, 3],
    want: [[0, 1, 2, 3], [0, 1, 3], [0, 2, 1, 3], [0, 2, 3]],
  },
  {
    name: "example C: neighbor list order",
    args: [[[2, 1], [3], [3], [], []], 0, 3],
    want: [[0, 2, 3], [0, 1, 3]],
  },
  {
    name: "example C: unreachable destination",
    args: [[[2, 1], [3], [3], [], []], 0, 4],
    want: [],
  },
  { name: "single vertex", args: [[[]], 0, 0], want: [[0]], edge: true },
  { name: "self-loop", args: [[[0, 1], []], 0, 1], want: [[0, 1]], edge: true },
  {
    name: "dead branch must not contaminate a later path",
    args: [[[1, 2], [3], [4], [], []], 0, 4],
    want: [[0, 2, 4]], edge: true,
  },
  {
    name: "shared intermediate vertex can occur in separate paths",
    args: [[[1, 2], [3], [3], [4], []], 0, 4],
    want: [[0, 1, 3, 4], [0, 2, 3, 4]], edge: true,
  },
  {
    name: "undirected triangle, starting away from zero",
    args: [[[1, 2], [0, 2], [0, 1]], 2, 1],
    want: [[2, 0, 1], [2, 1]], edge: true,
  },
  {
    name: "stop at destination even when it has outgoing edges",
    args: [[[1], [2], [0]], 0, 1],
    want: [[0, 1]], edge: true,
  },
  {
    name: "start equals target in a graph with cycles",
    args: [[[1], [0]], 1, 1],
    want: [[1]], edge: true,
  },
  {
    name: "cycle with no reachable destination",
    args: [[[1], [0], []], 0, 2],
    want: [], edge: true,
  },
];

/** A sparse graph beyond JavaScript's recursion depth, with only one result. */
const deepPath: Adjacency = Array.from(
  { length: 20_000 }, (_, v) => v < 19_999 ? [v + 1] : [],
);

export const iterativeCases: readonly Case<[Adjacency, number, number], number[][]>[] = [
  ...cases,
  {
    name: "20,000-vertex path: deeper than the call stack",
    args: [deepPath, 0, 19_999],
    want: [Array.from({ length: 20_000 }, (_, v) => v)],
    edge: true,
  },
];
