import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { cases } from "./cases.ts";
import { canVisitAllRooms } from "./rung-5.ts";

requireRung("patterns/dfs-bfs/02-keys-and-rooms", 5);
checkCases(canVisitAllRooms, cases);
