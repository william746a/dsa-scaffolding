import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 4 — Guided Reconstruction. Ordered behavioral checkpoints.
 * Invariant: membership and pending visits describe exactly the active path;
 * no vertex repeats in that path. Completed results remain unchanged.
 * Full contract: ../API.md
 */
export function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][] {
  // 1. Prepare results and active state for a path containing only start.
  const paths: number[][] = TODO("prepare the result collection");
  const path: number[] = TODO("prepare the path beginning at start");
  const active: boolean[] = TODO("prepare membership for that path");
  const frames: { vertex: number; next: number }[] = TODO("prepare the pending visit from start");

  while (frames.length > 0) {
    const frame = frames[frames.length - 1]!;
    // 2. A path at target becomes an independent result and finishes there.
    // A visit with no remaining neighbors also finishes. In either case,
    // the active state must then describe its caller's path.
    // 3. Otherwise consider the next neighbor, preserving the remaining
    // exploration position. An eligible neighbor becomes the active visit.
    TODO("advance or finish the active visit according to these checkpoints");
  }

  // 4. Once no visits remain, expose the completed collection.
  return TODO("return all completed paths");
}
