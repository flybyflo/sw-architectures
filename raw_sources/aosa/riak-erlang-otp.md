# Riak and Erlang/OTP

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Riak and Erlang/OTP": https://aosabook.org/en/v1/riak.html

## Project Purpose

Riak is a distributed key-value database built on Erlang/OTP. Its architecture emphasizes availability, fault tolerance, horizontal scalability, and operational simplicity through a Dynamo-inspired design.

## Architectural Style

- Distributed key-value store
- Dynamo-style architecture
- Actor/process supervision architecture
- Consistent hashing ring
- Eventually consistent replicated storage

## Main Components

- Riak node
- Consistent hashing ring
- Virtual nodes
- Storage backends
- Replication and handoff logic
- Coordinator process
- Vector clocks
- Erlang supervisors
- Client APIs

## Interfaces

- HTTP and protocol buffer client APIs
- Bucket/key data interface
- Cluster membership and gossip interfaces
- Storage backend interface
- Erlang/OTP process and supervision interfaces

## Data and State Management

- Keys are assigned to partitions in a consistent hashing ring.
- Virtual nodes own partitions and move between physical nodes.
- Objects are replicated across multiple nodes according to N/R/W settings.
- Vector clocks track causal history for conflict detection.
- Storage backends persist object values and metadata.

## Quality Attributes

- Availability through replication and quorum behavior
- Scalability through consistent hashing and vnode distribution
- Fault tolerance through Erlang supervision and handoff
- Operability through symmetric nodes
- Consistency tradeoffs through eventual consistency and conflict handling

## Key Architectural Decisions

- Use Dynamo-style partitioning and replication.
- Use Erlang/OTP for lightweight processes and supervision.
- Expose tunable read/write quorum settings.
- Represent causality with vector clocks.
- Use virtual nodes to balance data movement and ownership.

## Tradeoffs

- Availability and partition tolerance can produce conflicting versions.
- Vector clocks expose conflict complexity to clients or application logic.
- Quorum tuning gives flexibility but requires workload knowledge.
- Erlang supervision improves fault handling but shapes the whole implementation model.

## Useful Wiki Pages To Create Later

- wiki/projects/riak-erlang-otp.md
- wiki/components/consistent-hashing-ring.md
- wiki/components/vector-clock.md
- wiki/patterns/replication.md
- wiki/quality-attributes/availability.md
