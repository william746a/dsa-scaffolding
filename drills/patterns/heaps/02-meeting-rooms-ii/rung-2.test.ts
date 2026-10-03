import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { minMeetingRooms } from "./rung-2.ts";

requireRung("patterns/heaps/02-meeting-rooms-ii", 2);
checkCases(minMeetingRooms, cases);
