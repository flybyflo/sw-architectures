# Hadoop HDFS

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "The Hadoop Distributed File System" by Robert Chansler,
  Hairong Kuang, Sanjay Radia, Konstantin Shvachko, and Suresh Srinivas:
  https://aosabook.org/en/v1/hdfs.html

## Project Purpose

HDFS is a distributed file system designed to store very large data sets
reliably and stream them to applications at high bandwidth. It is optimized for
large clusters of commodity machines and for batch workloads such as MapReduce.

## Architectural Style

- Distributed file system
- Master-worker metadata/data separation
- Client-server architecture
- Replicated block storage
- Data-local computation support
- Rack-aware storage architecture

## Main Components

- NameNode: stores filesystem namespace metadata and block-to-DataNode mappings.
- DataNodes: store replicated file blocks on local disks.
- HDFS clients: read and write files by coordinating with the NameNode and
  streaming block data to or from DataNodes.
- CheckpointNode: periodically merges checkpoint and journal state.
- BackupNode: keeps a synchronized in-memory namespace image from the NameNode's
  journal stream.
- Journal: write-ahead log of namespace transactions.
- Checkpoint image: persistent snapshot of namespace metadata.
- Block reports: DataNode reports of stored replicas.
- Heartbeats: DataNode liveness and capacity reports.
- Balancer: administrative tool for disk usage balancing.
- Block scanner: verifies stored block checksums.

## Interfaces

- Unix-like filesystem interface for users and applications.
- TCP-based protocols among clients, NameNode, and DataNodes.
- MapReduce and other data processing systems use locality information.
- DataNode heartbeat and block report protocol.
- Administrative tools for balancing, snapshots, upgrades, and recovery.
- Local filesystem interface on each node for block and metadata files.

## Data and State Management

- The namespace is represented as directories and files in NameNode memory.
- File content is split into large blocks.
- Blocks are independently replicated across DataNodes.
- Block replica locations are reported by DataNodes rather than stored as part
  of the persistent checkpoint.
- NameNode metadata is persisted through checkpoint images and a journal.
- Namespace mutations are written to the journal before client acknowledgment.
- DataNodes store each block replica as a data file plus a metadata file
  containing checksums and generation information.
- Clients verify checksums during reads and can retry another replica when a
  replica is corrupt or unavailable.
- Rack-aware placement distributes replicas to improve durability and bandwidth.

## Quality Attributes

- Reliability: replication, checksums, heartbeats, block reports, scanners, and
  snapshots protect data.
- Scalability: storage capacity, compute capacity, and I/O bandwidth grow by
  adding commodity servers.
- Performance: large blocks and sequential streaming favor high-throughput batch
  processing.
- Availability: replica placement and retry behavior allow reads to continue
  despite failed DataNodes.
- Operability: checkpoints, balancing, and upgrade snapshots support cluster
  administration.
- Modifiability: the design favors a simple distributed storage model, but the
  central NameNode is an important architectural constraint.

## Key Architectural Decisions

- Separate filesystem metadata from application data.
- Use a dedicated NameNode for namespace and block placement metadata.
- Store file content as large replicated blocks on DataNodes.
- Use replication rather than RAID for durability.
- Keep computation close to data where possible.
- Use heartbeats and block reports for liveness and replica tracking.
- Use write-ahead journaling and checkpoints for namespace durability.
- Use rack-aware placement to avoid putting all replicas in one failure domain.
- Provide balancer and block scanner tools for long-running cluster health.

## Tradeoffs

- HDFS favors high-throughput sequential I/O over low-latency random access.
- The Unix-like interface is familiar, but strict filesystem semantics were
  relaxed for performance and workload fit.
- Replication improves durability and read bandwidth, but costs extra storage.
- A single NameNode simplifies metadata coordination but creates a scalability
  and availability constraint.
- Large blocks reduce metadata overhead and improve streaming, but are less
  suited to many tiny files.

## Useful Wiki Pages To Create Later

- `wiki/projects/hadoop-hdfs.md`
- `wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md`
- `wiki/adrs/hdfs-adr-002-replicated-large-block-storage.md`
- `wiki/components/namenode.md`
- `wiki/components/datanode.md`
- `wiki/components/block-replication.md`
- `wiki/patterns/client-server.md`
- `wiki/quality-attributes/reliability.md`
- `wiki/quality-attributes/scalability.md`
