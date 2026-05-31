# Architecture Wiki Evaluation Results

This document contains the evaluation results of running the Architecture Wiki against the 18 selected architecture questions. Each question is answered strictly following the layout defined in [docs/answering-rules.md](../docs/answering-rules.md).

---

## Part A: Project-Specific Architecture Questions

### Q01: nginx Component Architecture & Process Interaction

```text
Question:
What are the main components of nginx, and how do the master and worker processes interact?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/components/event-loop.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md

Answer:
The main components of nginx are:
1. Master Process: Responsible for validating configurations, managing listening sockets, supervising worker processes, and coordinating seamless live reconfigurations and binary upgrades.
2. Worker Processes: Accept incoming connections and handle request processing, filtering, proxying, caching, and other runtime behaviors.
3. Event Loop: Coordinates non-blocking I/O multiplexing module callbacks using operating system-level APIs like `epoll` or `kqueue`.
4. Modules: Implement specific behaviors such as protocol handling (HTTP, mail, stream), filters, load balancing, variables, and upstream proxying.
5. Cache Loader and Cache Manager: Handle loading cache metadata into memory and expiring old cache contents.

Process Interaction:
The master process runs as a privileged user (e.g., root) to bind to privileged network ports (like 80/443) and read configuration files. It then spawns a fixed number of unprivileged worker processes (usually sized to the number of CPU cores). The master process does not handle individual connection requests. Instead, it supervises the workers, communicating with them via shared memory, signals, and sockets. Worker processes run in an infinite event loop, accepting connections on the shared sockets bound by the master and processing requests asynchronously and non-blockingly without context-switching overhead.

Sources used:
- wiki/projects/nginx.md
- wiki/components/event-loop.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
```

---

### Q02: Git Content-Addressed Storage & Integrity

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
Git manages repository data and state using an immutable, content-addressed object database and mutable references:
1. Blobs: Represent file contents only, decoupling content from filenames and permissions.
2. Trees: Represent directory structures, mapping filenames, permissions, and directory hierarchies to their corresponding blob or nested tree hashes.
3. Commits: Point to a root tree (representing the project state at that point) and link to zero or more parent commit hashes, building a directed acyclic graph (DAG) of history.
4. References (Refs) and HEAD: Mutable names (like branches and tags) pointing to specific commits, which can move freely without modifying the immutable history. `HEAD` points to the current active reference or commit.
5. Index (Staging Area): A binary file acting as a flat cache or staging boundary between the working directory and the object database, enabling the composition of the next commit.

Design Support for Integrity:
Every object stored in the `.git/objects` database is identified by the SHA-1 cryptographic hash of its type, size, and content. This ensures content-addressable storage: if a single byte in a file or directory structure changes, its hash changes, which recursively propagates up to the tree and commit levels. This DAG structure binds every commit to the exact state of all files and history preceding it. As a result, data corruption or history tampering is mathematically detectable immediately upon hash validation.

Sources used:
- wiki/projects/git.md
- wiki/components/object-database.md
- wiki/patterns/content-addressed-storage.md
- wiki/adrs/git-adr-001-content-addressed-storage.md
```

---

### Q03: MediaWiki Patterns & Caching

```text
Question:
Which architectural patterns and caching strategies are utilized by MediaWiki to handle high read traffic and ensure extensibility?

Pages consulted:
- wiki/index.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/layered-architecture.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md

Answer:
MediaWiki handles high read traffic and ensures extensibility using the following patterns and caching strategies:

Architectural Patterns:
1. Layered Architecture: MediaWiki separates responsibilities into distinct layers: entry points (`index.php`, `api.php`), wikitext parser and page handlers, database access, caching layers, and the plugin extension boundary.
2. Client-Server: External browsers and API clients connect to web application servers backed by shared database master-replica systems.
3. Plugin System (Hooks and Extensions): Provides a hook registry where developers register custom handlers for core events, facilitating modular modifiability without editing core code.

Caching Strategies (Multi-Layered Caching Hierarchy):
1. Reverse Proxy Cache (Varnish/Squid): Intercepts anonymous read requests at the edge, serving rendered HTML pages directly without hitting PHP application or database servers.
2. Rendered-Page Cache (Parser Cache): Stores parsed wikitext as rendered HTML blocks in a cache, avoiding the CPU-heavy cost of re-parsing wikitext on every request.
3. Object Cache (Memcached): Caches database query results, session states, and site configuration across application servers.
4. Local Browser and CDN Caching: Managed by ResourceLoader, caching static assets, Javascript, and CSS on the client-side.
5. Invalidation and Deferred Updates: Centralized invalidation triggers updates across all caches when page edits occur, and a job queue defers heavy post-save tasks asynchronously.

Sources used:
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/patterns/layered-architecture.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md
```

---

### Q04: Hadoop HDFS Fault Tolerance & Replication

```text
Question:
How does Hadoop Distributed File System (HDFS) achieve fault tolerance and scalability through NameNode/DataNode separation and replication?

Pages consulted:
- wiki/index.md
- wiki/projects/hadoop-hdfs.md
- wiki/components/namenode.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md

Answer:
HDFS achieves fault tolerance and horizontal scalability by cleanly separating metadata coordination from block data storage:

NameNode/DataNode Separation:
1. NameNode (Central Master): Manages the filesystem namespace metadata (directory structure, file-to-block mapping, permissions) entirely in memory. It coordinates file open/close/rename operations and manages block replication placement decisions.
2. DataNodes (Distributed Workers): Store actual file content blocks on local disks. They report available blocks and status periodically and handle block read/write stream requests directly from HDFS clients.

Fault Tolerance Mechanisms:
1. Block Replication: File content is split into large blocks (e.g., 64MB/128MB). Each block is replicated (typically 3 times) across different DataNodes.
2. Rack-Aware Replication: Block placement is distributed across racks to survive rack-level failures.
3. Heartbeats and Block Reports: DataNodes send regular heartbeats to the NameNode. If a DataNode fails to send heartbeats, the NameNode marks it dead and schedules re-replication of its blocks from other surviving replicas. Block reports verify block list integrity.
4. Checksums: DataNodes store checksums for blocks, and clients scan data on read to detect and report corrupt blocks, triggering replacement from good replicas.
5. Edit Log and FsImage: Namespace mutations are written to a transactional edit log and checkpointed, allowing metadata recovery.

Scalability:
By keeping metadata centralized on the NameNode and distributing actual block data streams directly between HDFS clients and DataNodes, the cluster can scale horizontally. Clients do not stream block data through the NameNode, preventing the NameNode from becoming a bandwidth bottleneck. The storage capacity and aggregate I/O throughput scale linearly by adding commodity DataNode servers.

Sources used:
- wiki/projects/hadoop-hdfs.md
- wiki/components/namenode.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
```

---

### Q05: LLVM Central IR Decoupling & Modularity

```text
Question:
How do the central Intermediate Representation (IR) and modular structure of LLVM facilitate compiler optimization and support multiple frontends/backends?

Pages consulted:
- wiki/index.md
- wiki/projects/llvm.md
- wiki/components/intermediate-representation.md
- wiki/adrs/llvm-adr-001-central-intermediate-representation.md

Answer:
LLVM's design decouples compiler stages using a central Intermediate Representation (IR) and a library-based, modular structure:

Central Intermediate Representation (IR):
1. LLVM IR serves as a strongly-typed, target-independent representation of programs. It exists in three isomorphic formats: an in-memory C++ class representation, an on-disk bitcode format, and a human-readable text format.
2. The IR acts as a strict architectural boundary. Frontends (such as Clang) parse source languages and lower them exclusively into LLVM IR. Target backends translate LLVM IR into target-specific assembly or machine code.
3. By introducing this single common boundary, compiler complexity is reduced from O(M * N) (for M languages and N hardware targets) to O(M + N). Adding a new language only requires writing a frontend that targets LLVM IR, and adding a new target only requires a backend that compiles LLVM IR.

Modular Structure and Compiler Optimization:
1. Optimization passes are built as loosely-coupled, self-contained libraries. Each pass analyses or transforms the LLVM IR.
2. A PassManager coordinates pass dependencies and schedules executions. Because all optimization passes read and write the same LLVM IR, passes can be composed, reordered, or completely omitted depending on optimization levels (e.g., -O0 vs. -O3) or target needs without breaking compiler pipeline integrity.
3. Compiler components (assembly parser, disassembler, code generator, link-time-optimizer) are structured as reusable libraries rather than a single monolithic compiler binary. Clients can link only the specific compilation capabilities they need.

Sources used:
- wiki/projects/llvm.md
- wiki/components/intermediate-representation.md
- wiki/adrs/llvm-adr-001-central-intermediate-representation.md
```

---

## Part B: General & Distributed Systems Architecture Questions

### Q06: High-Scale Distributed Web Architecture Overview

```text
Question:
What are the main components of a scalable web architecture (load balancers, caching, databases, queues) and how do they manage concurrent loads?

Pages consulted:
- wiki/index.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/performance.md
- wiki/patterns/layered-architecture.md
- raw_sources/aosa/scalable-web-architecture-distributed-systems.md

Answer:
According to the AOSA source note on scalable web architectures, a high-scale distributed system utilizes several core architectural components to handle massive concurrent loads and eliminate single points of failure:

1. DNS and Load Balancers:
   - Function: Act as the entry point for client traffic. DNS translates domains and distributes traffic globally, while load balancers (reverse proxies) accept incoming connections and route requests to an array of replicated web or application servers.
   - Load Management: Distribute concurrent connections evenly across multiple application nodes (horizontal scaling) and prevent single application servers from becoming overwhelmed.

2. Caching Layer (CDNs and Application Caches):
   - Function: Caches (like CDNs for static assets and distributed caches like Redis/Memcached for dynamic data) store hot data close to the user or application.
   - Load Management: Intercept read requests, preventing them from hitting application servers or databases. This reduces repeated expensive computation, keeps latencies low, and shields backend databases from high-concurrency read spikes.

3. Database Layer (Partitioning and Sharding):
   - Function: Manages persistent data. When a single database server cannot handle the transaction load or storage size, the database is partitioned or sharded horizontally.
   - Load Management: Database reads are offloaded to read replicas. Writes and storage are partitioned across shards based on a shard key, separating concurrent queries into isolated database nodes to avoid centralized lock and disk I/O contention.

4. Message Queues (Asynchronous Workers):
   - Function: Buffer asynchronous, non-blocking work and decouple request producers from background task consumers.
   - Load Management: Smooth out sudden traffic spikes by acting as a shock absorber. Application servers offload heavy tasks (e.g., image processing, email sending) to the queue instantly, keeping request paths fast, while background workers pull and process tasks at a steady, sustainable pace.

5. Service Decomposition:
   - Function: Breaking a monolithic application into isolated, single-purpose services.
   - Load Management: Allows independent scaling of specific services that experience the most concurrent load without needing to scale the entire application.

Sources used:
- raw_sources/aosa/scalable-web-architecture-distributed-systems.md
- wiki/quality-attributes/scalability.md
```

---

### Q07: Architectural Styles and Fitting Solutions

```text
Question:
What are the most common architectural styles and patterns (client-server, layered, pub-sub, event sourcing) and what specific problems do they solve?

Pages consulted:
- wiki/index.md
- wiki/patterns/client-server.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/event-driven-architecture.md
- raw_sources/extra_sources/bytebytego-architecture-patterns.md

Answer:
As summarized in ByteByteGo's patterns review and the Architecture Wiki patterns layer, the most common architectural styles and their target problems are:

1. Client-Server Pattern:
   - Summary: Separates client requestors from service providers that own central resources, metadata, or execution environments.
   - Problems Solved: Solves the need to share centralized data, coordinate global state, and enforce business policies securely across many dispersed clients (e.g., HDFS metadata coordination via NameNode).

2. Layered Architecture:
   - Summary: Organizes responsibilities into isolated, nested layers (e.g., presentation, application logic, database, caching, and extensions).
   - Problems Solved: Solves high coupling and poor separation of concerns. It provides clean dependency boundaries, allowing components within a layer to change or scale (e.g., swapping database engines) without affecting other layers (e.g., MediaWiki's request routing vs. database storage).

3. Publish-Subscribe (Pub-Sub) Pattern:
   - Summary: A messaging pattern where event producers publish messages to topics without knowing who or how many consumers will process them.
   - Problems Solved: Solves temporal and structural coupling in distributed communication. It prevents producers from blocking on consumer availability, and allows adding or removing subscribers dynamically without altering the publisher's code.

4. Event Sourcing Pattern:
   - Summary: Stores application state transitions as an immutable, append-only sequence of historical events rather than just mutating the current state directly.
   - Problems Solved: Solves the problem of data auditing, historical state replay, and lost operational context in traditional CRUD databases. It provides an exact, unalterable audit log and enables reconstructive analytics.

5. Event-Driven Architecture:
   - Summary: Systems multiplex activities by reacting to readiness events asynchronously.
   - Problems Solved: Solves resource exhaustion and connection scaling bottlenecks in thread-per-connection environments under high-concurrency open-socket loads (e.g., nginx worker event loops).

Sources used:
- raw_sources/extra_sources/bytebytego-architecture-patterns.md
- wiki/patterns/client-server.md
- wiki/patterns/layered-architecture.md
- wiki/patterns/event-driven-architecture.md
```

---

### Q08: API Gateway Rationale & Cross-Cutting Concerns

```text
Question:
When and why should an API Gateway pattern be introduced into a system design, and what cross-cutting concerns does it centralize?

Pages consulted:
- wiki/index.md
- wiki/quality-attributes/security.md
- wiki/quality-attributes/scalability.md
- raw_sources/extra_sources/bytebytego-api-gateway.md

Answer:
Based on ByteByteGo's API Gateway source notes, the API Gateway pattern should be introduced under specific architectural conditions:

When to Introduce:
An API Gateway should be introduced when a system transitions from a monolith to a distributed microservice topology where external clients need to access multiple backend services.

Why to Introduce:
1. Decouple Client and Server: It shields clients from the complex, changing, and internal physical layout of the backend services. Clients only talk to a single entry point.
2. Reduce Client Roundtrips: Instead of a client making five separate HTTP requests to five different microservices (e.g., cart, catalog, reviews, profile, recommendations), the gateway can aggregate these calls downstream and return a single composite response.
3. Centralize Policies: It prevents developers from having to duplicate security, routing, and traffic management logic inside every individual backend microservice.

Cross-Cutting Concerns Centralized:
An API Gateway centralizes the following critical cross-cutting concerns:
- Security: Centralized user authentication and authorization, SSL termination, and protection against malicious attacks.
- Traffic Management: Rate limiting, throttling, and request routing.
- Protocol Translation: Mapping client protocols (e.g., HTTP/REST, WebSockets) to downstream protocols (e.g., gRPC, AMQP).
- Observability: Unified entry logging, request tracing correlation, and response metrics.
- Reliability: Shared client timeout policies, retries, and circuit-breaking protection.

Sources used:
- raw_sources/extra_sources/bytebytego-api-gateway.md
```

---

### Q09: Asynchronous Messaging Topologies

```text
Question:
What are the architectural differences, use cases, and trade-offs between a message queue, a publish-subscribe system, and an event stream?

Pages consulted:
- wiki/index.md
- raw_sources/extra_sources/bytebytego-messaging-patterns.md

Answer:
According to ByteByteGo's messaging patterns review, the three async messaging topologies differ in structure, usage, and trade-offs:

1. Message Queue (Point-to-Point):
   - Architectural Difference: Messages are sent to a single queue. Each message is consumed and processed by exactly one consumer. Once a consumer acknowledges a message, it is deleted from the queue.
   - Use Cases: Task distribution, job processing, and worker queues (e.g., image resizing, sending order confirmations).
   - Trade-offs: Good for simple load balancing and worker task safety. It cannot support broadcasting one message to multiple independent consumers.

2. Publish-Subscribe (Pub-Sub):
   - Architectural Difference: Publishers send messages to a topic. The broker automatically copies (fans out) the message to every subscriber queue registered to that topic. Consumers subscribe to topics, and each gets their own copy. Typically, messages are ephemeral and removed once acknowledged.
   - Use Cases: Broadcasting status updates, triggering cross-domain actions (e.g., notifying billing, inventory, and shipping services when an "OrderPlaced" event occurs).
   - Trade-offs: Enables high decoupling of multiple business lines. However, message persistence is short-lived, making offline consumer recovery or historical replay difficult without separate storage.

3. Event Stream (Log-based):
   - Architectural Difference: Events are written to an append-only, durable disk log (partition). The broker preserves events even after consumption (up to a retention limit). Consumers manage their own read progress using sequential "offsets" and can pull events independently.
   - Use Cases: Event sourcing, high-throughput log aggregation, real-time analytics, and auditable data pipelines (e.g., Apache Kafka, AWS Kinesis).
   - Trade-offs: Extremely high throughput, durable replayability, and historical auditability. However, it requires complex partition key designs, client-side offset tracking, and log compaction/storage management.

Sources used:
- raw_sources/extra_sources/bytebytego-messaging-patterns.md
```

---

### Q10: API Gateway Internal Components & Downstream Interfaces

```text
Question:
What are the core components and interfaces of an API Gateway, and how does it interface with internal backend microservices?

Pages consulted:
- wiki/index.md
- raw_sources/extra_sources/bytebytego-api-gateway.md

Answer:
Based on ByteByteGo's API Gateway architecture review, an API Gateway consists of several key components, interfaces, and integration mechanisms:

Core Components:
1. Client-Facing API Endpoint: The physical web servers accepting client traffic (supporting HTTP, HTTPS, WebSockets).
2. Routing Engine: Evaluates incoming request paths, headers, or parameters and maps them to backend service addresses.
3. Authentication and Authorization Service: Interfaces with identity providers (JWT validation, OAuth2 tokens) to verify user identity.
4. Rate Limiter / Throttling Component: Uses algorithms (like token bucket) to track and limit request counts.
5. Request and Response Transformation Layer: Alters headers, translates protocols, or sanitizes payloads.
6. API Composition / Aggregator: Coordinates concurrent requests to multiple microservices and merges their responses.
7. Cache Layer: Caches static responses or authentication decisions to lower downstream latencies.
8. Connectors/Proxies: Downstream network clients connecting to backend services.

Core Interfaces:
- Client-Facing API Interface: Standard HTTP/REST, GraphQL, or WebSocket protocols.
- Backend Service Interface: Private RPCs (gRPC, Thrift) or internal HTTP/REST endpoints.
- Identity Provider Interface: Connects with authentication servers (LDAP, Active Directory, Auth0).
- Configuration/Policy Interface: Consumes routing rules, rate limit parameters, and SSL certs.
- Observability Interface: Emits unified logs, trace headers (e.g., OpenTelemetry), and metrics.

Interfacing with Backend Microservices:
The gateway acts as an application-layer reverse proxy. On receiving a client request, it validates authentication and rate limits. The routing engine then checks a service discovery registry (like Consul or Eureka) to locate the active, healthy physical IP addresses of the target backend service. It translates the incoming client protocol (e.g., HTTP/2) into the internal communication protocol (e.g., gRPC or internal REST over HTTP/1.1), appends correlation tracing IDs to the headers, forwards the request, and returns the response (or aggregates responses from multiple services) to the client.

Sources used:
- raw_sources/extra_sources/bytebytego-api-gateway.md
```

---

### Q11: Caching Strategies & Consistency Trade-offs

```text
Question:
How should an engineer choose between caching strategies like cache-aside, read-through, write-through, and write-back, and how do they impact data consistency?

Pages consulted:
- wiki/index.md
- raw_sources/extra_sources/bytebytego-caching-strategies.md

Answer:
Based on ByteByteGo's Caching Strategies source note, engineers should evaluate caching strategies based on read/write latency requirements, complexity, and data consistency tolerances:

1. Cache-Aside (Lazy Loading):
   - How it works: The application directly manages the cache. On read, it checks the cache; if a miss occurs, it queries the database, writes the data to the cache, and returns it. On write, it updates the database and deletes (or invalidates) the cached entry.
   - Choice Criteria: Use when cache misses are acceptable, data updates are infrequent, or the cache and database use different data models. It is the most common, general-purpose approach.
   - Data Consistency Impact: Can lead to eventual consistency. There is a small race condition window where concurrent reads and writes can cause stale data to be cached. The application itself must handle cache-miss and invalidation logic.

2. Read-Through:
   - How it works: The application treats the cache as the main data store. On cache miss, the cache library/middleware automatically loads the missing data from the database and returns it.
   - Choice Criteria: Use to simplify application code by offloading database fetching to cache middleware.
   - Data Consistency Impact: Eventual consistency similar to cache-aside, but eliminates application-level cache-miss orchestration errors.

3. Write-Through:
   - How it works: Writes update the cache and the database synchronously. The write transaction completes only when both storage layers are updated.
   - Choice Criteria: Use when data must always be fresh on subsequent reads, and high write latency is acceptable (e.g., user profile updates).
   - Data Consistency Impact: Strong consistency between cache and database. It eliminates stale read windows but increases write latency because of the synchronous double-write overhead.

4. Write-Back (Write-Behind):
   - How it works: Writes update the cache immediately and return success to the application. The cache asynchronously batch-persists the writes to the database in the background.
   - Choice Criteria: Use for write-heavy workloads where low write latency and high throughput are paramount (e.g., real-time game state or IoT telemetry).
   - Data Consistency Impact: High risk of data loss. If the cache node crashes before the background async write completes, data is permanently lost. It offers eventual consistency with a temporary state divergence between the cache and database.

Sources used:
- raw_sources/extra_sources/bytebytego-caching-strategies.md
```

---

### Q12: Database Sharding & Shard Key Selection

```text
Question:
How does database sharding manage data and state, and what architectural considerations go into selecting a shard key to prevent hotspots?

Pages consulted:
- wiki/index.md
- raw_sources/extra_sources/bytebytego-database-sharding.md

Answer:
Based on ByteByteGo's database sharding review, sharding manages data and state through horizontal partitioning and routing:

Data and State Management:
Sharding splits a single database logical schema into multiple physical database instances (shards), each holding a subset of rows. Data is routed to shards using three main partitioning models:
1. Range-Based Sharding: Maps data based on ordered ranges of a key (e.g., A-E to Shard 1, F-J to Shard 2). Excellent for range queries, but can cause write hotspots if new data falls into the latest range (e.g., timestamp keys).
2. Hash-Based Sharding: Applies a hash function to a key and uses the modulus to determine the shard (e.g., `hash(key) % total_shards`). Distributes writes evenly but makes range queries extremely inefficient (requires scanning all shards).
3. Directory-Based Sharding: Uses a lookup service or mapping table to find where a key resides. Flexible but adds a network roundtrip and introduces the mapping directory as a single point of failure.

Architectural Considerations for Shard Key Selection:
The shard key determines how data is distributed and routed. Selecting an inappropriate shard key can cause catastrophic performance and storage bottlenecks. Key considerations include:
- High Cardinality: The key must have a large range of unique values (e.g., `user_id` instead of `status` or `gender`) so data can be split into many small partitions.
- Even Distribution (No Hotspots): The key must distribute writes and reads evenly across all shards. For example, using a `tenant_id` can create a hotspot if one enterprise client (tenant) generates 90% of the traffic.
- Query Co-location: Group related data together on the same physical shard to avoid expensive cross-shard joins and distributed multi-shard transactions. For example, sharding an ecommerce database by `user_id` co-locates a user's profile and orders on the same shard, allowing fast local queries.

Sources used:
- raw_sources/extra_sources/bytebytego-database-sharding.md
```

---

### Q13: Distributed Reliability & Fault Tolerance Patterns

```text
Question:
What distributed reliability mechanisms (retries, circuit breakers, bulkheads, rate limiters) protect systems from cascading failures, and what are their trade-offs?

Pages consulted:
- wiki/index.md
- wiki/quality-attributes/reliability.md
- raw_sources/extra_sources/bytebytego-distributed-reliability.md

Answer:
As documented in ByteByteGo's distributed reliability review, cascading failures occur when a local failure in a distributed system spreads, causing a total outage. The following core mechanisms protect systems from cascading failures, each with key trade-offs:

1. Retries (with Exponential Backoff and Jitter):
   - Mechanism: Clients retry failed requests, progressively increasing the wait time between retries (backoff) and adding a random variance (jitter) to prevent synchronized retry storms.
   - Trade-offs: Masks transient network blips and node restarts. However, if the downstream service is failing due to overload, aggressive retries can amplify traffic, creating a self-inflicted Distributed Denial of Service (DDoS) storm.

2. Circuit Breakers:
   - Mechanism: A proxy tracks recent request failure rates to a dependency. If failures cross a threshold, the breaker "trips" (opens) and immediately rejects client requests without calling the failing downstream service. It periodically attempts to close (reconnect) once the service recovers.
   - Trade-offs: Protects overloaded services from retry storms and prevents calling threads from blocking indefinitely, conserving client resources. The trade-off is that it temporarily rejects all client requests, requiring fallback handling (e.g., returning stale cached data).

3. Bulkheads (Isolation):
   - Mechanism: Allocates isolated thread pools or resource quotas for different clients, operations, or downstream services so that a failure in one area does not consume all system resources.
   - Trade-offs: Restricts the blast radius of a failure. For example, if a payment service stalls, only its dedicated bulkhead thread pool fills up, while catalog and search pools continue working. The trade-off is resource fragmentation and higher memory/operational overhead.

4. Rate Limiters (Throttling):
   - Mechanism: Limits the number of requests a user, IP, or tenant can make in a given timeframe, rejecting excess traffic with a 429 Too Many Requests response.
   - Trade-offs: Prevents resource exhaustion and database starvation caused by abusive clients, API bugs, or sudden traffic surges. The trade-off is that it may block legitimate sudden burst traffic if limits are configured too tightly.

Sources used:
- raw_sources/extra_sources/bytebytego-distributed-reliability.md
- wiki/quality-attributes/reliability.md
```

---

## Part C: Cross-Project Comparative Questions

### Q14: Quality Attributes: Performance and Scalability in nginx

```text
Question:
Which quality attributes (performance, scalability, availability) are prioritized in the design of nginx, and what architectural decisions support them?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md

Answer:
Based on the reviewed nginx pages, nginx prioritizes high performance, extreme scalability, and continuous availability. The architectural decisions supporting these priorities are:

1. Performance (High Throughput & Low Memory):
   - Decision (Event Loop & Non-Blocking Sockets): nginx utilizes non-blocking operating system event APIs (`epoll` or `kqueue`) inside an infinite event loop within a fixed number of worker processes.
   - Support: Instead of creating a new process/thread per connection, which incurs massive RAM overhead and CPU context switching, workers multiplex thousands of concurrent connections on a single thread. This keeps memory consumption extremely low and predictable.
   - Decision (Module Core Design): Keeps the core server engine tiny and fast, executing features as optimized modular C callbacks.

2. Scalability (Connection Scale):
   - Decision (Master-Worker Process Separation): The master process binds to sockets and coordinates configurations, while a fixed, small set of workers handles connections.
   - Support: Since workers do not share mutable connection state and avoid locks, connection handling scales linearly with hardware capacity, allowing a small server to scale to millions of concurrent open sockets.

3. Availability (Zero Downtime):
   - Decision (Supervised Workers & Live Reconfigurations): The master process monitors worker health. If a worker crashes, the master immediately spawns a replacement.
   - Support: Signals allow the master process to reload configurations or upgrade the server's binary live without interrupting active socket connections. Old workers finish active requests and exit gracefully while new workers handle incoming connections immediately, achieving 100% availability during upgrades.

Sources used:
- wiki/projects/nginx.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/scalability.md
```

---

### Q15: MediaWiki Quality Attributes: Performance vs. Modifiability vs. Security

```text
Question:
How do architectural decisions in MediaWiki impact the trade-offs between performance, modifiability, and security?

Pages consulted:
- wiki/index.md
- wiki/projects/mediawiki.md
- wiki/quality-attributes/modifiability.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/security.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md

Answer:
Based on the reviewed MediaWiki pages, MediaWiki's architecture manages a complex three-way trade-off between modifiability, performance, and security:

1. Modifiability vs. Performance:
   - Decision (Plugin System / Hook Registry): MediaWiki exposes hundreds of hook points in its wikitext parser, page handling, and user actions, letting developers customize features via PHP extensions.
   - Trade-off (Performance Cost): Exposing runtime hook points adds significant startup CPU overhead and latency during request execution. The PHP engine must parse, load, and run extension code for every web request. To mitigate this performance penalty, MediaWiki relies on its Layered Caching decision (Varnish reverse proxy, Parser HTML cache). This caches fully-rendered pages so anonymous traffic bypasses PHP and hooks entirely, but it shifts complexity onto cache invalidation logic.

2. Modifiability vs. Security:
   - Decision (Wikitext Input & Open Extension Model): Users contribute content via wikitext, and extensions can alter how pages are parsed and displayed.
   - Trade-off (Security Risks): Open collaboration increases vulnerabilities to Cross-Site Scripting (XSS), spam, and malicious extensions. MediaWiki enforces strict sanitization in the wikitext parser, uses user permissions and roles, and implements CSRF tokens in the API layer. Securing these flexible, customizable entry points requires a continuous validation and isolation effort.

3. Performance vs. Security:
   - Decision (Abuse Mitigation & Cache Controls): Wikipedia-scale operation requires blocking spam and abuse, which demands complex database checks.
   - Trade-off (Bottleneck): Performing real-time security and anti-abuse verification on every request degrades read latency. MediaWiki manages this by dividing traffic: anonymous read traffic is served instantly from fast edge caches, while logged-in editors go down the slower application path where security checks, permission verification, and database writes are executed.

Sources used:
- wiki/projects/mediawiki.md
- wiki/quality-attributes/modifiability.md
- wiki/quality-attributes/performance.md
- wiki/quality-attributes/security.md
- wiki/adrs/mediawiki-adr-001-layered-caching.md
```

---

### Q16: Extensibility Models: Eclipse vs. Jitsi vs. MediaWiki

```text
Question:
Compare how Eclipse, Jitsi, and MediaWiki achieve modularity and extensibility. What are the key differences in their plugin or extension models?

Pages consulted:
- wiki/index.md
- wiki/projects/mediawiki.md
- wiki/components/plugin-system.md
- wiki/quality-attributes/modifiability.md
- raw_sources/aosa/eclipse.md
- raw_sources/aosa/jitsi.md

Answer:
Modularity and extensibility are core quality attributes across Eclipse, Jitsi, and MediaWiki, but their architectural implementations are highly distinct:

1. Eclipse:
   - Model (Strict OSGi Manifests & Extension Points): Eclipse uses a Java OSGi bundle framework. Every module (plugin) defines its dependencies, exported classes, and extension declarations in a strict XML configuration (`plugin.xml`).
   - Modularity Mechanics: The Eclipse platform provides runtime class-loader isolation for each plugin, ensuring one plugin cannot access another's internal classes unless explicitly declared. It implements "extension points" where plugins contribute XML-based components (UI menus, views, editors) that the platform lazily instantiates only when needed.
   - Lifecycle: Static definitions allow the framework to read and display a plugin's UI contributions without loading the plugin's Java classes into memory, saving massive startup time.

2. Jitsi:
   - Model (Service-Oriented OSGi Framework): Jitsi also utilizes an OSGi framework in Java, but configures it as a dynamic, service-oriented runtime rather than Eclipse's static UI-centric extension pipeline.
   - Modularity Mechanics: Jitsi components are built as bundles that implement specific services (e.g., protocol providers, audio mixers). Bundles register their services in a central OSGi Service Registry, and other bundles discover and interact with them through abstract service interfaces.
   - Lifecycle: OSGi allows Jitsi to dynamically start, stop, install, and uninstall bundles at runtime without restarting the application, supporting highly dynamic media routing environments.

3. MediaWiki:
   - Model (Lightweight Runtime Hook Registry): MediaWiki uses a lightweight, string-based hook system in PHP. It is not class-loader isolated like Java OSGi.
   - Modularity Mechanics: The core code defines "hook points" (e.g., `ParserBeforeStrip`). Extensions register PHP callback functions in a global array. When the execution path hits a hook point, the core loops through and executes the registered callbacks sequentially.
   - Lifecycle: Lacks runtime lifecycle control. Every web request restarts the entire PHP execution context, so extensions must register hooks on every single request, which adds startup CPU overhead.

Summary of Differences:
- Isolation: Eclipse and Jitsi have strong JVM class-loader isolation; MediaWiki has zero runtime isolation (a single extension PHP syntax error crashes the entire wiki request).
- Lifecycle: Jitsi is fully dynamic (hot-swappable services); Eclipse is lazy-loaded (static configuration, dynamic class loading); MediaWiki is request-scoped (re-evaluated from scratch on every page hit).
- Coordination: Eclipse coordinates via XML Extension Points; Jitsi via a Service Registry; MediaWiki via a global hook array.

Sources used:
- raw_sources/aosa/eclipse.md
- raw_sources/aosa/jitsi.md
- wiki/components/plugin-system.md
- wiki/quality-attributes/modifiability.md
```

---

### Q17: Scalability Paradigms: nginx vs. Hadoop HDFS

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
Nginx and Hadoop HDFS address different scalability dimensions (networking proxy scale vs. distributed block storage scale), using completely different architectural styles:

1. nginx:
   - Scalability Goal: Concurrency scale. The goal is to handle hundreds of thousands of concurrent open or slow network connections (compute and network routing throughput) on a single physical machine with minimal resources.
   - Architectural Style (Event-Driven Worker Model): Uses an event-driven, non-blocking asynchronous architecture. Instead of scaling resources (creating a thread per connection), nginx utilizes a fixed worker process set matched to CPU cores. Each worker multiplexes thousands of active connections within a single-threaded operating system event loop.
   - Scaling Limit / Bottlenecks: Scalability is limited by CPU core count and operating system file descriptor limits. It scales vertically on a single machine, or horizontally by placing multiple nginx instances behind a transport-level load balancer (e.g., DNS round-robin).

2. Hadoop HDFS:
   - Scalability Goal: Data and I/O scale. The goal is to store petabytes of data reliably across commodity clusters and stream files to processing engines (like MapReduce) at extremely high aggregate bandwidth.
   - Architectural Style (Centralized Master-Worker): HDFS uses a client-server master-worker architecture. It separates metadata from data blocks. The NameNode (single master) keeps filesystem metadata in memory, while DataNodes (workers) store physical blocks on local disks.
   - Scaling Limit / Bottlenecks: Scalability is limited by the NameNode's RAM (since every file and block metadata entry must reside in memory) and the NameNode's socket capacity for handling heartbeats. However, aggregate disk storage capacity and read/write bandwidth scale horizontally by adding more DataNode servers to the cluster. HDFS clients stream block data directly to/from DataNodes, preventing the NameNode from becoming an I/O bottleneck.

Summary of Architectural Style Dichotomy:
- Nginx scales connection multiplexing on a single node by avoiding process/thread allocation. It is event-driven and localized.
- HDFS scales storage capacity across a cluster by separating metadata coordination from block data streams. It is centralized-master and distributed-worker.

Sources used:
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
```

---

## Part D: Coverage Gap & System Architecture Baseline Questions

### Q22: Unanswerable Architectural Concepts: Assessing Wiki Blank Space

```text
Question:
Which questions about system components and quality attributes are currently unanswerable from the Wiki pages due to missing content in wiki/components/ and wiki/quality-attributes/?

Pages consulted:
- wiki/index.md
- wiki/components/
- wiki/quality-attributes/

Answer:
The reviewed Architecture Wiki contains complete, synthesized files under both `wiki/components/` and `wiki/quality-attributes/` for the five initial projects (nginx, Git, MediaWiki, Hadoop HDFS, and LLVM). 

However, since there are no generic or distributed-systems components and quality-attribute pages synthesized for *extra sources* (like ByteByteGo newsletters) or for *un-synthesized AOSA projects*, any general system-design questions targeting those areas cannot be answered solely from the reviewed `wiki/` layer. Specifically:

1. Unanswerable Component Questions (due to missing `wiki/components/` files):
   - Questions about the internal components and interfaces of an API Gateway (like Q10) or when to use it (Q08) are unanswerable from the reviewed `wiki/components/` folder. The folder only contains `event-loop.md`, `intermediate-representation.md`, `namenode.md`, `object-database.md`, and `plugin-system.md` (which are strictly AOSA-project components). No `api-gateway.md`, `rate-limiter.md`, or `service-registry.md` exists.
   
2. Unanswerable Quality Attribute / Pattern Questions (due to missing `wiki/patterns/` and `wiki/quality-attributes/` files):
   - Questions about asynchronous messaging topologies (Message Queue vs. Pub-Sub vs. Event Stream - Q09) are unanswerable because no `asynchronous-messaging.md` or similar file exists in `wiki/patterns/`.
   - Questions about database sharding and shard key selection (Q12) are unanswerable because there is no `database-sharding.md` pattern or data-consistency quality sub-page.
   - Questions about distributed reliability mechanisms (circuit breakers, bulkheads - Q13) cannot be answered from the reviewed wiki because `wiki/quality-attributes/reliability.md` only covers Git and HDFS replication/integrity mechanisms, with no general distributed-resilience patterns.

These questions expose coverage gaps between the completed AOSA-project reviewed pages and the general distributed-systems system-design topics. Answering them requires falling back to the raw source notes under `raw_sources/extra_sources/`.

Sources used:
- wiki/index.md
```
