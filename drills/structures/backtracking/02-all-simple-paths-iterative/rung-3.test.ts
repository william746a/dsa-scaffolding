import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { iterativeCases, observe } from "../spec.ts";
import { allSimplePathsIterative } from "./rung-3.ts";

requireRung("structures/backtracking/02-all-simple-paths-iterative", 3);
checkCases(observe(allSimplePathsIterative), iterativeCases);
