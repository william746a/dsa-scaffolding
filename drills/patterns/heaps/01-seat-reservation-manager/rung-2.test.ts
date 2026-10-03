import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases, drive, type Op } from "./cases.ts";
import { SeatManager } from "./rung-2.ts";

requireRung("patterns/heaps/01-seat-reservation-manager", 2);
checkCases<[number, readonly Op[]], number[]>(
  (n, ops) => drive(SeatManager, n, ops),
  cases,
);
