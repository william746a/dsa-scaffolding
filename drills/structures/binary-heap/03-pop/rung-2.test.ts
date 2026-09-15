import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type Out } from "../spec.ts";
import { MinHeap } from "./rung-2.ts";

requireRung("structures/binary-heap/03-pop", 2);
checkCases<[readonly Op[]], Out[]>((ops) => drive(MinHeap, ops), cases);
