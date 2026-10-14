import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: every cell of grid is "1" (land) or "0" (water). Return the
 * number of islands, where an island is a group of land cells joined by
 * horizontal or vertical steps that cannot be extended any further. Cells
 * that touch only at a corner are not joined.
 * Invariant: no land cell is reached twice, and every cell of an island has
 * been reached before the next island is counted.
 * Required behavior, unordered: never step off the grid; count an island
 * once however many of its cells the scan comes across; give every cell the
 * chance to start an island; step in exactly four directions; remember what
 * has been reached.
 *
 * Target: O(m · n) time and extra space.
 */
export function numIslands(grid: string[][]): number {
  return TODO("the whole function body");
}
