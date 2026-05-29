---
title: Hadoop HDFS
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/hadoop-hdfs.md
adrs:
  - ../adrs/hdfs-adr-001-namenode-datanode-separation.md
components:
  - ../components/namenode.md
patterns:
  - ../patterns/client-server.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/reliability.md
  - ../quality-attributes/scalability.md
  - ../quality-attributes/modifiability.md
---

# Hadoop HDFS

## Concise Architecture Summary

Namespace is centralized.
Blocks are replicated across nodes.
Throughput guides design.

## Context

HDFS is a distributed file system for storing very large data sets reliably and
streaming them to applications at high bandwidth. It targets clusters of
commodity machines and batch workloads such as MapReduce.

## Functional Requirements

- Store very large files across a cluster.
- Stream data at high bandwidth.
- Replicate blocks for durability and availability.
- Expose a Unix-like filesystem interface.
- Support data-local computation, balancing, checkpoints, and recovery.

## Main Components

- [NameNode](../components/namenode.md): namespace metadata and block-placement
  coordinator.
- DataNodes: store replicated file blocks on local disks.
- HDFS clients: coordinate with the NameNode and stream data to or from
  DataNodes.
- CheckpointNode, BackupNode, journal, checkpoint image, block reports,
  heartbeats, balancer, and block scanner.

## Interfaces

- Unix-like filesystem interface.
- TCP-based protocols among clients, NameNode, and DataNodes.
- DataNode heartbeat and block report protocols.
- Administrative tools for balancing, snapshots, upgrades, and recovery.
- Local filesystem interface for stored block and metadata files.

## Data And State Management

The NameNode keeps filesystem namespace metadata in memory and persists
namespace changes through checkpoint images and a write-ahead journal. File
content is split into large blocks, and DataNodes store block replicas plus
metadata files with checksums and generation information. Replica locations are
reported by DataNodes rather than persisted in the checkpoint.

## Quality Attributes

- [Reliability](../quality-attributes/reliability.md): replication, checksums,
  heartbeats, block reports, scanners, and snapshots protect data.
- [Scalability](../quality-attributes/scalability.md): capacity and bandwidth
  grow by adding commodity servers.
- [Performance](../quality-attributes/performance.md): large blocks and
  sequential streaming favor high-throughput batch processing.
- [Modifiability](../quality-attributes/modifiability.md): the model is simple,
  but the central NameNode is an architectural constraint.

## Key Architecture Decisions

- [Separate metadata in the NameNode from block storage in DataNodes](../adrs/hdfs-adr-001-namenode-datanode-separation.md).
- Store file content as large replicated blocks.
- Use heartbeats, block reports, checksums, and write-ahead journaling.
- Use rack-aware placement to reduce failure-domain risk.

## Tradeoffs

HDFS favors high-throughput sequential I/O over low-latency random access. A
single NameNode simplifies metadata coordination, but it becomes a scalability
and availability constraint.

## Links

- Source note: [raw_sources/aosa/hadoop-hdfs.md](../../raw_sources/aosa/hadoop-hdfs.md)
- Pattern: [client-server](../patterns/client-server.md)
