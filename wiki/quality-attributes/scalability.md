---
title: Scalability
type: quality-attribute
status: reviewed
projects:
  - ../projects/nginx.md
  - ../projects/mediawiki.md
  - ../projects/hadoop-hdfs.md
sources:
  - ../../raw_sources/aosa/nginx.md
  - ../../raw_sources/aosa/mediawiki.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
---

# Scalability

## Definition In This Wiki

Scalability describes how a system can handle larger traffic, data, connection,
or collaboration loads.

## Project Comparisons

- [nginx](../projects/nginx.md): a small number of workers can handle many
  concurrent connections through non-blocking event processing.
- [MediaWiki](../projects/mediawiki.md): reverse proxies and layered caches let
  anonymous read traffic avoid application servers when possible.
- [Hadoop HDFS](../projects/hadoop-hdfs.md): storage capacity, compute capacity,
  and I/O bandwidth grow by adding commodity servers.

## Supporting Decisions And Patterns

- [nginx ADR 001](../adrs/nginx-adr-001-event-driven-worker-model.md)
- [MediaWiki ADR 001](../adrs/mediawiki-adr-001-layered-caching.md)
- [HDFS ADR 001](../adrs/hdfs-adr-001-namenode-datanode-separation.md)
- [Event-driven architecture](../patterns/event-driven-architecture.md)
- [Layered architecture](../patterns/layered-architecture.md)

## Tradeoffs

Scalable designs may shift complexity into asynchronous control flow, cache
invalidation, replica management, or centralized metadata constraints.
