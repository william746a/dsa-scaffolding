import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { bfsCases } from "../spec.ts";
import { bfs } from "./rung-4.ts";

requireRung("structures/graph-traversal/03-bfs", 4);
checkCases(bfs, bfsCases);
