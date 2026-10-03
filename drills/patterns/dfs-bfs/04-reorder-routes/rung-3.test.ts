import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { minReorder } from "./rung-3.ts";

requireRung("patterns/dfs-bfs/04-reorder-routes", 3);
checkCases(minReorder, cases);
