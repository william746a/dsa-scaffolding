import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type SortFn } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/insertion-sort-linked-list/02-sort", 7);
checkComplexity(submitted.complexity, { insertionSortList: "O(n^2)" });
checkCases<[readonly number[]], number[]>(
  (values) => drive(submitted.insertionSortList as SortFn, values),
  cases,
);
