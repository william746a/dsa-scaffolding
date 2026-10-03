import { TODO } from "#harness/verify.ts";

/**
 * Rung 7 — Whole-API Capstone. Cold and timed. See ../API.md.
 * State every scaffolded complexity value before writing the implementation.
 */

export const complexity: Record<string, string> = {
  push: "",
  pop: "",
  peek: "",
  size: "",
};

export class MinHeap {
  get size(): number {
    return TODO("implement size");
  }

  peek(): number | undefined {
    return TODO("implement peek");
  }

  push(value: number): void {
    TODO("implement push");
  }

  pop(): number | undefined {
    return TODO("implement pop");
  }
}
