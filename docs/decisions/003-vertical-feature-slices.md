<!-- read_when: architecture, feature, SOLID, component, hooks, refactor -->

# 003 — Vertical feature slices are the default structure

## Decision

Product code lives under `src/features/<feature>/`. Each slice exposes only `index.ts` and keeps its own UI in `components/`, state/effect logic in `hooks/`, and private adapters/helpers in `lib/` or feature-local modules.

## Consequences

Agents can work from one feature folder and its public contracts instead of loading an application-wide layer. Cross-feature imports use public APIs only. The architecture check prevents private deep imports and production feature modules over 500 lines; documented exceptions require an ADR and a focused test.
