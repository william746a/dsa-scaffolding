import { TODO } from "#harness/verify.ts";

/**
 * Rung 1 — Isolated Move.
 * Everything works except one mechanical line. Fill it in.
 */
export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const u = e[0]!;
    const v = e[1]!;
    graph[u]!.push(v);
    graph[v]!.push(u);
  }

  const seen = new Array<boolean>(n).fill(false);
  seen[source] = true;
  const stack = [source];

  while (stack.length > 0) {
    const v = stack.pop()!;
    if (v === destination) return true;
    for (const w of graph[v]!) {
      if (!seen[w]) {
        seen[w] = true;
        stack.push(w);
      }
    }
  }

  return TODO("the answer once there is nowhere left to go");
}
