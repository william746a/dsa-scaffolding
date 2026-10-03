import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op, type SeatsCtor } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { SeatManager } from "./rung-7.ts";

requireRung("patterns/heaps/01-seat-reservation-manager", 7);
checkCases<[number, readonly Op[]], number[]>(
  (n, ops) => drive(SeatManager as SeatsCtor, n, ops),
  cases,
);
