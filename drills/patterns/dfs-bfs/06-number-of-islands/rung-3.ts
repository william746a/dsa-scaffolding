import { TODO } from "#harness/verify.ts";

/** A grid position. */
type Cell = [row: number, col: number];
/** A move from one cell to another: how far the row and the column change. */
type Step = [dr: number, dc: number];

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: over the whole scan, every land cell enters a
 * `stack` exactly once and no water cell ever does; and by the time a stack
 * runs dry, every land cell joined to the cell it started from — by any
 * chain of horizontal or vertical steps over land — has passed through it.
 */
export function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0]!.length;
  const seen = Array.from({ length: rows }, () => new Array<boolean>(cols).fill(false));
  const steps: Step[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]![c] !== "1" || seen[r]![c]) continue;

      islands++;
      seen[r]![c] = true;
      const stack: Cell[] = [[r, c]];

      while (stack.length > 0) {
        const [cr, cc] = stack.pop()!;
        for (const [dr, dc] of steps) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

          // TODO: (nr, nc) is a cell of the grid, one step from (cr, cc).
          // Keep the invariant above.
          if (grid[nr]![nc] == "1" && !seen[nr]![nc]) {
            seen[nr]![nc] = true;
            stack.push([nr, nc]);
          }
        }
      }
    }
  }

  return islands;
}
