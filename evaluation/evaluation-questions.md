# Evaluation Question Set

This document lists the questions selected for the Architecture Wiki evaluation.
Questions are drawn from
[questions/typical-architecture-questions.md](../questions/typical-architecture-questions.md).
17 core-evaluation questions are included, plus 1 supplementary coverage-gap question to
broaden coverage (Q22).

## Selection Criteria

1. Cover every question category at least once.
2. Include questions marked for evaluation in the question bank.
3. Add a supplementary question that tests coverage-gap detection and honesty under
   missing wiki content (Q22).
4. Total: **18 questions** (exceeds the minimum of 12).

## Selected Questions

| # | ID | Question | Category |
|---|---|---|---|
| 1 | Q01 | What are the main components of nginx, and how do the master and worker processes interact? | Components & Interfaces |
| 2 | Q02 | How does Git manage data and state (blobs, trees, commits, references, and the index), and how does this design support integrity? | Data & State Management |
| 3 | Q03 | Which architectural patterns and caching strategies are utilized by MediaWiki to handle high read traffic and ensure extensibility? | Architectural Styles & Patterns |
| 4 | Q04 | How does HDFS achieve fault tolerance and scalability through NameNode/DataNode separation and replication? | Quality Attributes (Reliability) |
| 5 | Q05 | How do the central IR and modular structure of LLVM facilitate compiler optimization and support multiple frontends/backends? | Components & Interfaces |
| 6 | Q06 | What are the main components of a scalable web architecture and how do they manage concurrent loads? | High-Level Architectural Design |
| 7 | Q07 | What are the most common architectural styles and patterns and what specific problems do they solve? | Architectural Styles & Patterns |
| 8 | Q08 | When and why should an API Gateway pattern be introduced, and what cross-cutting concerns does it centralize? | Architectural Styles & Patterns |
| 9 | Q09 | What are the architectural differences between a message queue, a pub-sub system, and an event stream? | Architectural Styles & Patterns |
| 10 | Q10 | What are the core components and interfaces of an API Gateway? | Components & Interfaces |
| 11 | Q11 | How should an engineer choose between caching strategies and how do they impact data consistency? | Data & State Management |
| 12 | Q12 | How does database sharding manage data and what goes into selecting a shard key? | Data & State Management |
| 13 | Q13 | What distributed reliability mechanisms protect systems from cascading failures? | Quality Attributes (Reliability) |
| 14 | Q14 | Which quality attributes are prioritized in nginx and what architectural decisions support them? | Quality Attributes (Performance) |
| 15 | Q15 | How do architectural decisions in MediaWiki impact performance, modifiability, and security trade-offs? | Quality Attributes (Trade-offs) |
| 16 | Q16 | Compare how Eclipse, Jitsi, and MediaWiki achieve modularity and extensibility. | Cross-Project Comparison |
| 17 | Q17 | Compare nginx and HDFS in terms of scalability. | Cross-Project Comparison |
| 18 | Q22 | Which questions are currently unanswerable from the wiki due to missing content? | Coverage Gaps |

## Category Coverage

| Category | Questions |
|---|---|
| Components & Interfaces | Q01, Q05, Q10 |
| Data & State Management | Q02, Q11, Q12 |
| Architectural Styles & Patterns | Q03, Q07, Q08, Q09 |
| Quality Attributes | Q04, Q13, Q14, Q15 |
| High-Level Architectural Design | Q06 |
| Cross-Project Comparison | Q16, Q17 |
| Coverage Gaps | Q22 |
