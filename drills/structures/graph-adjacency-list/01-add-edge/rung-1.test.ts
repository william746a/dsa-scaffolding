import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, driveAddEdge, type Op, type Out } from "../spec.ts";
import { addEdge } from "./rung-1.ts";

requireRung("structures/graph-adjacency-list/01-add-edge", 1);
checkCases<[boolean, readonly Op[]], Out[]>(
  (directed, ops) => driveAddEdge(addEdge, directed, ops),
  cases,
);
