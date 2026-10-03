import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 2 — Supporting Logic. One exploration-position update is blank.
 * Full contract: ../API.md
 */
export function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][] {
  const paths: number[][] = [];
  const path: number[] = [start];
  const active = new Array<boolean>(graph.length).fill(false);
  active[start] = true;
  const frames: { vertex: number; next: number }[] = [{ vertex: start, next: 0 }];

  while (frames.length > 0) {
    const frame = frames[frames.length - 1]!;
    if (frame.vertex === target || frame.next === graph[frame.vertex]!.length) {
      if (frame.vertex === target) paths.push([...path]);
      active[frame.vertex] = false;
      path.pop();
      frames.pop();
    } else {
      const w = graph[frame.vertex]![frame.next]!;
      TODO("advance this visit past the neighbor just considered");
      if (!active[w]) {
        active[w] = true;
        path.push(w);
        frames.push({ vertex: w, next: 0 });
      }
    }
  }

  return paths;
}
