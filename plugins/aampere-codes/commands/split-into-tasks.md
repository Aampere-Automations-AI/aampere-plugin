---
description: Split a fleshed-out roadmap into session-sized task groups (for larger projects)
---

# /split-into-tasks — break the roadmap into work packages

Load the `vibe-coding-standards` skill. Simple English, no jargon.

## Guard first

Read `docs/roadmap.md` and `.aampere.json`. If the roadmap is still skeletal —
placeholder text ("_..._"), an empty or generic status checklist, or missing
In-scope/Out-of-scope lists — OR `.aampere.json` has no `plannedAt` entry
(meaning `/plan-project` hasn't been run), politely refuse:

> The roadmap isn't fleshed out enough yet to split into task groups.
> Run `/plan-project` first — it takes a few minutes and makes the split much
> better.

Do not proceed in that case.

## Create the task groups

1. Derive an ordered set of task groups from the roadmap. Each group must be:
   - completable in roughly **one working session**,
   - self-contained enough to start from a fresh session,
   - ordered so earlier groups unblock later ones.

2. Write them as numbered files in `docs/tasks/`:
   `01-setup.md`, `02-core.md`, `03-….md` — each file containing:
   - a title and a 1–3 sentence **goal statement** (what exists when this group
     is done),
   - a `- [ ]` checkbox list of concrete tasks.

3. Cross-link: REPLACE the roadmap's detailed Status-checklist items with the
   milestone view — exactly one `- [ ]` line per task group (linked to its file),
   checked off when the group's file is fully done — plus a note at the top that
   detailed work now lives in `docs/tasks/`. Don't keep two diverging checklists.

4. Commit (`docs: split roadmap into task groups`) — push if a remote exists (no
   remote → one line: "Not backed up to GitHub yet — run /ship-project whenever you want
   that").

5. Show the user a one-line-per-group overview and finish with:

   > Ready to build. Say "let's go" to start on the first group now, or run
   > `/continue-tasks` any time (also after a break) to pick up where we left off.

Note: this command is never part of `/start-project` — it only runs on an explicitly
fleshed-out roadmap.
