import { requireRung } from "#harness/gate.ts";
import { checkCases, checkComplexity } from "#harness/verify.ts";
import { cases, drive, type Op, type Out, type HeapCtor } from "../spec.ts";
// @ts-ignore — rung-5.ts is a blank page until you write these exports.
import { MinHeap, complexity } from "./rung-5.ts";

requireRung("structures/binary-heap/03-pop", 5);

checkComplexity(complexity as Record<string, string>, { push: "O(log n)", pop: "O(log n)", peek: "O(1)", size: "O(1)" });
checkCases<[readonly Op[]], Out[]>((ops) => drive(MinHeap as HeapCtor, ops), cases);
