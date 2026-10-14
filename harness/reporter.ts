/**
 * The node:test reporter the runner uses for a gate. One line per case, the
 * failure detail directly under the case it belongs to, and a one-line tally —
 * no timings, no runner internals, no stack frames outside drills/.
 */

import type { TestEvent } from "node:test/reporters";
import { styleText } from "node:util";
import { explain } from "./trace.ts";

const INDENT = "    ";

export default async function* reporter(
  source: AsyncIterable<TestEvent>,
): AsyncGenerator<string, void> {
  let passed = 0;
  let failed = 0;
  let spaced = false; // whether the last line written was already a blank one

  for await (const event of source) {
    if (event.type === "test:pass") {
      passed += 1;
      yield `${styleText("green", "✔")} ${event.data.name}\n`;
    } else if (event.type === "test:fail") {
      failed += 1;
      const { error } = event.data.details;
      const detail = explain(error.cause ?? error)
        .split("\n")
        .map((line) => (line ? INDENT + line : line))
        .join("\n");
      yield `${styleText("red", "✖")} ${event.data.name}\n${detail}\n\n`;
    }
    if (event.type === "test:pass" || event.type === "test:fail") {
      spaced = event.type === "test:fail";
    }
  }

  const tally = `${passed} passed, ${failed} failed`;
  yield `${spaced ? "" : "\n"}${styleText(failed ? "red" : "green", tally)}\n`;
}
