# ByteByteGo: Database Sharding

This is an optional raw source-layer note for the Architecture Wiki. It
summarizes architecture concepts from ByteByteGo and should be used to enrich
data/state, scalability, reliability, and tradeoff pages after review.

## Source References

- ByteByteGo Newsletter, "A Crash Course in Database Sharding":
  https://blog.bytebytego.com/p/a-crash-course-in-database-sharding

## Source Purpose

These sources explain sharding as a response to database growth and horizontal
scaling pressure. This is useful for comparing systems whose state management
depends on partitioning, data locality, replication, or distributed storage.

## Architecture Concepts

- Sharding partitions a logical database into smaller units called shards.
- Each shard stores a subset of the data.
- Sharding is usually introduced when one database becomes a bottleneck in
  storage size, write throughput, read throughput, or operational manageability.
- The shard key is a central architectural decision because it affects balance,
  routing, query patterns, and future rebalancing.

## Main Components

- Application service.
- Query router or shard router.
- Shard map or directory.
- Shards.
- Shard key.
- Rebalancing process.
- Replication layer.
- Monitoring and capacity planning tools.

## Interfaces

- Application-to-router query interface.
- Router-to-shard database interface.
- Directory lookup interface for directory-based sharding.
- Administrative interface for adding, splitting, migrating, or rebalancing
  shards.
- Observability interface for shard size, load, hot spots, and failed queries.

## Data and State Management

- Range-based sharding partitions data by ordered ranges.
- Hash-based or key-based sharding maps keys to shards using a hash or modulus.
- Directory-based sharding uses a lookup table to map keys or tenants to shards.
- Replication is often combined with sharding so each shard has redundancy.
- Cross-shard queries, joins, and transactions become more difficult.
- Rebalancing moves data when shards grow unevenly or capacity changes.

## Quality Attributes

- Scalability: sharding allows storage and traffic to grow across multiple
  database nodes.
- Performance: queries that target one shard can avoid scanning all data.
- Availability: failure can be isolated to a shard when replication and routing
  are designed well.
- Modifiability: a poor shard key can make later changes expensive.
- Operability: shard routing, rebalancing, backup, and monitoring increase
  operational complexity.
- Consistency: cross-shard transactions and global constraints are harder than
  single-database designs.

## Tradeoffs

- Sharding improves horizontal scalability but complicates queries and
  operations.
- Range sharding supports range queries but can create hot shards.
- Hash sharding balances data better but makes range queries harder.
- Directory sharding is flexible but depends on a reliable mapping service.
- Adding shards later is harder than designing for partitioning early.

## Useful Wiki Pages To Create Later

- `wiki/patterns/database-sharding.md`
- `wiki/components/shard-router.md`
- `wiki/components/shard-map.md`
- `wiki/quality-attributes/scalability.md`
- `wiki/quality-attributes/performance.md`
- `wiki/quality-attributes/operability.md`
- `wiki/quality-attributes/consistency.md`
