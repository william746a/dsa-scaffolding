# Graph Traversal — API Spec

Two ways to explore everything reachable from one vertex of a graph —
depth-first, written twice (recursively, then without recursion), and
breadth-first. Implement all three from scratch — no library graph or
traversal utilities beyond the built-in `Array`, `Map`, and `Set`.

## The representation

The graph arrives in LeetCode's usual adjacency-list shape — the same
adjacency idea as `graph-adjacency-list`, frozen into a plain array:

```ts
type Adjacency = number[][];
```

- Vertices are `0 .. graph.length - 1`.
- `graph[v]` lists the vertices `v` reaches directly, with no duplicates.
- An undirected edge `u — v` appears in both `graph[u]` and `graph[v]`.
- **Neighbors are explored in the order `graph[v]` lists them** — not sorted
  order. Traversals never modify `graph`.

## Operations

```ts
function dfs(graph: number[][], start: number): number[];           // O(V + E)
function dfsIterative(graph: number[][], start: number): number[];  // O(V + E)
function bfs(graph: number[][], start: number): number[];           // O(V + E)
```

`V` is the number of vertices and `E` the number of edge entries in `graph`.

### `dfs` — depth-first visit order

Returns every vertex reachable from `start`, each exactly once, in the order
they are first visited. Starting at `start`: each time a vertex is visited,
its neighbors are taken in list order, and each neighbor not yet visited is
explored **completely** — everything newly reachable through it — before
the next neighbor in the list is considered. Vertices not reachable from
`start` do not appear.

This is exactly the order a recursive depth-first search produces. Any
technique that produces the same order is accepted.

### `dfsIterative` — the same visit order, without recursion

The contract is `dfs`'s, word for word, with one addition: **the function
must not call itself.** Its cases include a path of 100,000 vertices —
deeper than JavaScript's call stack allows, and within what LeetCode graph
problems routinely allow. A recursive solution fails that case with
`Maximum call stack size exceeded`.

The visit order must still match `dfs` exactly, including Example C below.

### `bfs` — fewest-edges distances

Returns an array `dist` of length `graph.length`, where `dist[v]` is the
fewest edges on any path from `start` to `v`, and `-1` when `v` cannot be
reached. `dist[start]` is `0`.

## Harness-facing complexity declaration

This is assessment metadata, not part of the traversal API. The Rung 7
scaffold supplies the `complexity` export and its exact keys; fill its blank
value(s) before writing the implementation. Each non-final drill declares
exactly its own operation:

```ts
// 01-dfs
export const complexity: Record<string, string> = { dfs: "" };

// 02-dfs-iterative
export const complexity: Record<string, string> = { dfsIterative: "" };
```

The final `03-bfs` whole-API capstone declares all three operations:

```ts
export const complexity: Record<string, string> = {
  dfs: "",
  dfsIterative: "",
  bfs: "",
};
```

Fill each blank with the corresponding complexity stated under
**Operations** above. The harness validates this declaration before it runs
behavior cases.

## The invariant

Every traversal holds one promise: **no vertex is processed twice.** On a
graph with cycles — and every undirected edge is a cycle of length two —
breaking that promise means never finishing.

`bfs` holds a second: **a vertex's distance is settled the first time it is
reached, and is never revised.**

## Observable behavior

```
Example A — undirected: 0—1, 0—2, 1—3, 2—4
graph = [[1,2], [0,3], [0,4], [1], [2]]

dfs(graph, 0)  →  [0, 1, 3, 2, 4]
bfs(graph, 0)  →  [0, 1, 1, 2, 2]

Example B — directed: 0→1, 1→2, 2→0, 3→0
graph = [[1], [2], [0], [0]]

dfs(graph, 0)  →  [0, 1, 2]        3 is unreachable from 0
bfs(graph, 0)  →  [0, 1, 2, -1]

Example C — list order decides
graph = [[2,1], [], []]

dfs(graph, 0)  →  [0, 2, 1]
```

## Operations in this set

1. `01-dfs` — depth-first visit order
2. `02-dfs-iterative` — the same order, with no recursion
3. `03-bfs` — fewest-edges distances; its final rung is the whole-API
   capstone (all three functions in one file)

## After this set clears

The anchored check-in is **LeetCode 1376, "Time Needed to Inform All
Employees"** (Medium) — build the adjacency from the given array, then
traverse it from one starting vertex. That's a new problem, not a repeat of
this drill; the traversal it consumes is what you just built.

After the check-in, the `patterns/dfs-bfs` set drills recognizing when a
problem is secretly a traversal.

Do not read ahead. `npm run drill` says where you are.
