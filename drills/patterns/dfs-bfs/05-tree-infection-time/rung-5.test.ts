import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, run } from "./cases.ts";
import { amountOfTime } from "./rung-5.ts";

requireRung("patterns/dfs-bfs/05-tree-infection-time", 5);
checkCases(run(amountOfTime), cases);
