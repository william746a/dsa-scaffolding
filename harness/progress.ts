/** The progress ledger: what is cleared, what is locked, what comes next. */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  type DrillId,
  type DrillMeta,
  type DrillState,
  type Progress,
  type Rung,
  type Track,
  LEGACY_RUNGS,
  LEGACY_RUNG_NAMES,
  RUNGS,
  RUNG_NAMES,
  emptyState,
} from "./types.ts";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DRILLS_DIR = join(ROOT, "drills");
const LEDGER = join(ROOT, "progress.json");

export function loadProgress(): Progress {
  if (!existsSync(LEDGER)) return { version: 1, current: null, drills: {} };
  return JSON.parse(readFileSync(LEDGER, "utf8")) as Progress;
}

export function saveProgress(p: Progress): void {
  writeFileSync(LEDGER, JSON.stringify(p, null, 2) + "\n");
}

/** Walk drills/<track>/<topic>/<nn-unit>/ and describe every drill found. */
export function discoverDrills(): DrillMeta[] {
  const out: DrillMeta[] = [];
  if (!existsSync(DRILLS_DIR)) return out;

  for (const track of dirs(DRILLS_DIR)) {
    if (track !== "patterns" && track !== "structures") continue;
    for (const topic of dirs(join(DRILLS_DIR, track))) {
      const units = dirs(join(DRILLS_DIR, track, topic)).sort();
      units.forEach((unit, i) => {
        out.push({
          id: `${track}/${topic}/${unit}`,
          track: track as Track,
          topic,
          unit: unit.replace(/^\d+-/, ""),
          index: i + 1,
          setSize: units.length,
          dir: join(DRILLS_DIR, track, topic, unit),
        });
      });
    }
  }
  return out;
}

function dirs(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function findDrill(id: DrillId): DrillMeta {
  const meta = discoverDrills().find((d) => d.id === id);
  if (!meta) throw new Error(`No drill at drills/${id}`);
  return meta;
}

/**
 * Drills authored before the seven-rung revision remain runnable as five-rung
 * legacy drills. Presence of the final test opts a drill into the new ladder,
 * which lets in-progress work migrate one drill at a time without rewriting
 * learner files or progress.json.
 */
export function ladderFor(meta: DrillMeta): readonly Rung[] {
  return existsSync(join(meta.dir, "rung-7.test.ts")) ? RUNGS : LEGACY_RUNGS;
}

export function finalRung(meta: DrillMeta): Rung {
  return ladderFor(meta).at(-1)!;
}

export function rungName(meta: DrillMeta, rung: Rung): string {
  if (finalRung(meta) === 5 && rung <= 5) {
    return LEGACY_RUNG_NAMES[rung as 1 | 2 | 3 | 4 | 5];
  }
  return RUNG_NAMES[rung];
}

/**
 * Adaptive start (guidelines §5): the first unit in a topic starts at Rung 1.
 * A later unit starts at Rung 3 only if the previous unit in the same topic
 * cleared with no regressions and at most one hint; otherwise Rung 1.
 */
export function startingRung(meta: DrillMeta, p: Progress): Rung {
  if (meta.index === 1) return 1;
  const set = discoverDrills().filter(
    (d) => d.track === meta.track && d.topic === meta.topic,
  );
  const prev = set[meta.index - 2];
  if (!prev) return 1;
  const prevState = p.drills[prev.id];
  if (!prevState || prevState.cleared < finalRung(prev)) return 1;
  return prevState.regressions === 0 && prevState.hints <= 1 ? 3 : 1;
}

export function stateFor(id: DrillId, p: Progress): DrillState {
  const existing = p.drills[id];
  if (existing) return existing;
  const fresh = emptyState(startingRung(findDrill(id), p));
  p.drills[id] = fresh;
  return fresh;
}

/** The drill the learner is on: the explicit `current`, else the first unfinished. */
export function currentDrill(p: Progress): DrillMeta | null {
  const all = discoverDrills();
  if (p.current) {
    const named = all.find((d) => d.id === p.current);
    if (named) return named;
  }
  return all.find(
    (d) => (p.drills[d.id]?.cleared ?? 0) < finalRung(d),
  ) ?? all[0] ?? null;
}
