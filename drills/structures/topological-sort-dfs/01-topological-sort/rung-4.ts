import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** A suspended visit: the vertex and the next outgoing edge to examine. */
type Frame = { vertex: number; nextEdge: number };

/** Rung 4 — Guided Reconstruction. Full contract: ../API.md */
export function topologicalSort(graph: Adjacency): number[] {
  // 1. Establish per-vertex progress and storage for unfinished work and
  //    completed vertices. No vertex has been explored yet.
  TODO("initialize traversal bookkeeping");

  // 2. Give every component a chance to be explored, without starting a
  //    second visit for a vertex already encountered.
  TODO("cover all components exactly once");

  // 3. Within each exploration, account for each outgoing edge. Reject a
  //    cycle immediately; complete each vertex only after its outgoing work.
  TODO("explore and complete vertices while detecting cycles");

  // 4. Turn completed work into an order that respects every directed edge.
  return TODO("return a complete valid order");
}
