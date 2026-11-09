# Topological Sort — API Spec

Put the vertices of a directed graph in a line so that every edge points
forward — or find out that no such line exists. Implement both operations from
scratch — no library graph utilities beyond the built-in `Array`, `Map`, and
`Set`.

## The representation

The graph arrives in the same adjacency-list shape as `graph-traversal`:

```ts
type Adjacency = number[][];
```

- Vertices are `0 .. graph.length - 1`, and `1 <= graph.length <= 100_000`.
- `graph[v]` lists the vertices that `v` has a **directed** edge *to*, with no
  duplicates. An edge `u → v` reads "`u` must come before `v`".
- The graph may be disconnected, may have several vertices that nothing points
  to, and may contain cycles — including self-loops.
- Operations never modify `graph`.

## Operations

```ts
function inDegrees(graph: Adjacency): number[];          // O(V + E)
function topologicalSort(graph: Adjacency): number[];    // O(V + E)
```

`V` is the number of vertices and `E` the number of edge entries in `graph`.
`topologicalSort` uses `O(V)` auxiliary space beyond its result.

### `inDegrees` — how many edges end at each vertex

Returns an array `counts` of length `graph.length`, where `counts[v]` is the
number of edges that end at `v`: the number of entries equal to `v` across
**all** the lists in `graph`. A self-loop `v → v` counts toward `counts[v]`.

### `topologicalSort` — an order that respects every edge

Returns an array containing every vertex `0 .. graph.length - 1` **exactly
once**, arranged so that for every edge `u → v`, `u` appears before `v`.

- Several orders usually qualify, and **any of them is accepted**: the harness
  checks the property above against your graph, not a particular sequence.
- If the graph contains a cycle (a self-loop counts), no such order exists:
  return `[]` — even when some of the vertices could have been placed.

**It must be iterative:** the function must not call itself, directly or
through a helper. Its cases include a path of 100,000 vertices — deeper than
JavaScript's call stack allows, and within what LeetCode graph problems
routinely allow. A recursive solution fails that case with
`Maximum call stack size exceeded`.

## Harness-facing complexity declaration

This is assessment metadata, not part of the sorting API. The Rung 7 scaffold
supplies the `complexity` export and its exact keys; fill its blank value(s)
before writing the implementation. The non-final drill declares exactly its
own operation:

```ts
// 01-in-degrees
export const complexity: Record<string, string> = { inDegrees: "" };
```

The final `02-topological-sort` whole-API capstone declares both operations:

```ts
export const complexity: Record<string, string> = {
  inDegrees: "",
  topologicalSort: "",
};
```

Fill each blank with the corresponding time complexity stated under
**Operations** above. The harness validates this declaration before it runs
behavior cases.

## The invariant

An order is valid when **no vertex appears before a vertex that has an edge
into it**, and every vertex appears exactly once. A cycle makes that
impossible: each vertex on it would have to come after another vertex on it.
Anything `topologicalSort` returns that isn't `[]` must satisfy this for every
edge, not just for the edges near the front.

## Observable behavior

```
Example A — a diamond: 0→1, 0→2, 1→3, 2→3
graph = [[1,2], [3], [3], []]

inDegrees(graph)        →  [0, 1, 1, 2]
topologicalSort(graph)  →  [0, 1, 2, 3]   or   [0, 2, 1, 3]

Example B — several vertices nothing points to: 1→0, 2→0, 2→1   (3 stands alone)
graph = [[], [0], [0,1], []]

inDegrees(graph)        →  [2, 1, 0, 0]
topologicalSort(graph)  →  [2, 1, 0, 3]   or   [3, 2, 1, 0]   or any other
                           order with 2 before 1 before 0

Example C — a cycle behind a clean start: 0→1, 1→2, 2→1   (3 stands alone)
graph = [[1], [2], [1], []]

inDegrees(graph)        →  [0, 2, 1, 0]
topologicalSort(graph)  →  []             0 and 3 could be placed; 1 and 2 never can
```

## Operations in this set

1. `01-in-degrees` — the count `topologicalSort` is built on
2. `02-topological-sort` — the order itself; its final rung is the whole-API
   capstone (both functions in one file)

## After this set clears

The anchored check-in is **LeetCode 2115, "Find All Possible Recipes from Given
Supplies"** (Medium) — build the dependency graph from the string arrays,
then work out which recipes can actually be made. That's a new problem, not a
repeat of this drill; the algorithm it consumes is what you just built.
(LeetCode 207 and 210 are deliberately left alone: they are the Track A
topological-sort pattern drill.)

Mastery requires the final rung with your invariant and complexity statements
made before coding, and the external check-in.

Start with `npm run drill structures/topological-sort/01-in-degrees`. Do not
read ahead; `npm run reveal` says where you are.
