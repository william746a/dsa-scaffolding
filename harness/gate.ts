/**
 * The lock between rungs. Every rung test calls requireRung() first, so a
 * later rung cannot be attempted — or passed — until the one below it has
 * actually gone green through the runner.
 */

import { loadProgress, findDrill, stateFor } from "./progress.ts";
import { type DrillId, type Rung, RUNG_NAMES } from "./types.ts";

export function requireRung(id: DrillId, rung: Rung): void {
  const p = loadProgress();
  const state = stateFor(id, p);
  if (rung <= 1) return;
  if (state.cleared < rung - 1) {
    throw new Error(
      `Rung ${rung} (${RUNG_NAMES[rung]}) is locked for ${id}.\n` +
        `  Cleared so far: rung ${state.cleared || "none"}.\n` +
        `  Clear rung ${rung - 1} first:  npm run drill`,
    );
  }
}

/** The bookkeeping line the guidelines require at the top of every turn. */
export function progressLine(id: DrillId): string {
  const p = loadProgress();
  const meta = findDrill(id);
  const state = stateFor(id, p);
  const unit = meta.track === "patterns" ? "Problem" : "Operation";
  const label = meta.track === "patterns" ? "" : ` (${meta.unit})`;
  return (
    `${title(meta.topic)} — ${unit} ${meta.index}/${meta.setSize}${label}` +
    ` — Rung ${state.rung}/5`
  );
}

export function title(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
