import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
// @ts-ignore — rung-7.ts is a blank page until you write the export.
import { canVisitAllRooms } from "./rung-7.ts";

requireRung("patterns/dfs-bfs/02-keys-and-rooms", 7);
checkCases(canVisitAllRooms as (rooms: number[][]) => boolean, cases);
