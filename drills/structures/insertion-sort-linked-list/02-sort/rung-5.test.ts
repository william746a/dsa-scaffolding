import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type SortFn } from "../spec.ts";
import { insertionSortList } from "./rung-5.ts";

requireRung("structures/insertion-sort-linked-list/02-sort", 5);

checkCases<[readonly number[]], number[]>(
  (values) => drive(insertionSortList as SortFn, values),
  cases,
);
