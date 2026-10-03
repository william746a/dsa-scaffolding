import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { bfsCases } from "../spec.ts";
import { bfs } from "./rung-3.ts";

requireRung("structures/graph-traversal/03-bfs", 3);
checkCases(bfs, bfsCases);
