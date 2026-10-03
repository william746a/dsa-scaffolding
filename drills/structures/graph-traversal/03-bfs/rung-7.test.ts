import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import {
  bfsCases,
  dfsCases,
  dfsIterativeCases,
  type BfsOperation,
  type DfsOperation,
} from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/graph-traversal/03-bfs", 7);

checkComplexity(submitted.complexity, {
  dfs: "O(V + E)",
  dfsIterative: "O(V + E)",
  bfs: "O(V + E)",
});
checkCases(
  (graph: number[][], start: number) => (submitted.dfs as DfsOperation)(graph, start),
  dfsCases,
);
checkCases(
  (graph: number[][], start: number) => (submitted.dfsIterative as DfsOperation)(graph, start),
  dfsIterativeCases,
);
checkCases(
  (graph: number[][], start: number) => (submitted.bfs as BfsOperation)(graph, start),
  bfsCases,
);
