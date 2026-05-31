# Architecture Wiki Design Rationale

The Architecture Wiki is organized as a persistent knowledge base for answering
general and project-specific questions about software architecture. This file
records the main design rationale behind the repository structure.

## Separation Of Raw Sources And Reviewed Pages

Raw notes live under `raw_sources/`, while reviewed pages live under `wiki/`.
Raw notes preserve source-oriented summaries. Reviewed pages synthesize those
notes into project, ADR, component, pattern, and quality-attribute pages.

This distinction prevents the repository from being only a collection of source
excerpts. The reviewed wiki layer is the primary knowledge base, while the raw
notes remain available for verification and traceability.

## Use Of `wiki/index.md` As The Retrieval Entry Point

The index lists reviewed project pages, ADRs, components, patterns, quality
attributes, and source notes. It is intended to be consulted before semantic or
full-text search, so that common questions are directed to curated pages first.

If the index does not provide enough context, retrieval can use the collections
configured in `qmd.yml`.

## Representation Of Architecture Decisions With ADRs

Architecture decision records use a MADR-style Markdown format: context,
decision, consequences, considered options, and links. ADRs link back to
projects, functional requirements, components, patterns, quality attributes, and
source notes.

The ADR layer makes architectural decisions explicit and supports questions
about why a project adopted a particular architectural approach.

## Quality Attributes As Cross-Project Pages

Quality attributes such as performance, reliability, scalability,
modifiability, and security are modeled as cross-project pages. These pages
compare how different systems satisfy or trade off the same architectural
concern.

This supports comparative analysis across projects rather than limiting the wiki
to isolated project summaries.

## Project Pages As The Main Synthesis Layer

Each project page includes context, functional requirements, components,
interfaces, data and state management, quality attributes, key decisions,
tradeoffs, and links to source notes.

Project pages may include a concise architecture summary based on the
architecture-haiku concept. The summary captures the system structure, dominant
architectural force, and central tradeoff in a compact form while remaining
factual and source-supported.

## Traceability And Link Validation

Reviewed pages include frontmatter with source and relationship metadata. Pages
link to related wiki concepts and to the raw source notes that support their
claims.

Each reviewed update should validate relative links, include frontmatter on
reviewed pages, list major pages in `wiki/index.md`, and record the change in
`wiki/log.md`.

## Implementation Scope

The current reviewed content covers five AOSA projects:

- nginx
- Git
- MediaWiki
- Hadoop HDFS
- LLVM

For these projects, the wiki includes project pages, ADRs, shared components,
patterns, and quality-attribute pages. The same schema can be applied to
additional AOSA chapters and optional sources such as ByteByteGo.
