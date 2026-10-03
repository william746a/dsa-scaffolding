import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { driveSiftDown, siftDownCases, type SiftDownOperation } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/binary-heap/02-sift-down", 7);

checkComplexity(submitted.complexity, { siftDown: "O(log n)" });
checkCases<[readonly number[], number], number[]>(
  (a, i) => driveSiftDown(submitted.siftDown as SiftDownOperation, a, i),
  siftDownCases,
);
