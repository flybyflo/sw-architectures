---
title: Reliability
type: quality-attribute
status: reviewed
projects:
  - ../projects/git.md
  - ../projects/hadoop-hdfs.md
sources:
  - ../../raw_sources/aosa/git.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
---

# Reliability

## Definition In This Wiki

Reliability describes architectural support for preserving correct data and
continuing useful operation when local failures occur.

## Project Comparisons

- [Git](../projects/git.md): each clone can contain complete repository history,
  and object hashes connect identity with integrity.
- [Hadoop HDFS](../projects/hadoop-hdfs.md): replication, checksums, heartbeats,
  block reports, scanners, snapshots, and retry behavior protect stored data.

## Supporting Decisions And Patterns

- [Git ADR 001](../adrs/git-adr-001-content-addressed-storage.md)
- [HDFS ADR 001](../adrs/hdfs-adr-001-namenode-datanode-separation.md)
- [Content-addressed storage](../patterns/content-addressed-storage.md)
- [Client-server](../patterns/client-server.md)

## Tradeoffs

Reliability mechanisms consume resources and add operational complexity:
replication costs storage, and distributed history exposes users to richer
repository concepts.
