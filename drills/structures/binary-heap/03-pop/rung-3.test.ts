import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type Out } from "../spec.ts";
import { MinHeap } from "./rung-3.ts";

requireRung("structures/binary-heap/03-pop", 3);
checkCases<[readonly Op[]], Out[]>((ops) => drive(MinHeap, ops), cases);
