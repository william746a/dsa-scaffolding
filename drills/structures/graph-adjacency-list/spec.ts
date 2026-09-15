/** Shared contract for every Graph (adjacency list) operation drill in this set. */

import type { Case } from "#harness/verify.ts";

export interface GraphLike {
  addEdge(u: number, v: number): void;
  neighbors(v: number): number[];
}

export type GraphCtor = new (directed: boolean) => GraphLike;

export type Op = readonly ["addEdge", number, number] | readonly ["neighbors", number];

export type Out = number[];

/** Runs a scripted sequence against a graph and collects every neighbors() result. */
export function drive(Ctor: GraphCtor, directed: boolean, ops: readonly Op[]): Out[] {
  const g = new Ctor(directed);
  const out: Out[] = [];
  for (const op of ops) {
    if (op[0] === "addEdge") {
      g.addEdge(op[1], op[2]);
    } else {
      out.push(g.neighbors(op[1]));
    }
  }
  return out;
}

const add = (u: number, v: number): Op => ["addEdge", u, v] as const;
const nb = (v: number): Op => ["neighbors", v] as const;

/** Deterministic pseudo-random values — same every run, no seeding library. */
function scrambled(n: number, mod: number): number[] {
  const out: number[] = [];
  let x = 424242;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push(x % mod);
  }
  return out;
}

/** Ground truth built independently of the Graph class, for the stress case. */
function bruteForceNeighbors(
  edges: readonly (readonly [number, number])[],
  directed: boolean,
  v: number,
): number[] {
  const set = new Set<number>();
  for (const [a, b] of edges) {
    if (a === v) set.add(b);
    if (!directed && b === v) set.add(a);
  }
  return [...set].sort((x, y) => x - y);
}

const stressVals = scrambled(120, 12); // 60 edges among vertices 0-11
const stressEdges: (readonly [number, number])[] = [];
for (let i = 0; i + 1 < stressVals.length; i += 2) {
  stressEdges.push([stressVals[i]!, stressVals[i + 1]!]);
}
const stressProbeVertices = [0, 3, 7, 11];
const stressOps: Op[] = [
  ...stressEdges.map(([a, b]) => add(a, b)),
  ...stressProbeVertices.map((v) => nb(v)),
];
const stressWant: Out[] = stressProbeVertices.map((v) => bruteForceNeighbors(stressEdges, false, v));

export const cases: readonly Case<[boolean, readonly Op[]], Out[]>[] = [
  {
    name: "undirected single edge is traversable both ways",
    args: [false, [add(1, 2), nb(1), nb(2)]],
    want: [[2], [1]],
  },
  {
    name: "directed single edge is traversable one way only",
    args: [true, [add(1, 2), nb(1), nb(2)]],
    want: [[2], []],
  },
  {
    name: "neighbors come back ascending regardless of insertion order",
    args: [false, [add(5, 3), add(5, 1), add(5, 9), nb(5)]],
    want: [[1, 3, 9]],
  },
  {
    name: "duplicate edge does not duplicate the neighbor",
    args: [false, [add(1, 2), add(1, 2), add(1, 2), nb(1)]],
    want: [[2]],
  },
  {
    name: "unknown vertex has no neighbors",
    args: [false, [nb(99)]],
    want: [[]],
    edge: true,
  },
  {
    name: "self-loop is its own neighbor",
    args: [true, [add(4, 4), nb(4)]],
    want: [[4]],
    edge: true,
  },
  {
    name: "directed graph: the reverse edge needs its own addEdge call",
    args: [true, [add(1, 2), add(2, 1), nb(1), nb(2)]],
    want: [[2], [1]],
    edge: true,
  },
  {
    name: "60 scrambled undirected edges: neighbors match a brute-force adjacency",
    args: [false, stressOps],
    want: stressWant,
    edge: true,
  },
];
