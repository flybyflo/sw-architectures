---
title: Object database
type: component
status: reviewed
projects:
  - ../projects/git.md
sources:
  - ../../raw_sources/aosa/git.md
---

# Object Database

## Responsibility

The object database stores Git's immutable blobs, trees, commits, and tags under
`.git/objects`, tying object identity to content hashes.

## Collaborators

- Working directory and index.
- References and `HEAD`.
- Packfiles and pack indexes.
- Remote synchronization protocols.

## State And Interfaces

The database stores loose objects and packed objects. Commits point to root trees
and parent commits, trees describe directories, blobs store file content, and
tags name objects. References remain mutable outside the object database.

## Project Uses

- [Git](../projects/git.md): uses the object database as the persistent
  foundation for distributed repository history.

## Related Decisions

- [Git ADR 001: Content-addressed storage](../adrs/git-adr-001-content-addressed-storage.md)
