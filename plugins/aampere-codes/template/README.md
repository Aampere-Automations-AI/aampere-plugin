# (App name)

## What this app does

_One or two sentences in plain language. Filled in when the project is created._

## How to run it

```bash
npm install
npm start
```

## Where secrets come from

This app reads passwords and API keys **only** from a file called `.env` on your computer.

1. Copy `.env.example` to a new file named `.env`.
2. Fill in the real values. Ask the system owner (usually Marco) for them — they are shared via the password manager, never via chat or email.
3. If a value is missing, the app stops at startup and tells you exactly which one.

The `.env` file is ignored by git: it never gets saved to GitHub.

## Links to docs

- [Roadmap & task list](docs/roadmap.md)
- [Architecture & tech stack](docs/architecture.md)
- [Task groups (larger projects)](docs/tasks/)
