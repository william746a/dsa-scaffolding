import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type Out } from "../spec.ts";
import { Graph } from "./rung-4.ts";

requireRung("structures/graph-adjacency-list/01-add-edge", 4);
checkCases<[boolean, readonly Op[]], Out[]>((directed, ops) => drive(Graph, directed, ops), cases);
