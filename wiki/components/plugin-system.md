---
title: Plugin system
type: component
status: reviewed
projects:
  - ../projects/mediawiki.md
sources:
  - ../../raw_sources/aosa/mediawiki.md
---

# Plugin System

## Responsibility

MediaWiki's plugin system provides hooks, extensions, skins, gadgets, and
configuration mechanisms that let deployments customize behavior and appearance
without changing core code.

## Collaborators

- Request entry points such as `index.php` and `api.php`.
- Parser and page rendering logic.
- Skins and ResourceLoader.
- Permissions, user roles, and site configuration.

## State And Interfaces

The primary interfaces are hooks, extension entry points, skin interfaces,
configuration variables, and controlled wiki pages for custom JavaScript and
CSS. The source note emphasizes flexibility while noting abstraction, startup,
and performance costs.

## Project Uses

- [MediaWiki](../projects/mediawiki.md): uses hooks, extensions, skins, and
  gadgets for customization across many wiki deployments.

## Related Decisions

- [MediaWiki ADR 001: Layered caching](../adrs/mediawiki-adr-001-layered-caching.md)
