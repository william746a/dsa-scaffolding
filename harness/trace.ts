/**
 * Failure rendering. A stack frame is worth showing only if it points at a
 * file the learner can act on, so node internals, the harness, and the gate
 * files are dropped and what remains is printed relative to the repo root.
 */

import { sep } from "node:path";
import { pathToFileURL } from "node:url";
import { inspect } from "node:util";
import { DRILLS_DIR, ROOT } from "./progress.ts";

const FRAME = /^\s+at /;
const ROOT_PREFIXES = [pathToFileURL(ROOT).href + "/", ROOT + sep];
const DRILL_PREFIXES = [pathToFileURL(DRILLS_DIR).href + "/", DRILLS_DIR + sep];
const MAX_FRAMES = 6;
const MAX_VALUE_LINES = 6;

/** A value as the learner would write it, cut short when it is huge. */
export function show(v: unknown): string {
  const full = render(v, 30);
  return full.split("\n").length > MAX_VALUE_LINES ? render(v, 6) : full;
}

function render(v: unknown, maxArrayLength: number): string {
  return inspect(v, {
    depth: 8,
    breakLength: 96,
    compact: 3,
    maxArrayLength,
    maxStringLength: 300,
  });
}

/** One failure, as text: the message, plus where in drills/ it was thrown. */
export function explain(err: unknown): string {
  if (typeof err !== "object" || err === null) return show(err);
  const e = err as { name?: unknown; message?: unknown; code?: unknown };
  const message = String(e.message ?? "");
  // Failed comparisons already say everything; where they were raised is the
  // harness, which is never the line to fix.
  if (e.code === "ERR_ASSERTION" || e.name === "CaseFailure") return message;
  return [
    `${String(e.name ?? "Error")}: ${message}`,
    ...drillFrames(err).map((f) => `  ${f}`),
  ].join("\n");
}

/** A whole stack with every frame outside the learner's files removed. */
export function cleanStack(err: unknown): string {
  return (stackOf(err) ?? String(err))
    .split("\n")
    .filter((line) => !FRAME.test(line) || isDrillFrame(line))
    .map(relativize)
    .join("\n")
    .trimEnd();
}

/** Frames inside drills/, innermost first, with recursion collapsed. */
function drillFrames(err: unknown): string[] {
  const out: { frame: string; times: number }[] = [];
  for (const line of (stackOf(err) ?? "").split("\n")) {
    if (!FRAME.test(line) || !isDrillFrame(line)) continue;
    const frame = relativize(line).trim();
    const last = out.at(-1);
    if (last?.frame === frame) last.times += 1;
    else out.push({ frame, times: 1 });
  }
  return out
    .slice(0, MAX_FRAMES)
    .map(({ frame, times }) => (times > 1 ? `${frame}  (×${times})` : frame));
}

function isDrillFrame(line: string): boolean {
  return (
    DRILL_PREFIXES.some((p) => line.includes(p)) && !/\.test\.ts:\d+/.test(line)
  );
}

function relativize(line: string): string {
  for (const p of ROOT_PREFIXES) line = line.replaceAll(p, "");
  return line;
}

function stackOf(err: unknown): string | null {
  const stack = (err as { stack?: unknown } | null)?.stack;
  return typeof stack === "string" ? stack : null;
}
