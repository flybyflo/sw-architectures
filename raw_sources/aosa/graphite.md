# Graphite

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Graphite": https://aosabook.org/en/v1/graphite.html

## Project Purpose

Graphite is a scalable real-time graphing system for collecting, storing, and rendering time-series metrics. Its architecture separates metric ingestion, storage, and web rendering so operational data can be queried and visualized efficiently.

## Architectural Style

- Time-series monitoring architecture
- Pipeline architecture
- Client-server architecture
- Storage/rendering separation
- Horizontally scalable metric ingestion

## Main Components

- Carbon daemons for receiving metrics
- Whisper time-series database files
- Graphite web application
- Rendering engine
- Metric finders and query logic
- Caching layer
- Relay and aggregator processes

## Interfaces

- Plaintext metric ingestion protocol
- Pickle protocol
- HTTP web and rendering API
- Whisper file interface
- Dashboard and graph URL interfaces
- Cache and relay interfaces

## Data and State Management

- Metrics are identified by hierarchical dot-separated names.
- Whisper stores fixed-resolution time-series archives in local files.
- Retention policies define precision and history length.
- Carbon receives and buffers metrics before writing them.
- Graphite-web resolves metric paths and renders graphs from stored series.

## Quality Attributes

- Performance for high write volume
- Scalability through carbon-relay and distributed storage
- Operability through simple metric paths and file-backed storage
- Availability concerns around storage node placement
- Modifiability through a simple ingestion protocol and API

## Key Architectural Decisions

- Separate metric ingestion from web rendering.
- Use a simple line protocol for metric submission.
- Store time-series data in fixed-size Whisper files.
- Use hierarchical metric names as the main namespace.
- Scale ingestion and storage by distributing metrics across processes and nodes.

## Tradeoffs

- Simple metric naming is easy to adopt but can become hard to govern.
- Fixed-size files make retention predictable but constrain dynamic resolution changes.
- Local-file storage is simple but requires sharding and operational discipline at scale.
- Rendering flexibility can be expensive for broad queries.

## Useful Wiki Pages To Create Later

- wiki/projects/graphite.md
- wiki/components/carbon.md
- wiki/components/whisper.md
- wiki/components/rendering-engine.md
- wiki/quality-attributes/operability.md
