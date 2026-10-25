import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/**
 * Rung 5 — Independent Full Body.
 * Contract: all start-to-target paths with no repeated vertex, in neighbor-list
 * exploration order. Include endpoints and stop at target. Return [[start]]
 * when endpoints match, [] when target is unreachable. No recursion.
 * Invariant: membership matches the active path; pending visits preserve each
 * vertex's remaining exploration position. Completed results stay unchanged.
 * Required behaviors (unordered): preserve input; independent results; honor
 * endpoint cases; terminate on cycles; follow list order; handle deep graphs.
 * Complexity: O(V + S + L) time, O(V) auxiliary space, O(L) output space.
 * V, S, L are defined in ../API.md.
 */
export function allSimplePathsIterative(graph: Adjacency, start: number, target: number): number[][] {
  const active = new Array<boolean>(graph.length).fill(false);
  const path: number[] = [start];
  active[start] = true;
  const paths: number[][] = [];
  const frames: {vertex: number, next: number}[] = [{vertex: start, next: 0}];

  while (frames.length > 0) {
    const frame = frames[frames.length - 1]!;
    if (frame?.vertex === target || frame?.next === graph[frame?.vertex!]!.length) {
      if (frame.vertex === target) paths.push([...path]);
      active[frame.vertex] = false;
      path.pop();
      frames.pop();
    } else {
      const w = graph[frame?.vertex!]![frame?.next!]!;
      frame.next++;
      if (!active[w]) {
        active[w] = true;
        path.push(w);
        frames.push({vertex: w, next: 0});
      }
    }
  }

  return paths;
}
