# CMake

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "CMake": https://aosabook.org/en/v1/cmake.html

## Project Purpose

CMake is a cross-platform build configuration and generation system. It lets projects describe build intent once and generate native build files for Make, Ninja, Visual Studio, Xcode, and other environments.

## Architectural Style

- Configure/generate build architecture
- Generator architecture
- Declarative build description
- Cross-platform abstraction layer

## Main Components

- CMake language interpreter
- Cache and configuration state
- Buildsystem model
- Generators for native build tools
- Platform and compiler detection logic
- Modules and package-finding scripts
- CTest and CPack integrations

## Interfaces

- CMakeLists.txt language interface
- Command-line configure interface
- Generator output interfaces
- Compiler and platform detection interfaces
- Package discovery interface
- Cache variable interface

## Data and State Management

- Source projects define targets, dependencies, variables, and configuration options.
- The cache persists discovered paths, options, and user choices between configure runs.
- Generators turn the internal build model into native build files.
- Modules encapsulate reusable platform, compiler, and package logic.
- Build artifacts are produced by native tools, not directly by CMake.

## Quality Attributes

- Portability across build tools and platforms
- Modifiability through target-based build descriptions
- Interoperability with native developer environments
- Reproducibility through generated build files and cached configuration
- Usability tradeoffs around the custom language and cache behavior

## Key Architectural Decisions

- Separate project configuration from native build execution.
- Use generators to support multiple build systems from one model.
- Persist configuration discoveries in a cache.
- Provide modules for reusable detection and package logic.
- Use a custom build-description language optimized for portability.

## Tradeoffs

- Generating native build files preserves platform workflows but introduces a two-step build process.
- Cache persistence speeds repeated configuration but can surprise users when values become stale.
- A custom language fits build configuration but has learning and consistency costs.
- Supporting many generators increases reach but complicates behavior parity.

## Useful Wiki Pages To Create Later

- wiki/projects/cmake.md
- wiki/components/build-generator.md
- wiki/components/configuration-cache.md
- wiki/patterns/generator.md
- wiki/quality-attributes/portability.md
