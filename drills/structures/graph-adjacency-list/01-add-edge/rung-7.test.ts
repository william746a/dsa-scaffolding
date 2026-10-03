import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import {
  cases,
  driveAddEdge,
  type AddEdgeOperation,
  type Op,
  type Out,
} from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/graph-adjacency-list/01-add-edge", 7);

checkComplexity(submitted.complexity, {
  addEdge: "O(1) amortized",
});
checkCases<[boolean, readonly Op[]], Out[]>(
  (directed, ops) => driveAddEdge(submitted.addEdge as AddEdgeOperation, directed, ops),
  cases,
);
