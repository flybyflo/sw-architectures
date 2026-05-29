---
title: MediaWiki
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/mediawiki.md
adrs:
  - ../adrs/mediawiki-adr-001-layered-caching.md
components:
  - ../components/plugin-system.md
patterns:
  - ../patterns/layered-architecture.md
  - ../patterns/client-server.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/scalability.md
  - ../quality-attributes/modifiability.md
  - ../quality-attributes/security.md
---

# MediaWiki

## Concise Architecture Summary

Rendered pages are cached.
Hooks extend core behavior.
Invalidation is central.

## Context

MediaWiki is the wiki engine created for Wikipedia and reused by many third-party
wikis. Its architecture is shaped by Wikipedia-scale read traffic, collaborative
editing, openness, anti-abuse features, international use, and low-cost
operation.

## Functional Requirements

- Serve browser readers and editors.
- Store editable wikitext and revision history.
- Provide generated special pages, APIs, skins, hooks, and extensions.
- Support permissions, user roles, anti-abuse tools, and internationalization.
- Keep anonymous read traffic efficient at very high scale.

## Main Components

- `index.php` and `api.php`: browser and machine-readable request entry points.
- Article handling and special pages.
- Parser and wikitext processor.
- Database layer for pages, revisions, users, permissions, and metadata.
- Reverse proxy cache, object cache, file cache, job queue, and deferred updates.
- ResourceLoader for JavaScript and CSS delivery.
- [Plugin system](../components/plugin-system.md): hooks, extensions, skins, and
  gadgets.

## Interfaces

- Browser interface for readers and editors.
- Web API for external programs.
- Hook and skin interfaces.
- Configuration variables.
- Cache, database, media repository, and custom JavaScript/CSS interfaces.

## Data And State Management

MediaWiki stores user-generated content as wikitext rather than final HTML.
Pages are organized with namespaces and categories, and revisions preserve page
history. Rendered pages and computed objects may be cached at multiple layers.
Deferred updates and jobs move expensive work out of the main response path.

## Quality Attributes

- [Performance](../quality-attributes/performance.md): profiling, caching,
  ResourceLoader, and request-path optimization reduce repeated work.
- [Scalability](../quality-attributes/scalability.md): reverse proxies and
  layered caches shield application servers from anonymous read traffic.
- [Modifiability](../quality-attributes/modifiability.md): hooks, extensions,
  skins, gadgets, and configuration support customization.
- [Security](../quality-attributes/security.md): permissions, roles, anti-spam,
  and anti-vandalism features support open collaboration.

## Key Architecture Decisions

- [Use layered caching for read-heavy wiki traffic](../adrs/mediawiki-adr-001-layered-caching.md).
- Store editable content as wikitext and render through a parser.
- Use hooks and extensions for customization.
- Provide a machine-readable API.

## Tradeoffs

Layered caching improves read performance but adds constraints around
invalidation and application behavior. Hooks make extensions flexible but can
complicate abstraction, startup, and performance.

## Links

- Source note: [raw_sources/aosa/mediawiki.md](../../raw_sources/aosa/mediawiki.md)
- Pattern: [layered architecture](../patterns/layered-architecture.md)
