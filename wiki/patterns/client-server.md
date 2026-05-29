---
title: Client-server
type: pattern
status: reviewed
projects:
  - ../projects/hadoop-hdfs.md
  - ../projects/mediawiki.md
sources:
  - ../../raw_sources/aosa/hadoop-hdfs.md
  - ../../raw_sources/aosa/mediawiki.md
---

# Client-server

## Summary

Client-server architecture separates clients that request work from services
that own request handling, metadata, storage, or API behavior.

## Forces

- Clients need stable interfaces to shared system state.
- Services can centralize coordination or protect stored data.
- Centralized services may become scalability or availability constraints.

## Project Uses

- [Hadoop HDFS](../projects/hadoop-hdfs.md): clients coordinate with the
  NameNode for metadata and stream block data to or from DataNodes.
- [MediaWiki](../projects/mediawiki.md): browsers and API clients interact with
  a web application backed by databases, caches, and extension interfaces.

## Tradeoffs

Client-server boundaries simplify coordination and interface design, but central
services must be protected from overload and failure.

## Related Pages

- [NameNode](../components/namenode.md)
- [Reliability](../quality-attributes/reliability.md)
- [Scalability](../quality-attributes/scalability.md)
