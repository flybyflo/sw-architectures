# Software Architecture Question Bank

This document serves as the official question bank of typical software architecture questions for the **Architecture Wiki**. It defines the evaluation surface for the knowledge base, guiding both the wiki's content synthesis and the final manual validation of the generated answers. 

The questions are curated from two main layers of our repository:
1. **AOSA Source Layer (`raw_sources/aosa/`)**: High-fidelity architectural notes from the *Architecture of Open Source Applications* books.
2. **Extra Sources Layer (`raw_sources/extra_sources/`)**: System design articles (e.g., ByteByteGo) covering shared distributed systems patterns.

---

## 🏷️ Metadata Classification Legend

To make this bank programmatically and manually reusable for evaluation workflows, each question is classified using the following dimensions:

### 1. Categories
* **High-Level Architectural Design**: Overall system structures, boundaries, and broad topologies.
* **Architectural Styles and Patterns**: Classic architectural patterns (client-server, event-driven, microservices, plugin-based).
* **Components and Interfaces**: Structural building blocks, processes, modular boundaries, and APIs.
* **Data and State Management**: Storage models, immutability, synchronization, replication, caching, and sharding.
* **Quality Attributes**: Cross-cutting requirements such as reliability, performance, scalability, modifiability, and security.
* **Project-Specific Questions**: In-depth inquiries focusing on a single project's architectural decisions.
* **Cross-Project Comparison Questions**: Multi-system comparative questions targeting shared problems and trade-offs.
* **Questions Exposing Coverage Gaps**: Critical baseline questions designed to detect empty or weak wiki coverage.

### 2. Expected Source Types
* `wiki/projects/`: Synthesized reviewed pages for individual systems (e.g., Git, nginx, MediaWiki).
* `wiki/components/`: Reviewed shared component definitions (e.g., API Gateway).
* `wiki/quality-attributes/`: Comparative quality attribute pages.
* `wiki/patterns/`: Reviewed generic pattern descriptions.
* `raw_sources/aosa/`: Primary source notes for AOSA chapters.
* `raw_sources/extra_sources/`: Primary source notes for external architectural reviews.

---

## 📊 Master Question Table

This table collects **24 typical architecture questions**. The final scored
answer-generation evaluation uses 18 questions: Q01-Q17 plus Q22. All 24
questions are retrieval-tested with `node scripts/check-questions.mjs`.

| ID | Question | Category | Expected Source Type | Evaluation |
| :--- | :--- | :--- | :--- | :---: |
| **Q01** | What are the main components of nginx, and how do the master and worker processes interact? | Components & Interfaces | `wiki/projects/`, `raw_sources/aosa/` | **Yes** |
| **Q02** | How does Git manage data and state (blobs, trees, commits, references, and the index), and how does this design support integrity? | Data & State Management | `wiki/projects/`, `raw_sources/aosa/` | **Yes** |
| **Q03** | Which architectural patterns and caching strategies are utilized by MediaWiki to handle high read traffic and ensure extensibility? | Architectural Styles & Patterns | `wiki/projects/`, `raw_sources/aosa/` | **Yes** |
| **Q04** | How does Hadoop Distributed File System (HDFS) achieve fault tolerance and scalability through NameNode/DataNode separation and replication? | Quality Attributes (Reliability) | `wiki/projects/`, `raw_sources/aosa/` | **Yes** |
| **Q05** | How do the central Intermediate Representation (IR) and modular structure of LLVM facilitate compiler optimization and support multiple frontends/backends? | Components & Interfaces | `wiki/projects/`, `raw_sources/aosa/` | **Yes** |
| **Q06** | What are the main components of a scalable web architecture (load balancers, caching, databases, queues) and how do they manage concurrent loads? | High-Level Architectural Design | `wiki/patterns/`, `wiki/components/` | **Yes** |
| **Q07** | What are the most common architectural styles and patterns (client-server, layered, pub-sub, event sourcing) and what specific problems do they solve? | Architectural Styles & Patterns | `wiki/patterns/`, `wiki/components/`, `raw_sources/extra_sources/` | **Yes** |
| **Q08** | When and why should an API Gateway pattern be introduced into a system design, and what cross-cutting concerns does it centralize? | Architectural Styles & Patterns | `wiki/components/`, `raw_sources/extra_sources/` | **Yes** |
| **Q09** | What are the architectural differences, use cases, and trade-offs between a message queue, a publish-subscribe system, and an event stream? | Architectural Styles & Patterns | `wiki/patterns/`, `raw_sources/extra_sources/` | **Yes** |
| **Q10** | What are the core components and interfaces of an API Gateway, and how does it interface with internal backend microservices? | Components & Interfaces | `wiki/components/`, `raw_sources/extra_sources/` | **Yes** |
| **Q11** | How should an engineer choose between caching strategies like cache-aside, read-through, write-through, and write-back, and how do they impact data consistency? | Data & State Management | `wiki/patterns/`, `raw_sources/extra_sources/` | **Yes** |
| **Q12** | How does database sharding manage data and state, and what architectural considerations go into selecting a shard key to prevent hotspots? | Data & State Management | `wiki/patterns/`, `raw_sources/extra_sources/` | **Yes** |
| **Q13** | What distributed reliability mechanisms (retries, circuit breakers, bulkheads, rate limiters) protect systems from cascading failures, and what are their trade-offs? | Quality Attributes (Reliability) | `wiki/patterns/`, `wiki/quality-attributes/`, `raw_sources/extra_sources/` | **Yes** |
| **Q14** | Which quality attributes (performance, scalability, availability) are prioritized in the design of nginx, and what architectural decisions support them? | Quality Attributes (Performance) | `wiki/projects/`, `wiki/quality-attributes/`, `raw_sources/aosa/` | **Yes** |
| **Q15** | How do architectural decisions in MediaWiki impact the trade-offs between performance, modifiability, and security? | Quality Attributes (Trade-offs) | `wiki/projects/`, `wiki/components/`, `wiki/quality-attributes/`, `raw_sources/aosa/` | **Yes** |
| **Q16** | Compare how Eclipse, Jitsi, and MediaWiki achieve modularity and extensibility. What are the key differences in their plugin or extension models? | Cross-Project Comparison | `wiki/projects/`, `wiki/components/`, `wiki/patterns/` | **Yes** |
| **Q17** | Compare nginx and Hadoop HDFS in terms of how they handle scalability. How do their architectural styles differ to support their scaling goals? | Cross-Project Comparison | `wiki/projects/`, `wiki/quality-attributes/`, `raw_sources/aosa/` | **Yes** |
| **Q18** | Compare Git and Mercurial in terms of data management. What are the differences between Git's directed acyclic graph of objects and Mercurial's revlog format? | Cross-Project Comparison | `wiki/projects/`, `raw_sources/aosa/` | No |
| **Q19** | What are the architectural trade-offs between routing client requests through an API Gateway versus having clients access microservices directly? | Cross-Project Comparison | `wiki/components/`, `wiki/patterns/`, `raw_sources/extra_sources/` | No |
| **Q20** | Which projects in the repository utilize a plugin-based or modular architecture (e.g., Eclipse, MediaWiki, Moodle), and how does this affect modifiability? | Project-Specific Questions | `wiki/projects/`, `wiki/components/`, `wiki/patterns/` | No |
| **Q21** | How does Git ensure data integrity inside its object database, and what role do cryptographic hashes play in preventing state corruption? | Project-Specific Questions | `wiki/projects/`, `wiki/components/`, `wiki/quality-attributes/`, `raw_sources/aosa/` | No |
| **Q22** | Which questions are currently unanswerable from the reviewed wiki due to missing content? | Questions Exposing Coverage Gaps | `wiki/index.md`, `wiki/projects/`, `wiki/patterns/` | **Yes** |
| **Q23** | Which planned project pages are currently missing from `wiki/projects/` and what key questions should be prioritized to bootstrap their documentation? | Questions Exposing Coverage Gaps | `wiki/projects/` | No |
| **Q24** | What shared architectural components and patterns (such as caching, messaging, or gateways) are recurring across different open-source projects and extra sources in this repository? | Cross-Project Comparison | `wiki/components/`, `wiki/patterns/`, `raw_sources/extra_sources/` | No |

---

## 📝 Detailed Question Profiles & Rationale

Here is the exhaustive detailing of all 24 questions, mapping their design rationale, targeted source files, and expectations for the LLM wiki answer generation.

### Part A: Project-Specific Architecture Questions

#### Q01: nginx Component Architecture & Process Interaction
* **Category**: Components & Interfaces / Project-Specific Questions
* **Target Source File(s)**: [nginx.md](../raw_sources/aosa/nginx.md)
* **Expected Wiki Page**: `wiki/projects/nginx.md`, `wiki/components/event-loop.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Nginx has a highly distinct, event-driven process architecture. This question tests whether the knowledge base understands how nginx separates worker duties from the master process, avoiding thread-per-connection bottlenecks.
* **Key Architecture Elements**: Master process, Worker processes, event loop, asynchronous non-blocking sockets, shared memory zones.

#### Q02: Git Content-Addressed Storage & Integrity
* **Category**: Data & State Management / Project-Specific Questions
* **Target Source File(s)**: [git.md](../raw_sources/aosa/git.md)
* **Expected Wiki Page**: `wiki/projects/git.md`, `wiki/components/object-database.md`, `wiki/patterns/content-addressed-storage.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Probes Git's fundamental representation of repository state. It requires the KB to explain the structure of the Object Database and how immutability guarantees extreme historical integrity.
* **Key Architecture Elements**: Blobs, Trees, Commits, Refs, Index (staging area), SHA-1 content hashing.

#### Q03: MediaWiki Patterns & Caching
* **Category**: Architectural Styles & Patterns / Project-Specific Questions
* **Target Source File(s)**: [mediawiki.md](../raw_sources/aosa/mediawiki.md)
* **Expected Wiki Page**: `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md`, `wiki/patterns/caching-strategies.md`
* **Evaluation Core**: **Yes**
* **Rationale**: MediaWiki is a database-backed PHP application optimized for massive scale. This tests how the wiki explains multilayered caching (Squid/Varnish, Memcached, parser cache) and extensible extension hooks.
* **Key Architecture Elements**: Hook registry, multilayered caching hierarchy, database master-replica split, parser cache.

#### Q04: Hadoop HDFS Fault Tolerance & Replication
* **Category**: Quality Attributes (Reliability) / Project-Specific Questions
* **Target Source File(s)**: [hadoop-hdfs.md](../raw_sources/aosa/hadoop-hdfs.md)
* **Expected Wiki Page**: `wiki/projects/hadoop-hdfs.md`, `wiki/components/namenode.md`, `wiki/quality-attributes/reliability.md`
* **Evaluation Core**: **Yes**
* **Rationale**: HDFS operates on commodity hardware where failure is expected. This question tests the KB's capacity to detail active replication, heartbeat mechanisms, and the division of work between metadata and block storage.
* **Key Architecture Elements**: NameNode (single point of failure / active-passive), DataNodes, block replication, heartbeats, block reports.

#### Q05: LLVM Central IR Decoupling & Modularity
* **Category**: Components & Interfaces / Project-Specific Questions
* **Target Source File(s)**: [llvm.md](../raw_sources/aosa/llvm.md)
* **Expected Wiki Page**: `wiki/projects/llvm.md`, `wiki/components/intermediate-representation.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Unlike traditional monolithic compilers, LLVM's primary innovation is its decoupled modular pipeline. This evaluates the system's understanding of central interface abstractions.
* **Key Architecture Elements**: LLVM Intermediate Representation (IR), library-based design, PassManager, frontends (Clang) and backends.

---

### Part B: General & Distributed Systems Architecture Questions

#### Q06: High-Scale Distributed Web Architecture Overview
* **Category**: High-Level Architectural Design
* **Target Source File(s)**: [scalable-web-architecture-distributed-systems.md](../raw_sources/aosa/scalable-web-architecture-distributed-systems.md)
* **Expected Wiki Page**: `wiki/patterns/load-balancing.md`, `wiki/patterns/caching-strategies.md`, `wiki/patterns/database-sharding.md`, `wiki/patterns/asynchronous-messaging.md`
* **Evaluation Core**: **Yes**
* **Rationale**: This is a classic system-design interview question. It verifies that the wiki can represent a holistic, multi-tier web system with load-balancing, caching, database sharding, and queue-based ingestion.
* **Key Architecture Elements**: Load Balancers (reverse proxy), CDN, Cache layer, DB Sharding, Message Queues, Session state.

#### Q07: Architectural Styles and Fitting Solutions
* **Category**: Architectural Styles & Patterns
* **Target Source File(s)**: [bytebytego-architecture-patterns.md](../raw_sources/extra_sources/bytebytego-architecture-patterns.md)
* **Expected Wiki Page**: `wiki/patterns/client-server.md`, `wiki/patterns/layered-architecture.md`, `wiki/patterns/asynchronous-messaging.md`, `wiki/patterns/event-sourcing.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Evaluates the general taxonomy of architectures. The wiki must be able to list classic paradigms (e.g. monolithic, microservices, event-driven, SOA) and matching engineering problems.
* **Key Architecture Elements**: Modularity, orchestration vs. choreography, decoupling, coupling boundaries.

#### Q08: API Gateway Rationale & Cross-Cutting Concerns
* **Category**: Architectural Styles & Patterns
* **Target Source File(s)**: [bytebytego-api-gateway.md](../raw_sources/extra_sources/bytebytego-api-gateway.md)
* **Expected Wiki Page**: `wiki/components/api-gateway.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Evaluates the rationale behind edge-routing microservices. The wiki must identify security, performance, and operational reasons to use or avoid this centralized boundary.
* **Key Architecture Elements**: Edge routing, rate-limiting, authentication/authorization, SSL termination, request translation.

#### Q09: Asynchronous Messaging topologies (Queue vs. Pub-Sub vs. Event Stream)
* **Category**: Architectural Styles & Patterns
* **Target Source File(s)**: [bytebytego-messaging-patterns.md](../raw_sources/extra_sources/bytebytego-messaging-patterns.md)
* **Expected Wiki Page**: `wiki/patterns/asynchronous-messaging.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Focuses on messaging middleware characteristics. Answering this successfully requires defining point-to-point queues, publish-subscribe brokers, and commit-log based event streams (e.g., Kafka).
* **Key Architecture Elements**: Message brokers, consumer groups, persistent offset logs, durability, pub-sub.

#### Q10: API Gateway Internal Components & Downstream Interfaces
* **Category**: Components & Interfaces
* **Target Source File(s)**: [bytebytego-api-gateway.md](../raw_sources/extra_sources/bytebytego-api-gateway.md)
* **Expected Wiki Page**: `wiki/components/api-gateway.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Drills into the internal mechanics of a gateway. Evaluates whether the wiki can detail how gateways handle incoming protocols (HTTP, gRPC) and map them to downstream systems.
* **Key Architecture Elements**: Reverse proxy, load balancer integration, service discovery registries, middleware chain.

#### Q11: Caching Strategies & Consistency Trade-offs
* **Category**: Data & State Management
* **Target Source File(s)**: [bytebytego-caching-strategies.md](../raw_sources/extra_sources/bytebytego-caching-strategies.md)
* **Expected Wiki Page**: `wiki/patterns/caching-strategies.md`, `wiki/quality-attributes/consistency.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Cache design directly impacts state consistency. This tests if the wiki can explain read-path and write-path strategies and detail their data-staleness implications.
* **Key Architecture Elements**: Cache-Aside, Read-Through, Write-Through, Write-Behind, eviction policies (LRU, LFU), eventual consistency.

#### Q12: Database Sharding & Shard Key Selection
* **Category**: Data & State Management
* **Target Source File(s)**: [bytebytego-database-sharding.md](../raw_sources/extra_sources/bytebytego-database-sharding.md)
* **Expected Wiki Page**: `wiki/patterns/database-sharding.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Explores horizontal data scaling. The wiki must define partition mechanics (range, hash, directory) and explain the catastrophic impact of selecting a poor shard key (hotspots, resharding pain).
* **Key Architecture Elements**: Range-based sharding, directory-based sharding, hash-based sharding, shard key, re-sharding.

#### Q13: Distributed Reliability & Fault Tolerance Patterns
* **Category**: Quality Attributes (Reliability)
* **Target Source File(s)**: [bytebytego-distributed-reliability.md](../raw_sources/extra_sources/bytebytego-distributed-reliability.md)
* **Expected Wiki Page**: `wiki/patterns/distributed-reliability.md`, `wiki/quality-attributes/reliability.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Probes how a distributed system maintains stability under partial network or database failures. Answering requires outlining resilience strategies and client-side protection.
* **Key Architecture Elements**: Circuit Breaker, Retries with Exponential Backoff + Jitter, Bulkheads, Rate Limiters.

#### Q14: Quality Attributes: Performance and Scalability in nginx
* **Category**: Quality Attributes
* **Target Source File(s)**: [nginx.md](../raw_sources/aosa/nginx.md)
* **Expected Wiki Page**: `wiki/projects/nginx.md`, `wiki/quality-attributes/performance.md`, `wiki/quality-attributes/scalability.md`, `wiki/quality-attributes/availability.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Links architectural style to real-world performance metrics. Answering requires proving how the event-loop design minimizes RAM usage and CPU switches under millions of concurrent connections.
* **Key Architecture Elements**: Event-driven architecture, connection states, non-blocking I/O multiplexing, worker sizing.

#### Q15: MediaWiki Quality Attributes: Performance vs. Modifiability vs. Security
* **Category**: Quality Attributes
* **Target Source File(s)**: [mediawiki.md](../raw_sources/aosa/mediawiki.md)
* **Expected Wiki Page**: `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md`, `wiki/quality-attributes/modifiability.md`, `wiki/quality-attributes/security.md`, `wiki/quality-attributes/performance.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Systems engineering is the art of trade-offs. This tests the wiki's capacity to explain how MediaWiki's extreme modifiability (plug-in hook system) conflicts with performance, and how layered caching mitigates this.
* **Key Architecture Elements**: Performance overhead of runtime PHP execution, hook performance bottlenecks, database caching, CSRF protection.

---

### Part C: Cross-Project Comparative Questions

#### Q16: Extensibility Models: Eclipse vs. Jitsi vs. MediaWiki
* **Category**: Cross-Project Comparison Questions
* **Target Source File(s)**: [eclipse.md](../raw_sources/aosa/eclipse.md), [jitsi.md](../raw_sources/aosa/jitsi.md), [mediawiki.md](../raw_sources/aosa/mediawiki.md)
* **Expected Wiki Page**: `wiki/projects/eclipse.md`, `wiki/projects/jitsi.md`, `wiki/projects/mediawiki.md`, `wiki/patterns/plugin-architecture.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Modularity is achieved in many ways. This compares Eclipse's heavy-weight runtime OSGi bundle system, Jitsi's service-oriented OSGi framework, and MediaWiki's lightweight string-hook-based web registry.
* **Key Comparison Metrics**: Lifecycle control, runtime decoupling, class-loader separation, performance overhead.

#### Q17: Scalability Paradigms: nginx vs. Hadoop HDFS
* **Category**: Cross-Project Comparison Questions
* **Target Source File(s)**: [nginx.md](../raw_sources/aosa/nginx.md), [hadoop-hdfs.md](../raw_sources/aosa/hadoop-hdfs.md)
* **Expected Wiki Page**: `wiki/projects/nginx.md`, `wiki/projects/hadoop-hdfs.md`, `wiki/quality-attributes/scalability.md`
* **Evaluation Core**: **Yes**
* **Rationale**: Evaluates the dichotomy of scaling a networking proxy (compute/routing scale) vs. a distributed storage system (data/replication scale).
* **Key Comparison Metrics**: Concurrency model, distribution architecture, bottlenecks (NameNode RAM vs. socket descriptors).

#### Q18: DVCS Storage Engine Designs: Git vs. Mercurial
* **Category**: Cross-Project Comparison Questions
* **Target Source File(s)**: [git.md](../raw_sources/aosa/git.md), [mercurial.md](../raw_sources/aosa/mercurial.md)
* **Expected Wiki Page**: `wiki/projects/git.md`, `wiki/projects/mercurial.md`
* **Evaluation Core**: No
* **Rationale**: Compares two distributed VCS tools that started at the same time. Probes the physical storage design: Git's content-addressable DAG vs. Mercurial's append-only `revlog` diff database.
* **Key Comparison Metrics**: DAG traversal speed, disk storage efficiency (loose/packed vs. unified diffs), branching speed.

#### Q19: API Gateway Topology vs. Direct Client-to-Service Connections
* **Category**: Cross-Project Comparison Questions
* **Target Source File(s)**: [bytebytego-api-gateway.md](../raw_sources/extra_sources/bytebytego-api-gateway.md)
* **Expected Wiki Page**: `wiki/components/api-gateway.md`, `wiki/patterns/api-gateway-topology.md`
* **Evaluation Core**: No
* **Rationale**: Highlights topological system-design differences. Direct connection offers low latency but high client-side complexity; API gateway offers simplicity but creates a single point of failure and bottleneck.
* **Key Comparison Metrics**: Network latency, coupling, security boundary, operational complexity, protocol translation.

#### Q20: Modular Extensibility Patterns in Open Source Systems
* **Category**: Project-Specific Questions
* **Target Source File(s)**: [eclipse.md](../raw_sources/aosa/eclipse.md), [mediawiki.md](../raw_sources/aosa/mediawiki.md), [moodle.md](../raw_sources/aosa/moodle.md)
* **Expected Wiki Page**: `wiki/projects/eclipse.md`, `wiki/projects/mediawiki.md`, `wiki/projects/moodle.md`, `wiki/patterns/plugin-architecture.md`
* **Evaluation Core**: No
* **Rationale**: Identifies how open-source platforms maintain developer ecosystems. Compares Moodle's directory-structure callback model with Eclipse's strict plugin XML configurations.
* **Key Comparison Metrics**: Modifiability vs. performance, ease of configuration, developer learning curve.

#### Q21: Security and Cryptographic Hash Integrity in Git
* **Category**: Project-Specific Questions
* **Target Source File(s)**: [git.md](../raw_sources/aosa/git.md)
* **Expected Wiki Page**: `wiki/projects/git.md`, `wiki/components/object-database.md`, `wiki/quality-attributes/security.md`
* **Evaluation Core**: No
* **Rationale**: Explores the specific quality attribute (security/integrity) within Git's architecture. Focuses on how cryptographically-bound commits guarantee history cannot be altered without detection.
* **Key Architecture Elements**: SHA-1 hash, Merkel trees, signature-verified commits, state integrity.

---

### Part D: Coverage Gap & System Architecture Baseline Questions

#### Q22: Remaining Reviewed Coverage Gaps
* **Category**: Questions that expose missing or weak wiki coverage
* **Target Source File(s)**: [AGENTS.md](../AGENTS.md), [wiki/index.md](../wiki/index.md), `wiki/projects/`, `wiki/patterns/`, `wiki/quality-attributes/`
* **Expected Wiki Page**: N/A (Meta-query)
* **Evaluation Core**: **Yes**
* **Rationale**: Designed to expose remaining reviewed-layer gaps. The current wiki has reviewed component, pattern, quality-attribute, and selected additional project pages, so an honest answer should no longer claim those folders are empty. It should identify narrower missing reviewed coverage, such as remaining source-only AOSA project pages and specialized topics without dedicated reviewed pages.
* **Key Indicators**: Mentions remaining source-only AOSA projects and specialized topics; avoids stale claims about empty `wiki/components/`, `wiki/patterns/`, or `wiki/quality-attributes/` folders.

#### Q23: Missing Project Syntheses
* **Category**: Questions that expose missing or weak wiki coverage
* **Target Source File(s)**: [wiki/index.md](../wiki/index.md), `wiki/projects/`
* **Expected Wiki Page**: N/A (Meta-query)
* **Evaluation Core**: No
* **Rationale**: Tests whether the knowledge base can compare raw AOSA source-note coverage with reviewed project-page coverage. The current reviewed project layer includes nginx, Git, Mercurial, MediaWiki, Moodle, Hadoop HDFS, LLVM, Eclipse, and Jitsi, but many raw AOSA notes remain available only as source notes.
* **Key Indicators**: Names reviewed projects already present and identifies remaining raw-source-only projects as future ingestion candidates.

#### Q24: Recurring Distributed Building Blocks in AOSA and Extra Sources
* **Category**: Cross-Project Comparison Questions
* **Target Source File(s)**: `raw_sources/aosa/`, `raw_sources/extra_sources/`
* **Expected Wiki Page**: `wiki/components/api-gateway.md`, `wiki/components/message-broker.md`, `wiki/patterns/caching-strategies.md`, `wiki/patterns/asynchronous-messaging.md`
* **Evaluation Core**: No
* **Rationale**: Helps identify which shared components should be built in the wiki layer first. It targets things like caching (MediaWiki, scalable systems, caching notes) and rate-limiting (API Gateways, scalable systems).
* **Key Indicators**: MediaWiki cache, nginx proxy buffer, API gateway caching, distributed caching strategies.

---

## 📈 Evaluation Playbook & Agent Guidelines

When using this question bank in the **qmd/agent evaluation pipeline**, run the following checks on the generated answers:

1. **Source Fidelity**: Ensure the answering agent explicitly cites files from `wiki/` (primary) or `raw_sources/` (fallback) as mandated by [AGENTS.md](../AGENTS.md).
2. **Structural Completeness**: Answers to components-specific questions (like **Q01**, **Q05**, **Q10**) must separate components from communication interfaces.
3. **Trade-off Highlight**: Quality-attribute questions (like **Q13**, **Q15**, **Q19**) must list at least one concrete trade-off (e.g., Performance vs. Security or Scalability vs. Simplicity).
4. **Gap Identification**: For **Q22** and **Q23**, the system must acknowledge remaining reviewed coverage gaps without claiming that populated folders are empty.
