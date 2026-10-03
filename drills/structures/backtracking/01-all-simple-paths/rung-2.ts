import { TODO } from "#harness/verify.ts";
import type { Adjacency } from "../spec.ts";

/** Rung 2 — Supporting Logic. One branch eligibility check is blank.
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
        if (TODO("whether this neighbor is eligible for the current path")) visit(w);
      }
    }
    active[v] = false;
    path.pop();
  };

  visit(start);
  return paths;
}
