# The Liemandt Method, Applied to LeetCode Pattern Mastery

A set of operating rules for working through *LeetCode Pattern Mastery: A Learning Plan*, adapted from the mastery-based learning model Joe Liemandt built at Alpha School/Timeback.

---

## 1\. The Seven Principles → Seven Rules

| Liemandt Principle | Rule for Pattern Practice |
| :---- | :---- |
| Mastery gate (≥90%), not time served | You don't "finish" a pattern by reading it or doing one problem. You finish it when you can solve unseen classics **unaided, from a blank page, correctly** at a near-90% hit rate. |
| Motivation is 90% of the solution | Don't rely on willpower. Build a visible reward for finishing a pattern (see §4). |
| Short, focused reps (25-min blocks) | Work in single-problem, timer-boxed sprints, not open-ended afternoons. |
| Diagnose before you drill | Before "learning" a pattern, cold-attempt one classic problem first to find your actual gap. |
| Tight feedback loops | Review immediately after every attempt — success or failure — not at the end of the week. |
| No cheatbots — struggle first | Use AI/solutions only *after* a genuine unaided attempt, and only as a coach, not an oracle. |
| Objective, third-party measurement | Don't self-certify "I get it." Verify against a real, external check (see §5). |

---

## 2\. Mastery Gate, Per Module

Liemandt's model won't let a student advance past 90% accuracy on a concept. Translate that into a hard gate between modules in your plan — don't move to Module *N+1* until you clear the gate on Module *N*.

| Module | Mastery Gate (before advancing) |
| :---- | :---- |
| **1 — Array/List Foundations** (Two Pointers, Sliding Window, Prefix Sum) | Solve the Medium in each sub-pattern cold, unaided, in under \~20 min, and correctly identify which of the 3 techniques applies *before* reading the problem's tags. |
| **2 — Sorting, Searching, Structures** (Binary Search, Merge Intervals, Heaps) | Solve each Medium unaided; for Binary Search specifically, get the boundary conditions (`<=` vs `<`, `mid` rounding) right on the first try twice in a row. |
| **3 — Recursive & Graph Traversal** (DFS/BFS, Topological Sort) | Solve *Number of Islands* and *Course Schedule* unaided, and be able to say out loud, before coding, whether you're doing DFS or BFS and why. |
| **4 — Advanced Paradigms** (Greedy, DP) | Solve one DP problem via recursion+memo *and* re-derive the same solution bottom-up (tabulation) without looking anything up. |

A "pass" is not "I understood the editorial." It's a **cold, timed, unaided solve.** That's the whole point of the 90% gate — it exists precisely to stop you from advancing on the false confidence of having merely watched a solution.

---

## 3\. The 25-Minute Block Structure

Instead of an open-ended "study session," run each rep like Alpha's Pomodoro block:

1. **0:00–2:00** — Diagnose: read only the problem title/prompt. Name the pattern you think applies. Do not open notes yet.  
2. **2:00–20:00** — Solve, timer running, no hints, no AI, no searching.  
3. **20:00–25:00** — Immediate feedback: check your answer, and if wrong, identify *why* (wrong pattern? right pattern, bad execution? edge case?) before looking at any solution.

Four blocks (\~100 minutes) is a full "academic session." Stop there — depth of focus matters more than hours logged.

---

## 4\. Build Your Own "Time-Back" Incentive

Alpha's core motivational lever is that finishing academics early buys back the rest of the day. As a self-directed learner you have to build this yourself:

- Pick a fixed daily budget (e.g., 4 blocks). Once you clear that day's mastery checks, the rest of the day is genuinely off-limits from LeetCode — no guilt-topping-up.  
- Keep a visible tracker (a checklist, a streak counter, a simple spreadsheet) of blocks completed and patterns gated-through. Visible progress is doing real motivational work here, not just bookkeeping.

---

## 5\. The "No Cheatbot" Rule for AI-Assisted Practice

Since you likely have an LLM available, the discipline that matters most is **sequencing**:

1. Attempt cold, unaided, full timer.  
2. Fail or succeed — either way, write one sentence on your reasoning.  
3. *Only then* ask an AI to critique your approach or explain a gap — never to write the first-pass solution.

If you paste a problem into an assistant before attempting it yourself, you've skipped the mastery gate — you'll feel like you "know" the pattern without the unaided proof that you actually do.

---

## 6\. Objective Check-Ins (Your "Third-Party Test")

Self-assessment is unreliable — Liemandt explicitly distrusts internally-reported confidence in favor of an outside benchmark. Rough equivalents for a self-learner:

- Weekly: pick 2 unseen problems from a pattern you've already "gated through" — timed, no notes. This is your MAP-test equivalent.  
- Monthly: do a timed mixed set (5 problems, mixed patterns, no tags shown) to check pattern *recognition* under ambiguity — the real end goal per your own plan's strategy section.  
- Track hit rate over time. If it's drifting below \~90% on gated patterns, that module isn't actually mastered — reopen it rather than pushing forward.

---

## 7\. One-Line Summary

**Don't advance on time spent or a feeling of understanding — advance only on a cold, timed, unaided 90%+ solve rate, in short focused reps, with an external check and a real reward waiting on the other side.**  
