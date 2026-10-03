import type { Case } from "#harness/verify.ts";

/** The public surface every rung's SeatManager exposes. */
export interface Seats {
  reserve(): number;
  unreserve(seatNumber: number): void;
}

export type SeatsCtor = new (n: number) => Seats;

export type Op = readonly ["reserve"] | readonly ["unreserve", number];

/** Build a SeatManager(n), run the script, and collect every reserve() result. */
export function drive(Ctor: SeatsCtor, n: number, ops: readonly Op[]): number[] {
  const m = new Ctor(n);
  const out: number[] = [];
  for (const op of ops) {
    if (op[0] === "reserve") out.push(m.reserve());
    else m.unreserve(op[1]);
  }
  return out;
}

const R = ["reserve"] as const;
const U = (seat: number) => ["unreserve", seat] as const;
const reserves = (k: number): Op[] => Array.from({ length: k }, () => R);

/** The statement's example, plus edge cases the statement does not give. */
export const cases: readonly Case<[number, readonly Op[]], number[]>[] = [
  {
    name: "statement example, n = 5",
    args: [5, [R, R, U(2), R, R, R, R, U(5)]],
    want: [1, 2, 2, 3, 4, 5],
  },
  {
    name: "one seat, handed out, returned, handed out again",
    args: [1, [R, U(1), R]],
    want: [1, 1],
    edge: true,
  },
  {
    name: "returned 3 then 1 — smallest comes back first, not oldest",
    args: [5, [...reserves(3), U(3), U(1), R, R, R]],
    want: [1, 2, 3, 1, 3, 4],
    edge: true,
  },
  {
    name: "returned 1 then 3 — smallest comes back first, not newest",
    args: [5, [...reserves(3), U(1), U(3), R, R, R]],
    want: [1, 2, 3, 1, 3, 4],
    edge: true,
  },
  {
    name: "returned seats used up, then fresh seats resume where they left off",
    args: [5, [...reserves(3), U(2), R, R]],
    want: [1, 2, 3, 2, 4],
    edge: true,
  },
  {
    name: "four returned out of order, drained in ascending order",
    args: [10, [...reserves(8), U(6), U(2), U(8), U(4), ...reserves(5)]],
    want: [1, 2, 3, 4, 5, 6, 7, 8, 2, 4, 6, 8, 9],
    edge: true,
  },
  {
    name: "every seat reserved, then every seat returned in reverse",
    args: [4, [...reserves(4), U(4), U(3), U(2), U(1), ...reserves(4)]],
    want: [1, 2, 3, 4, 1, 2, 3, 4],
    edge: true,
  },
];
