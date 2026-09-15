import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { lengthOfLongestSubstring } from "./rung-4.ts";

requireRung("patterns/sliding-window/01-longest-substring", 4);
checkCases(lengthOfLongestSubstring, cases);
