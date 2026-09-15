#!/usr/bin/env node
/**
 * The drill runner. One rung, one test file, one gate:
 *   npm run drill            run the current rung's test
 *   npm run drill <drill-id> switch to that drill and run it
 *   npm run pick <drill-id>  switch without running
 *   npm run hint             record that a hint was given (affects adaptive start)
 *   npm run reveal           print which file to open (never a solution)
 *
 * Passing advances one rung. Failing twice in a row at the same rung regresses
 * one rung, per the guidelines — the ladder adapts, it does not nag.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import {
  ROOT,
  currentDrill,
  discoverDrills,
  findDrill,
  loadProgress,
  saveProgress,
  stateFor,
} from "./progress.ts";
import { progressLine, title } from "./gate.ts";
import { RUNG_NAMES, type Rung } from "./types.ts";

const TIME_BOX_MIN = 25; // Liemandt block length, used as a soft signal only.

const [, , cmd = "run", arg] = process.argv;
const p = loadProgress();

if (arg) {
  const match = discoverDrills().find((d) => d.id === arg || d.id.endsWith(arg));
  if (!match) fatal(`No drill matching "${arg}".\n${listing()}`);
  p.current = match!.id;
  saveProgress(p);
}

const meta = currentDrill(p);
if (!meta) fatal(`No drills found under drills/.\nAsk the coach to author one.`);
const state = stateFor(meta!.id, p);
p.current = meta!.id;

switch (cmd) {
  case "run":
    run();
    break;
  case "hint":
    state.hints += 1;
    state.log.push({ at: now(), rung: state.rung, event: "hint" });
    saveProgress(p);
    console.log(progressLine(meta!.id));
    console.log(
      `\nHint recorded (${state.hints} this drill).\n` +
        `The coach gives a diagnostic — why it fails — never the line itself.\n` +
        `Two or more hints here means the next drill in this set restarts at Rung 1.`,
    );
    break;
  case "pick":
    saveProgress(p);
    console.log(progressLine(meta!.id));
    console.log(`\nOpen: ${rel(scaffoldFile())}`);
    break;
  case "reveal":
    saveProgress(p);
    console.log(progressLine(meta!.id));
    console.log(
      `\nRung ${state.rung} — ${RUNG_NAMES[state.rung]}\n` +
        `Problem statement: ${rel(join(meta!.dir, "PROBLEM.md"))}\n` +
        `Fill the TODOs in:  ${rel(scaffoldFile())}\n` +
        `Then:               npm run drill\n\n` +
        `No solution is printed here, by design.`,
    );
    break;
  default:
    fatal(`Unknown command "${cmd}". Try: run | pick | hint | reveal`);
}

function run(): void {
  const file = rungFile();
  if (!existsSync(file)) {
    fatal(
      `${progressLine(meta!.id)}\n\n` +
        `Missing ${rel(file)} — this rung has not been authored yet.\n` +
        `Ask the coach to scaffold rung ${state.rung} for this drill.`,
    );
  }
  if (state.rung === 5 && !state.rung5StartedAt) openRung5();

  console.log(progressLine(meta!.id));
  console.log(`Running ${rel(file)}\n`);

  const res = spawnSync(process.execPath, ["--test", file], {
    stdio: "inherit",
    cwd: ROOT,
  });
  res.status === 0 ? onPass() : onFail();
}

function onPass(): void {
  const rung = state.rung;
  state.cleared = Math.max(state.cleared, rung) as Rung;
  state.failStreak = 0;
  state.log.push({ at: now(), rung, event: "pass" });

  if (rung === 5) {
    if (state.rung5StartedAt) {
      state.rung5Seconds = Math.round(
        (Date.now() - Date.parse(state.rung5StartedAt)) / 1000,
      );
    }
    saveProgress(p);
    const mins = ((state.rung5Seconds ?? 0) / 60).toFixed(1);
    console.log(
      `\n✔ Rung 5 cleared — cold, unaided, ${mins} min` +
        (Number(mins) > TIME_BOX_MIN ? ` (over the ${TIME_BOX_MIN}-min box)` : ``) +
        `.\n${unitLabel()} ${meta!.index}/${meta!.setSize} of ${title(meta!.topic)} is done.`,
    );
    console.log(
      meta!.index === meta!.setSize
        ? `\nThat clears the set. ${title(meta!.topic)} is mastered when this ` +
            `was unaided — hints used: ${state.hints}, regressions: ${state.regressions}.`
        : `\nNext: npm run drill  (adaptive start picks the opening rung)`,
    );
    return;
  }

  state.rung = (rung + 1) as Rung;
  if (state.rung === 5) openRung5();
  saveProgress(p);
  console.log(
    `\n✔ Rung ${rung} cleared. Advancing to Rung ${state.rung} — ${RUNG_NAMES[state.rung]}.\n` +
      `Open: ${rel(scaffoldFile())}`,
  );
}

function onFail(): void {
  state.failStreak += 1;
  state.log.push({ at: now(), rung: state.rung, event: "fail" });

  if (state.failStreak >= 2 && state.rung > 1) {
    const from = state.rung;
    state.rung = (state.rung - 1) as Rung;
    state.regressions += 1;
    state.failStreak = 0;
    state.log.push({ at: now(), rung: state.rung, event: "regress" });
    saveProgress(p);
    console.log(
      `\n✘ Second failure at Rung ${from}. Regressing to Rung ${state.rung} — ` +
        `${RUNG_NAMES[state.rung]}.\nThat is a real gap, not a slip. Open: ${rel(scaffoldFile())}`,
    );
  } else {
    saveProgress(p);
    console.log(
      `\n✘ Rung ${state.rung} not cleared (failure ${state.failStreak} of 2).\n` +
        (state.rung === 5
        ? `Rung 5 is a blank page: ${rel(scaffoldFile())} must export the ` +
          `names the test imports.\n`
        : ``) +
      `Read the assertion above and fix ${rel(scaffoldFile())}.\n` +
        `Stuck? npm run hint — the coach diagnoses why it fails, never what to write.`,
    );
  }
  process.exitCode = 1;
}

function openRung5(): void {
  state.rung5StartedAt = now();
  state.log.push({ at: now(), rung: 5, event: "open" });
}

/** The test that gates the current rung. */
function rungFile(): string {
  return join(meta!.dir, `rung-${state.rung}.test.ts`);
}

/** The file the learner actually edits. */
function scaffoldFile(): string {
  return join(meta!.dir, `rung-${state.rung}.ts`);
}

function unitLabel(): string {
  return meta!.track === "patterns" ? "Problem" : "Operation";
}

function listing(): string {
  return "Available:\n" + discoverDrills().map((d) => `  ${d.id}`).join("\n");
}

function rel(f: string): string {
  return relative(ROOT, f);
}

function now(): string {
  return new Date().toISOString();
}

function fatal(msg: string): never {
  console.error(msg);
  process.exit(1);
}

export { findDrill };
