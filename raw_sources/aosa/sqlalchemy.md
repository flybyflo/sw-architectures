# SQLAlchemy

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "SQLAlchemy": https://aosabook.org/en/v2/sqlalchemy.html

## Project Purpose

SQLAlchemy is a Python SQL toolkit and object-relational mapper. Its architecture separates SQL expression construction, database connectivity, dialects, object mapping, sessions, and unit-of-work behavior.

## Architectural Style

- Layered data-access architecture
- Expression language architecture
- ORM architecture
- Dialect adapter architecture
- Unit of Work pattern

## Main Components

- SQLAlchemy Core
- SQL expression language
- Engine
- Connection pool
- Dialect
- Mapper
- Session
- Identity map
- Unit of work
- Schema metadata

## Interfaces

- Python SQL expression API
- DBAPI interface
- Dialect interface
- ORM mapping interface
- Session API
- Schema reflection and metadata interfaces

## Data and State Management

- SQL expression objects represent queries and statements.
- Engines coordinate dialects, DBAPI connections, and pooling.
- Metadata describes tables, columns, and relationships.
- Sessions track persistent objects and identity.
- The unit of work orders inserts, updates, and deletes during flush.

## Quality Attributes

- Modifiability through separation of Core and ORM
- Portability across databases through dialects
- Usability through high-level ORM APIs
- Performance through explicit control and lazy loading options
- Correctness through unit-of-work and identity map behavior

## Key Architectural Decisions

- Build an explicit SQL expression layer instead of hiding SQL completely.
- Separate Core database access from ORM mapping.
- Use dialects to adapt to database differences.
- Use sessions as the unit of interaction for ORM state.
- Apply Unit of Work to coordinate persistence changes.

## Tradeoffs

- Exposing SQL concepts improves control but raises the learning curve.
- ORM convenience can hide query costs.
- Dialect abstraction improves portability but cannot erase all database differences.
- Session state improves consistency but requires lifecycle discipline.

## Useful Wiki Pages To Create Later

- wiki/projects/sqlalchemy.md
- wiki/components/sql-expression-language.md
- wiki/components/session.md
- wiki/patterns/unit-of-work.md
- wiki/quality-attributes/portability.md
