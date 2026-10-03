import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { reachableNodes } from "./rung-1.ts";

requireRung("patterns/dfs-bfs/03-reachable-nodes-with-restrictions", 1);
checkCases(reachableNodes, cases);
