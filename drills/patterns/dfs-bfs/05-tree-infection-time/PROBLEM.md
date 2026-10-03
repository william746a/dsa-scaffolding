# Amount of Time for Binary Tree to Be Infected

*LeetCode 2385 — Medium*

You are given the `root` of a binary tree with **unique** values, and an
integer `start`. At minute `0`, an **infection** starts from the node with
value `start`.

Each minute, a node becomes infected if:

- The node is currently uninfected.
- The node is adjacent to an infected node.

Return the number of minutes needed for the entire tree to be infected.

## Examples

**Example 1**

```
root = [1,5,3,null,4,10,6,9,2], start = 3   →   4

          1
        /   \
       5     3        minute 0: 3
        \   / \       minute 1: 1, 10, 6
         4 10  6      minute 2: 5
        / \           minute 3: 4
       9   2          minute 4: 9, 2
```

**Example 2**

```
root = [1], start = 1   →   0
```

## Constraints

- The number of nodes in the tree is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`
- Each node has a **unique** value.
- A node with a value of `start` exists in the tree.

## Target

O(n) time and extra space.

## Environment

As on LeetCode's TypeScript runtime, the tree node class is predefined:
`import { TreeNode } from "../tree-node.ts";` — the problem's level-order
notation (`[1,5,3,null,4]`) is explained in the header of that file.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
