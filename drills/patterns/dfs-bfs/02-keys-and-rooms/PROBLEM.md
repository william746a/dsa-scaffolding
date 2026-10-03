# Keys and Rooms

*LeetCode 841 — Medium*

There are `n` rooms labeled from `0` to `n - 1`. All rooms are locked except
room `0`. Your goal is to visit all the rooms. You cannot enter a locked room
without having its key.

When you visit a room, you may find a set of **distinct keys** in it. Each key
has a number on it, denoting which room it unlocks, and you can take all of
them with you to unlock the other rooms.

Given an array `rooms` where `rooms[i]` is the set of keys you can obtain if
you visit room `i`, return `true` if you can visit **all** the rooms, or
`false` otherwise.

## Examples

| Input | Output | Why |
| :---- | :---- | :---- |
| `rooms = [[1],[2],[3],[]]` | `true` | Room 0 holds key 1, room 1 holds key 2, room 2 holds key 3 |
| `rooms = [[1,3],[3,0,1],[2],[0]]` | `false` | The only key to room 2 is inside room 2 |

## Constraints

- `n == rooms.length`
- `2 <= n <= 1000`
- `0 <= rooms[i].length <= 1000`
- `1 <= sum(rooms[i].length) <= 3000`
- `0 <= rooms[i][j] < n`
- All the values of `rooms[i]` are unique.

## Target

O(n + total keys) time, O(n) extra space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
