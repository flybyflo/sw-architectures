# Eclipse

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Eclipse" by Kim Moir: https://aosabook.org/en/v1/eclipse.html

## Project Purpose

Eclipse is an extensible platform for building developer tools and rich client
applications. It began as an IDE-oriented platform, with the Eclipse SDK as a
proof-of-concept product, but its architecture was deliberately generic enough to
support many tool ecosystems and later non-IDE rich client applications.

## Architectural Style

- Plugin-based architecture
- Component-based platform architecture
- OSGi bundle architecture
- Extension-point architecture
- Rich client platform architecture
- Layered desktop application architecture

## Main Components

- Platform: common runtime, workspace, resources, update, help, team, and UI
  infrastructure.
- JDT: Java Development Tools, including Java editor, compiler, debugger,
  refactoring support, content assist, and incremental builder.
- PDE: Plug-in Development Environment for building, packaging, testing, and
  deploying Eclipse plugins and bundles.
- Workbench: desktop UI structure built from perspectives, views, and editors.
- SWT: native widget toolkit used for platform-specific UI integration.
- JFace: Java layer above SWT for common UI programming patterns.
- Plugin registry and extension registry: in-memory registry of plugin metadata,
  extension points, and extensions.
- Equinox runtime: OSGi-based runtime that manages bundles, lifecycle,
  dependencies, classloading, and services.
- Bundles/plugins: modular units with manifests, dependencies, exported
  packages, extension points, and optional extensions.
- Features: packaging units that group bundles for install and update.
- p2 provisioning: metadata/artifact repository model for installation and
  update.
- Workspace: local resource model for projects, files, metadata, and build
  state.

## Interfaces

- Plugin manifest interface through `plugin.xml` and OSGi `MANIFEST.MF`.
- Extension-point and extension interface.
- Public API packages exported by bundles.
- OSGi service registry interface for dynamic service lookup.
- Workbench UI interfaces for views, editors, perspectives, commands, and
  actions.
- SWT/JFace UI interfaces.
- Workspace resource APIs.
- Incremental builder and compiler interfaces.
- Feature and p2 metadata/artifact repository interfaces.

## Data and State Management

- Plugin and bundle metadata is read from manifests and used to build the
  registry.
- Extension and plugin registry state is kept in memory and cached to disk.
- Bundle lifecycle state is managed by OSGi and Equinox.
- Each plugin or bundle has its own classloader and explicit dependency metadata.
- Workspace state tracks resources, projects, files, and build metadata.
- The Java incremental builder uses resource deltas and build state to recompile
  only affected types.
- Feature and p2 metadata describe installable units, dependencies, capabilities,
  applicability filters, and installed profiles.

## Quality Attributes

- Modifiability: plugins, extension points, and OSGi bundles support isolated
  feature evolution.
- Extensibility: third parties can add tools, UI contributions, languages, and
  applications without changing the platform core.
- Interoperability: stable APIs and extension points allow independently built
  tools to work together.
- Performance: lazy activation avoids loading plugin code until needed.
- Portability: SWT integrates with native platforms while JFace and the platform
  provide shared Java abstractions.
- Backward compatibility: the platform emphasizes stable APIs and compatibility
  layers to protect plugin consumers.
- Ecosystem scalability: the architecture supports many projects, companies, and
  tooling domains on a shared platform.

## Key Architectural Decisions

- Treat plugins as first-class components of the application.
- Use extension points so plugins can contribute behavior to other plugins.
- Publish stable APIs and hide non-exported implementation details.
- Use lazy activation to reduce the runtime cost of installed plugins.
- Build the workbench from views, editors, and perspectives.
- Use SWT instead of Swing to provide native desktop behavior.
- Replace the original runtime component model with OSGi/Equinox.
- Preserve compatibility when moving from plugins to OSGi bundles.
- Split bundles for Rich Client Platform use cases outside the IDE.
- Replace coarse update mechanisms with p2 metadata and artifact provisioning.

## Tradeoffs

- The extension model makes Eclipse highly extensible, but increases dependency,
  lifecycle, and configuration complexity.
- Stable API commitments encourage adoption, but make incorrect early API
  choices expensive to change.
- SWT gives strong native integration, but requires platform-specific fragments
  and native library handling.
- Lazy activation improves startup and memory behavior, but pushes complexity
  into lifecycle management.
- OSGi standardization improves modularity and ecosystem fit, but migration
  required compatibility layers to avoid breaking existing plugins.
- Feature-based update packaging was simple, but too coarse for efficient
  partial updates; p2 addressed that with a more complex provisioning model.

## Useful Wiki Pages To Create Later

- `wiki/projects/eclipse.md`
- `wiki/adrs/eclipse-adr-001-plugin-extension-point-model.md`
- `wiki/adrs/eclipse-adr-002-adopt-osgi-equinox-runtime.md`
- `wiki/adrs/eclipse-adr-003-use-swt-for-native-ui.md`
- `wiki/components/plugin-system.md`
- `wiki/components/extension-registry.md`
- `wiki/components/workbench.md`
- `wiki/components/incremental-builder.md`
- `wiki/patterns/plugin-architecture.md`
- `wiki/patterns/layered-architecture.md`
- `wiki/quality-attributes/modifiability.md`
- `wiki/quality-attributes/extensibility.md`
- `wiki/quality-attributes/backward-compatibility.md`
