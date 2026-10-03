import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { minReorder } from "./rung-2.ts";

requireRung("patterns/dfs-bfs/04-reorder-routes", 2);
checkCases(minReorder, cases);
