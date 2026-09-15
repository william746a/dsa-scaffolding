import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type SortFn } from "../spec.ts";
import { insertionSortList } from "./rung-3.ts";

requireRung("structures/insertion-sort-linked-list/01-insert-into-sorted", 3);
checkCases<[readonly number[]], number[]>(
  (values) => drive(insertionSortList as SortFn, values),
  cases,
);
