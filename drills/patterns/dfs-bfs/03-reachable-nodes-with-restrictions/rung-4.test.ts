import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { reachableNodes } from "./rung-4.ts";

requireRung("patterns/dfs-bfs/03-reachable-nodes-with-restrictions", 4);
checkCases(reachableNodes, cases);
