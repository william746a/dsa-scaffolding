import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Blank Page. Cold and timed.
 *
 * From ../API.md, write and export only the operation practiced in this
 * drill. Its callable form receives the array and the index to repair:
 *
 *   siftDown(a: number[], i: number): void
 *
 * State its complexity before coding:
 *
 *   export const complexity = { siftDown: "" };
 */

export function siftDown(a: number[], i: number): void {
  TODO("restore the heap invariant along a path from i down to a leaf");
}

export const complexity: Record<string, string> = {
  siftDown: "",
};
