---
title: NameNode
type: component
status: reviewed
projects:
  - ../projects/hadoop-hdfs.md
sources:
  - ../../raw_sources/aosa/hadoop-hdfs.md
---

# NameNode

## Responsibility

The NameNode stores HDFS filesystem namespace metadata and coordinates
block-to-DataNode mappings and block placement.

## Collaborators

- DataNodes.
- HDFS clients.
- CheckpointNode and BackupNode.
- Journal, checkpoint image, heartbeats, and block reports.

## State And Interfaces

The NameNode holds namespace metadata in memory, persists namespace mutations
through a write-ahead journal and checkpoint images, and receives DataNode block
reports and heartbeats. Replica locations are reported by DataNodes instead of
being stored directly in the checkpoint.

## Project Uses

- [Hadoop HDFS](../projects/hadoop-hdfs.md): uses the NameNode as the central
  metadata authority while DataNodes store replicated blocks.

## Related Decisions

- [HDFS ADR 001: NameNode/DataNode separation](../adrs/hdfs-adr-001-namenode-datanode-separation.md)
