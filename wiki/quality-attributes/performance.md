---
title: Performance
type: quality-attribute
status: reviewed
projects:
  - ../projects/nginx.md
  - ../projects/git.md
  - ../projects/mediawiki.md
  - ../projects/hadoop-hdfs.md
  - ../projects/llvm.md
sources:
  - ../../raw_sources/aosa/nginx.md
  - ../../raw_sources/aosa/git.md
  - ../../raw_sources/aosa/mediawiki.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
  - ../../raw_sources/aosa/llvm.md
---

# Performance

## Definition In This Wiki

Performance describes how architectural choices affect throughput, latency,
resource use, and repeated work.

## Project Comparisons

- [nginx](../projects/nginx.md): non-blocking event processing avoids
  per-connection process or thread overhead.
- [Git](../projects/git.md): most operations are local, and packfiles reduce
  storage and transfer overhead.
- [MediaWiki](../projects/mediawiki.md): profiling, caching, ResourceLoader, and
  request-path optimization reduce repeated work.
- [Hadoop HDFS](../projects/hadoop-hdfs.md): large blocks and sequential
  streaming favor high-throughput batch processing.
- [LLVM](../projects/llvm.md): optimization pipelines and target-specific
  backends can be specialized for different uses.

## Supporting Decisions And Patterns

- [nginx ADR 001](../adrs/nginx-adr-001-event-driven-worker-model.md)
- [MediaWiki ADR 001](../adrs/mediawiki-adr-001-layered-caching.md)
- [HDFS ADR 001](../adrs/hdfs-adr-001-namenode-datanode-separation.md)
- [LLVM ADR 001](../adrs/llvm-adr-001-central-intermediate-representation.md)

## Tradeoffs

Performance decisions often introduce complexity: event-driven control flow,
cache invalidation, pass pipeline tuning, and workload-specific storage choices.
