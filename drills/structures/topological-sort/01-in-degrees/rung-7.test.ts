import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity, TODO } from "#harness/verify.ts";
import {
  inDegreesCases,
  observeInDegrees,
  type Adjacency,
  type InDegreesOperation,
} from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/topological-sort/01-in-degrees", 7);

checkComplexity(submitted.complexity, { inDegrees: "O(V + E)" });
checkCases(
  observeInDegrees((graph: Adjacency) => {
    if (typeof submitted.inDegrees !== "function") {
      return TODO("export inDegrees as specified in API.md");
    }
    return (submitted.inDegrees as InDegreesOperation)(graph);
  }),
  inDegreesCases,
);
