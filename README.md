# aampere-plugin

Claude Code plugin marketplace for Aampere's internal vibe-coding platform.
It contains one plugin, **aampere-codes**, which gives every session:

- `/start-project` — new project setup (interview → scaffold → secret protection → first save → GitHub)
- `/plan-project` — flesh out the roadmap together
- `/split-into-tasks` — break a fleshed-out roadmap into session-sized task groups
- `/continue-tasks` — resume after a break
- `/ship-project` — save everything to GitHub (creates the backup repo when access exists)
- `/help-project` — command overview + micro-FAQ
- **vibe-coding-standards** skill — Aampere's mandatory standards for vibe-coded
  apps (stack, secrets, dependency versions, commit cadence, quality gates,
  docs workflow)

## Install

Aampere org members get this plugin automatically through managed settings.
Manual install from any Claude Code session — no GitHub account needed:

```
/plugin marketplace add Aampere-Automations-AI/aampere-plugin
/plugin install aampere-codes@aampere-codes
```

## Update

Automatic (the marketplace is registered with auto-update). Manual:

```
/plugin marketplace update aampere-codes
```

## Structure

```
.claude-plugin/marketplace.json     ← marketplace manifest
plugins/aampere-codes/
  .claude-plugin/plugin.json        ← plugin manifest
  commands/*.md                     ← the six commands
  skills/vibe-coding-standards/     ← shared standards (auto-loaded when coding)
  template/                         ← bundled copy of aampere-template used by
                                      /start-project, so setup never depends on org access
```

Notes for maintainers:

- Keep `plugins/aampere-codes/template/` in sync with the `aampere-template`
  repo when the template changes — **except** `template/.betterleaks.toml`,
  which here deliberately contains only the default rule set. Every project's
  pre-commit hook fetches the central rules and commits them into the project
  as soon as the user has org access; betterleaks' built-in rules always apply
  before that.
