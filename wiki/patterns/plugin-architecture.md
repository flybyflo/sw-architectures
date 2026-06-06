---
title: Plugin Architecture
type: pattern
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

# Plugin Architecture

## Summary

Plugin architecture lets a system expose extension points so independently
developed modules can add behavior without modifying core code. The mechanism
can be manifest-driven, service-driven, or hook-driven depending on the runtime.

## Forces

- Third parties need to extend the system without changing the core.
- Core maintainers need stable boundaries around extension behavior.
- Runtime cost, dependency management, and isolation become more complex as the
  plugin ecosystem grows.

## Project Uses

- [Eclipse](../projects/eclipse.md): uses plugins, extension points, OSGi
  bundles, lazy activation, and exported APIs to support a large tooling
  ecosystem.
- [Jitsi](../projects/jitsi.md): uses OSGi bundles and service interfaces so
  protocol and feature modules can discover and use each other at runtime.
- [MediaWiki](../projects/mediawiki.md): uses PHP hooks, extensions, skins, and
  gadgets for wiki customization.
- [Moodle](../projects/moodle.md): uses activity modules, blocks, themes,
  authentication plugins, enrolment plugins, and service interfaces to adapt the
  LMS to different institutions.

## Tradeoffs

- **Benefit**: extension points improve modifiability and ecosystem growth.
- **Cost**: lifecycle management, compatibility, startup cost, security review,
  and dependency complexity all increase.
- **Runtime shape**: Eclipse favors manifest and extension-point metadata,
  Jitsi favors dynamic OSGi services, and MediaWiki favors request-scoped PHP
  hooks, while Moodle favors directory and API conventions around pluggable
  course features.

## Related Pages

- [Plugin system](../components/plugin-system.md)
- [Modifiability](../quality-attributes/modifiability.md)
- [Layered architecture](layered-architecture.md)
