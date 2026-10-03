import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsIterativeCases } from "../spec.ts";
import { dfsIterative } from "./rung-2.ts";

requireRung("structures/graph-traversal/02-dfs-iterative", 2);
checkCases(dfsIterative, dfsIterativeCases);
