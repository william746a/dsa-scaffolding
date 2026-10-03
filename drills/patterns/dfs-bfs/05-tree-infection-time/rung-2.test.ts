import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, run } from "./cases.ts";
import { amountOfTime } from "./rung-2.ts";

requireRung("patterns/dfs-bfs/05-tree-infection-time", 2);
checkCases(run(amountOfTime), cases);
