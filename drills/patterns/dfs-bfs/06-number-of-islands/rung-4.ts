import { TODO } from "#harness/verify.ts";

/** A grid position. */
type Cell = [row: number, col: number];
/** A move from one cell to another: how far the row and the column change. */
type Step = [dr: number, dc: number];

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns how many islands the grid holds
 *
 * Target: O(m · n) time and extra space.
 */
export function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0]!.length;
  const seen: boolean[][] = TODO("for every cell, whether it has been reached — none yet");
  const steps: Step[] = TODO("the moves that lead from a cell to each cell adjacent to it");
  let islands: number = TODO("islands counted so far");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (TODO("(r, c) is not part of an island still to be counted")) continue;

      islands = TODO("the count, now that one more island has been found");
      seen[r]![c] = TODO("whether (r, c) has been reached");
      const stack: Cell[] = TODO("this island's reached cells not yet examined");

      while (stack.length > 0) {
        const [cr, cc]: Cell = TODO("a reached cell to examine, no longer waiting");
        for (const [dr, dc] of steps) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (TODO("the grid has no cell at row nr, column nc")) continue;
          if (TODO("(nr, nc) belongs to this island and has not been reached")) {
            TODO("(nr, nc) is reached, and waits to be examined");
          }
        }
      }
    }
  }

  return islands;
}
