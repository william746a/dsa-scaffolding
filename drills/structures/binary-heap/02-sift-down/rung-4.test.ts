import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type Out } from "../spec.ts";
import { MinHeap } from "./rung-4.ts";

requireRung("structures/binary-heap/02-sift-down", 4);
checkCases<[readonly Op[]], Out[]>((ops) => drive(MinHeap, ops), cases);
