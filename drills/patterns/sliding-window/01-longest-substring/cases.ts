import type { Case } from "#harness/verify.ts";

/** Examples from the statement, plus edge cases the statement does not give. */
export const cases: readonly Case<[string], number>[] = [
  { name: '"abcabcbb"', args: ["abcabcbb"], want: 3 },
  { name: '"bbbbb"', args: ["bbbbb"], want: 1 },
  { name: '"pwwkew"', args: ["pwwkew"], want: 3 },
  { name: "empty string", args: [""], want: 0, edge: true },
  { name: "single character", args: ["a"], want: 1, edge: true },
  { name: "all distinct", args: ["abcdef"], want: 6, edge: true },
  {
    name: "repeat outside the window — stale index must not drag left back",
    args: ["abba"],
    want: 2,
    edge: true,
  },
  { name: "spaces and symbols", args: ["a b!a b"], want: 4, edge: true },
];
