# VisTrails

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "VisTrails": https://aosabook.org/en/v1/vistrails.html

## Project Purpose

VisTrails is a scientific workflow and provenance system. It helps users build, execute, version, compare, and reproduce computational workflows used in data analysis and visualization.

## Architectural Style

- Workflow architecture
- Provenance-aware architecture
- Pipeline/dataflow architecture
- Versioned history architecture
- Plugin/module architecture

## Main Components

- Workflow model
- Modules
- Connections
- Pipeline executor
- Provenance store
- Version tree
- Package system
- Visualization and spreadsheet views
- Persistence layer

## Interfaces

- Module API
- Workflow editing interface
- Execution interface
- Package/plugin interface
- Provenance query interface
- Persistence interface
- Visualization interfaces

## Data and State Management

- Workflows are graphs of modules connected by dataflow edges.
- Changes to workflows are tracked as actions in a version tree.
- Execution provenance records runs, parameters, results, and module versions.
- Packages define reusable modules and capabilities.
- Persistent workflow files store structure and history.

## Quality Attributes

- Reproducibility through provenance capture
- Modifiability through workflow editing and packages
- Usability for visual scientific workflows
- Traceability through version history
- Performance concerns around executing and visualizing large workflows

## Key Architectural Decisions

- Store workflow evolution as a version tree rather than only final state.
- Represent computations as dataflow pipelines.
- Capture provenance automatically during execution.
- Use packages to extend available modules.
- Integrate visualization with workflow construction.

## Tradeoffs

- Rich provenance improves reproducibility but adds storage and UI complexity.
- Visual workflows help non-programmers but can become unwieldy for large analyses.
- Version trees preserve exploration history but require navigation support.
- Plugin modules increase power but require compatibility management.

## Useful Wiki Pages To Create Later

- wiki/projects/vistrails.md
- wiki/components/workflow-engine.md
- wiki/components/provenance-store.md
- wiki/patterns/dataflow.md
- wiki/quality-attributes/reproducibility.md
