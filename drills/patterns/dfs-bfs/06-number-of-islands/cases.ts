import type { Case } from "#harness/verify.ts";

type Args = [grid: string[][]];

/** One string per row, so a map reads the way it looks: g("110", "001"). */
const g = (...rows: string[]): string[][] => rows.map((row) => [...row]);

/** Deterministic pseudo-random map — same every run. */
function scrambledGrid(rows: number, cols: number, landPercent: number): string[][] {
  let x = 200;
  // High bits: the low bits of this generator repeat with a short period.
  const next = (mod: number) =>
    Math.floor((x = (x * 1103515245 + 12345) % 2147483648) / 65536) % mod;
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (next(100) < landPercent ? "1" : "0")),
  );
}

/**
 * One corridor of land, one cell wide: every other row is solid, and the
 * rows between hold a single cell at alternating ends.
 */
function serpentine(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, (_, r) => {
    if (r % 2 === 0) return new Array<string>(cols).fill("1");
    const row = new Array<string>(cols).fill("0");
    row[r % 4 === 1 ? cols - 1 : 0] = "1";
    return row;
  });
}

const solid = Array.from({ length: 60 }, () => new Array<string>(60).fill("1"));
const checkerboard = Array.from({ length: 40 }, (_, r) =>
  Array.from({ length: 40 }, (_, c) => ((r + c) % 2 === 0 ? "1" : "0")),
);

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<Args, number>[] = [
  {
    name: "example 1: one island with a notch",
    args: [g("11110", "11010", "11000", "00000")],
    want: 1,
  },
  {
    name: "example 2: three islands",
    args: [g("11000", "11000", "00100", "00011")],
    want: 3,
  },
  {
    name: "a single cell of water",
    args: [g("0")],
    want: 0,
    edge: true,
  },
  {
    name: "a single cell of land",
    args: [g("1")],
    want: 1,
    edge: true,
  },
  {
    name: "cells touching only at a corner are separate islands",
    args: [g("10", "01")],
    want: 2,
    edge: true,
  },
  {
    name: "a single row",
    args: [g("1011")],
    want: 2,
    edge: true,
  },
  {
    name: "a single column",
    args: [g("1", "0", "1", "1")],
    want: 2,
    edge: true,
  },
  {
    name: "two arms joined along the bottom are one island",
    args: [g("101", "111")],
    want: 1,
    edge: true,
  },
  {
    name: "an island that winds down, left, and back up",
    args: [g("001", "101", "111")],
    want: 1,
    edge: true,
  },
  {
    name: "the end of one row does not touch the start of the next",
    args: [g("001", "100")],
    want: 2,
    edge: true,
  },
  {
    name: "a ring of land around a lake is one island",
    args: [g("111", "101", "111")],
    want: 1,
    edge: true,
  },
  {
    name: "60 x 60, all land",
    args: [solid],
    want: 1,
    edge: true,
  },
  {
    name: "40 x 40 checkerboard",
    args: [checkerboard],
    want: 800,
    edge: true,
  },
  {
    name: "59 x 60 serpentine corridor",
    args: [serpentine(59, 60)],
    want: 1,
    edge: true,
  },
  {
    name: "50 x 50 scrambled map, about half land",
    args: [scrambledGrid(50, 50, 50)],
    want: 159,
    edge: true,
  },
];
