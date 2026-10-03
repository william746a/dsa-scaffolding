import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { bfsCases } from "../spec.ts";
import { bfs } from "./rung-2.ts";

requireRung("structures/graph-traversal/03-bfs", 2);
checkCases(bfs, bfsCases);
