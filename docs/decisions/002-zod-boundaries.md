# ADR-002: Zod at all system boundaries, types derived from schemas

**Date:** 2025-01-01  
**Status:** accepted

## Context

TypeScript types are erased at runtime. External data (API responses, user input, env vars, DB results without a typed ORM) can violate type assumptions silently. Agents writing code that reads external data may assume safety that doesn't exist.

## Decision

All external data is parsed through Zod schemas at the point of entry. TypeScript types are derived with `z.infer<typeof Schema>` — never written by hand for boundary types. If a schema changes, all derived types update automatically and usages break loudly.

## Consequences

**Good:** Runtime safety matches compile-time types. Schema is the single source of truth. Changing a field name or type propagates automatically. Zod error messages are clear and debuggable.  
**Bad:** Parse overhead at boundaries (negligible in practice). Zod schema and DB schema can drift if not kept in sync — mitigated by code generation where possible.

## Alternatives considered

- **Manual type assertions (`as`)** — no runtime safety, agents can write incorrect casts
- **io-ts** — same concept, more complex API, smaller community
- **Valibot** — valid alternative, smaller bundle; Zod chosen for wider ecosystem support
