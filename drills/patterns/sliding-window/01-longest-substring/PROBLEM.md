# Longest Substring Without Repeating Characters

*LeetCode 3 — Medium*

Given a string `s`, return the length of the longest **substring** that
contains no repeated characters.

A substring is a contiguous, non-empty sequence of characters within the
string. `"ace"` is a *subsequence* of `"abcde"` but not a substring.

## Examples

| Input | Output | Why |
| :---- | :---- | :---- |
| `s = "abcabcbb"` | `3` | `"abc"` — length 3 |
| `s = "bbbbb"` | `1` | `"b"` — length 1 |
| `s = "pwwkew"` | `3` | `"wke"` — length 3. `"pwke"` is a subsequence, not a substring |

## Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

## Target

O(n) time, O(min(n, alphabet)) space.

---

Do not read the rung files ahead of the one you are on. `npm run drill`
tells you which one that is.
