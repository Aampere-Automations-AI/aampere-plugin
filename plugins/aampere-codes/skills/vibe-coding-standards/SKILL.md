---
name: vibe-coding-standards
description: Aampere's mandatory vibe-coding standards — the rules for apps built with Claude Code, not Aampere's general coding standards. Use whenever writing or changing code, adding dependencies, committing, or planning work in an Aampere vibe-coding project (any project created by /start-project or containing a .aampere.json file). Always load this before implementing anything in such a project.
---

# Aampere vibe-coding standards — where to find them

These standards apply specifically to Aampere's vibe-coded internal apps
(projects created with /start-project). They are ONE centrally managed document
(`standards.md` in the `aampere-standards` repo). Read the nearest copy NOW and
follow it, trying in this order:

1. `.aampere/standards.md` in the current project (the save-protection hook
   keeps this fresh automatically)
2. `~/.aampere/cache/standards.md` (local cache)
3. `${CLAUDE_PLUGIN_ROOT}/template/.aampere/standards.md` (bundled with this plugin)

If `gh` is available and logged in, you may refresh the cache first (skip
silently on any failure — offline or no org access is normal):

```bash
gh api repos/Aampere-Automations-AI/aampere-standards/contents/standards.md \
  -H "Accept: application/vnd.github.raw" > ~/.aampere/cache/standards.md
```

## Hard rules that apply even if no copy is readable

1. Secrets only via `.env` (gitignored) / `.env.example` (placeholders) — never
   hardcoded, never committed; read only through `src/env.ts` (dotenv) with
   startup validation and plain-English missing-variable errors.
2. Never use `--no-verify`. If the secret scan blocks a save, fix the finding.
3. Never write dependency versions from memory — check the npm registry first
   (`npm view <pkg> version`), install the newest version compatible with the
   project's peer-dependency ranges.
4. Run `npm run lint` and `npm run typecheck` before every commit; self-review
   the diff; every loop needs an exit condition or max-iteration guard.
5. Commit after each completed unit of work (conventional message); push right
   after when a GitHub remote exists.
6. All user-facing text: simple English, zero git jargon.
