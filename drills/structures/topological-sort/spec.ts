/** Shared contract for every topological-sort drill in this set. */

import assert from "node:assert/strict";
import { isDeepStrictEqual } from "node:util";
import type { Case } from "#harness/verify.ts";

/**
 * The representation: `graph[v]` lists the vertices `v` has a directed edge
 * to. Vertices are `0 .. graph.length - 1`.
 */
export type Adjacency = number[][];

export type InDegreesOperation = (graph: Adjacency) => number[];
export type TopologicalSortOperation = (graph: Adjacency) => number[];

/** What `judged` reports about a returned order — the thing cases compare. */
export type Verdict = "valid order" | "empty (cycle)";

/** Test-side builder: n vertices, each edge one-way, lists in edge order. */
function directed(n: number, edges: readonly (readonly [number, number])[]): Adjacency {
  const g: Adjacency = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) if (!g[u]!.includes(v)) g[u]!.push(v);
  return g;
}

/** Test-side builder: vertex i+1 must precede vertex i, all the way down. */
function reversedChain(n: number): Adjacency {
  return directed(n, Array.from({ length: n - 1 }, (_, i) => [i + 1, i] as const));
}

/** Test-side builder: vertex i must precede vertex i+1, all the way up. */
function forwardChain(n: number): Adjacency {
  return directed(n, Array.from({ length: n - 1 }, (_, i) => [i, i + 1] as const));
}

/**
 * Deterministic pseudo-random graph, same every run. Every edge runs forward
 * in a hidden shuffled order, so vertex numbers give no hint about the order.
 * With `cyclic`, a spine through the whole hidden order is added, plus one
 * edge from its last vertex back to its first — a cycle through everything.
 */
function scrambled(n: number, extra: number, cyclic: boolean): Adjacency {
  let x = 4243;
  const next = () => (x = (x * 1103515245 + 12345) % 2147483648);
  // High bits: the low bits of this generator repeat with a short period.
  const pick = (k: number) => Math.floor(next() / 65536) % k;
  const hidden = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = pick(i + 1);
    [hidden[i], hidden[j]] = [hidden[j]!, hidden[i]!];
  }
  const edges: [number, number][] = [];
  if (cyclic) for (let i = 0; i + 1 < n; i++) edges.push([hidden[i]!, hidden[i + 1]!]);
  for (let k = 0; k < extra; k++) {
    const a = pick(n);
    const b = pick(n);
    if (a < b) edges.push([hidden[a]!, hidden[b]!]);
  }
  if (cyclic) edges.push([hidden[n - 1]!, hidden[0]!]);
  return directed(n, edges);
}

/** API.md's first worked example. */
const exampleA = directed(4, [[0, 1], [0, 2], [1, 3], [2, 3]]);
/** API.md's second worked example. */
const exampleB = directed(4, [[1, 0], [2, 0], [2, 1]]);
/** API.md's third worked example. */
const exampleC = directed(4, [[0, 1], [1, 2], [2, 1]]);

const scrambledDag = scrambled(30, 90, false);
const scrambledCyclic = scrambled(30, 45, true);
const deepForward = forwardChain(100_000);

/**
 * Test-side adapter for `inDegrees`: runs it and checks the graph was left
 * alone. No sibling operation is needed to run this drill.
 */
export function observeInDegrees(operation: InDegreesOperation): InDegreesOperation {
  return (graph) => {
    const before = structuredClone(graph);
    const counts = operation(graph);
    assertUnchanged(graph, before);
    return counts;
  };
}

/**
 * A plain boolean check: `assert.deepEqual` would try to render a diff, which
 * takes minutes on a 100,000-vertex graph.
 */
function assertUnchanged(graph: Adjacency, before: Adjacency): void {
  assert.ok(isDeepStrictEqual(graph, before), "the input graph must remain unchanged");
}

/**
 * Test-side adapter for `topologicalSort`: instead of comparing against one
 * "right" sequence — many are right — it checks the returned order against
 * the graph itself. Throws, with the reason, when the order is not valid;
 * otherwise reports whether an order came back or `[]` did.
 */
export function judged(
  operation: TopologicalSortOperation,
): (graph: Adjacency) => Verdict {
  return (graph) => {
    const before = structuredClone(graph);
    const order = operation(graph);
    assertUnchanged(graph, before);
    if (order.length === 0) return "empty (cycle)";

    const n = graph.length;
    const got = `returned ${preview(order)}`;
    assert.equal(
      order.length,
      n,
      `an order lists every vertex exactly once: ${n} vertices, but ${order.length} entries. ${got}`,
    );
    const position = new Array<number>(n).fill(-1);
    order.forEach((v, i) => {
      assert.ok(Number.isInteger(v) && v >= 0 && v < n, `${String(v)} is not a vertex. ${got}`);
      assert.equal(position[v], -1, `vertex ${v} appears twice. ${got}`);
      position[v] = i;
    });
    for (let u = 0; u < n; u++) {
      for (const v of graph[u]!) {
        assert.ok(
          position[u]! < position[v]!,
          `edge ${u} → ${v}: ${v} is placed at ${position[v]}, before ${u} at ${position[u]}. ${got}`,
        );
      }
    }
    return "valid order";
  };
}

function preview(order: readonly number[]): string {
  const shown = order.slice(0, 24).join(", ");
  return `[${shown}${order.length > 24 ? `, … ${order.length - 24} more` : ""}]`;
}

export const inDegreesCases: readonly Case<[Adjacency], number[]>[] = [
  {
    name: "diamond: the far corner is entered twice",
    args: [exampleA],
    want: [0, 1, 1, 2],
  },
  {
    name: "several vertices nothing points to",
    args: [exampleB],
    want: [2, 1, 0, 0],
  },
  {
    name: "cycle: counts are still just counts",
    args: [exampleC],
    want: [0, 2, 1, 0],
  },
  {
    name: "single vertex, no edges",
    args: [[[]]],
    want: [0],
    edge: true,
  },
  {
    name: "self-loop counts toward its own vertex",
    args: [[[0]]],
    want: [1],
    edge: true,
  },
  {
    name: "one vertex pointing at everything else: only the others are entered",
    args: [[[1, 2, 3], [], [], []]],
    want: [0, 1, 1, 1],
    edge: true,
  },
  {
    name: "everything pointing at one vertex: only that vertex is entered",
    args: [[[3], [3], [3], []]],
    want: [0, 0, 0, 3],
    edge: true,
  },
  {
    name: "an edge in each direction between two vertices",
    args: [[[1], [0]]],
    want: [1, 1],
    edge: true,
  },
  {
    name: "isolated vertices keep a count of zero",
    args: [[[], [], []]],
    want: [0, 0, 0],
    edge: true,
  },
  {
    name: "100,000-vertex path: everything but the first is entered once",
    args: [deepForward],
    want: Array.from({ length: 100_000 }, (_, i) => (i === 0 ? 0 : 1)),
    edge: true,
  },
  {
    name: "30 vertices, scrambled acyclic edges",
    args: [scrambledDag],
    want: [
      0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 4, 1, 0, 1, 1,
      4, 0, 2, 5, 0, 2, 3, 2, 1, 2, 0, 2, 0, 3, 1,
    ],
    edge: true,
  },
];

export const topologicalSortCases: readonly Case<[Adjacency], Verdict>[] = [
  {
    name: "diamond: both middle vertices before the far corner",
    args: [exampleA],
    want: "valid order",
  },
  {
    name: "several vertices nothing points to",
    args: [exampleB],
    want: "valid order",
  },
  {
    name: "cycle behind a clean start: 0 and 3 are placeable, 1 and 2 never are",
    args: [exampleC],
    want: "empty (cycle)",
  },
  {
    name: "single vertex, no edges",
    args: [[[]]],
    want: "valid order",
    edge: true,
  },
  {
    name: "no edges at all: every vertex is its own start",
    args: [[[], [], [], []]],
    want: "valid order",
    edge: true,
  },
  {
    name: "self-loop is a cycle",
    args: [[[0]]],
    want: "empty (cycle)",
    edge: true,
  },
  {
    name: "an edge in each direction between two vertices",
    args: [[[1], [0]]],
    want: "empty (cycle)",
    edge: true,
  },
  {
    name: "every vertex on one cycle: nothing can be placed first",
    args: [directed(3, [[0, 1], [1, 2], [2, 0]])],
    want: "empty (cycle)",
    edge: true,
  },
  {
    name: "the starts are not vertex 0 and there is more than one",
    args: [directed(4, [[2, 0], [3, 1], [0, 1]])],
    want: "valid order",
    edge: true,
  },
  {
    name: "a vertex with two prerequisites waits for both",
    args: [directed(4, [[0, 2], [1, 2], [2, 3]])],
    want: "valid order",
    edge: true,
  },
  {
    name: "wide fan out, then fan in",
    args: [directed(7, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]])],
    want: "valid order",
    edge: true,
  },
  {
    name: "a cycle in one component does not hide behind a clean one",
    args: [directed(5, [[0, 1], [3, 4], [4, 3], [1, 2]])],
    want: "empty (cycle)",
    edge: true,
  },
  {
    name: "labels run against the order: 5 before 4 before … before 0",
    args: [reversedChain(6)],
    want: "valid order",
    edge: true,
  },
  {
    name: "30 vertices, scrambled acyclic edges",
    args: [scrambledDag],
    want: "valid order",
    edge: true,
  },
  {
    name: "30 vertices, scrambled edges closed into a cycle",
    args: [scrambledCyclic],
    want: "empty (cycle)",
    edge: true,
  },
  {
    name: "100,000-vertex path: deeper than the call stack allows",
    args: [deepForward],
    want: "valid order",
    edge: true,
  },
];
