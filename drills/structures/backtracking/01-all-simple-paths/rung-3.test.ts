import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, observe } from "../spec.ts";
import { allSimplePaths } from "./rung-3.ts";

requireRung("structures/backtracking/01-all-simple-paths", 3);
checkCases(observe(allSimplePaths), cases);
