import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { inDegreesCases, observeInDegrees } from "../spec.ts";
import { inDegrees } from "./rung-3.ts";

requireRung("structures/topological-sort/01-in-degrees", 3);
checkCases(observeInDegrees(inDegrees), inDegreesCases);
