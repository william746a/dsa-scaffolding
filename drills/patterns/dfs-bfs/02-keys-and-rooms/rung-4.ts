import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns whether, starting in room 0, every room can be opened
 *
 * Target: O(n + total keys) time, O(n) extra space.
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  const opened: boolean[] = TODO("for each room, whether it is open — none yet");
  opened[0] = TODO("whether room 0 is open");
  let count: number = TODO("how many rooms are open");
  const queue: number[] = TODO("the open rooms not yet searched for keys");

  for (let head = 0; head < queue.length; head++) {
    const room: number = TODO("the next open room to search, in the order opened");
    for (const key of rooms[room]!) {
      if (TODO("key opens a room that is still locked")) {
        TODO("that room is open, counted, and will be searched later");
      }
    }
  }

  return TODO("whether every room is open");
}
