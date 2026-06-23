# Agent Task Rules

Enforce on every task regardless of size.

## 1. Commits

- Format: `<type>(<scope>): <subject>` — conventional commits
- Stage only task-touched files: `git add path/to/file` not `git add .`
- Every completed task ends with a commit — no exceptions
- If task cannot be completed, do not commit; explain the blocker

## 2. Pre-commit checks

| Change type | Check |
|---|---|
| TypeScript | `npm run typecheck` |
| Any code | `npm run lint` |
| Both | Run both |

Fix all errors before committing. Never skip with `--no-verify`.

## 3. Docs

Run `npm run docs:list` (if present) before code changes. Read any doc whose `read_when` hint matches the task. Update relevant docs in the same commit as the code change.

## 4. Feature scope

Do not bundle unrelated cleanup into a task commit. If you notice something worth fixing, flag it as a separate follow-up — do not silently expand scope.

## 5. No magic strings, no hardcoded config

See CLAUDE.md patterns section.
