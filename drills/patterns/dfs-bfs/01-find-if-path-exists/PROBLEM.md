# Find if Path Exists in Graph

*LeetCode 1971 — Easy*

There is a **bi-directional** graph with `n` vertices, labeled `0` to
`n - 1` inclusive. The edges are given as a 2D integer array `edges`, where
`edges[i] = [u_i, v_i]` denotes a bi-directional edge between vertex `u_i`
and vertex `v_i`. Every vertex pair is connected by at most one edge, and no
vertex has an edge to itself.

Determine whether there is a valid path from vertex `source` to vertex
`destination`. Return `true` if there is, `false` otherwise.

## Examples

| Input | Output | Why |
| :---- | :---- | :---- |
| `n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2` | `true` | `0 → 1 → 2`, or directly `0 → 2` |
| `n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5` | `false` | `{0,1,2}` and `{3,4,5}` share no edge |

## Constraints

- `1 <= n <= 2 * 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `edges[i].length == 2`
- `0 <= u_i, v_i <= n - 1`, `u_i != v_i`
- `0 <= source, destination <= n - 1`
- No duplicate edges, no self-edges.

## Target

O(n + edges.length) time and extra space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
