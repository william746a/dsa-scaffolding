# Backtracking — Graph Paths API

Build on the adjacency lists and recursive graph exploration practiced in
`graph-adjacency-list` and `graph-traversal`. This focused algorithm set has
two operations, each with seven rungs. Use TypeScript and built-in containers only.

## Representation and constraints

`type Adjacency = number[][]` — the same shape as the traversal set.
Vertices are `0 .. graph.length - 1`; `graph[v]` lists outgoing neighbors
in exploration order. Neighbor lists contain no duplicates. Graphs may be
directed or undirected, cyclic, disconnected, or contain self-loops.
For `allSimplePaths`, `1 <= graph.length <= 10`. The iterative operation
also accepts sparse deep graphs up to 20,000 vertices; exponential-output
graphs remain small. `start` and `target` are valid vertex indices.
Do not modify the graph.

## Operations

```ts
function allSimplePaths(graph: Adjacency, start: number, target: number): number[][];
function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][];
```

Return every distinct path from `start` to `target` that repeats no vertex.
Each result includes both endpoints. Finish exploring the paths through one
neighbor before considering the next neighbor in its listed order. Stop a
path when it reaches `target`. If `start === target`, return `[[start]]`.
If no path exists, return `[]`. Returned paths must be independent arrays.

`allSimplePathsIterative` has exactly the same output contract, including
path order, and must use no recursion (direct or through a helper). Its cases
include a 20,000-vertex chain, beyond JavaScript's call stack.

## Invariant

The active path contains no repeated vertex. Membership describes exactly
that active path. Completed results stay unchanged as other paths are explored.

For the iterative operation, pending visits describe the active path and
preserve each vertex's remaining exploration position.

State the relevant invariant(s) yourself before coding each final rung.

## Required complexity

Let `V` be the number of vertices, `S` the total number of neighbor entries
examined across all explored path prefixes, and `L` the sum of the lengths
of all returned paths.

- Time: **O(V + S + L)**.
- Auxiliary space, excluding returned paths: **O(V)**.
- Returned output space: **O(L)**.

`S` counts repeated examinations reached through different prefixes, not
just distinct edges. Both search work and output can grow exponentially or
factorially with graph size; ordinary traversal's O(V + E) bound does not apply.
A conservative worst-case time bound is O(V * V!). The output-sensitive
bound above is the declaration checked by the harness.

## Observable behavior

Example A — two branches meet at the destination:

```text
graph = [[1,2], [3], [3], []]
allSimplePaths(graph, 0, 3) → [[0,1,3], [0,2,3]]
```

Example B — a cycle and a shared intermediate vertex:

```text
graph = [[1,2], [2,3], [1,3], []]
allSimplePaths(graph, 0, 3)
  → [[0,1,2,3], [0,1,3], [0,2,1,3], [0,2,3]]
```

Example C — list order and unreachable destination:

```text
graph = [[2,1], [3], [3], [], []]
allSimplePaths(graph, 0, 3) → [[0,2,3], [0,1,3]]
allSimplePaths(graph, 0, 4) → []
```

## Harness-facing complexity declaration

This object is assessment metadata, not a callable function or part of the
runtime API. The first operation's Rung 7 supplies its export name and exact key with a blank value:

```ts
export const complexity: Record<string, string> = {
  allSimplePaths: "",
};
```

The final iterative operation's whole-API capstone supplies both keys:

```ts
export const complexity: Record<string, string> = {
  allSimplePaths: "",
  allSimplePathsIterative: "",
};
```

Fill each value **before coding**, using this declaration (whitespace and
case do not matter):

```text
O(V + S + L) time; O(V) auxiliary space; O(L) output space
```

Both operations have the complexities above. The first operation's Rung 7
checks only `allSimplePaths`. The second operation's Rung 7 is the whole-API
capstone and checks both functions, locked until the first has cleared its
final rung. Each earlier rung isolates its target operation; no sibling
implementation is required. The recursive local function `visit` already
appears in the first operation's scaffolds. No new API functions are introduced
by the capstone. Complexity declarations are checked before behavior cases.

## Operations in this set

1. `01-all-simple-paths` — graph path enumeration.
2. `02-all-simple-paths-iterative` — the same paths without recursion;
   its final rung implements both operations.

## After this set clears

Take a cold, timed, unaided attempt at
[LeetCode 797 — All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/).
It consumes this operation on a directed acyclic graph, from vertex 0 to
the last vertex, and accepts paths in any order. This is the external
check-in, not another scaffold. If you have already solved it, tell the coach
so the check-in can use an unseen problem. Mastery requires the final rung,
your invariant and complexity statement, and the external check-in.

Start with `npm run drill structures/backtracking/01-all-simple-paths`.
Do not read ahead; `npm run reveal` identifies the current file.
