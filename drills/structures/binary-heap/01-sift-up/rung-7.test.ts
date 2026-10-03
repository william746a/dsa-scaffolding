import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { driveSiftUp, siftUpCases, type SiftUpOperation } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/binary-heap/01-sift-up", 7);

checkComplexity(submitted.complexity, { siftUp: "O(log n)" });
checkCases<[readonly number[], number], number[]>(
  (a, i) => driveSiftUp(submitted.siftUp as SiftUpOperation, a, i),
  siftUpCases,
);
