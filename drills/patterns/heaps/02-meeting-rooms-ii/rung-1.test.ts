import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { minMeetingRooms } from "./rung-1.ts";

requireRung("patterns/heaps/02-meeting-rooms-ii", 1);
checkCases(minMeetingRooms, cases);
