import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { smallestChair } from "./rung-7.ts";

requireRung("patterns/heaps/03-smallest-unoccupied-chair", 7);
checkCases(
  smallestChair as (times: number[][], targetFriend: number) => number,
  cases,
);
