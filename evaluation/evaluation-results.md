# Architecture Wiki Evaluation Results

This document records the generated answers for the 18 selected evaluation
questions. Each answer follows `docs/answering-rules.md`: Question, Pages
consulted, Answer, and Sources used.

## Q01: nginx Component Architecture and Process Interaction

```text
Question:
What are the main components of nginx, and how do the master and worker processes interact?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/components/event-loop.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md

Answer:
nginx is organized around a privileged master process and unprivileged worker
processes. The master validates configuration, manages sockets, supervises
workers, and coordinates reconfiguration or binary upgrades. Workers accept
connections and perform request processing, filtering, proxying, caching, and
module execution. Inside workers, the event loop uses non-blocking operating
system event APIs to multiplex many connections without dedicating a thread or
process to each connection. This model supports high concurrency but makes
blocking work inside a worker dangerous because one worker may hold many active
connections.

Sources used:
- wiki/projects/nginx.md
- wiki/components/event-loop.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
```

## Q02: Git Content-Addressed Storage and Integrity

```text
Question:
How does Git manage data and state (blobs, trees, commits, references, and the index), and how does this design support integrity?

Pages consulted:
- wiki/index.md
- wiki/projects/git.md
- wiki/components/object-database.md
- wiki/patterns/content-addressed-storage.md
- wiki/adrs/git-adr-001-content-addressed-storage.md

Answer:
Git stores repository content in an immutable object database. Blobs represent
file contents, trees represent directory structure, commits point to root trees
and parent commits, and references name changing commit positions outside the
object database. The index is an explicit staging area between the working tree
and repository. Content-addressed object names bind identity to object content,
so changes to stored content change the object identity and make corruption or
history tampering detectable through the object graph.

Sources used:
- wiki/projects/git.md
- wiki/components/object-database.md
- wiki/patterns/content-addressed-storage.md
- wiki/adrs/git-adr-001-content-addressed-storage.md
```

## Q03: MediaWiki Patterns and Caching

```text
Question:
Which architectural patterns and caching strategies are utilized by MediaWiki to handle high read traffic and ensure extensibility?

Pages consulted:
- wiki/index.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/caching-strategies.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md

Answer:
MediaWiki uses layered architecture, a plugin system, and layered caching. The
request path is separated into entry points, parsing and page handling, database
access, caching layers, and extension hooks. The plugin system exposes hook
points so extensions can add behavior without editing core code. To handle high
read traffic, MediaWiki relies on reverse proxy caching, parser/rendered-page
caching, object caching, and static asset caching. These caches protect the PHP
request path and database, but they add cache invalidation complexity.

Sources used:
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/caching-strategies.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md
```

## Q04: Hadoop HDFS Fault Tolerance and Replication

```text
Question:
How does Hadoop Distributed File System (HDFS) achieve fault tolerance and scalability through NameNode/DataNode separation and replication?

Pages consulted:
- wiki/index.md
- wiki/projects/hadoop-hdfs.md
- wiki/components/namenode.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
- wiki/quality-attributes/reliability.md

Answer:
HDFS separates namespace metadata from block storage. The NameNode keeps
filesystem metadata in memory, coordinates namespace operations, and decides
block placement. DataNodes store file blocks on local disks and send heartbeats
and block reports. File content is split into large replicated blocks, with
checksums and recovery mechanisms protecting stored data. Clients obtain block
locations from the NameNode but stream data directly to or from DataNodes, so
capacity and aggregate I/O grow by adding DataNodes while the NameNode remains
the central metadata constraint.

Sources used:
- wiki/projects/hadoop-hdfs.md
- wiki/components/namenode.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
- wiki/quality-attributes/reliability.md
```

## Q05: LLVM Central IR and Modularity

```text
Question:
How do the central Intermediate Representation (IR) and modular structure of LLVM facilitate compiler optimization and support multiple frontends/backends?

Pages consulted:
- wiki/index.md
- wiki/projects/llvm.md
- wiki/components/intermediate-representation.md
- wiki/adrs/llvm-adr-001-central-intermediate-representation.md

Answer:
LLVM uses LLVM IR as the shared boundary between frontends, optimization passes,
and backends. Frontends lower source languages into IR, optimization passes
transform IR, and backends translate IR to target-specific output. This reduces
the coupling between source languages and hardware targets because new
frontends and backends connect through the common IR rather than through direct
pairs. The library-based structure also lets tools reuse selected compiler
components instead of depending on one monolithic compiler pipeline.

Sources used:
- wiki/projects/llvm.md
- wiki/components/intermediate-representation.md
- wiki/adrs/llvm-adr-001-central-intermediate-representation.md
```

## Q06: High-Scale Distributed Web Architecture

```text
Question:
What are the main components of a scalable web architecture (load balancers, caching, databases, queues) and how do they manage concurrent loads?

Pages consulted:
- wiki/index.md
- wiki/patterns/load-balancing.md
- wiki/patterns/caching-strategies.md
- wiki/patterns/database-sharding.md
- wiki/patterns/asynchronous-messaging.md
- wiki/components/message-broker.md
- wiki/quality-attributes/scalability.md

Answer:
A scalable web architecture distributes load across entry, cache, persistence,
and asynchronous processing layers. Load balancers or reverse proxies spread
client traffic across application servers. Caches reduce repeated database or
downstream work by serving hot data from fast storage. Database sharding
partitions persistent state across independent nodes when a single database is
limited by CPU, storage, or write throughput. Message brokers and asynchronous
messaging buffer traffic spikes and let workers process tasks at a sustainable
rate. These tactics improve concurrency handling by reducing central
bottlenecks, but they add routing, consistency, and operational complexity.

Sources used:
- wiki/patterns/load-balancing.md
- wiki/patterns/caching-strategies.md
- wiki/patterns/database-sharding.md
- wiki/patterns/asynchronous-messaging.md
- wiki/components/message-broker.md
- wiki/quality-attributes/scalability.md
```

## Q07: Architectural Styles and Fitting Solutions

```text
Question:
What are the most common architectural styles and patterns (client-server, layered, pub-sub, event sourcing) and what specific problems do they solve?

Pages consulted:
- wiki/index.md
- wiki/patterns/client-server.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/event-driven-architecture.md
- wiki/patterns/asynchronous-messaging.md
- wiki/patterns/event-sourcing.md

Answer:
Client-server separates clients from services that own shared state or request
processing. Layered architecture separates responsibilities such as entry
points, processing, storage, caching, and extension points. Event-driven
architecture reacts to readiness events instead of assigning one process or
thread to each connection. Publish-subscribe, covered by asynchronous
messaging, broadcasts events to multiple subscribers without the producer
knowing each consumer. Event Sourcing stores state changes as an append-only
event history so current state can be reconstructed by replaying events.

Sources used:
- wiki/patterns/client-server.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/event-driven-architecture.md
- wiki/patterns/asynchronous-messaging.md
- wiki/patterns/event-sourcing.md
```

## Q08: API Gateway Rationale and Cross-Cutting Concerns

```text
Question:
When and why should an API Gateway pattern be introduced into a system design, and what cross-cutting concerns does it centralize?

Pages consulted:
- wiki/index.md
- wiki/components/api-gateway.md
- wiki/quality-attributes/security.md
- wiki/quality-attributes/scalability.md

Answer:
An API Gateway is introduced when clients need a unified entry point in front of
multiple backend services. It decouples clients from backend topology and
centralizes behavior that would otherwise be repeated across services. The
gateway can centralize authentication, authorization, rate limiting, routing,
request transformation, response aggregation, metrics, and other entry-policy
concerns. This simplifies clients and backend services, but it also creates a
critical entry component that must be operated carefully.

Sources used:
- wiki/components/api-gateway.md
- wiki/quality-attributes/security.md
- wiki/quality-attributes/scalability.md
```

## Q09: Asynchronous Messaging Topologies

```text
Question:
What are the architectural differences, use cases, and trade-offs between a message queue, a publish-subscribe system, and an event stream?

Pages consulted:
- wiki/index.md
- wiki/patterns/asynchronous-messaging.md
- wiki/components/message-broker.md
- wiki/quality-attributes/reliability.md
- wiki/quality-attributes/scalability.md

Answer:
A message queue distributes tasks so each message is handled by one consumer,
which fits worker-pool processing and load leveling. Publish-subscribe routes
events to multiple subscribers, which fits fanout workflows where independent
services each need their own copy of an event. An event stream keeps a durable
ordered log that consumers can replay with their own offsets, which fits audit,
analytics, and event-history workloads. Queues are simpler but do not broadcast;
pub-sub decouples producers and consumers but needs recovery strategy; event
streams support replay but require retention, partition, and offset management.

Sources used:
- wiki/patterns/asynchronous-messaging.md
- wiki/components/message-broker.md
- wiki/quality-attributes/reliability.md
- wiki/quality-attributes/scalability.md
```

## Q10: API Gateway Components and Interfaces

```text
Question:
What are the core components and interfaces of an API Gateway, and how does it interface with internal backend microservices?

Pages consulted:
- wiki/index.md
- wiki/components/api-gateway.md

Answer:
An API Gateway exposes a public client API and consumes backend service APIs.
Its collaborators include clients, backend services, and identity providers. It
tracks routing configuration, policy state, rate-limiting counters, and
sometimes cached responses. It interfaces with backend services by routing,
authenticating, transforming, and forwarding requests from the public client
entry point to internal service endpoints.

Sources used:
- wiki/components/api-gateway.md
```

## Q11: Caching Strategies and Consistency

```text
Question:
How should an engineer choose between caching strategies like cache-aside, read-through, write-through, and write-back, and how do they impact data consistency?

Pages consulted:
- wiki/index.md
- wiki/patterns/caching-strategies.md
- wiki/quality-attributes/consistency.md
- wiki/quality-attributes/performance.md

Answer:
Caching improves latency and reduces backend load, especially for read-heavy
systems. Cache-aside and read-through are useful when occasional stale data or
cache-miss handling is acceptable. Write-through improves cache/database
freshness by synchronously updating both layers, but increases write latency.
Write-back improves write throughput by acknowledging cache writes before
persisting them, but creates durability risk if the cache fails before the
background write completes. The consistency page frames this as a tradeoff
between faster reads/writes and stricter synchronized state.

Sources used:
- wiki/patterns/caching-strategies.md
- wiki/quality-attributes/consistency.md
- wiki/quality-attributes/performance.md
```

## Q12: Database Sharding and Shard Keys

```text
Question:
How does database sharding manage data and state, and what architectural considerations go into selecting a shard key to prevent hotspots?

Pages consulted:
- wiki/index.md
- wiki/patterns/database-sharding.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/consistency.md

Answer:
Database sharding horizontally partitions one logical database into independent
shards. Each shard stores a subset of data, spreading storage and transaction
throughput across physical nodes. A shard key should have high cardinality,
avoid uneven hot partitions, and co-locate related data when queries need local
access. Sharding improves scalability but complicates cross-shard joins,
cross-shard transactions, consistency, and rebalancing.

Sources used:
- wiki/patterns/database-sharding.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/consistency.md
```

## Q13: Distributed Reliability Mechanisms

```text
Question:
What distributed reliability mechanisms (retries, circuit breakers, bulkheads, rate limiters) protect systems from cascading failures, and what are their trade-offs?

Pages consulted:
- wiki/index.md
- wiki/patterns/distributed-reliability.md
- wiki/quality-attributes/reliability.md
- wiki/quality-attributes/availability.md

Answer:
Distributed reliability mechanisms reduce cascading failure risk. Retries can
hide transient failures but can also amplify overload. Circuit breakers stop
calling a failing dependency once failures cross a threshold, protecting both
callers and the dependency but requiring fallback behavior. Bulkheads isolate
resource pools so one failure does not exhaust the whole system. Rate limiters
protect shared resources from abusive or excessive traffic, but they can reject
legitimate bursts if configured too tightly.

Sources used:
- wiki/patterns/distributed-reliability.md
- wiki/quality-attributes/reliability.md
- wiki/quality-attributes/availability.md
```

## Q14: nginx Quality Attributes

```text
Question:
Which quality attributes (performance, scalability, availability) are prioritized in the design of nginx, and what architectural decisions support them?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/availability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md

Answer:
nginx prioritizes performance, scalability, and availability. Its event-driven
worker model avoids per-connection process or thread overhead, improving memory
use and throughput. Its small worker set can multiplex many concurrent
connections, improving connection scalability. Its master process supervises
workers and coordinates reconfiguration and binary upgrades, supporting service
continuity during operational changes.

Sources used:
- wiki/projects/nginx.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/availability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
```

## Q15: MediaWiki Quality Attribute Tradeoffs

```text
Question:
How do architectural decisions in MediaWiki impact the trade-offs between performance, modifiability, and security?

Pages consulted:
- wiki/index.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/caching-strategies.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/modifiability.md
- wiki/quality-attributes/security.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md

Answer:
MediaWiki's hook and extension model improves modifiability by letting
extensions attach to core behavior. That flexibility increases runtime work and
security review surface. Layered caching protects performance by allowing
anonymous read traffic and rendered output to bypass expensive PHP parsing and
database access. Security controls such as permissions, input handling, and
abuse mitigation are necessary because open editing and extensions increase the
attack surface. The main tradeoff is that modifiability and collaboration make
the system more flexible but force stronger caching and security practices.

Sources used:
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/caching-strategies.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/modifiability.md
- wiki/quality-attributes/security.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md
```

## Q16: Extensibility Models

```text
Question:
Compare how Eclipse, Jitsi, and MediaWiki achieve modularity and extensibility. What are the key differences in their plugin or extension models?

Pages consulted:
- wiki/index.md
- wiki/projects/eclipse.md
- wiki/projects/jitsi.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/plugin-architecture.md
- wiki/quality-attributes/modifiability.md

Answer:
Eclipse, Jitsi, and MediaWiki all use plugin-style modularity, but their runtime
models differ. Eclipse uses plugins, extension points, OSGi bundles, exported
APIs, and lazy activation to support a large developer-tool ecosystem. Jitsi
uses OSGi bundles and service interfaces so protocol and feature modules can
discover each other at runtime. MediaWiki uses PHP hooks, extensions, skins, and
gadgets for wiki customization. The key difference is that Eclipse emphasizes
manifest and extension-point metadata, Jitsi emphasizes dynamic services, and
MediaWiki emphasizes request-scoped hooks.

Sources used:
- wiki/projects/eclipse.md
- wiki/projects/jitsi.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/plugin-architecture.md
- wiki/quality-attributes/modifiability.md
```

## Q17: nginx vs HDFS Scalability

```text
Question:
Compare nginx and Hadoop HDFS in terms of how they handle scalability. How do their architectural styles differ to support their scaling goals?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md

Answer:
nginx scales network concurrency by multiplexing many client connections inside
a small set of non-blocking worker processes. HDFS scales storage capacity and
aggregate I/O by separating centralized namespace metadata in the NameNode from
distributed block storage in DataNodes. nginx's main scaling concern is
connection and event-loop efficiency on server instances. HDFS's main scaling
concern is distributing data blocks across commodity machines while preserving a
central metadata coordinator.

Sources used:
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
```

## Q22: Remaining Coverage Gaps

```text
Question:
Which questions are currently unanswerable from the reviewed wiki due to missing content?

Pages consulted:
- wiki/index.md
- wiki/projects/
- wiki/components/
- wiki/patterns/
- wiki/quality-attributes/
- questions/typical-architecture-questions.md

Answer:
The reviewed wiki no longer has empty component or quality-attribute folders:
it contains reviewed pages for API Gateway, Message Broker, Asynchronous
Messaging, Caching Strategies, Database Sharding, Distributed Reliability,
Event Sourcing, Load Balancing, Plugin Architecture, Availability, and
Consistency. Remaining gaps are narrower:

1. Questions about AOSA projects without reviewed project pages, such as Bash,
   Asterisk, Berkeley DB, and many other source-only notes, require raw source
   fallback.
2. Questions about Observability, Service Discovery, and detailed Load Balancer
   internals do not yet have dedicated reviewed pages.
3. API Gateway topology tradeoffs now have a dedicated reviewed pattern page,
   but other specialized topology and operations topics still need future pages.

The wiki can answer the evaluated questions from reviewed pages first. It
should still avoid claiming complete reviewed coverage for every raw source
note.

Sources used:
- wiki/index.md
- questions/typical-architecture-questions.md
```
