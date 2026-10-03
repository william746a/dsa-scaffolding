import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One loop guard is missing.
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  const opened = new Array<boolean>(rooms.length).fill(false);
  opened[0] = true;
  let count = 1;
  const queue = [0];

  for (
    let head = 0;
    TODO("some opened room has not yet been searched for keys");
    head++
  ) {
    const room = queue[head]!;
    for (const key of rooms[room]!) {
      if (!opened[key]) {
        opened[key] = true;
        count++;
        queue.push(key);
      }
    }
  }

  return count === rooms.length;
}
