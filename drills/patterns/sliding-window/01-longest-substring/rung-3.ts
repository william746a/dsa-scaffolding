import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: at the end of every iteration, the region
 * left..right holds no repeated character.
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let best = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]!;
    const prev = lastSeen.get(ch);

    // TODO: `prev` is the last index at which `ch` occurred, or undefined if
    // it has never occurred. Using it, restore the invariant above by moving
    // `left`. Take care: a previous occurrence that already sits behind
    // `left` is not inside the region and must not move it backwards.
    TODO("restore the no-repeats invariant by adjusting left");

    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}
