# SnowFlock

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "SnowFlock": https://aosabook.org/en/v1/snowflock.html

## Project Purpose

SnowFlock is a system for rapidly cloning virtual machines so applications can elastically expand across a cluster. It applies fork-like semantics to virtual machines and lazily transfers state to clones.

## Architectural Style

- Virtual machine cloning architecture
- Copy-on-write state sharing
- Distributed systems architecture
- Lazy state transfer architecture

## Main Components

- Parent VM
- Clone VMs
- VM descriptor
- Memory-on-demand mechanism
- Copy-on-write disk state
- Multicast distribution
- Cluster manager
- Application coordination layer

## Interfaces

- VM fork interface
- Hypervisor interface
- Network state-transfer interface
- Cluster management interface
- Application-level coordination interface

## Data and State Management

- A clone begins with a consistent view of parent VM state.
- Memory pages are transferred lazily when clones access them.
- Disk state uses copy-on-write sharing and isolation.
- Network and identity state must be adjusted for each clone.
- State distribution tries to avoid copying unchanged data eagerly.

## Quality Attributes

- Elasticity through rapid VM cloning
- Performance through lazy and multicast state transfer
- Resource efficiency through copy-on-write sharing
- Transparency for applications that can use fork-like behavior
- Reliability concerns around distributed clone coordination

## Key Architectural Decisions

- Expose VM cloning with fork-like semantics.
- Avoid eager copying of full VM memory and disk state.
- Use lazy state fetching and copy-on-write mechanisms.
- Optimize state distribution with multicast where useful.
- Keep application changes limited when possible.

## Tradeoffs

- Transparent VM cloning is powerful but requires careful handling of network identity and external side effects.
- Lazy transfer speeds clone creation but can add runtime page-fault latency.
- Copy-on-write saves resources but complicates consistency and cleanup.
- Fork-like semantics fit some workloads better than long-running stateful services.

## Useful Wiki Pages To Create Later

- wiki/projects/snowflock.md
- wiki/components/vm-cloner.md
- wiki/patterns/copy-on-write.md
- wiki/quality-attributes/elasticity.md
