import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { numIslands } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/06-number-of-islands", 7);
checkCases(numIslands as (grid: string[][]) => number, cases);
