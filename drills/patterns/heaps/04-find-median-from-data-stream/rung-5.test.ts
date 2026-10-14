import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op } from "./cases.ts";
import { MedianFinder } from "./rung-5.ts";

requireRung("patterns/heaps/04-find-median-from-data-stream", 5);
checkCases<[readonly Op[]], number[]>(
  (ops) => drive(MedianFinder, ops),
  cases,
);
