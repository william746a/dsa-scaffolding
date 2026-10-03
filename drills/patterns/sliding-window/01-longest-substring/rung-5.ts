import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: return the longest substring length with no repeated character;
 * return 0 for an empty string. The valid region must never include a repeat.
 * Required behavior, unordered: track prior occurrences, keep the current
 * region valid, and retain the best length.
 *
 * Target: one pass, O(n) time, O(min(n, alphabet)) extra space.
 */
export function lengthOfLongestSubstring(s: string): number {
  return TODO("the whole function body");
}
