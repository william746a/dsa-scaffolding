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
  const paths: number[][] = [];
  const path: number[] = [start];
  const active: boolean[] = new Array<boolean>(graph.length).fill(false);
  const frames: { vertex: number; next: number }[] = [{vertex: start, next: 0}];

  active[start] = true;

  while (frames.length > 0) {
    const frame = frames[frames.length - 1]!;
    // 2. A path at target becomes an independent result and finishes there.
    // A visit with no remaining neighbors also finishes. In either case,
    // the active state must then describe its caller's path.
    // 3. Otherwise consider the next neighbor, preserving the remaining
    // exploration position. An eligible neighbor becomes the active visit.
    if (frame.vertex === target || frame.next === graph[frame.vertex]!.length) {
      if (frame.vertex === target) paths.push([...path]);
      active[frame.vertex] = false;
      path.pop();
      frames.pop();
    } else {
      const w = graph[frame.vertex]![frame.next]!;
      frame.next++;
      if (!active[w]) {
        active[w] = true;
        path.push(w);
        frames.push({vertex: w, next: 0});
      }
    }
  }

  // 4. Once no visits remain, expose the completed collection.
  return paths;
}
