import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** A suspended visit: the vertex and the next outgoing edge to examine. */
type Frame = { vertex: number; nextEdge: number };

/**
 * Rung 3 — Signature Move.
 * Invariant: active vertices have unfinished visits; a vertex becomes finished
 * only after all its outgoing work is complete. Each vertex enters `finished`
 * exactly once, after its descendants. Reversing it must respect every edge.
 * Full contract: ../API.md
 */
export function topologicalSort(graph: Adjacency): number[] {
  // 0 = unseen, 1 = active, 2 = finished.
  const state = new Array<number>(graph.length).fill(0);
  const finished: number[] = [];
  const stack: Frame[] = [];

  for (let start = 0; start < graph.length; start++) {
    if (state[start] !== 0) continue;
    state[start] = 1;
    stack.push({ vertex: start, nextEdge: 0 });

    while (stack.length > 0) {
      const frame = stack[stack.length - 1]!;
      const v = frame.vertex;
      if (frame.nextEdge === graph[v]!.length) {
        TODO("complete this visit and record its vertex exactly once after its descendants");
        continue;
      }

      const w = graph[v]![frame.nextEdge]!;
      frame.nextEdge += 1;
      if (state[w] === 1) return [];
      if (state[w] === 0) {
        state[w] = 1;
        stack.push({ vertex: w, nextEdge: 0 });
      }
    }
  }

  return finished.reverse();
}
