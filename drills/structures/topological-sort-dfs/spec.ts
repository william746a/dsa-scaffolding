/** Reuse the established graph contract and property-based order checks. */
import type { Case } from "#harness/verify.ts";
import {
  topologicalSortCases as sharedCases,
  type Adjacency,
  type Verdict,
} from "../topological-sort/spec.ts";

export { judged } from "../topological-sort/spec.ts";
export type { Adjacency, TopologicalSortOperation } from "../topological-sort/spec.ts";

export const topologicalSortCases: readonly Case<[Adjacency], Verdict>[] = [
  ...sharedCases,
  { name: "empty graph", args: [[]], want: "empty (cycle)", edge: true },
  {
    name: "shared finished descendant is not a cycle",
    args: [[[1, 2], [2], []]],
    want: "valid order",
    edge: true,
  },
  {
    name: "a later root reaches an already finished component",
    args: [[[], [0], [0, 1]]],
    want: "valid order",
    edge: true,
  },
  {
    name: "duplicate edge entries do not duplicate vertices",
    args: [[[1, 1], [2, 2], []]],
    want: "valid order",
    edge: true,
  },
  {
    name: "a later root exposes a self-loop after a clean component",
    args: [[[1], [], [2]]],
    want: "empty (cycle)",
    edge: true,
  },
];
