import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsIterativeCases } from "../spec.ts";
import { dfsIterative } from "./rung-6.ts";

requireRung("structures/graph-traversal/02-dfs-iterative", 6);
checkCases(dfsIterative, dfsIterativeCases);
