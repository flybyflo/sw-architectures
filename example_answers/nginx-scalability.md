```markdown
Question:
How does nginx achieve scalability?

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/quality-attributes/scalability.md
- wiki/patterns/event-driven-architecture.md

Answer:
Nginx achieves high scalability primarily through an event-driven, asynchronous, and non-blocking architecture. Instead of creating a new process or thread for every single incoming connection—which degrades performance due to high memory usage and CPU context switching—Nginx utilizes a fixed number of worker processes optimized for the available CPU cores. Each worker handles thousands of concurrent connections simultaneously by multiplexing network events via efficient operating system mechanisms like `epoll` or `kqueue`. This keeps resource consumption predictable and extremely low under massive concurrent loads.

Sources used:
- wiki/projects/nginx.md
- wiki/patterns/event-driven-architecture.md
- wiki/quality-attributes/scalability.md
