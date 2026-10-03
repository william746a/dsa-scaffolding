import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, observe } from "../spec.ts";
import * as submission from "./rung-7.ts";
import { TODO } from "#harness/verify.ts";
import type { PathsOperation } from "../spec.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/backtracking/01-all-simple-paths", 7);
checkComplexity(submitted.complexity, {
  allSimplePaths: "O(V + S + L) time; O(V) auxiliary space; O(L) output space",
});
checkCases(observe((graph, start, target) => {
  if (typeof submitted.allSimplePaths !== "function") {
    return TODO("export allSimplePaths as specified in API.md");
  }
  return (submitted.allSimplePaths as PathsOperation)(graph, start, target);
}), cases);
