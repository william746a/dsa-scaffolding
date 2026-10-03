import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsCases } from "../spec.ts";
import { dfs } from "./rung-2.ts";

requireRung("structures/graph-traversal/01-dfs", 2);
checkCases(dfs, dfsCases);
