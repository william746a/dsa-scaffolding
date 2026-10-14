import { TODO } from "#harness/verify.ts";

/** A grid position. */
type Cell = [row: number, col: number];
/** A move from one cell to another: how far the row and the column change. */
type Step = [dr: number, dc: number];

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
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
          if (grid[nr]![nc] === "1" && !seen[nr]![nc]) {
            seen[nr]![nc] = true;
            stack.push([nr, nc]);
          }
        }
      }
    }
  }

  return islands;
}
