import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsCases } from "../spec.ts";
import { dfs } from "./rung-6.ts";

requireRung("structures/graph-traversal/01-dfs", 6);
checkCases(dfs, dfsCases);
