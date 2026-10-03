import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 3 — Signature Move.
 * Invariant: membership describes exactly the active path, which contains
 * no repeated vertex. Pending visits describe that same path and preserve
 * each vertex's remaining exploration position. Results stay unchanged.
 * Full contract: ../API.md
 */
export function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][] {
  const paths: number[][] = [];
  const path: number[] = [start];
  const active = new Array<boolean>(graph.length).fill(false);
  active[start] = true;
  const frames: { vertex: number; next: number }[] = [{ vertex: start, next: 0 }];

  TODO("explore every eligible path and restore the active state when each visit finishes");

  return paths;
}
