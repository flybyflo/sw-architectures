---
title: Content-addressed storage
type: pattern
status: reviewed
projects:
  - ../projects/git.md
sources:
  - ../../raw_sources/aosa/git.md
---

# Content-addressed Storage

## Summary

Content-addressed storage identifies stored data by a hash of its content,
connecting identity and integrity.

## Forces

- Distributed repositories need a way to identify and verify shared objects.
- Immutable history objects can be replicated across clones.
- Movable names such as branches need to change without rewriting objects.

## Project Uses

- [Git](../projects/git.md): stores blobs, trees, commits, and tags as immutable
  objects in the object database and keeps references as mutable pointers.

## Tradeoffs

Hash-based identity supports integrity and replication, but it exposes users and
tools to low-level object concepts.

## Related Pages

- [Object database](../components/object-database.md)
- [Reliability](../quality-attributes/reliability.md)
- [Security](../quality-attributes/security.md)
