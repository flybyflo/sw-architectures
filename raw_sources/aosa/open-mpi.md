# Open MPI

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Open MPI": https://aosabook.org/en/v2/openmpi.html

## Project Purpose

Open MPI is an implementation of the Message Passing Interface for high-performance computing. Its architecture uses a modular component framework to support many networks, process managers, collective algorithms, and runtime environments.

## Architectural Style

- Modular component architecture
- High-performance communication library
- Runtime environment architecture
- Plugin-based HPC middleware

## Main Components

- MPI API layer
- Modular Component Architecture
- Point-to-point messaging layer
- Byte transfer layers
- Collective communication components
- Runtime environment
- Process launcher
- Resource manager integrations
- Device/network components

## Interfaces

- MPI standard API
- MCA component interfaces
- Network transport interfaces
- Runtime and process manager interfaces
- Resource manager interfaces
- Configuration and selection parameters

## Data and State Management

- MPI processes exchange messages through selected communication components.
- Component metadata and runtime parameters determine which modules are selected.
- Communicators, ranks, requests, buffers, and datatypes represent MPI execution state.
- Runtime services manage launch, discovery, and coordination.

## Quality Attributes

- Performance across diverse HPC networks
- Portability across platforms and resource managers
- Extensibility through components
- Configurability for deployment environments
- Interoperability with the MPI standard

## Key Architectural Decisions

- Use a modular component architecture for subsystems.
- Select communication components at runtime based on environment and configuration.
- Separate MPI semantics from network-specific transport details.
- Integrate with multiple resource managers and launch systems.
- Expose tunable parameters for HPC deployments.

## Tradeoffs

- Component modularity enables portability but adds selection and compatibility complexity.
- Runtime configurability helps performance tuning but makes behavior harder to reproduce.
- Supporting many networks increases maintenance burden.
- High-performance paths can resist abstraction if overhead becomes visible.

## Useful Wiki Pages To Create Later

- wiki/projects/open-mpi.md
- wiki/components/modular-component-architecture.md
- wiki/components/message-transport.md
- wiki/patterns/plugin-architecture.md
- wiki/quality-attributes/performance.md
