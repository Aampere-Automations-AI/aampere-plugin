---
description: Save everything to GitHub — creates the online backup if it doesn't exist yet
---

# /ship-project — save everything to GitHub

Load the `vibe-coding-standards` skill. Simple English, no jargon. Never block —
whatever happens, the user's work stays safe on their computer.

## Steps

1. **Anything unsaved?** If `git status` shows changes:
   - run `npm run lint` and `npm run typecheck` (fix straightforward findings),
   - commit everything with a sensible conventional message describing what
     actually changed.
   - If the secret scan blocks the save: fix exactly what its message says (move
     the value into `.env`, placeholder into `.env.example`) and commit again.
     NEVER bypass the scan.

2. **Online backup already set up?** If a GitHub remote exists: push. Then show:
   > ✅ Saved to GitHub: <repo link>

3. **No remote yet?** Check `gh auth status`, then org access:
   `USERNAME=$(gh api user -q .login)` and
   `gh api user/memberships/orgs/Aampere-Automations-AI -q .state`
   (only the value `active` counts as access).

   - **Access:** create and upload in one step:
     `gh repo create Aampere-Automations-AI/<project-name> --private --source . --push`
     (project name from `.aampere.json`; if taken, append `-2`, `-3`, …).
     Then show the ✅ line with the repo link.

   - **No access:** repeat the invite instruction:

     > Everything is saved on your computer — it just isn't backed up to GitHub
     > yet. Send Marco this message on Slack:
     > **"Please invite `<USERNAME>` to the Aampere GitHub org."**
     > Once Marco says it's done, run `/ship-project` again and I'll finish the setup.

     (`<USERNAME>` = the real login from `gh api user -q .login`. If gh isn't
     logged in, show the literal placeholder `<your-github-username>` and tell
     them to replace it — never leave it empty.)

   - **Not logged in / no account:** guide them (free account at github.com with
     their work email, then `gh auth login --web`), or tell them to come back
     with `/ship-project` when they've done it. Never block their local work.
