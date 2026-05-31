# Wiki Fixes & Gaps Identified from Evaluation

This document outlines the coverage gaps discovered in the **Architecture Wiki** during the manual evaluation and details the fixes and improvements needed to address them.

---

## 🔍 Identified Gaps

During the evaluation, particularly when answering **Q22** and the general distributed systems questions (**Q06 - Q13**), we noted a clear structural division:
1. **AOSA Projects Layer (`wiki/projects/`, `wiki/adrs/`, etc.)**: Extremely comprehensive. Covers nginx, Git, MediaWiki, Hadoop HDFS, and LLVM with 100% correctness and completeness.
2. **General / Distributed Systems Layer (`wiki/components/`, `wiki/patterns/`)**: Under-synthesized. While raw notes are available in `raw_sources/extra_sources/` (e.g., ByteByteGo articles), there were no reviewed wiki pages in `wiki/patterns/` or `wiki/components/` corresponding to API Gateways, Sharding, Message Queues, or Distributed Reliability.

As a result, the query workflow had to **fall back to raw source notes** for Q06-Q13, violating the preference for the reviewed `wiki/` layer.

---

## 🛠️ Recommended Wiki Fixes & Planned Pages

To bridge these gaps and ensure that general system-design questions can be answered entirely from reviewed, high-fidelity wiki pages, the following new pages have been mapped out to be synthesized from `raw_sources/extra_sources/`:

### 1. New Components (`wiki/components/`)
* **`wiki/components/api-gateway.md`**
  - *Source*: `raw_sources/extra_sources/bytebytego-api-gateway.md`
  - *Content*: Detail client-facing endpoints, routing engines, rate limiters, request translators, and downstream connectors.
* **`wiki/components/message-broker.md`**
  - *Source*: `raw_sources/extra_sources/bytebytego-messaging-patterns.md`
  - *Content*: Cover message queues, topics, consumer groups, offsets, and DLQs.

### 2. New Patterns (`wiki/patterns/`)
* **`wiki/patterns/database-sharding.md`**
  - *Source*: `raw_sources/extra_sources/bytebytego-database-sharding.md`
  - *Content*: Map out range-based, hash-based, and directory-based database sharding, along with shard-key selection guidelines.
* **`wiki/patterns/caching-strategies.md`**
  - *Source*: `raw_sources/extra_sources/bytebytego-caching-strategies.md`
  - *Content*: Explicitly outline cache-aside, read-through, write-through, and write-back strategies and consistency models.
* **`wiki/patterns/distributed-reliability.md`**
  - *Source*: `raw_sources/extra_sources/bytebytego-distributed-reliability.md`
  - *Content*: Synthesize retries (backoff + jitter), circuit breakers, bulkheads, and rate limiters.

### 3. New Quality Attributes (`wiki/quality-attributes/`)
* **`wiki/quality-attributes/availability.md`**
  - *Source*: Combined HDFS and ByteByteGo reliability notes.
  - *Content*: Detail failover, health checks, heartbeats, and cluster node redundancy.
* **`wiki/quality-attributes/consistency.md`**
  - *Source*: Combined caching and sharding notes.
  - *Content*: Compare eventual consistency in queues and caching vs. strong consistency in write-through caching.

---

## 📈 Fix Log

To log these findings formally in accordance with the ingestion rules, an entry has been appended to the central maintainer log.

### Log Entry Added in `wiki/log.md`:
```markdown
## 2026-05-31

### Evaluation Validation and Gap Identification
- Change type: evaluation, manual validation, gap analysis, and roadmap.
- Scope: issue #8 (Assignment 3+4 final task).
- Source notes consulted:
  - `raw_sources/extra_sources/bytebytego-*.md`
  - `raw_sources/aosa/*.md`
- Validation performed: Manually evaluated 18 architecture questions (Q01-Q17, Q22). All generated answers conform strictly to the docs/answering-rules.md templates.
- Gaps identified: Verified complete coverage for five core projects, but found a lack of synthesized pages in wiki/patterns/ and wiki/components/ for general microservice design blocks (API gateway, sharding, messaging topologies), causing fallback to raw sources.
- Follow-up: Synthesize the planned pages under wiki/components/ and wiki/patterns/ from the ByteByteGo raw sources to eliminate raw source fallback.
```
