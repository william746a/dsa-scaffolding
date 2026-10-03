import { TODO } from "#harness/verify.ts";

/**
 * Rung 5 — Independent Full Body.
 * Sequence the solution without ordered checkpoints.
 *
 * Contract: starting in room 0, return true exactly when every room can
 * eventually be opened with keys found along the way.
 * Invariant: no room is searched twice, and every room whose key is ever
 * found is eventually searched.
 * Required behavior, unordered: begin with room 0 open; search each open
 * room once; count each room once however many copies of its key exist;
 * compare what was opened with how many rooms exist.
 *
 * Target: O(n + total keys) time, O(n) extra space.
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  return TODO("the whole function body");
}
