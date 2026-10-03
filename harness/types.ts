/** Shared types for the drill harness. */

export type Track = "patterns" | "structures";

/** 1 = most scaffolding, 7 = blank page in the current ladder. */
export type Rung = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const RUNGS: readonly Rung[] = [1, 2, 3, 4, 5, 6, 7];
export const LEGACY_RUNGS: readonly Rung[] = [1, 2, 3, 4, 5];

export const RUNG_NAMES: Record<Rung, string> = {
  1: "Isolated Move",
  2: "Supporting Logic",
  3: "Signature Move",
  4: "Guided Reconstruction",
  5: "Independent Full Body",
  6: "Interface Skeleton",
  7: "Blank Page",
};

export const LEGACY_RUNG_NAMES: Readonly<Record<1 | 2 | 3 | 4 | 5, string>> = {
  1: "Isolated Move",
  2: "Supporting Logic",
  3: "Signature Move",
  4: "Full Body",
  5: "Blank Page",
};

/**
 * A drill id is its path under drills/, e.g.
 *   patterns/sliding-window/01-longest-substring
 *   structures/binary-heap/02-sift-down
 * The middle segment is the topic (pattern or structure); drills sharing a
 * topic form one set, and adaptive-start looks across that set.
 */
export type DrillId = string;

export interface DrillMeta {
  id: DrillId;
  track: Track;
  /** Pattern name (Track A) or structure name (Track B). */
  topic: string;
  /** Problem name (Track A) or operation name (Track B). */
  unit: string;
  /** Position of this drill within its topic set, 1-based. */
  index: number;
  /** How many drills the topic set holds. */
  setSize: number;
  dir: string;
}

export interface DrillState {
  /** The rung the learner is currently working. */
  rung: Rung;
  /** Highest rung cleared. 0 = nothing cleared yet. */
  cleared: 0 | Rung;
  /** Consecutive failures at the current rung; 2 triggers a regression. */
  failStreak: number;
  /** Hints requested across the whole drill; feeds the adaptive-start rule. */
  hints: number;
  /** Times this drill regressed a rung; feeds the adaptive-start rule. */
  regressions: number;
  /** Legacy five-rung timing fields. Retained for completed older drills. */
  rung5StartedAt: string | null;
  rung5Seconds: number | null;
  /** Current seven-rung timing fields for the final blank-page gate. */
  rung7StartedAt: string | null;
  rung7Seconds: number | null;
  log: LogEntry[];
}

export interface LogEntry {
  at: string;
  rung: Rung;
  event: "pass" | "fail" | "hint" | "regress" | "open";
}

export interface Progress {
  version: 1;
  current: DrillId | null;
  drills: Record<DrillId, DrillState>;
}

export function emptyState(startRung: Rung = 1): DrillState {
  return {
    rung: startRung,
    // Adaptive start skips the warm-up rungs; they count as cleared, or the
    // gate would lock the very rung the learner was started on.
    cleared: (startRung - 1) as 0 | Rung,
    failStreak: 0,
    hints: 0,
    regressions: 0,
    rung5StartedAt: null,
    rung5Seconds: null,
    rung7StartedAt: null,
    rung7Seconds: null,
    log: [],
  };
}
