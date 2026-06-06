---
title: Plugin system
type: component
status: reviewed
projects:
  - ../projects/eclipse.md
  - ../projects/jitsi.md
  - ../projects/mediawiki.md
  - ../projects/moodle.md
sources:
  - ../../raw_sources/aosa/eclipse.md
  - ../../raw_sources/aosa/jitsi.md
  - ../../raw_sources/aosa/mediawiki.md
  - ../../raw_sources/aosa/moodle.md
---

# Plugin System

## Responsibility

A plugin system exposes extension boundaries that let independently developed
modules add behavior without changing core code. In this wiki, the mechanism
appears as Eclipse extension points and OSGi bundles, Jitsi OSGi services,
MediaWiki PHP hooks and extensions, and Moodle activity, block, theme,
authentication, and enrolment plugins.

## Collaborators

- Extension registries, hook registries, or service registries.
- Core platform/runtime code that exposes extension points.
- Plugins, bundles, extensions, skins, or feature modules.
- Configuration, permissions, lifecycle, and dependency-management services.

## State And Interfaces

Interfaces include manifest declarations, extension points, service registry
interfaces, hooks, extension entry points, skin interfaces, configuration
variables, and exported public APIs. Plugin systems also track metadata such as
dependencies, lifecycle state, registered services, and enabled extensions.

## Project Uses

- [Eclipse](../projects/eclipse.md): uses plugin manifests, extension points,
  OSGi bundles, lazy activation, and exported APIs.
- [Jitsi](../projects/jitsi.md): uses OSGi bundles and service interfaces for
  protocol and feature modules.
- [MediaWiki](../projects/mediawiki.md): uses hooks, extensions, skins, and
  gadgets for customization across many wiki deployments.
- [Moodle](../projects/moodle.md): uses plugin APIs and a plugin manager for
  activity modules, blocks, themes, authentication, enrolment, and services.

## Related Decisions

- [MediaWiki ADR 001: Layered caching](../adrs/mediawiki-adr-001-layered-caching.md)
- [Plugin architecture](../patterns/plugin-architecture.md)
