import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type MediansCtor, type Op } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { MedianFinder } from "./rung-7.ts";

requireRung("patterns/heaps/04-find-median-from-data-stream", 7);
checkCases<[readonly Op[]], number[]>(
  (ops) => drive(MedianFinder as MediansCtor, ops),
  cases,
);
