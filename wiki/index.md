# Architecture Wiki Index

This is the entry point for the reviewed Architecture Wiki. Read this page
before retrieval so the workflow can identify reviewed pages before falling back
to raw source notes.

## Project Pages

- [nginx](projects/nginx.md): event-driven web server and reverse proxy built
  around master-supervised non-blocking workers.
- [Git](projects/git.md): distributed version control system built around a
  content-addressed object database and explicit staging index.
- [Mercurial](projects/mercurial.md): distributed version control system built
  around revlogs, dirstate tracking, and a compact command model.
- [MediaWiki](projects/mediawiki.md): wiki platform shaped by Wikipedia-scale
  reads, layered caching, hooks, and wikitext processing.
- [Moodle](projects/moodle.md): learning management system organized around
  courses, activities, plugins, roles, capabilities, and database-backed state.
- [Hadoop HDFS](projects/hadoop-hdfs.md): distributed filesystem using a
  NameNode/DataNode split and replicated large blocks.
- [LLVM](projects/llvm.md): reusable compiler infrastructure centered on LLVM
  IR, modular passes, and library-based components.
- [Eclipse](projects/eclipse.md): extensible developer-tool platform built on
  plugins, extension points, OSGi bundles, and lazy activation.
- [Jitsi](projects/jitsi.md): communication client organized around OSGi
  services, protocol providers, media handling, and shared abstractions.

## Architecture Decision Records

- [nginx ADR 001: Event-driven worker model](adrs/nginx-adr-001-event-driven-worker-model.md):
  choose non-blocking workers over process-per-connection or thread-per-connection
  request handling.
- [Git ADR 001: Content-addressed storage](adrs/git-adr-001-content-addressed-storage.md):
  store immutable repository objects by content hash.
- [MediaWiki ADR 001: Layered caching](adrs/mediawiki-adr-001-layered-caching.md):
  use reverse proxy, object, rendered-page, and asset caching to protect the
  request path.
- [HDFS ADR 001: NameNode/DataNode separation](adrs/hdfs-adr-001-namenode-datanode-separation.md):
  centralize namespace metadata while distributing replicated block storage.
- [LLVM ADR 001: Central intermediate representation](adrs/llvm-adr-001-central-intermediate-representation.md):
  make LLVM IR the shared boundary between front ends, optimization passes, and
  backends.

## Components

- [Event loop](components/event-loop.md): non-blocking runtime dispatcher used
  by nginx workers.
- [Object database](components/object-database.md): immutable content-addressed
  storage used by Git.
- [Plugin system](components/plugin-system.md): extension mechanism used by
  Eclipse plugins, Jitsi services, and MediaWiki hooks/extensions.
- [NameNode](components/namenode.md): HDFS metadata and block-placement
  coordinator.
- [Intermediate representation](components/intermediate-representation.md):
  LLVM IR as a compiler pipeline boundary.
- [API Gateway](components/api-gateway.md): unified client-facing entry point
  for modern service topologies.
- [Message Broker](components/message-broker.md): asynchronous messaging and
  event-buffering mediation component.

## Patterns

- [Event-driven architecture](patterns/event-driven-architecture.md): systems
  that multiplex many activities through non-blocking events.
- [Layered architecture](patterns/layered-architecture.md): separated layers
  for entry points, processing, storage, caching, and extension points.
- [Client-server](patterns/client-server.md): clients coordinate with services
  that own metadata, data, or request processing.
- [Content-addressed storage](patterns/content-addressed-storage.md): data
  identity derived from content hashes.
- [Database Sharding](patterns/database-sharding.md): horizontal partitioning
  of logical databases across independent nodes.
- [API Gateway Topology Tradeoffs](patterns/api-gateway-topology.md): compare
  gateway-mediated client entry with direct client-to-service access.
- [Load Balancing](patterns/load-balancing.md): traffic distribution across
  replicated backend nodes.
- [Caching Strategies](patterns/caching-strategies.md): RAM-based fast-access
  patterns (cache-aside, write-through, etc.) to bypass disk/network.
- [Distributed Reliability](patterns/distributed-reliability.md): tactics
  (retries, circuit breakers, bulkheads) to absorb partial failures.
- [Asynchronous Messaging](patterns/asynchronous-messaging.md): queues,
  publish-subscribe topics, and durable streams for decoupled communication.
- [Plugin Architecture](patterns/plugin-architecture.md): extension points,
  bundles, services, and hooks for modular ecosystems.
- [Event Sourcing](patterns/event-sourcing.md): append-only event history used
  to reconstruct state.

## Quality Attributes

- [Performance](quality-attributes/performance.md): throughput and latency
  outcomes shaped by event loops, caching, locality, and optimization pipelines.
- [Reliability](quality-attributes/reliability.md): integrity, replication,
  retry, durability, and operational recovery mechanisms.
- [Scalability](quality-attributes/scalability.md): ability to handle larger
  traffic, data, or collaboration loads.
- [Modifiability](quality-attributes/modifiability.md): ability to change,
  extend, or compose the system.
- [Security](quality-attributes/security.md): isolation, permissions, integrity,
  and abuse-resistance concerns documented in the source notes.
- [Availability](quality-attributes/availability.md): operational uptime,
  heartbeat monitoring, node failover, and redundancy.
- [Consistency](quality-attributes/consistency.md): uniform state guarantees,
  comparing strong and eventual consistency models.

## Source Notes

Raw source notes are verification inputs, not the preferred answer layer.

- [nginx source note](../raw_sources/aosa/nginx.md)
- [Git source note](../raw_sources/aosa/git.md)
- [Mercurial source note](../raw_sources/aosa/mercurial.md)
- [MediaWiki source note](../raw_sources/aosa/mediawiki.md)
- [Moodle source note](../raw_sources/aosa/moodle.md)
- [Hadoop HDFS source note](../raw_sources/aosa/hadoop-hdfs.md)
- [LLVM source note](../raw_sources/aosa/llvm.md)
- [Eclipse source note](../raw_sources/aosa/eclipse.md)
- [Jitsi source note](../raw_sources/aosa/jitsi.md)
- [ByteByteGo API Gateway source note](../raw_sources/extra_sources/bytebytego-api-gateway.md)
- [ByteByteGo Software Architecture Patterns source note](../raw_sources/extra_sources/bytebytego-architecture-patterns.md)
- [ByteByteGo Caching Strategies source note](../raw_sources/extra_sources/bytebytego-caching-strategies.md)
- [ByteByteGo Database Sharding source note](../raw_sources/extra_sources/bytebytego-database-sharding.md)
- [ByteByteGo Distributed System Reliability source note](../raw_sources/extra_sources/bytebytego-distributed-reliability.md)
- [ByteByteGo Messaging Patterns source note](../raw_sources/extra_sources/bytebytego-messaging-patterns.md)

## Retrieval Order

1. Start with this index.
2. Read the most relevant reviewed wiki pages.
3. Use `qmd` retrieval when the index does not identify the right page.
4. Fall back to `raw_sources/` only to verify or fill missing context.
5. Cite exact Markdown file paths in answers.

## Next Steps

- Add more reviewed project, ADR, component, pattern, and quality pages from the
  remaining AOSA source notes.
