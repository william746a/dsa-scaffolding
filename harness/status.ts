#!/usr/bin/env node
/** Visible progress: the shrinking scaffold is the motivational signal. */

import { discoverDrills, loadProgress } from "./progress.ts";
import { title } from "./gate.ts";
import { RUNGS } from "./types.ts";

const p = loadProgress();
const drills = discoverDrills();

if (drills.length === 0) {
  console.log("No drills authored yet. Ask the coach to scaffold one.");
  process.exit(0);
}

let lastTopic = "";
for (const d of drills) {
  const key = `${d.track}/${d.topic}`;
  if (key !== lastTopic) {
    lastTopic = key;
    const label = d.track === "patterns" ? "pattern" : "structure";
    console.log(`\n${title(d.topic)}  (${label})`);
  }
  const s = p.drills[d.id];
  const cleared = s?.cleared ?? 0;
  const at = s?.rung ?? 1;
  const started = Boolean(s) && (cleared > 0 || p.current === d.id);
  const ladder = RUNGS.map((r) =>
    r <= cleared ? "█" : started && r === at ? "▓" : "░",
  ).join("");
  const marks = [
    s?.hints ? `${s.hints} hint${s.hints > 1 ? "s" : ""}` : "",
    s?.regressions ? `${s.regressions} regression${s.regressions > 1 ? "s" : ""}` : "",
    s?.rung5Seconds ? `${(s.rung5Seconds / 60).toFixed(1)} min cold` : "",
  ].filter(Boolean).join(", ");
  const marker = p.current === d.id ? "→" : " ";
  const done = cleared === 5 ? " ✔" : "";
  console.log(
    `${marker} ${ladder} ${d.index}/${d.setSize} ${d.unit}${done}` +
      (marks ? `   (${marks})` : ""),
  );
}
console.log("\n█ cleared  ▓ current  ░ locked");
