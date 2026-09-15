import { TODO } from "#harness/verify.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
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
    best = Math.max(best, right - left + 1);
  }

  return TODO("hand back the answer the function has already computed");
}
