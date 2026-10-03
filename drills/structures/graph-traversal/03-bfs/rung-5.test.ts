import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import { bfsCases } from "../spec.ts";
import { bfs } from "./rung-5.ts";

requireRung("structures/graph-traversal/03-bfs", 5);
checkCases(bfs, bfsCases);
