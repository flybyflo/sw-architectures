# nginx

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "nginx" by Andrey Alexeev: https://aosabook.org/en/v2/nginx.html

## Project Purpose

nginx is a web server, reverse proxy, load balancer, cache, and edge server
designed for high concurrency, high performance, and low memory usage. It was
created to handle workloads where many clients keep connections open or send
data slowly.

## Architectural Style

- Event-driven architecture
- Asynchronous non-blocking I/O
- Master-worker process model
- Modular request-processing pipeline
- Edge server / reverse proxy architecture

## Main Components

- Master process: reads and validates configuration, manages sockets, starts
  and supervises worker processes, handles reconfiguration and binary upgrades.
- Worker processes: accept client connections and process HTTP requests,
  proxying, filtering, caching, and most runtime behavior.
- Cache loader: scans existing on-disk cache files and loads cache metadata into
  shared memory.
- Cache manager: expires and invalidates cached content.
- Core: runs the event loop and coordinates modules during request processing.
- Modules: implement protocol handling, filters, upstream proxying, load
  balancing, variables, and other web server features.
- Configuration system: central text configuration loaded by the master process
  and inherited by workers.

## Interfaces

- HTTP client interface.
- Upstream server interfaces such as FastCGI, uWSGI, SCGI, and proxy HTTP.
- Operating system event APIs such as epoll, kqueue, and event ports.
- File-system interface for static files, logs, and cache storage.
- Configuration file interface through `nginx.conf` and included files.
- Optional integrations with SSL libraries, compression, PCRE, memcached, Redis,
  and similar systems.

## Data and State Management

- Runtime connection and request state is held inside worker processes.
- Configuration is read by the master process and inherited by workers in a
  compiled read-only form.
- Cache metadata is stored in shared memory used by workers, the cache loader,
  and the cache manager.
- Cached responses are stored as separate files in a hierarchical on-disk cache.
- Cache keys can be derived from request and upstream data.
- Workers avoid shared mutable state where possible to reduce contention.

## Quality Attributes

- Performance: non-blocking event processing avoids per-connection process or
  thread overhead.
- Scalability: a small number of workers can handle many concurrent connections.
- Resource efficiency: memory and CPU usage remain low under high connection
  counts.
- Availability: the master can reconfigure and upgrade binaries with little or
  no service interruption.
- Security: workers can run as unprivileged users while the master owns
  privileged setup tasks.
- Modifiability: modules separate feature implementation from the core event
  loop, although modules were historically compiled in.

## Key Architectural Decisions

- Use event-driven workers instead of process-per-connection or
  thread-per-connection execution.
- Separate master process responsibilities from worker request processing.
- Keep workers single-threaded and non-blocking to avoid lock contention and
  context-switch overhead.
- Use operating system event notification mechanisms for scalable I/O.
- Represent web server behavior through a centralized C-style configuration.
- Implement most web server behavior as modules around a small core.
- Store cache content on disk while sharing cache metadata in memory.

## Tradeoffs

- The event-driven model improves concurrency but makes asynchronous control flow
  more complex.
- A blocking disk operation or embedded script can stall a worker that is serving
  many connections.
- Centralized configuration is easier to validate and reason about than
  distributed `.htaccess` files, but gives less per-directory flexibility.
- Compiled modules keep the runtime simpler, but reduce deployment flexibility
  compared with dynamic module loading.

## Useful Wiki Pages To Create Later

- `wiki/projects/nginx.md`
- `wiki/adrs/nginx-adr-001-event-driven-worker-model.md`
- `wiki/components/master-process.md`
- `wiki/components/worker-process.md`
- `wiki/components/event-loop.md`
- `wiki/patterns/event-driven-architecture.md`
- `wiki/quality-attributes/scalability.md`
- `wiki/quality-attributes/performance.md`
