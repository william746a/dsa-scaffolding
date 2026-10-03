import { TODO } from "#harness/verify.ts";

/**
 * Rung 2 — Supporting Logic.
 * One step of setup is missing.
 */
export function reachableNodes(n: number, edges: number[][], restricted: number[]): number {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const a = e[0]!;
    const b = e[1]!;
    graph[a]!.push(b);
    graph[b]!.push(a);
  }

  const seen = new Array<boolean>(n).fill(false);
  for (const r of restricted) {
    TODO("the search below must never enter or count r");
  }

  seen[0] = true;
  let reached = 1;
  const stack = [0];

  while (stack.length > 0) {
    const v = stack.pop()!;
    for (const w of graph[v]!) {
      if (!seen[w]) {
        seen[w] = true;
        reached++;
        stack.push(w);
      }
    }
  }

  return reached;
}
