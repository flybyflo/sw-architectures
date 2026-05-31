---
title: "HDFS ADR 001: NameNode/DataNode separation"
type: adr
status: accepted
project: hadoop-hdfs
decision_date: 2026-05-29
sources:
  - ../../raw_sources/aosa/hadoop-hdfs.md
components:
  - ../components/namenode.md
quality_attributes:
  - ../quality-attributes/reliability.md
  - ../quality-attributes/scalability.md
  - ../quality-attributes/performance.md
patterns:
  - ../patterns/client-server.md
---

# ADR: NameNode/DataNode Separation

## Context

HDFS stores very large data sets on commodity clusters and streams them at high
bandwidth. The source note describes a master-worker split where metadata and
block placement are coordinated separately from block storage.

## Decision

Use a dedicated NameNode for filesystem namespace metadata and block placement,
and use DataNodes for replicated block storage on local disks.

## Consequences

- Metadata coordination is centralized and simpler to reason about.
- Storage capacity and I/O bandwidth can grow by adding DataNodes.
- Data locality can be exposed to processing systems.
- The central NameNode is a scalability and availability constraint.

## Considered Options

- Selected: central NameNode plus distributed DataNodes.
- Rejected: distributing all namespace decisions across storage nodes, because
  the documented design favors simple centralized metadata coordination.

## Links

- Project: [Hadoop HDFS](../projects/hadoop-hdfs.md)
- Functional requirements:
  [Hadoop HDFS requirements](../projects/hadoop-hdfs.md#functional-requirements)
- Component: [NameNode](../components/namenode.md)
- Pattern: [client-server](../patterns/client-server.md)
- Quality attributes: [reliability](../quality-attributes/reliability.md),
  [scalability](../quality-attributes/scalability.md),
  [performance](../quality-attributes/performance.md)
- Source note: [raw_sources/aosa/hadoop-hdfs.md](../../raw_sources/aosa/hadoop-hdfs.md)
