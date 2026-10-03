import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import type { TreeNode } from "../tree-node.ts";
import { cases, run } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { amountOfTime } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/05-tree-infection-time", 7);
checkCases(
  run(amountOfTime as (root: TreeNode | null, start: number) => number),
  cases,
);
