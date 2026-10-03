import { TODO } from "#harness/verify.ts";

/**
 * Rung 4 — Guided Reconstruction.
 * Rebuild the solution from ordered behavioral checkpoints.
 *
 * @returns whether some path of edges joins source to destination
 *
 * Target: O(n + edges.length) time and extra space.
 */
export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const e of edges) {
    TODO("record edge e the way the problem defines an edge");
  }

  const seen = new Array<boolean>(n).fill(false);
  seen[source] = TODO("whether source has been reached");
  const stack: number[] = TODO("the reached vertices not yet examined");

  while (stack.length > 0) {
    const v: number = TODO("a reached vertex to examine, no longer waiting");
    if (TODO("v is where the path has to end")) return true;
    TODO("every vertex one edge from v is reached, and waits exactly once");
  }

  return false;
}
