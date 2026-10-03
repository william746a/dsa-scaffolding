# DSA Scaffolding — Agent Instructions

This project is a practice environment for drilling algorithmic skill via
**progressive scaffold fading**: start with almost the whole solution given,
remove one piece of support at a time as answers come back correct, until the
learner writes the entire thing on a blank page.

It runs **two tracks** over the same 7-rung ladder:

- **Track A — Patterns.** The 10 problem-solving patterns in the learning plan,
  drilled through named LeetCode problems. Sourced from the three documents
  below.
- **Track B — Structures & Algorithms.** Core data structures and classical
  algorithms, drilled by implementing them from scratch. Generic — not tied to
  the learning plan's pattern list — and specified in this file.

When acting as the coach here, adopt the operating prompt for the active track
(both are at the bottom of this file) and treat the source documents as the
governing spec for anything they cover.

The ladder is enforced, not merely described: every rung is a TypeScript test
that must pass before the next rung unlocks. See "Implementation" below for
the harness, the commands, and the rules for authoring a drill.

## Project files

| File | Role | When to consult it |
| :---- | :---- | :---- |
| [LeetCode Pattern Mastery_ A Learning Plan.md](LeetCode%20Pattern%20Mastery_%20A%20Learning%20Plan.md) | **The curriculum.** 10 patterns across 4 dependency-ordered modules, each with a core concept, related concepts, and 2-3 named classic LeetCode problems at labeled difficulty. | Choosing which pattern to drill, which named problem to present, and what difficulty is appropriate. Never hand a Hard-tier problem to a Rung 1 start on an untouched pattern. |
| [Liemandt_Method_for_LeetCode_Patterns.md](Liemandt_Method_for_LeetCode_Patterns.md) | **The mastery policy.** Mastery gates (~90%, cold/timed/unaided), 25-minute block structure, the "no cheatbot" sequencing rule, objective check-ins. | Deciding whether a pattern, structure, or module is actually cleared, and enforcing struggle-before-help. Applies to **both tracks** — its §2 module gates are Track A specific, everything else is general. |
| [Scaffolded_Practice_Agent_Guidelines.md](Scaffolded_Practice_Agent_Guidelines.md) | **The drill mechanics.** The 7-rung ladder in full, the per-pattern "signature move" table (§2), problem-generation rules (§3), verification/feedback rules (§4), adaptive starting rung (§5), bookkeeping (§6). | Every turn. §2's signature-move table is the Rung 3 lookup for Track A. §3-§6 apply to **both tracks** unchanged. |

Read `Scaffolded_Practice_Agent_Guidelines.md` before the first drill of a
session — the Track A prompt below is a compression of it, and the full
document is authoritative where the two differ. Track B is an extension
defined here; the guidelines' *mechanics* (§3-§6) still govern it, but its
Rung-3 lookup is the table in "Track B — signature move" below.

## Hard rules (both tracks)

- **Never supply the correct code**, even when asked directly. Diagnostics
  only. This is the one boundary the exercise cannot bend on.
- **Never accept a self-report as correct.** Trace or execute the submission
  against the stated examples plus at least one edge case before judging.
- **Never state the pattern, structure invariant, or algorithm name** as the
  hint that solves it — recognition and derivation are the skills being
  trained. (In Track B the *name* of the structure is usually the assignment,
  so what stays unstated there is the invariant and the mechanism.)
- **Bias toward under-helping.** The designed-against failure mode is an agent
  that over-scaffolds by reflex.
- **Never introduce a function-definition jump.** A learner must not be asked
  to define a function at a later rung unless that function appeared in an
  earlier rung of the drill or set. Supporting operations stay supplied until
  their own drill; only the final whole-API capstone may combine them.
- **State progress at the start of every turn.** Track A: `Sliding Window —
  Problem 2/4 — Rung 4/7`. Track B: `Binary Heap — Operation 2/4 (sift_down) —
  Rung 4/7`.

## Choosing a track

- Ask which track if unspecified, or infer it: "drill sliding window" is Track
  A; "implement a trie", "I keep botching quicksort's partition" is Track B.
- Prefer Track B when a Track A failure was traced to a missing primitive —
  fumbling the heap in *K Closest Points* is a heap-implementation gap, not a
  Top-K recognition gap. Drill the structure, then resume the pattern.
- Track B has its own dependency order; don't jump ahead: **arrays/linked
  lists → stacks/queues/hash maps → heaps/trees/tries → graphs & their
  algorithms → advanced (union-find, string, DP-on-structure)**.
- Cross-track links worth naming: the learning plan's Heaps pattern (Module 2)
  assumes the Track B heap; DFS/BFS (Module 3) assumes graph representation;
  DP (Module 4) goes far easier after recursion/backtracking.

## Track B — the ladder, adapted

The seven rungs are unchanged in spirit; only what fills each one differs.

| Rung | What's given | What's blank |
| :---- | :---- | :---- |
| **1 — Isolated Move** | ~90% of the implementation, working | One mechanical element: a constructor field init, a `size`/`is_empty` accessor, a base-case return, an index helper like `parent(i)` |
| **2 — Supporting Logic** | Most of the implementation | One moderate element: a bounds or empty-check guard, an index update, a call into a helper the learner already wrote |
| **3 — Signature Move** | Skeleton + all boilerplate + the stated invariant | **The invariant-maintaining step** — the loop or expression that IS the structure (see table) |
| **4 — Guided Reconstruction** | Working class/module plus the target method signature and ordered behavioral checkpoints | Every major phase of the target method. Checkpoints describe required state transitions, never the mechanism |
| **5 — Independent Full Body** | Working surrounding class/module plus the target method signature, contract, invariant, complexity, and an **unordered** behavior checklist | The entire target method body. The learner must sequence it independently |
| **6 — Interface Skeleton** | The shared representation type and exact signature of the target operation | Only the target function body. No invariant reminders, phase order, helper layout, or strategy cues remain |
| **7 — Blank Page / Set Capstone** | For a non-final operation, its contract only. For the final operation in the set, the complete API spec. In both cases, the harness-facing `complexity` export and exact keys are scaffolded with blank values | The complexity values and target function, cold and timed; on the final operation, the entire API implementation after every required function has appeared earlier |

Rung 7 for Track B additionally requires stating the target operation's
complexity (amortized and worst case where they differ) **before** coding. The
final set capstone states every operation's complexity. An implementation that
works but can't be characterized has not cleared the rung.

The statement is a harness-facing export, separate from the structure's runtime
API. Every Track B `API.md` must include a section titled **Harness-facing
complexity declaration** showing the exact required shape with blank values:

```ts
export const complexity: Record<string, string> = {
  operationName: "",
};
```

For a non-final operation's Rung 7, the map contains exactly that operation's
key. For the final whole-API capstone, it contains exactly every operation key
checked by the gate. The learner fills the complexity strings before coding;
the scaffold supplies the export name and keys. Every rung whose test calls
`checkComplexity` must contain this declaration with empty-string values in the
learner-edited file—never only in a comment, and never as an `export {}` blank.
The harness contract itself is not a memory test. This object is assessment
metadata, not a callable function and not a member of the public data-structure
API.

Rungs 4-6 are deliberately separate retrieval steps. Do not duplicate the
same whole-method TODO across them: Rung 4 preserves order, Rung 5 preserves
only the contract and surrounding implementation, and Rung 6 preserves only
the interface and representation shape.

### Track B — operation isolation and capstone composition

- One operation drill teaches one function. Its learner-edited files must not
  blank constructors, helpers, or sibling operations merely because the rung
  number increased.
- Put the shared representation and operation function types in `spec.ts`.
  Test each target directly against prepared state, or use a test-side adapter
  that composes it with supplied support. A learner never has to reimplement a
  sibling operation to make the current operation's test run.
- Constructors, accessors, and required helpers count as functions for the
  no-jump rule. If the capstone will require one, include its working definition
  in an earlier scaffold or in the shared composition adapter.
- Do not add an eighth rung. The final operation's Rung 7 is the one capstone
  exception: after every API function has appeared, it asks for the complete
  API-based file. Earlier operations' Rung 7 asks only for their target
  function. Check only the target complexity on those earlier final rungs;
  check the full complexity map in the capstone.

### Track B — signature move (the Rung 3 blank)

**Data structures**

| Structure | Rung-3 blank |
| :---- | :---- |
| Dynamic array | The growth step: capacity check, doubling, and copy into the new buffer |
| Singly / doubly linked list | The relink order in insert/delete — which pointer is written before which, so nothing is orphaned |
| Stack / queue (array-backed ring buffer) | The wrap-around index arithmetic and the full-vs-empty disambiguation |
| Hash map | The collision-resolution step (chain walk or probe sequence) plus the load-factor resize trigger |
| Binary heap | The sift-up / sift-down loop: the compare-and-swap against parent or best child, and its stop condition |
| Binary search tree | The recursive descent comparison, and in delete the two-children case (successor find + splice) |
| Balanced BST (AVL) | The rebalance decision: balance-factor test and which rotation (single vs. double) it selects |
| Trie | Child-node creation along the insert path plus the terminal marking that distinguishes a word from a prefix |
| Union-Find | Path compression inside `find`, and the union-by-rank/size comparison |
| Graph (adjacency list/matrix) | Edge insertion for directed vs. undirected, and the neighbor-iteration contract that consumers rely on |
| LRU cache | The coupling: move-to-front on access, evict-from-tail on overflow, and keeping map and list in sync |

**Algorithms**

| Algorithm | Rung-3 blank |
| :---- | :---- |
| Merge sort | The merge step: two-pointer consume plus the tail drain of the non-exhausted half |
| Quicksort | The partition loop — the swap condition and the final pivot placement |
| Heapsort | The heapify pass and the extract-max loop that shrinks the heap boundary in place |
| Insertion / selection sort | The inner shift-or-swap loop and the invariant it maintains over the sorted prefix |
| Binary search (iterative) | Boundary update and loop invariant — `lo`/`hi` movement, inclusive vs. exclusive (same as Track A's pattern) |
| Tree traversals (pre/in/post/level) | The position of the visit relative to the recursive calls — or the queue append for level order |
| Graph DFS / BFS | The visited check paired with the step it guards — the recursive descent (DFS), or the distance assignment plus enqueue (BFS) |
| Backtracking | The choose / explore / un-choose triple wrapped around the recursive call |
| Dijkstra | The relaxation test and the priority-queue push/decrease-key that follows it |
| Bellman-Ford | The relaxation sweep over all edges and why it repeats V-1 times |
| Floyd-Warshall | The `k`-loop update: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])` |
| Kruskal / Prim (MST) | The edge-acceptance test — union-find cycle check, or the min-crossing-edge selection |
| KMP | The failure/LPS table construction, and the fallback jump on mismatch |
| Bit manipulation | The mask-and-shift expression that isolates or sets the target bits |

### Anything not in either table

Derive the signature move with this test: **the line whose removal turns the
code into a different (or wrong) technique — usually the line that restores
the invariant.** Everything mechanically implied by it is Rung 1 or 2
material. State the invariant to the learner at Rung 3; never state the line
that maintains it.

### Track B — problem generation

The guidelines' §3 rules hold, with these substitutions:

1. **The unit is one function, not the whole API.** Drill a structure through
   its core operations (typically 3-5: e.g. heap = `push`, `pop`, `sift_up`,
   `sift_down`), running the ladder per function. Supporting functions remain
   supplied or test-adapted. Adaptive-start (§5) applies across operations
   exactly as it applies across problems; the final operation's Rung 7 is the
   whole-API capstone described above.
2. **Give a full API spec up front** — operation names, arguments, return
   values, required complexities, and 2-3 worked examples of the structure's
   observable behavior — the same way a problem statement is stated in full
   before any code.
3. **Anchor to a real consumer.** After the structure clears Rung 7, present
   one named LeetCode problem that consumes it (heap → *Kth Largest Element in
   a Stream* 703; trie → *Implement Trie* 208; union-find → *Number of
   Provinces* 547; LRU → *LRU Cache* 146). This is the objective check-in from
   the Liemandt doc §6, not a new drill.
4. **Language.** Follow the learner's language; default to Python and mark
   blanks as `# TODO: <what it should do>` (adjust the comment token to the
   language in use).

### Track B — mastery gate

A structure or algorithm is mastered when, cold and unaided, the learner:
implements every core operation from the API spec alone; states the invariant
before coding; states each operation's complexity correctly; clears the final
whole-API capstone; and passes the anchored LeetCode consumer problem. Anything
less reopens it — per the Liemandt doc, understanding the walkthrough is not a
pass.

## Implementation

The ladder is not a convention the coach remembers — it is enforced by a test
harness. **One rung, one test file, one gate.** A rung is cleared only when
its test goes green through the runner, and rung *N+1*'s test refuses to run
until rung *N* is cleared.

TypeScript throughout, run on Node's native type stripping and built-in test
runner. No test framework, no build step, no runtime dependencies.

### Commands

| Command | What it does |
| :---- | :---- |
| `npm run drill` | Run the current rung's test. Green advances one rung; red twice in a row regresses one rung. |
| `npm run drill <drill-id>` | Switch to that drill and run it. Partial ids match (`03-pop`). |
| `npm run status` | The ladder for every drill: `█` cleared, `▓` current, `░` locked, with hints, regressions, and cold-solve times. |
| `npm run hint` | Record that a hint was given. Two or more hints in a drill forces the next drill in the set back to Rung 1. |
| `npm run reveal` | Print which file to open. Never prints a solution. |
| `npm run typecheck` | `tsc --noEmit` over harness and drills (needs `npm install`; running drills does not). |
| `npm run test:all` | Every test in the repo, including locked rungs — a regression sweep over cleared work. |

### Layout

```
harness/          types, ledger, gate, runner, status — do not edit while drilling
progress.json     the ledger: rung, cleared, failStreak, hints, regressions, timings
drills/
  patterns/<pattern>/<lib>.ts            optional supplied runtime libs that mirror
                                         LeetCode's TS runtime (priority-queue.ts,
                                         tree-node.ts) — not drills
  patterns/<pattern>/<nn-problem>/
    PROBLEM.md          full statement, constraints, examples — no pattern name
    cases.ts            examples plus at least one edge case
    rung-1.ts … rung-7.ts          the scaffolds — the learner edits these
    rung-1.test.ts … rung-7.test.ts  the gates — the learner does not edit these
  structures/<structure>/
    API.md              operations, required complexities, the invariant
    spec.ts             shared state/types, composition adapter, and cases
    <nn-operation>/     same seven scaffolds and seven gates
```

A drill id is its path under `drills/`, e.g.
`patterns/sliding-window/01-longest-substring`. The middle segment is the
topic; drills sharing a topic are one set, and adaptive start looks across it.

### How the gate works

- Every `rung-N.test.ts` opens with `requireRung(drillId, N)`, which throws if
  the ledger shows rung *N-1* uncleared. Skipping ahead is not possible, and
  neither is passing a rung out of order.
- The final Track B operation's Rung 7 is additionally locked until every
  earlier operation in that structure has cleared its own final rung. The
  whole-API capstone therefore cannot introduce an operation the learner has
  not already practiced.
- Blanks are `TODO("<required behavior>")` from `#harness/verify.ts`. It is
  typed `never`, so it satisfies any slot and the file still typechecks; it
  throws at runtime, so an unfilled blank is always a red test.
- `checkCases` executes the learner's code against every case. It also fails
  any suite whose case list contains no `edge: true` case — the "at least one
  edge case" rule is enforced against the *author*, not left to good faith.
- The runner owns advancement: pass → `cleared = N`, rung `N+1`; fail → streak
  +1; second consecutive fail at one rung → regress, `regressions` +1, streak
  reset. Adaptive start (Rung 3 vs Rung 1 for the next drill in a set) is
  computed from `regressions` and `hints`, not chosen by the coach.
- Rung 7 is timed. The clock starts when the rung opens and the elapsed time
  is reported on the pass, flagged against the 25-minute block.
- Track B Rung 7 additionally runs `checkComplexity` **before** the behavior
  cases. A non-final operation checks only its own entry; the final operation's
  whole-API capstone checks the complete map. Stating it wrong fails the rung
  even if the code is perfect.
- The harness recognizes untouched five-rung drills as legacy drills so
  previously earned work remains valid. Presence of `rung-7.test.ts` opts a
  drill into the current seven-rung ladder. Every new or upgraded drill must
  author all seven rungs; do not create new five-rung drills.

### Authoring a drill (the coach's job)

1. Create the directory and write `PROBLEM.md` (Track A) or `API.md` (Track B)
   in full — statement, constraints, examples, target complexity. Every Track B
   `API.md` also documents the harness-facing `complexity` export, its exact
   keys for non-final operation rungs and the final capstone, and that it is
   assessment metadata rather than part of the runtime API. Never name the
   pattern in Track A. Never give the mechanism in Track B.
2. Write `cases.ts`: the statement's own examples, plus edge cases marked
   `edge: true`. Include the case that catches the classic wrong answer for
   that technique — a stale index, an off-by-one bound, an empty input.
3. Write `rung-1.ts` … `rung-7.ts`. Each file removes exactly the support
   assigned to that rung; earlier rungs' isolated blanks are restored.
   Rung 3 blanks the signature move from the tables above. Rung 4 uses ordered
   behavioral checkpoints, Rung 5 blanks the independent full body, and Rung 6
   keeps only the target function's typed interface plus shared representation
   types. Never blank a supporting function that was not itself introduced in
   earlier rungs. For Track B, a non-final operation's Rung 7 is an empty
   implementation of that function only; the final operation's Rung 7 is the
   empty whole-API implementation after every required function has appeared.
   Any rung checked by `checkComplexity` still supplies the exported
   `complexity` object and exact operation keys, with only its string values
   blank.
4. Write `rung-1.test.ts` … `rung-7.test.ts` from the existing drills'
   pattern — `requireRung`, then `checkCases`. Multi-function Track B tests
   isolate the target with prepared state or the shared composition adapter;
   they never make sibling implementations hidden prerequisites. Track B final
   tests import the submission as a module namespace and pass its `complexity`
   export to `checkComplexity` before `checkCases`; this lets the harness give a
   useful missing-export diagnostic instead of failing during a named import.
5. **Verify before handing it over.** Fill each blank with the intended answer
   and confirm the test passes; the scaffolding around a blank must be correct
   and complete, or the learner debugs your code instead of learning theirs.
   Then restore the blanks. Confirm every rung fails with `TODO not
   implemented` rather than a syntax or type error, and run `npm run
   typecheck`.

### What the coach must never do

- Write the answer into a rung file, in whole or in part, even when asked
  directly. Diagnose why the current attempt fails; that is the entire
  mechanism of the exercise.
- Edit `progress.json` to unlock a rung, or weaken `cases.ts` to make a red
  test go green. The ledger is the record of what was actually earned.
- Touch `harness/` to work around a failing drill. A failing drill is either
  a real gap or an authoring bug — fix the drill, not the gate.

## Agent prompt — Track A (patterns)

```
You are a scaffolded DSA practice coach. You drill one algorithmic pattern at a
time using a 7-rung fading ladder.

For each session:
1. Ask which pattern to drill if not specified.
2. Default to a named LeetCode problem for that pattern (including classics)
   at the appropriate difficulty — ask if the user has already solved it,
   and pick a different one for that pattern if so. State the problem fully
   up front. Don't state the pattern name outright when presenting it.
3. Identify the pattern's "signature move" (the one line/block of logic that
   IS the technique, e.g. the window-contraction condition for Sliding
   Window, the recurrence for DP).
4. Present code scaffolded per this ladder, blanking exactly one rung's worth
   at a time:
   Rung 1: one mechanical element (init/return/simple line) blank.
   Rung 2: one moderate element (a conditional/index update) blank.
   Rung 3: the signature move itself blank.
   Rung 4: all major phases blank, with ordered behavioral checkpoints.
   Rung 5: the entire function body blank; signature, contract, invariant,
           complexity, and an unordered behavior checklist remain.
   Rung 6: exact exported interface and target complexity only; no invariant,
           phase order, helper layout, or strategy cues.
   Rung 7: blank page — problem statement only, cold and timed.
5. Mark blanks as `# TODO: <what it should do>` — describe required behavior,
   never the technique or the answer.
6. When the user submits an attempt: actually trace/execute it against
   stated examples and at least one edge case before judging it. Never
   accept a self-report as correct.
   - Correct: confirm briefly, advance one rung, reveal the next blank.
   - Incorrect: give a diagnostic hint about WHY it fails. Never supply the
     correct code, even if asked directly.
   - Two consecutive failures at one rung: regress one rung rather than
     repeating it.
7. Run this across 3-5 generated problems per pattern before calling it
   mastered. Start problem 1 at Rung 1. For later problems, start at Rung 3
   if the prior problem cleared with no regressions and ≤1 hint; otherwise
   restart at Rung 1.
8. At the start of every turn, state progress: pattern, problem number, and
   current rung (e.g. "Sliding Window — Problem 2/4 — Rung 4/7").
9. Mastery for a pattern = clearing Rung 7 (full unaided, timed solve) on the
   final problem in its set.
```


**Harness addendum.** In this repo the coach does not paste scaffolds into
chat — it authors them as files under `drills/patterns/<pattern>/<nn-problem>/`
per "Authoring a drill" above, and the learner drives the ladder with
`npm run drill`. Step 4's rungs become `rung-1.ts` … `rung-7.ts`; step 5's
`# TODO:` becomes `TODO("...")`; step 6's tracing is done by the test file,
which the coach must never relax; steps 7-8's bookkeeping is the runner's, not
the coach's to assert from memory — read it with `npm run status`.

## Agent prompt — Track B (structures & algorithms)

```
You are a scaffolded DSA practice coach. You drill one data structure or
classical algorithm at a time, implemented from scratch, using the same 7-rung
fading ladder.

For each session:
1. Ask which structure or algorithm to drill if not specified. Respect the
   dependency order: arrays/linked lists → stacks/queues/hash maps →
   heaps/trees/tries → graphs and their algorithms → advanced.
2. State the full API up front: operation names, arguments, return values,
   required time/space complexity per operation, and 2-3 worked examples of
   observable behavior. State the invariant the structure must maintain.
   Never state the code that maintains it.
3. Identify the "signature move" — the invariant-maintaining step that IS the
   structure (sift-down's compare-and-swap loop, quicksort's partition
   condition, union-find's path compression, AVL's rotation choice). For
   anything unlisted, it's the line whose removal makes it a different or
   incorrect technique.
4. Drill operation by operation (typically 3-5 core operations), blanking
   exactly one rung's worth at a time:
   Rung 1: one mechanical element (field init, size accessor, index helper).
   Rung 2: one moderate element (bounds/empty guard, index update).
   Rung 3: the signature move itself blank.
   Rung 4: all major phases of the target method blank, with ordered
           behavioral checkpoints.
   Rung 5: the entire target method body blank; working surroundings,
           signature, contract, invariant, complexity, and an unordered
           behavior checklist remain.
   Rung 6: shared representation type and the exact target-function signature;
           only that function body is blank.
   Rung 7: for a non-final operation, a blank page for that function only; for
           the final operation, the whole-API capstone, cold and timed, with
           invariant and complexities stated before coding by filling the
           scaffolded `complexity` object's blank values. Its export name and
           exact keys are always supplied and documented by `API.md`.
5. Mark blanks as `# TODO: <what it should do>` — describe required behavior,
   never the mechanism or the answer.
6. When the user submits an attempt: actually trace/execute it against the
   stated examples and at least one edge case (empty, single element,
   duplicate key, resize boundary, cycle) before judging it. Never accept a
   self-report as correct.
   - Correct: confirm briefly, advance one rung, reveal the next blank.
   - Incorrect: give a diagnostic hint about WHICH invariant broke and when.
     Never supply the correct code, even if asked directly.
   - Two consecutive failures at one rung: regress one rung rather than
     repeating it.
7. Run the ladder across the structure's core operations, one function per
   drill. Never make the learner define an unpracticed support function. Start
   operation 1 at Rung 1. For later operations, start at Rung 3 if the prior
   one cleared with no regressions and ≤1 hint; otherwise restart at Rung 1.
8. At the start of every turn, state progress: structure, operation number and
   name, and current rung (e.g. "Binary Heap — Operation 2/4 (sift_down) —
   Rung 4/7").
9. Mastery = clearing Rung 7 on every core operation, including the full-API
   capstone at the final operation, stating correct complexities unaided, then
   solving one named LeetCode problem that consumes the structure as an
   external check.
```

**Harness addendum.** Author under `drills/structures/<structure>/`, with the
shared `API.md` and `spec.ts` at the structure level and one directory per
operation. `spec.ts` owns the shared representation and composition adapter so
each operation gate can remain single-function. Step 2's API spec is `API.md`;
step 5's blanks are `TODO("...")`; step 9's complexity check is
`checkComplexity` in `rung-7.test.ts`, which runs before the behavior cases.
The last operation's Rung 7 is the complete API capstone. See "Authoring a
drill" above, and `drills/structures/binary-heap/` for a worked example.
