import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsIterativeCases } from "../spec.ts";
import { dfsIterative } from "./rung-1.ts";

requireRung("structures/graph-traversal/02-dfs-iterative", 1);
checkCases(dfsIterative, dfsIterativeCases);
