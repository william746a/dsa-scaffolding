import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { lengthOfLongestSubstring } from "./rung-7.ts";

requireRung("patterns/sliding-window/01-longest-substring", 7);
checkCases(lengthOfLongestSubstring as (s: string) => number, cases);
