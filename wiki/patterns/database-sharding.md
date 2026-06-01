---
title: Database Sharding
type: pattern
status: reviewed
projects: []
sources: [raw_sources/extra_sources/bytebytego-database-sharding.md]
---

# Database Sharding

## Summary

Database Sharding partitions a logical database horizontally into smaller, independent units called shards. Each shard stores a distinct subset of the data, spreading both database storage and transaction throughput across multiple physical database nodes. It is typically introduced when a single database hits physical limits in CPU, storage, or write throughput.

## Forces

- **Horizontal Scalability**: Spreads large data and write volumes across independent nodes.
- **Data Locality**: Places data close to specific users or regions.
- **Blast Radius Reduction**: Restricts database node failure to only affecting the subset of users on that shard.

## Project Uses

- `raw_sources/extra_sources/bytebytego-database-sharding.md`: describes range-based, hash-based, and directory-based database sharding.
- `../projects/hadoop-hdfs.md`: Hadoop HDFS scales storage horizontally by distributing replicated blocks across many DataNodes, sharing a conceptually similar horizontal data partitioning approach.

## Tradeoffs

### Benefits
- **Limitless State Growth**: Database capacity scales linearly with the number of nodes.
- **Parallel Throughput**: Eliminates a single global lock or transaction choke point.

### Costs
- **Query Complexity**: Joins and aggregate queries across shards require expensive cross-network map-reduce style operations.
- **Transaction Limitations**: Cross-shard ACID transactions are highly complex and usually avoided in favor of eventual consistency.
- **Rebalancing Overhead**: If a shard key leads to uneven data growth (hotspots), migrating or splitting shards is operational-intensive.

## Related Pages

- `../quality-attributes/scalability.md`
- `../components/namenode.md`
