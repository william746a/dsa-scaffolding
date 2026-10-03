import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type Op, type Out, type GraphCtor } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/graph-adjacency-list/02-neighbors", 7);

checkComplexity(submitted.complexity, {
  addEdge: "O(1) amortized",
  neighbors: "O(deg(v) log deg(v))",
});
checkCases<[boolean, readonly Op[]], Out[]>(
  (directed, ops) => drive(submitted.Graph as GraphCtor, directed, ops),
  cases,
);
