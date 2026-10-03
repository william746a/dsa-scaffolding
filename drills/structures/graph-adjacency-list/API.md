# Graph (Adjacency List) — API Spec

An unweighted graph over `number` vertices, backed by a hash map from each
vertex to the set of vertices it reaches directly. Implement it from
scratch — no library graph or set-of-sets types beyond the built-in `Map` and
`Set`.

```ts
class Graph {
  constructor(directed: boolean);
  addEdge(u: number, v: number): void;  // O(1) amortized
  neighbors(v: number): number[];       // O(deg(v) log deg(v))
}
```

During the operation drills, the harness supplies construction and composes
one operation at a time around this shared representation:

```ts
interface GraphState {
  readonly directed: boolean;
  readonly adj: Map<number, Set<number>>;
}

function addEdge(state: GraphState, u: number, v: number): void;
function neighbors(state: GraphState, v: number): number[];
```

That callable form keeps each ladder scoped to one function. After both
operations have appeared, the final Rung 7 is the capstone: reconstruct the
complete `Graph` API shown above in one file.

## Harness-facing complexity declaration

This is assessment metadata, not a `Graph` method. The Rung 7 scaffold supplies
the `complexity` export and its exact keys; fill its blank value(s) before
writing the implementation. A non-final operation declares exactly its own key:

```ts
export const complexity: Record<string, string> = {
  addEdge: "",
};
```

The final whole-API capstone declares exactly every checked operation:

```ts
export const complexity: Record<string, string> = {
  addEdge: "",
  neighbors: "",
};
```

Fill each blank with the corresponding complexity stated in the public API
above. The harness validates this declaration before it runs behavior cases.

## The invariant

`directed` is fixed at construction and never changes. After `addEdge(u, v)`:

- `v` is always in `neighbors(u)` — an edge is at minimum one-way.
- If the graph is **undirected**, `u` is also in `neighbors(v)` — every edge
  mirrors itself automatically.
- If the graph is **directed**, `u` lands in `neighbors(v)` only if the
  caller separately calls `addEdge(v, u)`.

Adding the same edge twice changes nothing further — no duplicate entries.
A vertex that has never appeared in an `addEdge` call has no neighbors; it
does not throw, it returns `[]`.

`neighbors(v)` always hands back a **new array**, sorted ascending by value.
Two graphs built by adding the same edges in a different order must produce
identical `neighbors()` output for every vertex — nothing about insertion
order is observable.

## Observable behavior

| Sequence | Result |
| :---- | :---- |
| `directed=false; addEdge(1,2); neighbors(1); neighbors(2)` | `[2]`, `[1]` |
| `directed=true; addEdge(1,2); neighbors(1); neighbors(2)` | `[2]`, `[]` |
| `directed=false; addEdge(5,3); addEdge(5,1); addEdge(5,9); neighbors(5)` | `[1, 3, 9]` |
| `directed=false; addEdge(1,2); addEdge(1,2); neighbors(1)` | `[2]` (no duplicate) |
| `neighbors(99)` on a graph that never mentioned 99 | `[]` |

## Operations in this set

1. `01-add-edge` — insert an edge, respecting directed vs. undirected
2. `02-neighbors` — hand back the neighbor list under the contract above;
   its final rung is the complete `Graph` capstone

## After this set clears

The anchored check-in is **LeetCode 997, "Find the Town Judge"** (Easy) —
build a directed `Graph` from the given trust list, then answer from what
the edges say about each person. That's a new problem, not a repeat of this
drill; the structure it consumes is what you just built.

Do not read ahead. `npm run drill` says where you are.
