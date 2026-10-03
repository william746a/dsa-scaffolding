import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { iterativeCases, observe } from "../spec.ts";
import { allSimplePathsIterative } from "./rung-5.ts";

requireRung("structures/backtracking/02-all-simple-paths-iterative", 5);
checkCases(observe(allSimplePathsIterative), iterativeCases);
