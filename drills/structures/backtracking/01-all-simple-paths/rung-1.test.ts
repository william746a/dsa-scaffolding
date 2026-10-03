import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, observe } from "../spec.ts";
import { allSimplePaths } from "./rung-1.ts";

requireRung("structures/backtracking/01-all-simple-paths", 1);
checkCases(observe(allSimplePaths), cases);
