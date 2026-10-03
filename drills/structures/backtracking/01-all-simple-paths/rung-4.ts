import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 4 — Guided Reconstruction. Ordered behavioral checkpoints.
 * Invariant: membership matches the active path; paths have no repeats.
 * Full contract: ../API.md
 */
export function allSimplePaths(graph: Adjacency, start: number, target: number): number[][] {
  // 1. Prepare empty results and state describing an empty active path.
  const paths: number[][] = TODO("prepare the result collection");
  const path: number[] = TODO("prepare the active path");
  const active: boolean[] = TODO("prepare membership for an empty active path");

  const visit = (v: number): void => {
    // 2. The active state now describes the path ending at v.
    TODO("make v part of the active state");
    // 3. Produce the paths belonging to this visit, honoring the endpoint,
    // neighbor order, independence of results, and no-repeat contract.
    TODO("produce the results reachable through this visit");
    // 4. The caller's active state must be exactly as it was before this visit.
    TODO("restore the caller's active state");
  };

  // 5. Explore from the requested start, then return the completed results.
  TODO("explore from start");
  return TODO("return all completed paths");
}
