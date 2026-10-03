import type { Case } from "#harness/verify.ts";

/**
 * Deterministic pseudo-random building — same every run. Room i's key is
 * hidden in a random earlier room, so every room can be opened; then extra
 * keys are scattered at random. `missing` names a room whose key is left out
 * everywhere (the random draws are the same either way).
 */
function scrambledRooms(n: number, extraKeys: number, missing: number | null): number[][] {
  let x = 841;
  // High bits: the low bits of this generator repeat with a short period.
  const next = (mod: number) =>
    Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % mod;
  const rooms = Array.from({ length: n }, () => new Set<number>());
  for (let i = 1; i < n; i++) {
    const holder = next(i);
    if (i !== missing) rooms[holder]!.add(i);
  }
  for (let j = 0; j < extraKeys; j++) {
    const holder = next(n);
    const key = next(n);
    if (key !== missing) rooms[holder]!.add(key);
  }
  return rooms.map((keys) => [...keys]);
}

const chain = Array.from({ length: 1000 }, (_, i) => (i < 999 ? [i + 1] : []));

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<[number[][]], boolean>[] = [
  { name: "[[1],[2],[3],[]]", args: [[[1], [2], [3], []]], want: true },
  { name: "[[1,3],[3,0,1],[2],[0]]", args: [[[1, 3], [3, 0, 1], [2], [0]]], want: false },
  {
    name: "room 0 is empty",
    args: [[[], [0]]],
    want: false,
    edge: true,
  },
  {
    name: "keys cycle back to opened rooms; one room stays locked",
    args: [[[1], [0], [0, 1]]],
    want: false,
    edge: true,
  },
  {
    name: "a key found twice still opens only one room",
    args: [[[1], [1], []]],
    want: false,
    edge: true,
  },
  {
    name: "the last key is found deep in, after a detour",
    args: [[[1, 2], [], [3], [4], [1]]],
    want: true,
    edge: true,
  },
  {
    name: "1000 rooms, each key in the room before",
    args: [chain],
    want: true,
    edge: true,
  },
  {
    name: "300 scrambled rooms, every key hidden in an earlier room",
    args: [scrambledRooms(300, 300, null)],
    want: true,
    edge: true,
  },
  {
    name: "300 scrambled rooms, room 173's key exists nowhere",
    args: [scrambledRooms(300, 300, 173)],
    want: false,
    edge: true,
  },
];
