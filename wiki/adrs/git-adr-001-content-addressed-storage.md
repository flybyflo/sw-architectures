---
title: "Git ADR 001: Content-addressed storage"
type: adr
status: accepted
project: git
decision_date: 2026-05-29
sources:
  - ../../raw_sources/aosa/git.md
components:
  - ../components/object-database.md
quality_attributes:
  - ../quality-attributes/reliability.md
  - ../quality-attributes/security.md
  - ../quality-attributes/performance.md
patterns:
  - ../patterns/content-addressed-storage.md
---

# ADR: Content-addressed Storage

## Context

Git must preserve repository content and history across distributed clones,
local operations, branching, merging, and synchronization. The source note
describes a repository model built from immutable blob, tree, commit, and tag
objects.

## Decision

Store repository content and history as immutable objects identified by content
hashes. Keep movable references such as branches outside the object database.

## Consequences

- Object identity and integrity are connected.
- Clones can carry complete history and verify object identity.
- References can move without rewriting immutable objects.
- Users and tools may need to understand low-level object concepts.

## Considered Options

- Selected: immutable, content-addressed objects plus mutable references.
- Rejected: storing history only as mutable branch state, because the source
  note emphasizes object identity, integrity, and distributed history.

## Links

- Project: [Git](../projects/git.md)
- Functional requirements:
  [Git requirements](../projects/git.md#functional-requirements)
- Component: [object database](../components/object-database.md)
- Pattern: [content-addressed storage](../patterns/content-addressed-storage.md)
- Quality attributes: [reliability](../quality-attributes/reliability.md),
  [security](../quality-attributes/security.md),
  [performance](../quality-attributes/performance.md)
- Source note: [raw_sources/aosa/git.md](../../raw_sources/aosa/git.md)
