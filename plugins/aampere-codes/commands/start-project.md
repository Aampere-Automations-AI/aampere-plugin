---
description: Start a new Aampere project in this folder — the only command you need for new projects
---

# /start-project — create a new Aampere project

You are helping an Aampere colleague who is probably non-technical and has never
used git. All text you show them must be extremely simple English with zero
git/developer jargon ("save to GitHub", never "push to remote origin").
Load and follow the `vibe-coding-standards` skill for all technical work.

## Step 0 — print the plan first

Before doing anything else, print exactly this checklist:

```
Here's what happens now:
  ① A few questions about your project (~2 min)
  ② I create the project plan and folder structure
  ③ I set up safe storage on GitHub
  ④ You get a summary + link
```

As each stage completes, re-print the checklist with finished items ticked (✅).

(Silent pre-check, before printing anything: if the current folder already
contains a project — a `.aampere.json` or `package.json` exists — do NOT print
the checklist; tell the user this folder already has a project and suggest
`/continue-tasks` here, or `/start-project` in a new, empty folder. Then stop.)

## Step 1 — quiet prerequisite check

Check quietly, fix inline, and NEVER block the project on any of this:

1. `git --version` — if missing, guide installation in plain words
   (Windows: `winget install Git.Git`; macOS: `xcode-select --install` or Homebrew).
2. `gh --version` — if missing, guide installation
   (Windows: `winget install GitHub.cli`; macOS: `brew install gh`).
3. Git identity — if `git config user.name` or `git config user.email` is empty,
   ask for their name and **work email** and set both with
   `git config --global user.name/user.email` (otherwise their first save fails
   with a confusing error).
4. `gh auth status` — judge by the EXIT CODE, not the wording (a stale token can
   print misleading text). If not logged in, ask: "Do you have a GitHub account?"
   - **No account:** guide them to create a free account at github.com in their
     browser, **using their work email**. Do not wait for them — if they'd rather
     do it later, continue fully locally and remind them at the end.
   - **Has an account:** run `gh auth login --web --hostname github.com` and talk
     them through the browser login.

If anything here is deferred, remember it and continue — everything except the
GitHub backup works without it.

## Step 2 — intake interview (stage ①)

Ask these in plain language, ONE question at a time, waiting for each answer:

1. What should the app do? (a sentence or two is fine)
2. Who will use it?
3. What information does it work with — and does it need to connect to other
   tools (the company's CRM, automation platforms, messaging tools, spreadsheets, …)?
4. Roughly how big does this feel: a quick helper, a small tool, or a bigger project?

Stack decision: apply the Aampere standard stack **silently** — do not ask about
or even mention technology choices. ONLY if the answers reveal a genuine need the
standard stack cannot cover (e.g. a Python-only ML library), explain the deviation
in plain language, get explicit confirmation, record it in `.aampere.json` under
`stackDeviations`, and check "Other: ___" in `docs/architecture.md` with the reason.

## Step 3 — scaffold the project (stage ②)

1. Copy the project skeleton from `${CLAUDE_PLUGIN_ROOT}/template/` into the
   current folder — ALL files, including dotfiles (`.gitignore`, `.env.example`,
   `.gitattributes`, `CLAUDE.md`, `.github/…`, `.betterleaks.toml`,
   `.aampere/standards.md`).
2. Create `.aampere.json`:
   `{ "name": "<kebab-case-project-name>", "createdAt": "<YYYY-MM-DD>", "stackDeviations": [] }`
3. Fill in from the intake answers:
   - `README.md` — what the app does, how to run it, and the "Where secrets come
     from" section listing each needed credential and who to ask (usually Marco).
   - `docs/roadmap.md` — Purpose, Users, Features (In scope), Explicitly out of
     scope, and a first Status checklist of rough milestones.
   - `docs/architecture.md` — tick the stack components actually used (tick
     SQLite/better-sqlite3 only if the app stores local data), replace the Mermaid
     placeholder with a real first diagram, describe the components.
   - `package.json` — set `name` to the project name.
4. Secrets (only if the app needs any): add every required variable to
   `.env.example` with a placeholder and a one-line comment on where to get it;
   list the same names in `REQUIRED_ENV_VARS` in `src/env.ts`; explain to the user
   how to create `.env` and fill in real values themselves. NEVER ask them to
   paste secret values into the chat.
5. Dependencies: run `npm install`. Add extra packages only after checking the
   registry (`npm view <pkg> version`, install `@latest`). Add `better-sqlite3`
   only if local data storage is needed. Then verify every version in
   `package.json` against the registry — "verified" means: the version exists and
   is the newest one **compatible with the project's peer-dependency ranges**.
   Do NOT blindly bump to latest: e.g. `typescript` is deliberately pinned to the
   newest version `typescript-eslint` supports; bumping past a peer range breaks
   the quality checks. The lockfile (`package-lock.json`) must be committed.
6. Make it a git project (`git init -b main` if not already one) and run
   `bash scripts/install-hooks.sh` to switch on the secret protection.
7. Run `npm run lint`, `npm run typecheck`, `npm test` — all must pass; fix
   anything that doesn't.

## Step 4 — first save

`git add -A` and commit with the message `chore: start <project-name>`.
The secret scan runs automatically. If it blocks the save, fix exactly what its
message says (move values into `.env`) — never bypass it.

## Step 5 — safe storage on GitHub (stage ③, lazy invite — never block)

Only if `gh` is logged in:

1. `USERNAME=$(gh api user -q .login)`
2. Check org access:
   `gh api user/memberships/orgs/Aampere-Automations-AI -q .state` — treat the
   value `active` as access; any error or other value as no access.
3. **Access:** create the private repo and upload in one step:
   `gh repo create Aampere-Automations-AI/<project-name> --private --source . --push`
   (if the name is taken, append `-2`, `-3`, …). Show the repo link.
4. **No access (or not logged in):** do NOT block, do NOT retry. Tell the user:

   > Everything is saved on your computer. To also back it up to GitHub, send
   > Marco this message on Slack:
   > **"Please invite `<USERNAME>` to the Aampere GitHub org."**
   > Once Marco says it's done, just run `/ship-project` — it finishes the GitHub setup.

   Filling in `<USERNAME>`: use the real username from `gh api user -q .login`
   when logged in. When NOT logged in, write the literal placeholder
   `<your-github-username>` and tell them to replace it with their username —
   never leave it empty, never guess. If they don't have a GitHub account yet,
   remind them to create one first at github.com with their work email, then
   send Marco the message with their new username, then run `/ship-project`.

## Step 6 — summary (stage ④)

Re-print the checklist fully ticked (mark ③ as "pending — see note" if GitHub
access is missing). Then show, briefly:

- the project name and what was created,
- the GitHub link (if it exists),
- the three things to remember: `/ship-project` (save to GitHub), `/help-project` (all commands),
  and — recommended next step for anything that's more than a quick helper —
  `/plan-project` to flesh out the plan together.
