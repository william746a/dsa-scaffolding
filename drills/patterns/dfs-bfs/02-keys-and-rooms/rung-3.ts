import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every room enters `queue` at most once, `count` is
 * the number of rooms opened so far, and every room whose key can be found
 * eventually enters `queue`.
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  const opened = new Array<boolean>(rooms.length).fill(false);
  opened[0] = true;
  let count = 1;
  const queue = [0];

  for (let head = 0; head < queue.length; head++) {
    const room = queue[head]!;
    for (const key of rooms[room]!) {
      // TODO: `key` was just found in `room`. Keep the invariant above.
      TODO("act on the key just found");
    }
  }

  return count === rooms.length;
}
