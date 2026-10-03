import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type Op, type Out, type HeapCtor } from "../spec.ts";
import * as submission from "./rung-7.ts";

const submitted = submission as Record<string, unknown>;

requireRung("structures/binary-heap/03-pop", 7);
checkComplexity(submitted.complexity, { push: "O(log n)", pop: "O(log n)", peek: "O(1)", size: "O(1)" });
checkCases<[readonly Op[]], Out[]>((ops) => drive(submitted.MinHeap as HeapCtor, ops), cases);
