import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { smallestChair } from "./rung-5.ts";

requireRung("patterns/heaps/03-smallest-unoccupied-chair", 5);
checkCases(smallestChair, cases);
