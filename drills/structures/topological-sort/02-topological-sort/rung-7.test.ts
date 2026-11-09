import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity, TODO } from "#harness/verify.ts";
import {
  inDegreesCases,
  judged,
  observeInDegrees,
  topologicalSortCases,
  type Adjacency,
  type InDegreesOperation,
  type TopologicalSortOperation,
} from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/topological-sort/02-topological-sort", 7);

checkComplexity(submitted.complexity, {
  inDegrees: "O(V + E)",
  topologicalSort: "O(V + E)",
});
checkCases(
  observeInDegrees((graph: Adjacency) => {
    if (typeof submitted.inDegrees !== "function") {
      return TODO("export inDegrees as specified in API.md");
    }
    return (submitted.inDegrees as InDegreesOperation)(graph);
  }),
  inDegreesCases,
);
checkCases(
  judged((graph: Adjacency) => {
    if (typeof submitted.topologicalSort !== "function") {
      return TODO("export topologicalSort as specified in API.md");
    }
    return (submitted.topologicalSort as TopologicalSortOperation)(graph);
  }),
  topologicalSortCases,
);
