import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One index computation is missing.
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let best = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]!;
    const prev = lastSeen.get(ch);
    if (prev !== undefined && prev >= left) {
      left = prev + 1;
    }
    lastSeen.set(ch, right);
    best = TODO(
      "keep the running best: the larger of what you already had and the " +
        "size of the region currently spanned by left..right inclusive",
    );
  }

  return best;
}
