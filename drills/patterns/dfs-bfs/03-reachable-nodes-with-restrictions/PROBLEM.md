# Reachable Nodes With Restrictions

*LeetCode 2368 — Medium*

There is an undirected tree with `n` nodes labeled from `0` to `n - 1` and
`n - 1` edges.

You are given a 2D integer array `edges` of length `n - 1` where
`edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i`
and `b_i` in the tree. You are also given an integer array `restricted`
which represents **restricted** nodes.

Return the **maximum** number of nodes you can reach from node `0` without
visiting a restricted node. Node `0` is not a restricted node, and it counts
as reached.

## Examples

**Example 1**

```
n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]   →   4

        4*      Nodes 0, 1, 2, 3 are reachable.
        |       4 and 5 are restricted (*), which also cuts off 6.
  2 — 1 — 0 — 5* — 6
      |
      3
```

**Example 2**

```
n = 7, edges = [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], restricted = [4,2,1]   →   3

Nodes 0, 5, 6 are reachable.
```

## Constraints

- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`, `a_i != b_i`
- `edges` represents a valid tree.
- `1 <= restricted.length < n`
- `1 <= restricted[i] < n`
- All the values of `restricted` are unique.

## Target

O(n) time and extra space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
