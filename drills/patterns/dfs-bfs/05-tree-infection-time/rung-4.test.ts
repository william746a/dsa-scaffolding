import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, run } from "./cases.ts";
import { amountOfTime } from "./rung-4.ts";

requireRung("patterns/dfs-bfs/05-tree-infection-time", 4);
checkCases(run(amountOfTime), cases);
