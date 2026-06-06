---
title: Mercurial
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/mercurial.md
adrs: []
components: []
patterns: []
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/reliability.md
  - ../quality-attributes/modifiability.md
---

# Mercurial

## Concise Architecture Summary

Revlogs store history.
Dirstate tracks local edits.
Simplicity trades off flexibility.

## Context

Mercurial is a distributed version control system for local history, branching,
merging, repository exchange, and extension-driven customization. Its
architecture emphasizes a compact repository format and a command model that is
intended to be simpler than many advanced version-control workflows.

## Functional Requirements

- Track project history in local repositories.
- Support branching, merging, and synchronization between peers.
- Maintain working-directory status.
- Store file, manifest, and changeset history efficiently.
- Expose command, hook, network exchange, and extension interfaces.

## Main Components

- Working directory: checked-out project files.
- Dirstate: local working-directory status tracker.
- Repository store: file-backed persistent repository state.
- Revlog storage: append-only revision data and delta storage.
- Changesets: project history and parent relationships.
- Manifests: filename-to-file-revision mappings.
- Filelogs: per-file revision history.
- Commands, hooks, merge logic, and extensions.

## Interfaces

- Command-line interface.
- Repository file format.
- Extension API.
- Network exchange protocols.
- Hook interface.
- Merge tool interface.

## Data And State Management

Mercurial separates history into changesets, manifests, and filelogs. Revlogs
encode append-only revision data and deltas, while dirstate records the status
of the working directory. Repository exchange transfers missing revisions
between distributed peers.

## Quality Attributes

- [Performance](../quality-attributes/performance.md): local operations and
  compact revlog storage support efficient repository work.
- [Reliability](../quality-attributes/reliability.md): append-only history
  storage reduces the chance that existing revisions are rewritten in place.
- [Modifiability](../quality-attributes/modifiability.md): hooks and extensions
  allow behavior customization without changing Mercurial core code.
- Usability: a small command model lowers the conceptual load for common
  workflows.

## Key Architecture Decisions

- Use revlogs as the core storage abstraction.
- Separate changeset, manifest, and file history data.
- Keep normal operations local in a distributed model.
- Expose hooks and extensions for customization.
- Favor a small, coherent command model.

## Tradeoffs

Revlogs and separated history structures improve storage and lookup behavior,
but they add internal mapping complexity. A simpler user model improves
usability, but it can limit advanced workflow expression. Extension flexibility
helps installations adapt behavior, but it can create variation across
repositories.

## Links

- Source note: [raw_sources/aosa/mercurial.md](../../raw_sources/aosa/mercurial.md)
- Related project: [Git](git.md)
- Related Git component: [Object database](../components/object-database.md)
