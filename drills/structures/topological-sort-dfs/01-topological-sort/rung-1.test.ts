import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { judged, topologicalSortCases } from "../spec.ts";
import { topologicalSort } from "./rung-1.ts";

requireRung("structures/topological-sort-dfs/01-topological-sort", 1);
checkCases(judged(topologicalSort), topologicalSortCases);
