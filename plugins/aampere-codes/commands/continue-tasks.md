---
description: Continue where we left off — perfect after a break or in a new session
---

# /continue-tasks — resume work

Load the `vibe-coding-standards` skill. Simple English, no jargon. This must work
even if the last session ended mid-task.

## Figure out where we are

Read, in this order:

1. `.aampere.json` and `README.md` (what is this project?)
2. `docs/roadmap.md` — the status checklist
3. `docs/tasks/` — if task-group files exist, find the first file with unchecked
   items (that's the active group)
4. `git log --oneline -10` — what happened recently
5. `git status` — uncommitted changes mean the last session probably stopped
   mid-task; read the changed files to understand what was in flight
6. If a GitHub remote exists and `gh` works: `gh run list --limit 1` (any error
   → skip silently). A FAILED latest run belongs in the report below — and gets
   fixed first, following the "If GitHub shows a red ✗" section of
   `/ship-project` (plain English: quality failure → fix + save; secret finding
   → value into `.env`, tell Marco to swap the key, offer history cleaning).

## Report back, then confirm

Print a short **"Where we left off"** summary:

- **Done:** the most recently completed items / commits (2–4 bullets max)
- **In progress:** what's half-finished, including any unsaved changes found
- **Next:** the next open items from the active task group (or roadmap checklist)

Then ask the user to confirm or redirect: "Shall I continue with this, or do you
want to work on something else?"

## Continue

Once confirmed:

- First run `bash scripts/install-hooks.sh` once (quiet, safe to repeat) — this
  re-activates the secret scan if the project landed on this computer without it
  (fresh download, second machine).
- If there are uncommitted changes: finish or tidy the in-flight work first, get
  lint/typecheck green, then commit it properly. Never discard the user's work
  unless they explicitly ask.
- Work through the next open items following the vibe-coding-standards skill: check items off
  in the task file / roadmap as completed, run lint + typecheck before each
  commit, commit per completed unit, push after each commit if a remote exists
  (no remote → mention once: "Not backed up to GitHub yet — run /ship-project whenever
  you want that"). A unit of work may cover several closely-related checklist
  items in one commit; check off only items that are genuinely complete — be
  conservative about partially-done ones.
- If the whole active task group gets finished, close it out (all boxes checked,
  milestone ticked in the roadmap), commit, push — and show what the next group
  will be.
