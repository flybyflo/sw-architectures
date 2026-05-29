---
title: Layered architecture
type: pattern
status: reviewed
projects:
  - ../projects/mediawiki.md
sources:
  - ../../raw_sources/aosa/mediawiki.md
---

# Layered Architecture

## Summary

Layered architecture separates responsibilities into entry points, application
processing, storage, caches, extension points, and delivery mechanisms.

## Forces

- High read traffic needs protection from repeated expensive work.
- Application behavior must remain customizable across deployments.
- Caching layers must coordinate with content changes and invalidation.

## Project Uses

- [MediaWiki](../projects/mediawiki.md): uses browser and API entry points,
  parser and page handling, database storage, reverse proxy and object caches,
  ResourceLoader, and extension interfaces.

## Tradeoffs

Layering clarifies responsibilities and supports scaling, but cross-layer
concerns such as cache invalidation and hooks can complicate behavior.

## Related Pages

- [Plugin system](../components/plugin-system.md)
- [Performance](../quality-attributes/performance.md)
- [Scalability](../quality-attributes/scalability.md)
