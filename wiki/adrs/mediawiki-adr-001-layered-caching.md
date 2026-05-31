---
title: "MediaWiki ADR 001: Layered caching"
type: adr
status: accepted
project: mediawiki
decision_date: 2026-05-29
sources:
  - ../../raw_sources/aosa/mediawiki.md
components:
  - ../components/plugin-system.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/scalability.md
patterns:
  - ../patterns/layered-architecture.md
---

# ADR: Layered Caching

## Context

MediaWiki is shaped by Wikipedia's very high read traffic and low-cost
operation. The source note identifies reverse proxy caches, object caches, file
caches, rendered output, ResourceLoader, deferred updates, and job queues as
request-path optimization mechanisms.

## Decision

Use layered caching around the PHP application and database-backed content
model, including reverse proxy caching for anonymous reads and application-level
caches for rendered or computed objects.

## Consequences

- Anonymous read traffic can avoid application servers when cached.
- Repeated parsing, rendering, and asset work can be reduced.
- Cache invalidation and deployment-specific behavior become important
  architectural concerns.
- Write-side and maintenance work may need deferred jobs and updates.

## Considered Options

- Selected: multiple caching layers matched to different costs and lifetimes.
- Rejected: relying only on database and application servers for all reads,
  because the source note frames Wikipedia-scale read traffic as a primary
  force.

## Links

- Project: [MediaWiki](../projects/mediawiki.md)
- Functional requirements:
  [MediaWiki requirements](../projects/mediawiki.md#functional-requirements)
- Component: [plugin system](../components/plugin-system.md)
- Pattern: [layered architecture](../patterns/layered-architecture.md)
- Quality attributes: [performance](../quality-attributes/performance.md),
  [scalability](../quality-attributes/scalability.md)
- Source note: [raw_sources/aosa/mediawiki.md](../../raw_sources/aosa/mediawiki.md)
