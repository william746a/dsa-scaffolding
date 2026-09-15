import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type Out } from "../spec.ts";
import { Graph } from "./rung-1.ts";

requireRung("structures/graph-adjacency-list/02-neighbors", 1);
checkCases<[boolean, readonly Op[]], Out[]>((directed, ops) => drive(Graph, directed, ops), cases);
