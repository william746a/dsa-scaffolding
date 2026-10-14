import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { numIslands } from "./rung-4.ts";

requireRung("patterns/dfs-bfs/06-number-of-islands", 4);
checkCases(numIslands, cases);
