import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { dfsCases, type DfsOperation } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/graph-traversal/01-dfs", 7);

checkComplexity(submitted.complexity, { dfs: "O(V + E)" });
checkCases(
  (graph: number[][], start: number) => (submitted.dfs as DfsOperation)(graph, start),
  dfsCases,
);
