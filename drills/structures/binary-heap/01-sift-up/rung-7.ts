import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Blank Page. Cold and timed.
 *
 * From ../API.md, write and export only the operation practiced in this
 * drill. Its callable form receives the array and the index to repair:
 *
 *   siftUp(a: number[], i: number): void
 *
 * State its complexity before coding:
 *
 *   export const complexity = { siftUp: "" };
 */

export function siftUp(a: number[], i: number): void {
  TODO("restore the heap invariant along the path from i to the root");
}

export const complexity: Record<string, string> = {
  siftUp: "",
};
