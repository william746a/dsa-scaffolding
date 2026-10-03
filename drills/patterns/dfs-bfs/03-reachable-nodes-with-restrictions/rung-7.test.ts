import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { reachableNodes } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/03-reachable-nodes-with-restrictions", 7);
checkCases(
  reachableNodes as (n: number, edges: number[][], restricted: number[]) => number,
  cases,
);
