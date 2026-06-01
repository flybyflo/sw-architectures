---
title: Availability
type: quality-attribute
status: reviewed
projects: []
sources: [raw_sources/extra_sources/bytebytego-distributed-reliability.md, raw_sources/aosa/hadoop-hdfs.md]
---

# Availability

## Definition In This Wiki

Availability is the proportion of time a system remains operational and capable of successfully responding to requests. High availability is achieved through failure isolation, node redundancy, load balancing, fast failover detection (heartbeats), and self-healing systems.

## Project Comparisons

- `../projects/hadoop-hdfs.md`: HDFS achieves high availability at the DataNode level by replicating blocks across multiple nodes and racks. However, in its basic design, the central NameNode represents a single point of failure (SPOF) for namespace metadata.
- `../projects/nginx.md`: nginx ensures worker availability using a master-worker model. The master process monitors workers and spawns new ones immediately if a worker crashes due to a request-handling error.
- `raw_sources/extra_sources/bytebytego-distributed-reliability.md`: Explains how service-oriented systems isolate dependencies using circuit breakers and bulkheads to prevent a single slow node from reducing the entire cluster's availability.

## Supporting Decisions And Patterns

- `../patterns/distributed-reliability.md`: Circuit breakers, rate limiters, and exponential retries protect system-wide availability.
- `../adrs/hdfs-adr-001-namenode-datanode-separation.md`: Separating metadata coordination from replicated storage allows HDFS block reads/writes to remain highly available even if NameNode metadata access undergoes load.

## Tradeoffs

- **Availability vs. Consistency (CAP Theorem)**: During a network partition, a system must choose between returning an eventual or slightly stale response to remain available, or rejecting the query to guarantee strict consistency.
- **Complexity vs. Resilience**: Adding redundant nodes, failover managers, and replication synchronization mechanisms increases availability but introduces massive operational complexity and higher infrastructure costs.
