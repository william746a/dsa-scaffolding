import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { minReorder } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/04-reorder-routes", 7);
checkCases(minReorder as (n: number, connections: number[][]) => number, cases);
