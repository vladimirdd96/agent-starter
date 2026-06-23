# Agent Instructions

## Core Principle

Every pattern here exists to reduce the number of files an agent must read to complete a task correctly. When in doubt: smaller surface area, explicit contracts, single source of truth.

## Docs system

Before writing code, scan `docs/` for files whose `read_when` hint matches your task keywords. Load only relevant docs — skip the rest.

```
docs/auth.md          <!-- read_when: auth, login, logout, session, JWT, token, password, oauth -->
docs/database.md      <!-- read_when: database, DB, query, migration, schema, table, column -->
docs/ui-patterns.md   <!-- read_when: component, screen, style, UI, layout, design, theme -->
docs/i18n.md          <!-- read_when: text, string, translation, language, i18n, locale -->
docs/api.md           <!-- read_when: API, endpoint, route, request, response, REST, fetch -->
```

## Commit policy

- Format: `<type>(<scope>): <subject>` — conventional commits, lowercase, imperative
- Types: `feat` `fix` `chore` `docs` `refactor` `test` `ci`
- Stage **only task-touched files** — never `git add .`
- Every completed task must end with a commit

## Pre-commit checks

Run these before every commit matching the condition:

| Condition | Command |
|---|---|
| TypeScript changes | `npm run typecheck` |
| Any code change | `npm run lint` |
| Docs or workflow changes | review `docs/` for stale content |

## Patterns

### Result type

Use `Result<T, E>` from `src/lib/result.ts` at **all** business logic boundaries. Never `throw` from service or repository functions — return a typed error instead.

```ts
import { ok, err } from '@/lib/result'

async function getUser(id: string): Promise<Result<User, 'not_found' | 'db_error'>> {
  const row = await db.users.findById(id)
  if (!row) return err('not_found')
  return ok(row)
}
```

Callers must handle both branches. Agents cannot silently swallow errors.

### Environment variables

Extend `src/lib/env.ts` with your vars. Never read `process.env` directly elsewhere — always import from `env`. Types are derived from the Zod schema; no manual type declarations.

### Zod at system boundaries

Parse all external data — API responses, user input, DB results, webhook payloads — through Zod schemas. Derive TypeScript types from schemas with `z.infer<typeof Schema>`. Types are never written by hand at boundaries.

### Feature folders

Group by feature, not layer. Each feature folder owns its types, logic, and (if applicable) UI.

```
src/features/
  auth/
    index.ts          ← public API only (explicit named re-exports)
    auth.types.ts
    auth.service.ts
    auth.schema.ts
    auth.test.ts
```

Nothing outside a feature folder imports from inside it — only from `index.ts`. This is enforced by `eslint` import rules.

### No magic strings

Status values, role names, event names, route paths → `const` objects with `as const`. Types derived from the object.

```ts
export const UserRole = { Admin: 'admin', Member: 'member' } as const
export type UserRole = typeof UserRole[keyof typeof UserRole]
```

### Discriminated unions over boolean bags

Prefer:
```ts
type State = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: E }
```

Over:
```ts
{ isLoading: boolean; data?: T; error?: E }
```

Exhaustive switches on discriminated unions catch missing branches at compile time.
