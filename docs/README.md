# Docs

Domain-specific documentation loaded by agents on-demand using `read_when` hints.

## How it works

Each doc file starts with a `read_when` comment listing keywords. Before writing code, agents scan this directory and load only docs whose keywords match the task.

```markdown
<!-- read_when: auth, login, session, JWT -->
```

## Docs in this repo

| File | Domain |
|---|---|
| `auth.md` | Authentication, sessions, tokens |
| `database.md` | Schema, queries, migrations |
| `api.md` | Endpoints, contracts, request/response |
| `ui-patterns.md` | Components, layout, styling |
| `i18n.md` | Translations, locale, string keys |
| `decisions/` | Architecture Decision Records |

## Adding a doc

1. Create `docs/<domain>.md`
2. Start with `<!-- read_when: keyword1, keyword2 -->`
3. Keep it short and decision-dense — not a tutorial

## ADRs

For any non-obvious architectural choice, add a record in `docs/decisions/`. Use `000-template.md` as the starting point. Agents read these to understand *why* something was chosen, preventing re-litigation.
