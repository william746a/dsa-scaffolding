# Reorder Routes to Make All Paths Lead to the City Zero

*LeetCode 1466 — Medium*

There are `n` cities numbered from `0` to `n - 1` and `n - 1` roads, such
that there is exactly one way to travel between any two cities (the roads
form a tree). Last year, the ministry of transport decided to orient the
roads in one direction because they are too narrow.

Roads are represented by `connections`, where `connections[i] = [a_i, b_i]`
is a road from city `a_i` to city `b_i`.

This year there will be a big event in the capital (city `0`), and many
people want to travel to it. Your task is to reorient some roads so that
every city can visit city `0`. Return the **minimum** number of roads
changed.

It is guaranteed that every city can reach city `0` after reordering.

## Examples

**Example 1**

```
n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]   →   3

Reverse 0→1, 1→3, and 4→5. Then 1→0, 3→1, 2→3→1→0, 4→0, 5→4→0.
```

**Example 2**

```
n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]   →   2

Reverse 1→2 and 3→4.
```

**Example 3**

```
n = 3, connections = [[1,0],[2,0]]   →   0
```

## Constraints

- `2 <= n <= 5 * 10^4`
- `connections.length == n - 1`
- `connections[i].length == 2`
- `0 <= a_i, b_i <= n - 1`, `a_i != b_i`

## Target

O(n) time and extra space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
