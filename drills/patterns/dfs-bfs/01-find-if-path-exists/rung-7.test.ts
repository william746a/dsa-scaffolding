import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { validPath } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/01-find-if-path-exists", 7);
checkCases(
  validPath as (n: number, edges: number[][], source: number, destination: number) => boolean,
  cases,
);
