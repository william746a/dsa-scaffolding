import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { reachableNodes } from "./rung-2.ts";

requireRung("patterns/dfs-bfs/03-reachable-nodes-with-restrictions", 2);
checkCases(reachableNodes, cases);
