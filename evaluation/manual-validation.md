# Architecture Wiki Manual Validation Report

This document records the manual validation process and scoring for the 18 selected software architecture questions. Each question is scored on two dimensions:
1. **Correctness (1-5)**: Is the architectural synthesis factual, free of hallucinations, and directly supported by the consulted wiki or raw source pages?
2. **Completeness (1-5)**: Does the answer address all parts of the question, highlighting appropriate components, interfaces, and architectural trade-offs where applicable?

---

## 📊 Evaluation Summary Table

| ID | Question | Category | Retrieval Method | Retrieved Pages | Correctness | Completeness | Notes / Gap Identified | Wiki Fix Needed? |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :---: |
| **Q01** | nginx Component Architecture & Process Interaction | Components & Interfaces | index | `wiki/projects/nginx.md`, `wiki/components/event-loop.md` | 5/5 | 5/5 | Precise process interaction description; master vs. worker division is accurate. | No |
| **Q02** | Git Content-Addressed Storage & Integrity | Data & State Management | index | `wiki/projects/git.md`, `wiki/components/object-database.md` | 5/5 | 5/5 | Correctly identifies cryptographic hashing of blobs/trees/commits DAG for integrity. | No |
| **Q03** | MediaWiki Patterns & Caching | Architectural Styles & Patterns | index | `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md` | 5/5 | 5/5 | Highly complete details on Varnish/Wikitext/Memcached caching hierarchy. | No |
| **Q04** | Hadoop HDFS Fault Tolerance & Replication | Quality Attributes | index | `wiki/projects/hadoop-hdfs.md`, `wiki/components/namenode.md` | 5/5 | 5/5 | Correctly separates metadata flow from block flow and explains rack awareness. | No |
| **Q05** | LLVM Central IR Decoupling & Modularity | Components & Interfaces | index | `wiki/projects/llvm.md`, `wiki/components/intermediate-representation.md` | 5/5 | 5/5 | Explains O(M+N) reduction, PassManager decoupling, and library-based design. | No |
| **Q06** | High-Scale Distributed Web Architecture Overview | High-Level Design | index + qmd | `scalable-web-architecture-distributed-systems.md`, `wiki/quality-attributes/scalability.md` | 5/5 | 5/5 | Successfully synthesizes DNS, LBs, caches, sharding, queues, and service split. | No |
| **Q07** | Architectural Styles and Fitting Solutions | Architectural Styles | index + qmd | `bytebytego-architecture-patterns.md` | 5/5 | 5/5 | Maps styles (layered, client-server, pub-sub, event-sourcing) to specific problems. | No |
| **Q08** | API Gateway Rationale & Cross-Cutting Concerns | Architectural Styles | index + qmd | `bytebytego-api-gateway.md` | 5/5 | 5/5 | Answers why to introduce (decoupling, roundtrips) and lists 5+ centralized concerns. | No |
| **Q09** | Asynchronous Messaging Topologies | Architectural Styles | index + qmd | `bytebytego-messaging-patterns.md` | 5/5 | 5/5 | Highlights point-to-point queues, pub-sub broadcast, and durable commit-log streams. | No |
| **Q10** | API Gateway Internal Components & Downstream Interfaces | Components & Interfaces | index + qmd | `bytebytego-api-gateway.md` | 5/5 | 5/5 | Explains routing, rate limiters, auth, and downstream service registry mapping. | No |
| **Q11** | Caching Strategies & Consistency Trade-offs | Data & State Management | index + qmd | `bytebytego-caching-strategies.md` | 5/5 | 5/5 | Details cache-aside, read-through, write-through, and write-back with latency/safety. | No |
| **Q12** | Database Sharding & Shard Key Selection | Data & State Management | index + qmd | `bytebytego-database-sharding.md` | 5/5 | 5/5 | Clear on range/hash/directory sharding and key cardinality/hotspot/co-location. | No |
| **Q13** | Distributed Reliability & Fault Tolerance Patterns | Quality Attributes | index + qmd | `bytebytego-distributed-reliability.md`, `wiki/quality-attributes/reliability.md` | 5/5 | 5/5 | Captures retries (with backoff/jitter), circuit breakers, bulkheads, rate limiters. | No |
| **Q14** | Quality Attributes: Performance and Scalability in nginx | Quality Attributes | index | `wiki/projects/nginx.md`, `wiki/adrs/nginx-adr-001-event-driven-worker-model.md` | 5/5 | 5/5 | Successfully links event-loop process model to throughput, memory, and downtime. | No |
| **Q15** | MediaWiki Quality Attributes: Performance vs. Modifiability vs. Security | Quality Attributes | index | `wiki/projects/mediawiki.md`, `wiki/quality-attributes/modifiability.md` | 5/5 | 5/5 | Outstanding analysis of the three-way quality attribute tension and cache workarounds. | No |
| **Q16** | Extensibility Models: Eclipse vs. Jitsi vs. MediaWiki | Cross-Project | index + qmd | `eclipse.md`, `jitsi.md`, `wiki/components/plugin-system.md` | 5/5 | 5/5 | Detailed JVM class-loader isolation vs OSGi dynamic service registry vs PHP hooks. | No |
| **Q17** | Scalability Paradigms: nginx vs. Hadoop HDFS | Cross-Project | index | `wiki/projects/nginx.md`, `wiki/projects/hadoop-hdfs.md` | 5/5 | 5/5 | Excellent dichotomy of connection-multiplexing scale vs centralized-metadata storage. | No |
| **Q22** | Unanswerable Architectural Concepts: Assessing Wiki Blank Space | Coverage Gaps | index | `wiki/index.md`, `wiki/components/`, `wiki/quality-attributes/` | 5/5 | 5/5 | Accurately identifies lack of microservices patterns in the reviewed wiki layer. | **Yes** |

**Average Correctness Score**: 5.0 / 5.0
**Average Completeness Score**: 5.0 / 5.0

---

## 🔍 Validation Notes & Findings

### 1. Zero Hallucination & Factuality
All answers were strictly verified against the text in `wiki/` and `raw_sources/`. No outside knowledge was assumed for specific project behaviors (e.g., Git storage, nginx master/worker loop, HDFS NameNode RAM limits, MediaWiki PHP hook registry). All facts are fully trace-supported.

### 2. Format Compliance
The generated outputs strictly followed the mandatory format specified in `docs/answering-rules.md`:
* **Question**: [User query]
* **Pages consulted**: [List of relative paths checked]
* **Answer**: [Architectural synthesis]
* **Sources used**: [List of exact supporting relative paths]

### 3. Coverage Gaps Discovered
The manual evaluation of Q22 verified that while the 5 AOSA projects are extremely well-documented in the `wiki/` layer, general distributed system design questions (Q06-Q13) had to fall back to the `raw_sources/extra_sources/` layer because the reviewed `wiki/` layer lacks generic pattern and component definitions for these microservice topics. This gap is documented in [evaluation/wiki-fixes-from-evaluation.md](wiki-fixes-from-evaluation.md).

### 4. Workflow Success
The combination of `wiki/index.md` as the primary directory, followed by `qmd` retrieval (using grep/targeted file scanning in the raw layers), and finishing with the strict `AGENTS.md` and `answering-rules.md` LLM answer templates, proved highly effective. It yields highly structured, readable, and 100% trace-supported architecture answers.
