---
description: What can I do? All Aampere commands + answers to common questions
---

# /help-project — Aampere quick help

Print the following content (adjust nothing except formatting):

## The commands

- **/start-project** — begin a brand-new project in an empty folder. Asks a few questions,
  sets everything up, makes the first save. The only command you need to remember
  for new projects.
- **/plan-project** — flesh out the plan together: what's in, what's out, and the
  step-by-step checklist. Recommended for anything bigger than a quick helper.
- **/split-into-tasks** — for larger projects: breaks the finished roadmap into
  work packages sized for one session each.
- **/continue-tasks** — pick up where you left off, even after weeks. Shows
  what's done, what's in progress, and what's next.
- **/ship-project** — save everything to GitHub. Also sets up the online backup the first
  time (once you have access).
- **/help-project** — this overview.

## Quick answers

**Where do my secrets go (passwords, API keys)?**
Into the file called `.env` in your project folder — and nowhere else. That file
never leaves your computer. Ask the system owner (usually Marco) for real values;
they're shared via the password manager, never via chat. The app tells you at
startup if something's missing.

**I got "SAVE BLOCKED — it looks like a password or API key is in your changes." What now?**
That's the secret protection doing its job — nothing was saved or lost. The
message lists the file and line. Say "help me fix the blocked save" and it will
be sorted: the secret value moves into `.env`, and the save works again.

**How do I continue an old project?**
Open the project's folder, start Claude Code, run `/continue-tasks`. You'll get a
short "where we left off" summary and can carry straight on.

**How do I get GitHub access?**
Send Marco this message on Slack: "Please invite `<your-github-username>` to the
Aampere GitHub org." (No GitHub account yet? Create a free one at github.com with
your work email first.) When his invitation arrives, **accept it** — check your
email or the yellow banner on github.com — then run `/ship-project`. Done. Until
then, everything simply stays saved on your computer.

**Marco says he invited me, but /ship-project still says I have no access?**
The invitation has to be accepted by you: look for GitHub's email (or the yellow
banner when you visit github.com), click **Accept**, then run `/ship-project`
again. Note: invitations expire after 7 days — if it's been longer, ask Marco to
send a new one.

**GitHub emailed me "Some checks were not successful" / I see a red ✗. What now?**
Nothing is lost and nothing on your computer is broken. Open the project folder
in Claude Code and say: **"GitHub shows a red X — check and fix it."** If the
email or page mentions a password or API key, also tell Marco which one — that
key needs to be swapped. Never try to fix a red ✗ by deleting things on GitHub.
