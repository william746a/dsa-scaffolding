import { TODO } from "#harness/verify.ts";
import { PriorityQueue } from "../priority-queue.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: when `ends.push(end)` runs, `ends` holds exactly
 * the end times of meetings still in progress at `start` — no more.
 */
export function minMeetingRooms(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
  const ends = new PriorityQueue<number>((a, b) => a - b);
  let most = 0;

  for (const meeting of sorted) {
    const start = meeting[0]!;
    const end = meeting[1]!;

    // TODO: restore the invariant above before this meeting takes a room.
    // Remember a room is free for a meeting that starts at the very moment
    // the previous one ends.
    TODO("give back every room whose meeting is over by `start`");

    ends.push(end);
    most = Math.max(most, ends.size);
  }

  return most;
}
