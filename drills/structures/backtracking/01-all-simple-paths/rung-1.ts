import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 1 — Isolated Move. One mechanical element is blank.
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
    active[v] = false;
    path.pop();
  };

  visit(start);
  return TODO("the completed collection of paths");
}
