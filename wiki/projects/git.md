---
title: Git
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/git.md
adrs:
  - ../adrs/git-adr-001-content-addressed-storage.md
components:
  - ../components/object-database.md
patterns:
  - ../patterns/content-addressed-storage.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/reliability.md
  - ../quality-attributes/modifiability.md
  - ../quality-attributes/security.md
---

# Git

## Concise Architecture Summary

Hashes identify content.
References name changing state.
History remains local.

## Context

Git is a distributed version control system for maintaining a body of work
across many collaborators and repositories. It supports local commits, offline
work, branching, merging, and synchronization between peer repositories.

## Functional Requirements

- Track file content and project history.
- Support local commits, branching, merging, and offline inspection.
- Synchronize changes between repositories.
- Preserve object identity and integrity.
- Expose user-facing commands and lower-level scriptable commands.

## Main Components

- Working directory: checked-out files users edit.
- Index: explicit staging area between the working directory and repository.
- Repository directory: `.git` state store.
- [Object database](../components/object-database.md): immutable blob, tree,
  commit, and tag objects.
- References and `HEAD`: mutable names for objects and current position.
- Packfiles and indexes: compressed object storage and lookup structures.
- Hooks, porcelain commands, and plumbing commands.

## Interfaces

- Command-line Git commands.
- `.git` filesystem layout.
- Remote repository communication protocols.
- Hook scripts.
- Environment variables that customize repository, index, and working tree
  paths.

## Data And State Management

Git stores content as immutable objects. Blobs represent file content, trees
represent directory structure, commits point to a root tree and parent commits,
and tags name objects. References are mutable pointers outside the object
database, while packfiles compress and group objects for efficient storage and
transfer.

## Quality Attributes

- [Reliability](../quality-attributes/reliability.md): each clone can contain
  complete repository history.
- [Security](../quality-attributes/security.md): object hashes connect identity
  and integrity.
- [Performance](../quality-attributes/performance.md): most operations are local,
  and packfiles reduce storage and transfer overhead.
- [Modifiability](../quality-attributes/modifiability.md): the repository format
  and plumbing commands are scriptable.

## Key Architecture Decisions

- [Use content-addressed immutable object storage](../adrs/git-adr-001-content-addressed-storage.md).
- Keep movable references outside the object database.
- Use an explicit index as a staging area.
- Provide a toolkit model with porcelain and plumbing commands.

## Tradeoffs

Distributed workflows improve flexibility and availability, but they increase
conceptual complexity. Content-addressed storage protects integrity while also
exposing users and tools to low-level object concepts.

## Links

- Source note: [raw_sources/aosa/git.md](../../raw_sources/aosa/git.md)
- Pattern: [content-addressed storage](../patterns/content-addressed-storage.md)
