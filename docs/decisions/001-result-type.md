# ADR-001: Result<T, E> over throw/catch at business logic boundaries

**Date:** 2025-01-01  
**Status:** accepted

## Context

Service and repository functions can fail in expected ways (not found, validation error, permission denied). Using `throw` makes error handling implicit — callers may forget to catch, and the error types are not visible in the function signature.

## Decision

All service and repository functions return `Result<T, E>` from `src/lib/result.ts`. Errors are typed union members, not thrown exceptions. `throw` is reserved for truly unexpected/unrecoverable failures (programmer errors, invariant violations).

## Consequences

**Good:** Error types appear in function signatures. Callers are forced to handle both branches. Agents cannot write code that silently swallows errors. TypeScript exhaustive checks catch missing error cases.  
**Bad:** Slightly more verbose call sites. Cannot use `async/await` with `try/catch` for expected errors — must pattern-match on `.ok`.

## Alternatives considered

- **throw + typed error classes** — error types still invisible in signatures; callers can still forget try/catch
- **neverthrow library** — same concept but external dependency; our impl is 30 lines
