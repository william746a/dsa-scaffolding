import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type SortFn } from "../spec.ts";
// @ts-ignore — rung-5.ts is a blank page until you write these exports.
import { insertionSortList, complexity } from "./rung-5.ts";

requireRung("structures/insertion-sort-linked-list/01-insert-into-sorted", 5);

checkComplexity(complexity as Record<string, string>, { insertionSortList: "O(n^2)" });
checkCases<[readonly number[]], number[]>(
  (values) => drive(insertionSortList as SortFn, values),
  cases,
);
