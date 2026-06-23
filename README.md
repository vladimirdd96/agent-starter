# agent-starter

Agent-optimized project foundation. Clone into any new project — web, mobile, backend, fullstack.

## Quick start

```bash
gh repo create my-new-project --template vladimirdd96/agent-starter --private --clone
cd my-new-project
npm install
```

## What's included

| File / Folder | Purpose |
|---|---|
| `CLAUDE.md` | Agent constitution — patterns, commit rules, docs system |
| `AGENTS.md` | Task rules enforced on every commit |
| `docs/` | Domain docs with `read_when` keyword hints |
| `docs/decisions/` | Architecture Decision Records |
| `src/lib/result.ts` | `Result<T, E>` type for typed error handling |
| `src/lib/env.ts` | Validated env vars via Zod |
| `src/lib/types.ts` | Utility types (Brand, ValueOf, etc.) |
| `tsconfig.json` | Maximum-strictness TypeScript base config |
| `eslint.config.js` | Strict ESLint with architectural rules |
| `commitlint.config.ts` | Conventional commits enforced |
| `.husky/` | Pre-commit: lint-staged · commit-msg: commitlint |
| `.github/workflows/ci.yml` | Generic CI (typecheck → lint → test) |
| `.github/copilot-instructions.md` | GitHub Copilot agent instructions |

## Setup

```bash
# 1. Clone / copy into your project
git clone https://github.com/vladimirdd96/agent-starter.git my-project
cd my-project
rm -rf .git && git init

# 2. Install dev deps
npm install

# 3. Fill in your project
#    - Add your framework deps to package.json
#    - Extend tsconfig.json with your framework's config
#    - Add env vars to src/lib/env.ts
#    - Fill in docs/ with your project's actual architecture
#    - Add features to src/features/
```

## Adapting the tsconfig

This repo ships a standalone base config. For framework projects, extend it:

```jsonc
// tsconfig.json in a Next.js project
{
  "extends": "./tsconfig.base.json",  // rename the shipped tsconfig
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "jsx": "preserve"
  }
}
```

## Key patterns (see CLAUDE.md for full detail)

**Result type** — typed errors, no silent throws:
```ts
import { ok, err } from '@/lib/result'
async function findUser(id: string): Promise<Result<User, 'not_found'>> { ... }
```

**Env validation** — extend the schema, import everywhere:
```ts
// src/lib/env.ts
DATABASE_URL: z.string().url(),
```

**Feature folders** — import only from `index.ts`:
```
src/features/auth/
  index.ts       ← public API
  auth.service.ts
  auth.schema.ts
```

**No magic strings**:
```ts
export const Status = { Active: 'active', Inactive: 'inactive' } as const
export type Status = typeof Status[keyof typeof Status]
```
