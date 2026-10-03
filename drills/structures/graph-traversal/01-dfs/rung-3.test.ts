import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsCases } from "../spec.ts";
import { dfs } from "./rung-3.ts";

requireRung("structures/graph-traversal/01-dfs", 3);
checkCases(dfs, dfsCases);
