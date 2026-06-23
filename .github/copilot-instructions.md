# GitHub Copilot Instructions

Read CLAUDE.md first — it defines the patterns, commit policy, and doc system that apply to all tasks in this repo.

## Quick reference

- Result type: `src/lib/result.ts` — use at all business logic boundaries
- Env vars: extend `src/lib/env.ts` — never read `process.env` directly
- Utility types: `src/lib/types.ts`
- Domain docs: `docs/` — scan `read_when` hints and load relevant files before coding
- Feature structure: `src/features/<name>/index.ts` is the public API

## Non-negotiables

- `npm run typecheck` before committing TypeScript changes
- `npm run lint` before committing any code
- Conventional commit format: `<type>(<scope>): <subject>`
- No magic strings — use `as const` objects
- No `any` — ever
