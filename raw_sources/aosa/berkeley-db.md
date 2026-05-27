# Berkeley DB

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Berkeley DB" by Margo Seltzer and Keith Bostic:
  https://aosabook.org/en/v1/bdb.html

## Project Purpose

Berkeley DB is an embedded database library that provides fast, reliable,
flexible, and scalable data management directly inside an application process.
It offers database features such as keyed access, sequential access,
transactions, recovery, locking, and replication without requiring a standalone
database server.

## Architectural Style

- Embedded database library
- Modular layered architecture
- Toolkit-style component architecture
- API boundary and handle-based design
- Transactional storage engine architecture
- Multiple implementation choices behind common interfaces

## Main Components

- Application API: high-level operations for opening databases and performing
  `get`, `put`, `delete`, and cursor-based access.
- Environment handle: shared context for database files, transactions, memory
  pool, logging, locking, and replication.
- Database handle: application-facing handle for a database.
- Transaction handle: application-facing transaction context.
- Cursor: iteration and positional access abstraction.
- Access methods: Btree, Hash, Recno, and Queue.
- Memory pool: page cache and buffer management for database pages.
- Lock manager: concurrency control and lock acquisition.
- Log manager: persistent write-ahead log management.
- Transaction manager: transaction begin, commit, abort, and prepare behavior.
- Recovery manager: redo and undo processing after failure.
- Database registration module: tracks database file identity and log-related
  registration state.
- Replication subsystem: supports high availability by coordinating replicated
  log and transaction state.
- File operation module: transactionally protected database create, delete, and
  rename operations.

## Interfaces

- C library API exposed through handles such as `DB`, `DB_ENV`, `DB_TXN`, and
  cursors.
- Access method APIs for Btree, Hash, Recno, and Queue behavior.
- Internal module APIs among locking, memory pool, log, transaction, recovery,
  dbreg, and replication subsystems.
- Cursor APIs for iteration over data and log records.
- File-system interface for database files, log files, and environment state.
- Replication message interfaces between replicated environments.
- Configuration flags and environment settings that select durability,
  concurrency, replication, and storage behavior.

## Data and State Management

- Data is stored as key/value records or record-number/value records depending
  on the selected access method.
- Btree and Hash support variable-length key/value data.
- Recno and Queue support record-number-based access, with Queue optimized for
  fixed-length records and record-level locking.
- Database state is stored in files managed by access methods and cached in the
  memory pool.
- Transactional state is recorded in logs and coordinated with locks and page
  cache state.
- Recovery uses log records and access-method recovery routines to redo and undo
  operations after failure.
- Replication uses log and transaction state to keep replica environments
  synchronized.
- Database registration state tracks database files so recovery and replication
  can reason about file identity across operations.

## Quality Attributes

- Reliability: transactions, write-ahead logging, and recovery protect committed
  state.
- Performance: embedded deployment avoids client/server round trips and supports
  direct library calls.
- Flexibility: applications can choose access methods and use database
  components directly or through higher-level APIs.
- Maintainability: explicit module boundaries reduce design decay and isolate
  responsibilities.
- Testability: strong subsystem boundaries make behavior easier to reason about
  and test.
- Scalability: concurrency, caching, and replication support larger workloads,
  though embedded deployment leaves process-level scaling to the host
  application.
- Embeddability: the library architecture lets applications integrate storage
  without operating a separate server.

## Key Architectural Decisions

- Package database functionality as an embedded library instead of a standalone
  server.
- Build the library as cooperating modules with explicit API boundaries.
- Support several access methods behind common database and cursor interfaces.
- Use handles as the main application-facing abstraction.
- Use cursor-based APIs for iteration and internal implementation reuse.
- Add a general-purpose recovery subsystem instead of hand-coded recovery inside
  each access method.
- Use write-ahead logging and transaction APIs for durability.
- Split logging and database registration responsibilities as functionality
  evolved.
- Add replication as a layer that interacts with the existing subsystems through
  APIs.

## Tradeoffs

- Embedded deployment removes server overhead, but shifts process management,
  deployment, and some operational concerns to the host application.
- Many implementation choices behind APIs improve flexibility, but increase
  internal coordination complexity.
- Strong module boundaries improve maintainability, but boundaries must evolve
  when new features stress the design.
- Btree is usually a strong default because of key locality, while Hash can be
  useful when indexes do not fit in memory.
- Queue supports record-level locking but requires fixed-length values.
- Recovery, replication, and transactional file operations improve reliability,
  but make the architecture more complex over time.

## Useful Wiki Pages To Create Later

- `wiki/projects/berkeley-db.md`
- `wiki/adrs/berkeley-db-adr-001-embedded-library-architecture.md`
- `wiki/adrs/berkeley-db-adr-002-modular-transactional-storage-engine.md`
- `wiki/adrs/berkeley-db-adr-003-cursor-based-access.md`
- `wiki/components/access-methods.md`
- `wiki/components/memory-pool.md`
- `wiki/components/lock-manager.md`
- `wiki/components/log-manager.md`
- `wiki/components/recovery-manager.md`
- `wiki/components/replication-subsystem.md`
- `wiki/patterns/layered-architecture.md`
- `wiki/patterns/embedded-library.md`
- `wiki/quality-attributes/reliability.md`
- `wiki/quality-attributes/performance.md`
- `wiki/quality-attributes/modifiability.md`
