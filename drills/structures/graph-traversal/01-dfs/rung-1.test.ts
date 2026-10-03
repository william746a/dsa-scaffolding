import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsCases } from "../spec.ts";
import { dfs } from "./rung-1.ts";

requireRung("structures/graph-traversal/01-dfs", 1);
checkCases(dfs, dfsCases);
