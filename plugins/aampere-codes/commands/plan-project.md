---
description: Flesh out the project plan together — sharpen scope, decide what's in and out, build the task checklist
---

# /plan-project — turn a rough idea into a clear roadmap

You are refining the plan of an existing Aampere project with a probably
non-technical user. Simple English, no jargon. Load the `vibe-coding-standards` skill.

## Steps

1. Read `.aampere.json`, `README.md`, `docs/roadmap.md` and the recent commit
   messages to understand the current state. If this doesn't look like an Aampere
   project at all, suggest running `/start-project` first and stop.

2. Refine the scope WITH the user, one question at a time — only questions that
   genuinely change what gets built (aim for 3–6, not an interrogation):
   - What does "done" look like for version 1?
   - Which features matter most / could wait?
   - Any open questions from the roadmap ("_..._" placeholders) — resolve them.

3. Rewrite `docs/roadmap.md`:
   - **Purpose** and **Users** — crisp, one short paragraph each.
   - **Features (In scope)** — the agreed list for v1.
   - **Explicitly out of scope** — everything consciously deferred or rejected
     (this list is as important as the in-scope one).
   - **Status checklist** — an ORDERED `- [ ]` list of concrete, verifiable steps
     from "now" to "v1 done". Each item small enough to check off in one sitting.
     Keep already-completed items checked.

4. Show the user the new roadmap in a compact form and confirm it matches their
   thinking. Adjust until it does.

   (If the roadmap is already fully fleshed out, don't re-interrogate: confirm
   it still matches in one question, update only what changed, and skip the
   commit if nothing changed.)

5. Record that planning happened: add/update `"plannedAt": "<YYYY-MM-DD>"` in
   `.aampere.json`. Then commit (`docs: flesh out roadmap`) — and push if the
   project has a GitHub remote. If there is no remote, add one line: "Not backed
   up to GitHub yet — run /ship-project whenever you want that."

6. End with exactly this guidance:

   > **Small project?** We work directly from the roadmap checklist — just say
   > what to tackle or run `/continue-tasks`.
   > **Larger project?** Run `/split-into-tasks` to break the roadmap into
   > session-sized work packages.
