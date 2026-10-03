import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @param s the input string
 * @returns the length of the longest substring of `s` with no repeated
 *          characters; 0 for an empty string
 *
 * Target: one pass, O(n) time, O(min(n, alphabet)) extra space.
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let best = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    TODO("restore validity for the region ending at right");
    TODO("record the current character and update the best valid length");
  }

  return TODO("the best valid length found");
}
