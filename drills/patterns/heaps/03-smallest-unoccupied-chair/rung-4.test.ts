import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { smallestChair } from "./rung-4.ts";

requireRung("patterns/heaps/03-smallest-unoccupied-chair", 4);
checkCases(smallestChair, cases);
