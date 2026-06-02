---
title: Reliability
type: quality-attribute
status: reviewed
projects:
  - ../projects/git.md
  - ../projects/mercurial.md
  - ../projects/hadoop-hdfs.md
  - ../projects/nginx.md
sources:
  - ../../raw_sources/aosa/git.md
  - ../../raw_sources/aosa/mercurial.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
  - ../../raw_sources/aosa/nginx.md
  - ../../raw_sources/extra_sources/bytebytego-distributed-reliability.md
---

# Reliability

## Definition In This Wiki

Reliability describes architectural support for preserving correct data and
continuing useful operation when local failures occur.

## Project Comparisons

- [Git](../projects/git.md): each clone can contain complete repository history,
  and object hashes connect identity with integrity.
- [Mercurial](../projects/mercurial.md): distributed local history and
  append-only revlog storage reduce dependence on a central repository and
  avoid rewriting existing revision data in place.
- [Hadoop HDFS](../projects/hadoop-hdfs.md): replication, checksums, heartbeats,
  block reports, scanners, snapshots, and retry behavior protect stored data.
- [nginx](../projects/nginx.md): master-supervised workers and live
  reconfiguration limit the effect of worker failure or upgrades on service
  continuity.
- [ByteByteGo Distributed System Reliability source note](../../raw_sources/extra_sources/bytebytego-distributed-reliability.md):
  retries, circuit breakers, rate limiters, and bulkheads limit cascading
  failures in service-oriented systems.

## Supporting Decisions And Patterns

- [Git ADR 001](../adrs/git-adr-001-content-addressed-storage.md)
- [HDFS ADR 001](../adrs/hdfs-adr-001-namenode-datanode-separation.md)
- [Content-addressed storage](../patterns/content-addressed-storage.md)
- [Client-server](../patterns/client-server.md)
- [Distributed Reliability](../patterns/distributed-reliability.md)
- [Asynchronous Messaging](../patterns/asynchronous-messaging.md)

## Tradeoffs

Reliability mechanisms consume resources and add operational complexity:
replication costs storage, and distributed history exposes users to richer
repository concepts.
