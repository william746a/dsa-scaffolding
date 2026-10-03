import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every vertex enters `stack` at most once, and every
 * vertex reachable from `source` eventually does.
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

    // TODO: v has just been examined. Keep the invariant above true for
    // the vertices one edge away from it.
    TODO("carry the search onward from v");
  }

  return false;
}
