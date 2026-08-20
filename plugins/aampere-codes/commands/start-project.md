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

(Silent pre-checks, before printing anything:

- If the current folder already contains a project — a `.aampere.json` or
  `package.json` exists — do NOT print the checklist; tell the user this folder
  already has a project and suggest `/continue-tasks` here, or `/start-project`
  in a new, empty folder. Then stop.
- If the current folder is NOT empty (ignore OS junk like `desktop.ini`,
  `Thumbs.db`, `.DS_Store` and empty subfolders), or is clearly a personal
  folder (home directory, Desktop, Documents, Downloads): NEVER scaffold here —
  a later save would upload personal files to a company repo. Ask one question:
  "This folder already has other files in it. Every app needs its own empty
  folder — should I create one in here and set your app up inside it?"
  If yes: after the interview reveals the app name, create that subfolder and do
  ALL remaining steps inside it (cd into it in every command), and make the
  final summary say clearly: "Your app lives in the new folder `<name>` — next
  time, open Claude Code directly in that folder." If they'd rather choose the
  place themselves: tell them to create an empty folder, open Claude Code there,
  and run `/start-project` again — then stop.)

## Step 1 — quiet prerequisite check

Check quietly, fix inline, and NEVER block the project on any of this:

1. `git --version` — if missing, guide installation in plain words
   (Windows: `winget install Git.Git`; macOS: `xcode-select --install` or Homebrew).
2. `node --version` and `npm --version` — the apps run on Node.js, so this IS
   needed before building starts. If missing, install it for them, explaining in
   plain words (Windows: `winget install OpenJS.NodeJS.LTS`; macOS:
   `brew install node`, installing Homebrew first if needed). If the fresh
   install isn't found afterwards, the PATH is stale: have them close and reopen
   Claude Code, then run `/start-project` again — it resumes cleanly. Any Node
   ≥ 20 that already works is fine; never upgrade a working Node unasked.
   If the install fails or they defer it: still do the interview and scaffold
   the files, skip the npm steps, and end with a plain note that the app can't
   run yet — "ask me to finish the setup once Node is installed".
3. `gh --version` — if missing, guide installation
   (Windows: `winget install GitHub.cli`; macOS: `brew install gh`).
4. Git identity — if `git config user.name` or `git config user.email` is empty,
   ask for their name and **work email** and set both with
   `git config --global user.name/user.email` (otherwise their first save fails
   with a confusing error).
5. `gh auth status` — judge by the EXIT CODE, not the wording (a stale token can
   print misleading text). If not logged in, ask: "Do you have a GitHub account?"
   - **No account:** guide them to create a free account at github.com in their
     browser, **using their work email**. Do not wait for them — if they'd rather
     do it later, continue fully locally and remind them at the end.
   - **Has an account:** run
     `gh auth login --web --hostname github.com --scopes workflow`
     (the extra scope lets the project's built-in safety check upload later
     without any further approval) and talk them through it: gh prints an
     8-character code — show it to them and explain that a browser page opens
     where they enter the code and click Authorize.
6. Early org-access check (only if logged in). IMPORTANT: never read a plain
   `$USERNAME` variable — on Windows that's the WINDOWS login name, not GitHub,
   and shell state doesn't survive between commands. Always fetch and print the
   login in ONE command:
   `GH_LOGIN=$(gh api user -q .login); STATE=$(gh api user/memberships/orgs/Aampere-Automations-AI -q .state 2>/dev/null); echo "login=$GH_LOGIN state=$STATE"`
   - `active` → access exists; nothing to say.
   - `pending` → Marco already invited them, the invitation just hasn't been
     accepted yet. Tell them now:
     > Marco's GitHub invitation is already waiting for you! Check your email
     > (or the yellow banner on github.com) and click **Accept** — no rush,
     > we can build meanwhile and I'll check again at the end.
   - anything else → no access yet; say this now, BEFORE the interview, so the
     invite can happen in parallel with the build:
     > One thing you can start in parallel: the GitHub backup needs a one-time
     > invite from Marco. Send him this on Slack now, then we simply keep going —
     > I'll check again once your app is ready:
     > **"Please invite `<GH_LOGIN>` to the Aampere GitHub org."**
     (insert the real login printed above). If they are not logged in or have no
     account yet, fold this into the account guidance from item 5 instead: once
     the account exists, send the same message with the new username. Never wait
     for a reply — continue straight to the interview.

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

First confirm the protection is actually on: `.git/hooks/pre-commit` must exist;
if it doesn't, run `bash scripts/install-hooks.sh` again (it's quiet and safe to
repeat). Then `git add -A` and commit with the message `chore: start <project-name>`.
The secret scan runs automatically. If it blocks the save, fix exactly what its
message says (move values into `.env`) — never bypass it.

## Step 5 — safe storage on GitHub (stage ③, lazy invite — never block)

Only if `gh` is logged in — and RE-CHECK the org access now even if step 1 found
none: the invite may have arrived (or been accepted) while the app was built.

1. In ONE command (never reuse `$USERNAME` — on Windows it's the Windows login):
   `GH_LOGIN=$(gh api user -q .login); STATE=$(gh api user/memberships/orgs/Aampere-Automations-AI -q .state 2>/dev/null); echo "login=$GH_LOGIN state=$STATE"`
   Only `active` counts as access; `pending` means invited but not yet accepted.
2. **Access (`active`):** create the private repo and upload in one step:
   `gh repo create Aampere-Automations-AI/<project-name> --private --source . --push`
   (if the name is taken, append `-2`, `-3`, …). Show the repo link. If step 1
   had found no access, add one friendly line: "Your GitHub access arrived while
   we were building — the online backup is now set up."
   If the upload is REFUSED with an error mentioning `workflow` scope or
   "refusing to allow an OAuth App": GitHub needs one extra permission to upload
   the project's built-in safety check. Say only: "GitHub needs one extra
   permission — I'll set it up, you just click Approve in the browser." Then run
   it YOURSELF, non-interactively: `printf '\n' | gh auth refresh -h github.com -s workflow`
   — it prints an 8-character code; show the user that code and tell them to
   type it into the GitHub page that opens (github.com/login/device) and click
   Authorize. Then retry the upload ONCE.
3. **Invited but not accepted (`pending`):** tell them:
   > Marco has already invited you — the invitation is waiting in your email
   > (or as a yellow banner on github.com). Click **Accept**, then run
   > `/ship-project` and I'll finish the backup in one step.
   > (Invitations expire after 7 days — if it's been longer, ask Marco for a new one.)
4. **No access (or not logged in):** do NOT block, do NOT retry. If they already
   sent the Slack message in step 1, keep it short:

   > Everything is saved on your computer. The GitHub backup is just waiting for
   > Marco's invite — when it arrives, ACCEPT it (email or github.com banner),
   > then run `/ship-project` and it finishes the setup in one step.

   If the Slack message was NOT sent yet (or step 1 couldn't show a real
   login), give the full instruction now:

   > Send Marco this message on Slack:
   > **"Please invite `<GH_LOGIN>` to the Aampere GitHub org."**
   > When his invitation arrives, accept it (email or github.com banner),
   > then run `/ship-project`.

   Filling in `<GH_LOGIN>`: use the real login from `gh api user -q .login`
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
