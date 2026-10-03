import { requireRung } from "#harness/gate.ts";
import { checkCases } from "#harness/verify.ts";
import {
  driveNeighbors,
  neighborCases,
  type NeighborCaseArgs,
  type Out,
} from "../spec.ts";
import { neighbors } from "./rung-3.ts";

requireRung("structures/graph-adjacency-list/02-neighbors", 3);
checkCases<NeighborCaseArgs, Out[]>(
  (...args) => driveNeighbors(neighbors, ...args),
  neighborCases,
);
