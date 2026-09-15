import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { lengthOfLongestSubstring } from "./rung-3.ts";

requireRung("patterns/sliding-window/01-longest-substring", 3);
checkCases(lengthOfLongestSubstring, cases);
