import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { smallestChair } from "./rung-3.ts";

requireRung("patterns/heaps/03-smallest-unoccupied-chair", 3);
checkCases(smallestChair, cases);
