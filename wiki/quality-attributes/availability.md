---
title: Availability
type: quality-attribute
status: reviewed
projects:
  - ../projects/hadoop-hdfs.md
  - ../projects/nginx.md
sources:
  - ../../raw_sources/extra_sources/bytebytego-distributed-reliability.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
  - ../../raw_sources/aosa/nginx.md
---

# Availability

## Definition In This Wiki

Availability is the proportion of time a system remains operational and capable of successfully responding to requests. High availability is achieved through failure isolation, node redundancy, load balancing, fast failover detection (heartbeats), and self-healing systems.

## Project Comparisons

- [Hadoop HDFS](../projects/hadoop-hdfs.md): HDFS achieves high availability at the DataNode level by replicating blocks across multiple nodes and racks. However, in its basic design, the central NameNode represents a single point of failure (SPOF) for namespace metadata.
- [nginx](../projects/nginx.md): nginx ensures availability and service continuity through its process model, separating a privileged master process (which supervises worker processes and orchestrates binary upgrades or configuration changes without downtime) from non-blocking worker processes.
- [ByteByteGo Distributed System Reliability source note](../../raw_sources/extra_sources/bytebytego-distributed-reliability.md): Explains how service-oriented systems isolate dependencies using circuit breakers and bulkheads to prevent a single slow node from reducing the entire cluster's availability.

## Supporting Decisions And Patterns

- [Distributed Reliability](../patterns/distributed-reliability.md): Circuit breakers, rate limiters, and exponential retries protect system-wide availability.
- [HDFS ADR 001: NameNode/DataNode separation](../adrs/hdfs-adr-001-namenode-datanode-separation.md): Centralizes metadata in the NameNode while distributing block storage to DataNodes, ensuring read availability through replica retrieval even if individual DataNodes fail, while establishing the NameNode as the system's central availability constraint.

## Tradeoffs

- **Availability vs. Consistency (CAP Theorem)**: During a network partition, a system must choose between returning an eventual or slightly stale response to remain available, or rejecting the query to guarantee strict consistency.
- **Complexity vs. Resilience**: Adding redundant nodes, failover managers, and replication synchronization mechanisms increases availability but introduces massive operational complexity and higher infrastructure costs.
