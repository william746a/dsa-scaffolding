import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { iterativeCases, observe } from "../spec.ts";
import { allSimplePathsIterative } from "./rung-1.ts";

requireRung("structures/backtracking/02-all-simple-paths-iterative", 1);
checkCases(observe(allSimplePathsIterative), iterativeCases);
