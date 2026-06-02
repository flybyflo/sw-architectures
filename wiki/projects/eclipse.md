---
title: Eclipse
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/eclipse.md
adrs: []
components:
  - ../components/plugin-system.md
patterns:
  - ../patterns/plugin-architecture.md
  - ../patterns/layered-architecture.md
quality_attributes:
  - ../quality-attributes/modifiability.md
  - ../quality-attributes/performance.md
---

# Eclipse

## Concise Architecture Summary

Plugins define contributions.
The platform activates lazily.
Extensibility adds lifecycle complexity.

## Context

Eclipse is an extensible platform for developer tools and rich client
applications. Its architecture is deliberately generic so many tool ecosystems
can build on a shared runtime, workbench, workspace, and plugin model.

## Functional Requirements

- Support independently developed tools and UI contributions.
- Provide a common workbench, workspace, resource, update, help, team, and UI
  platform.
- Let plugins declare dependencies, extension points, and exported APIs.
- Support Java tooling through JDT and plugin development through PDE.
- Install, update, and provision bundles through features and p2 metadata.

## Main Components

- Platform runtime: common runtime, workspace, resources, update, help, team,
  and UI infrastructure.
- Workbench: perspectives, views, editors, commands, and actions.
- Equinox runtime: OSGi-based bundle lifecycle, dependency, classloading, and
  service management.
- [Plugin system](../components/plugin-system.md): plugin registry, extension
  registry, extension points, manifests, and contributed extensions.
- JDT and PDE: Java tooling and plugin development tooling.
- SWT and JFace: native UI toolkit and higher-level Java UI abstractions.
- p2 provisioning: metadata and artifact model for installation and updates.

## Interfaces

- Plugin manifests through `plugin.xml` and OSGi `MANIFEST.MF`.
- Extension-point and extension declarations.
- Exported public API packages.
- OSGi service registry interfaces.
- Workbench UI interfaces for views, editors, perspectives, commands, and
  actions.
- Workspace resource APIs and incremental builder interfaces.

## Data And State Management

Eclipse reads plugin and bundle metadata to build in-memory registries that are
also cached to disk. OSGi and Equinox manage bundle lifecycle state, dependency
metadata, classloaders, and services. Workspace state tracks projects, files,
resources, and build metadata, while p2 metadata describes installable units,
dependencies, capabilities, and installed profiles.

## Quality Attributes

- [Modifiability](../quality-attributes/modifiability.md): plugins, extension
  points, OSGi bundles, and stable APIs support independent feature evolution.
- Extensibility: third parties can add tools, UI contributions, languages, and
  applications without changing platform core code.
- [Performance](../quality-attributes/performance.md): lazy activation avoids
  loading plugin code until needed.
- Portability: SWT provides native desktop integration while JFace and platform
  APIs provide shared Java abstractions.

## Key Architecture Decisions

- Treat plugins as first-class application components.
- Use extension points so plugins can contribute behavior to other plugins.
- Use OSGi/Equinox for bundle lifecycle, dependencies, classloading, and
  services.
- Use lazy activation to reduce startup and memory cost.
- Build desktop UI from views, editors, perspectives, SWT, and JFace.
- Use p2 metadata and artifacts for finer-grained provisioning.

## Tradeoffs

The plugin and OSGi model makes Eclipse highly extensible, but it adds
dependency, lifecycle, classloading, and configuration complexity. Stable APIs
encourage ecosystem adoption but make early API mistakes expensive to change.
SWT improves native desktop integration but requires platform-specific support.

## Links

- Source note: [raw_sources/aosa/eclipse.md](../../raw_sources/aosa/eclipse.md)
- Component: [Plugin system](../components/plugin-system.md)
- Pattern: [Plugin architecture](../patterns/plugin-architecture.md)
- Quality attribute: [Modifiability](../quality-attributes/modifiability.md)
