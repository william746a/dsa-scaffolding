import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 3 — Signature Move.
 * Invariant: membership describes exactly the active path, which contains
 * no repeated vertex. Completed results stay unchanged during later exploration.
 * Restore the invariant after this call finishes exploring its paths.
 * Full contract: ../API.md
 */
export function allSimplePaths(graph: Adjacency, start: number, target: number): number[][] {
  const paths: number[][] = [];
  const path: number[] = [];
  const active = new Array<boolean>(graph.length).fill(false);

  const visit = (v: number): void => {
    path.push(v);
    active[v] = true;
    if (v === target) {
      paths.push([...path]);
    } else {
      for (const w of graph[v]!) {
        if (!active[w]) visit(w);
      }
    }
    TODO("restore the caller's active path and membership after exploring v");
  };

  visit(start);
  return paths;
}
