# Number of Islands

*LeetCode 200 — Medium*

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s
(land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent
lands horizontally or vertically. You may assume all four edges of the grid
are all surrounded by water.

## Examples

**Example 1**

```
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]   →   1
```

**Example 2**

```
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]   →   3
```

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.

## Target

O(m · n) time and extra space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
