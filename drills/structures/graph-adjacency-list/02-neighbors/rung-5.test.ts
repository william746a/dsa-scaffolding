import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type Op, type Out, type GraphCtor } from "../spec.ts";
// @ts-ignore — rung-5.ts is a blank page until you write these exports.
import { Graph, complexity } from "./rung-5.ts";

requireRung("structures/graph-adjacency-list/02-neighbors", 5);

checkComplexity(complexity as Record<string, string>, {
  addEdge: "O(1) amortized",
  neighbors: "O(deg(v) log deg(v))",
});
checkCases<[boolean, readonly Op[]], Out[]>(
  (directed, ops) => drive(Graph as GraphCtor, directed, ops),
  cases,
);
