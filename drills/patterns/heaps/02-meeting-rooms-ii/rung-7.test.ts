import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { minMeetingRooms } from "./rung-7.ts";

requireRung("patterns/heaps/02-meeting-rooms-ii", 7);
checkCases(minMeetingRooms as (intervals: number[][]) => number, cases);
