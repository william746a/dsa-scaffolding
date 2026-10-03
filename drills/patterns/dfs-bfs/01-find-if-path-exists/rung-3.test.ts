import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { validPath } from "./rung-3.ts";

requireRung("patterns/dfs-bfs/01-find-if-path-exists", 3);
checkCases(validPath, cases);
