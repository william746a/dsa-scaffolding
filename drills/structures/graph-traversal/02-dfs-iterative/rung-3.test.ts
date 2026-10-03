import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsIterativeCases } from "../spec.ts";
import { dfsIterative } from "./rung-3.ts";

requireRung("structures/graph-traversal/02-dfs-iterative", 3);
checkCases(dfsIterative, dfsIterativeCases);
