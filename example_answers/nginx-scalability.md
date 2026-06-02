# Example Answer: nginx Scalability

Question:
How does nginx achieve scalability?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/performance.md
- wiki/patterns/event-driven-architecture.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md

Answer:
nginx achieves scalability through an event-driven, non-blocking worker model.
Instead of allocating one process or thread per connection, a small worker set
multiplexes many active connections through operating system event APIs. This
keeps memory use and scheduling overhead low under high concurrency. The model
scales connection handling efficiently, but blocking work inside a worker can
harm many active connections at once.

Sources used:
- wiki/projects/nginx.md
- wiki/quality-attributes/scalability.md
- wiki/quality-attributes/performance.md
- wiki/patterns/event-driven-architecture.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
