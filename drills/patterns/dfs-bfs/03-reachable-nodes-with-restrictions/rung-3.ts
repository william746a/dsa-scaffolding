import { TODO } from "#harness/verify.ts";

/**
 * Rung 3 — Signature Move.
 * The one block that IS the technique is gone. Everything around it stands.
 *
 * Invariant to preserve: every node enters `stack` at most once, no
 * restricted node ever does, `reached` counts the nodes that have, and every
 * node reachable from 0 without crossing a restricted node eventually does.
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
  for (const r of restricted) seen[r] = true;

  seen[0] = true;
  let reached = 1;
  const stack = [0];

  while (stack.length > 0) {
    const v = stack.pop()!;

    // TODO: v has just been taken off the stack. Keep the invariant above
    // true for the nodes one edge away from it.
    TODO("carry the search onward from v");
  }

  return reached;
}
