# Mercurial

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Mercurial": https://aosabook.org/en/v1/mercurial.html

## Project Purpose

Mercurial is a distributed version control system designed for speed, simplicity, and scalability. It manages local history, branching, merging, repository exchange, and extensibility through a compact storage and command architecture.

## Architectural Style

- Distributed version control
- Command-oriented architecture
- File-backed repository architecture
- Extension architecture
- Append-only history storage

## Main Components

- Working directory
- Dirstate
- Repository store
- Revlog storage
- Changesets
- Manifests
- Filelogs
- Commands
- Extensions
- Merge logic

## Interfaces

- Command-line interface
- Repository file format
- Extension API
- Network exchange protocols
- Hook interface
- Merge tool interface

## Data and State Management

- Changesets describe project history and parent relationships.
- Manifests map filenames to file revisions.
- Filelogs store per-file revision history.
- Revlogs encode append-only revision data and deltas.
- Dirstate tracks working-directory status.
- Repository exchange transfers missing revisions between peers.

## Quality Attributes

- Performance for local operations
- Scalability to large histories
- Reliability through append-only storage
- Usability through simpler commands and concepts
- Extensibility through hooks and extensions

## Key Architectural Decisions

- Use revlogs as the core storage abstraction.
- Separate changeset, manifest, and file history data.
- Keep normal operations local in a distributed model.
- Expose extension points for behavior customization.
- Favor a small, coherent command model.

## Tradeoffs

- Separate history structures improve storage and lookup behavior but add internal mapping complexity.
- A simpler user model improves usability but can limit advanced workflow expression.
- Extension flexibility can lead to behavior variation across installations.
- Distributed history improves availability but requires merge and exchange semantics.

## Useful Wiki Pages To Create Later

- wiki/projects/mercurial.md
- wiki/components/revlog.md
- wiki/components/dirstate.md
- wiki/patterns/distributed-version-control.md
- wiki/quality-attributes/performance.md
