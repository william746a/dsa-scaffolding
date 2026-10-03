import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { dfsIterativeCases, type DfsOperation } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/graph-traversal/02-dfs-iterative", 7);

checkComplexity(submitted.complexity, { dfsIterative: "O(V + E)" });
checkCases(
  (graph: number[][], start: number) => (submitted.dfsIterative as DfsOperation)(graph, start),
  dfsIterativeCases,
);
