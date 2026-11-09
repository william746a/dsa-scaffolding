# Topological sort — DFS practice

A standalone alternative to the in-degree-based set. Its single operation is
`topologicalSort`; no in-degree helper is required.

## Representation and contract

```ts
type Adjacency = number[][];
function topologicalSort(graph: Adjacency): number[];
```

`graph[v]` lists the vertices reached by directed edges from `v`. Vertices
are numbered `0 .. graph.length - 1`; every neighbor is a valid vertex.
Return every vertex exactly once, with `u` before `v` for every edge `u → v`.
Any valid order is accepted. Return `[]` if any component contains a cycle,
including a self-loop. An empty graph also returns `[]`.

The graph may be disconnected and may contain duplicate edge entries. Leave
it unchanged. Target **O(V + E) time and O(V) auxiliary space**, where E counts
edge entries. Use iterative DFS: the tests include a 100,000-vertex path.

## Observable examples

```text
[[1, 2], [3], [3], []] → [0, 1, 2, 3] or [0, 2, 1, 3]
[[], [0], [0, 1], []]  → [2, 1, 0, 3] or any order with 2 before 1 before 0
[[1], [2], [1], []]    → [] (a cycle in one component invalidates the whole order)
```

## Invariant

Every returned nonempty order contains every vertex exactly once and respects
every directed edge. In the early scaffolds, an active vertex has unfinished
work; a finished vertex has had every outgoing edge examined and every
reachable descendant finished. An edge to an active ancestor makes completion
impossible. A finished shared descendant does not itself imply a cycle.

## Practice ladder

1. Isolated move: one value in the completion step.
2. Supporting logic: keep track of examined outgoing edges.
3. Signature move: complete a vertex after its descendants.
4. Guided reconstruction: ordered behavioral checkpoints.
5. Independent full body: contract and unordered checklist.
6. Interface skeleton: only the typed operation.
7. Blank page: implement the entire one-function API, cold and timed.

## Harness-facing complexity declaration

Before implementing Rung 7, fill the blank value in the supplied declaration:

```ts
export const complexity: Record<string, string> = {
  topologicalSort: "",
};
```

The required time bound is `O(V + E)`. This declaration is assessment metadata,
not part of the runtime API. There are no sibling operations in this set.

Start by editing `01-topological-sort/rung-1.ts`, then run from the project root:

```sh
npm run drill structures/topological-sort-dfs/01-topological-sort
```

After the final rung, the consumer check-in is LeetCode 802, **Find Eventual
Safe States**: adapt graph cycle reasoning to classify vertices. Clearing this
implementation alone does not establish mastery of that application.
