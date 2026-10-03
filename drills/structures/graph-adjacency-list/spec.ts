/** Shared contract for every Graph (adjacency list) operation drill in this set. */

import type { Case } from "#harness/verify.ts";

export interface GraphLike {
  addEdge(u: number, v: number): void;
  neighbors(v: number): number[];
}

export type GraphCtor = new (directed: boolean) => GraphLike;

/** Representation shared by the operation-sized drills. */
export interface GraphState {
  readonly directed: boolean;
  readonly adj: Map<number, Set<number>>;
}

export type AddEdgeOperation = (
  state: GraphState,
  u: number,
  v: number,
) => void;

export type NeighborsOperation = (
  state: GraphState,
  v: number,
) => number[];

/**
 * Compose independently drilled operations behind the public API. The final
 * operation's Rung 7 asks the learner to reconstruct this complete API file.
 */
export function composeGraph(
  addEdge: AddEdgeOperation,
  neighbors: NeighborsOperation,
): GraphCtor {
  return class Graph implements GraphLike {
    private readonly state: GraphState;

    constructor(directed: boolean) {
      this.state = { directed, adj: new Map<number, Set<number>>() };
    }

    addEdge(u: number, v: number): void {
      addEdge(this.state, u, v);
    }

    neighbors(v: number): number[] {
      return neighbors(this.state, v);
    }
  };
}

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

/**
 * Exercise addEdge in isolation. Neighbor reads are observations made by the
 * test adapter, so this drill never asks the learner to implement neighbors.
 */
export function driveAddEdge(
  addEdge: AddEdgeOperation,
  directed: boolean,
  ops: readonly Op[],
): Out[] {
  const state: GraphState = {
    directed,
    adj: new Map<number, Set<number>>(),
  };
  const out: Out[] = [];
  for (const op of ops) {
    if (op[0] === "addEdge") {
      addEdge(state, op[1], op[2]);
    } else {
      out.push([...(state.adj.get(op[1]) ?? [])].sort((a, b) => a - b));
    }
  }
  return out;
}

export type NeighborCaseArgs = readonly [
  directed: boolean,
  entries: readonly (readonly [number, readonly number[]])[],
  vertex: number,
  mutateFirstResult: boolean,
];

/** Exercise neighbors in isolation against an already-built representation. */
export function driveNeighbors(
  neighbors: NeighborsOperation,
  directed: boolean,
  entries: readonly (readonly [number, readonly number[]])[],
  vertex: number,
  mutateFirstResult: boolean,
): Out[] {
  const state: GraphState = {
    directed,
    adj: new Map(entries.map(([v, ns]) => [v, new Set(ns)])),
  };
  const first = neighbors(state, vertex);
  const observed = [...first];
  if (mutateFirstResult) first.push(Number.MAX_SAFE_INTEGER);
  return [observed, neighbors(state, vertex)];
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

export const neighborCases: readonly Case<NeighborCaseArgs, Out[]>[] = [
  {
    name: "known vertex returns its neighbors in ascending order",
    args: [false, [[5, [3, 1, 9]]], 5, false],
    want: [[1, 3, 9], [1, 3, 9]],
  },
  {
    name: "directed state uses the same read contract",
    args: [true, [[1, [7, 2]]], 1, false],
    want: [[2, 7], [2, 7]],
  },
  {
    name: "unknown vertex has no neighbors",
    args: [false, [], 99, false],
    want: [[], []],
    edge: true,
  },
  {
    name: "mutating one result cannot mutate graph state",
    args: [false, [[4, [8, 2]]], 4, true],
    want: [[2, 8], [2, 8]],
    edge: true,
  },
  {
    name: "a self-loop appears once",
    args: [true, [[4, [4]]], 4, false],
    want: [[4], [4]],
    edge: true,
  },
];
