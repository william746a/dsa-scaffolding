import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity, TODO } from "#harness/verify.ts";
import {
  judged,
  topologicalSortCases,
  type Adjacency,
  type TopologicalSortOperation,
} from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;
requireRung("structures/topological-sort-dfs/01-topological-sort", 7);
checkComplexity(submitted.complexity, { topologicalSort: "O(V + E)" });
checkCases(
  judged((graph: Adjacency) => {
    if (typeof submitted.topologicalSort !== "function") {
      return TODO("export topologicalSort as specified in API.md");
    }
    return (submitted.topologicalSort as TopologicalSortOperation)(graph);
  }),
  topologicalSortCases,
);
