import { TODO } from "#harness/verify.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  const opened = new Array<boolean>(rooms.length).fill(false);
  opened[0] = true;
  let count = 1;
  const queue = [0];

  for (let head = 0; head < queue.length; head++) {
    const room = queue[head]!;
    for (const key of rooms[room]!) {
      if (!opened[key]) {
        opened[key] = true;
        count++;
        queue.push(key);
      }
    }
  }

  return TODO("whether every room was opened, from what has been counted");
}
