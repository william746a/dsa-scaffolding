import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { inDegreesCases, observeInDegrees } from "../spec.ts";
import { inDegrees } from "./rung-6.ts";

requireRung("structures/topological-sort/01-in-degrees", 6);
checkCases(observeInDegrees(inDegrees), inDegreesCases);
