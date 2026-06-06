---
title: Event Sourcing
type: pattern
status: reviewed
projects: []
sources:
  - ../../raw_sources/extra_sources/bytebytego-architecture-patterns.md
---

# Event Sourcing

## Summary

Event Sourcing stores state changes as an append-only sequence of events rather
than only storing the latest mutable state. Current state can be reconstructed by
replaying the event history.

## Forces

- Systems need an audit trail of state changes.
- Historical replay or reconstruction is useful for debugging, analytics, or
  rebuilding derived state.
- Storing every state transition increases modeling and operational complexity.

## Project Uses

- No reviewed AOSA project is documented as using Event Sourcing in the current
  wiki.
- [ByteByteGo Software Architecture Patterns source note](../../raw_sources/extra_sources/bytebytego-architecture-patterns.md):
  identifies Event Sourcing as a data-flow pattern where state changes are
  stored as events.

## Tradeoffs

- **Benefit**: event history supports auditability, replay, and reconstruction.
- **Cost**: event schema design, replay performance, versioning, and derived
  state management become core architectural concerns.
- **Consistency**: systems often need careful handling of projections and
  eventually consistent read models.

## Related Pages

- [Asynchronous Messaging](asynchronous-messaging.md)
- [Consistency](../quality-attributes/consistency.md)
