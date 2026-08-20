---
description: Save everything to GitHub — creates the online backup if it doesn't exist yet
---

# /ship-project — save everything to GitHub

Load the `vibe-coding-standards` skill. Simple English, no jargon. Never block —
whatever happens, the user's work stays safe on their computer.

## Steps

1. **Protection on?** Run `bash scripts/install-hooks.sh` once (quiet, safe to
   repeat) — this re-activates the secret scan if the project was copied to a
   new computer or freshly downloaded, where hooks don't come along.

2. **Is GitHub showing a red ✗?** If a remote exists and `gh` works, check the
   latest background check: `gh run list --limit 1` (any error → skip silently).
   If the latest run FAILED, deal with that first — see "If GitHub shows a red ✗"
   below — then continue.

3. **Anything unsaved?** If `git status` shows changes:
   - run `npm run lint` and `npm run typecheck` (fix straightforward findings),
   - commit everything with a sensible conventional message describing what
     actually changed.
   - If the secret scan blocks the save: fix exactly what its message says (move
     the value into `.env`, placeholder into `.env.example`) and commit again.
     NEVER bypass the scan.

4. **Online backup already set up?** If a GitHub remote exists: push. Then show:
   > ✅ Saved to GitHub: <repo link>

5. **No remote yet?** Check `gh auth status`, then — in ONE command (never reuse
   `$USERNAME`; on Windows that's the Windows login name, not GitHub):
   `GH_LOGIN=$(gh api user -q .login); STATE=$(gh api user/memberships/orgs/Aampere-Automations-AI -q .state 2>/dev/null); echo "login=$GH_LOGIN state=$STATE"`
   Only `active` counts as access; `pending` means invited but not yet accepted.

   - **Access (`active`):** create and upload in one step:
     `gh repo create Aampere-Automations-AI/<project-name> --private --source . --push`
     (project name from `.aampere.json`; if taken, append `-2`, `-3`, …).
     Then show the ✅ line with the repo link.
     If the upload is REFUSED with an error mentioning `workflow` scope or
     "refusing to allow an OAuth App": GitHub needs one extra permission to
     upload the project's built-in safety check. Say only: "GitHub needs one
     extra permission — I'll set it up, you just click Approve in the browser."
     Then run it YOURSELF, non-interactively:
     `printf '\n' | gh auth refresh -h github.com -s workflow`
     — it prints an 8-character code; show the user that code and tell them to
     type it into the GitHub page that opens (github.com/login/device) and
     click Authorize. Then retry the upload ONCE.

   - **Invited but not accepted (`pending`):**

     > Marco has already invited you — the invitation is waiting in your email
     > (or as a yellow banner on github.com). Click **Accept**, then run
     > `/ship-project` again and I'll finish the setup.
     > (Invitations expire after 7 days — if it's been longer, ask Marco for a new one.)

   - **No access:** repeat the invite instruction:

     > Everything is saved on your computer — it just isn't backed up to GitHub
     > yet. Send Marco this message on Slack:
     > **"Please invite `<GH_LOGIN>` to the Aampere GitHub org."**
     > When his invitation arrives, ACCEPT it (email or github.com banner),
     > then run `/ship-project` again.

     (`<GH_LOGIN>` = the real login printed above. If gh isn't logged in, show
     the literal placeholder `<your-github-username>` and tell them to replace
     it — never leave it empty.)

   - **Not logged in / no account:** guide them (free account at github.com with
     their work email, then
     `gh auth login --web --hostname github.com --scopes workflow`), or tell
     them to come back with `/ship-project` when they've done it. Never block
     their local work.

## If GitHub shows a red ✗ (a background check failed)

Stay calm and plain-spoken: nothing is lost, nothing is broken on their computer.
Find out what failed: `gh run view --log-failed` (or `gh run list` first).

- **Quality check failed (lint / typecheck):** fix the findings locally, run
  `npm run lint` and `npm run typecheck` until green, commit, push. Confirm:
  "GitHub will re-check in a minute — the red ✗ will turn into a green ✓."

- **Secret scan failed:** something in the project's saved history looks like a
  password or API key. Handle it in this exact order:
  1. Explain plainly: "A value that looks like a password was saved earlier.
     Your work is fine — but that key must be treated as no longer secret."
  2. Make sure the value now lives ONLY in `.env` and the code reads it from
     there (placeholder in `.env.example`).
  3. Tell the user to message Marco which key it is, so he can swap it —
     this is the important part; a swapped key makes the old one worthless.
  4. Offer to clean the project's history so the check can turn green: with the
     user's explicit OK, squash to a fresh history and force-upload:
     `git checkout --orphan fresh-main && git add -A && git commit -m "chore: clean history" && git branch -M main && git push --force origin main`
     Explain it as: "I'll repack the project's save history without the secret
     and upload it again."
  5. Never "fix" a red scan by deleting files on GitHub, editing the scan rules,
     or creating ignore files — the only real fixes are swapping the key and
     cleaning the history.
