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

## 5. Vertical slices and SOLID

- Organize product code as vertical feature slices: `src/features/<feature>/`. A feature owns its public API, components, hooks, contracts, and feature-only helpers.
- Use `index.ts` as the only public API. Other features and route/composition code may import only that public API, never `components/`, `hooks/`, or private helpers.
- Keep UI components in `components/`, focused React state/effect logic in `hooks/`, and non-UI feature helpers in `lib/` or clearly named feature-local modules.
- Apply SOLID at every boundary: one coherent responsibility per module; depend on narrow callbacks/contracts rather than another feature's internals; keep persistence, network, and other adapters behind the owning feature's hook or helper.
- Keep production feature modules at or below 500 lines. Split by responsibility before extending a growing module. An exception needs a documented ADR and focused test.
- Run `npm run architecture:check` after changing feature structure. It is part of the template's required verification.

## 6. Autonomous completion

- Treat an implementation request as an end-to-end commitment: investigate, implement, test, verify applicable UI, commit, and push without waiting for a follow-up prompt.
- Do not hand off partial refactors. Ask only when a decision materially changes product behaviour or requires authority outside the repository.
- Make safe decisions from repository context and record the rationale in the final handoff.

## 7. No magic strings, no hardcoded config

See CLAUDE.md patterns section.
