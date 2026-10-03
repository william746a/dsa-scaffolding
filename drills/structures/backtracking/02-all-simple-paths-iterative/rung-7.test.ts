import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity, TODO } from "#harness/verify.ts";
import { cases, iterativeCases, observe, type PathsOperation } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;
requireRung("structures/backtracking/02-all-simple-paths-iterative", 7);
checkComplexity(submitted.complexity, {
  allSimplePaths: "O(V + S + L) time; O(V) auxiliary space; O(L) output space",
  allSimplePathsIterative: "O(V + S + L) time; O(V) auxiliary space; O(L) output space",
});
checkCases(observe((graph, start, target) => {
  if (typeof submitted.allSimplePaths !== "function") {
    return TODO("export allSimplePaths as specified in API.md");
  }
  return (submitted.allSimplePaths as PathsOperation)(graph, start, target);
}), cases);
checkCases(observe((graph, start, target) => {
  if (typeof submitted.allSimplePathsIterative !== "function") {
    return TODO("export allSimplePathsIterative as specified in API.md");
  }
  return (submitted.allSimplePathsIterative as PathsOperation)(graph, start, target);
}), iterativeCases);
