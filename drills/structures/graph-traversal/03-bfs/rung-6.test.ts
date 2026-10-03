import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { bfsCases } from "../spec.ts";
import { bfs } from "./rung-6.ts";

requireRung("structures/graph-traversal/03-bfs", 6);
checkCases(bfs, bfsCases);
