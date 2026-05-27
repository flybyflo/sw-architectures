# Yocto

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Yocto": https://aosabook.org/en/v2/yocto.html

## Project Purpose

Yocto is a build system and ecosystem for creating custom embedded Linux distributions. Its architecture builds images from recipes, layers, metadata, tasks, and cross-compilation toolchains.

## Architectural Style

- Build system architecture
- Metadata-driven image generation
- Layered configuration architecture
- Task graph architecture
- Embedded Linux distribution architecture

## Main Components

- BitBake task executor
- Recipes
- Layers
- Classes
- Tasks
- Packages
- Images
- Cross-toolchain
- Metadata parser
- Shared state cache

## Interfaces

- Recipe metadata interface
- Layer interface
- BitBake command-line interface
- Task dependency graph interface
- Package manager interface
- Image generation interface
- Machine and distro configuration interfaces

## Data and State Management

- Recipes describe source fetching, configuration, compilation, packaging, and installation.
- Layers group related metadata and priorities.
- BitBake builds a task dependency graph from metadata.
- Packages are assembled into images.
- Shared state caches reusable task outputs.
- Machine and distribution configuration shape final images.

## Quality Attributes

- Reproducibility for embedded Linux builds
- Modifiability through layers and recipes
- Portability across boards and architectures
- Scalability of builds through caching and task graphs
- Complexity from metadata and dependency interactions

## Key Architectural Decisions

- Use metadata recipes to describe build behavior.
- Use layers to compose product, board, and policy customizations.
- Build from source through a task graph.
- Generate packages and images as separate stages.
- Use shared state to avoid rebuilding unchanged work.

## Tradeoffs

- Layering enables reuse but can make override behavior difficult to trace.
- Source-based builds improve control but are expensive.
- Metadata flexibility supports many products but raises learning cost.
- Caching speeds builds but creates invalidation and reproducibility concerns.

## Useful Wiki Pages To Create Later

- wiki/projects/yocto.md
- wiki/components/bitbake.md
- wiki/components/recipe.md
- wiki/patterns/metadata-driven-architecture.md
- wiki/quality-attributes/reproducibility.md
