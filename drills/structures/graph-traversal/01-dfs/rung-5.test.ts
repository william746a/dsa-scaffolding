import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { dfsCases } from "../spec.ts";
import { dfs } from "./rung-5.ts";

requireRung("structures/graph-traversal/01-dfs", 5);
checkCases(dfs, dfsCases);
