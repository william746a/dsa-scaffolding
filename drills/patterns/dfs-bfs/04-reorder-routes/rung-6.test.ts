import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { minReorder } from "./rung-6.ts";

requireRung("patterns/dfs-bfs/04-reorder-routes", 6);
checkCases(minReorder, cases);
