import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { numIslands } from "./rung-2.ts";

requireRung("patterns/dfs-bfs/06-number-of-islands", 2);
checkCases(numIslands, cases);
