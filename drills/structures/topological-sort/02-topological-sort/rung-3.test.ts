import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { judged, topologicalSortCases } from "../spec.ts";
import { topologicalSort } from "./rung-3.ts";

requireRung("structures/topological-sort/02-topological-sort", 3);
checkCases(judged(topologicalSort), topologicalSortCases);
