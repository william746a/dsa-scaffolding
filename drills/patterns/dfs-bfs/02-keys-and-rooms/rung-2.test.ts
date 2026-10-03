import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { canVisitAllRooms } from "./rung-2.ts";

requireRung("patterns/dfs-bfs/02-keys-and-rooms", 2);
checkCases(canVisitAllRooms, cases);
