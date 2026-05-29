# Architecture Wiki

This repository contains a Markdown-based software architecture knowledge base.
The goal is to collect architecture information from AOSA source material,
transform it into reviewed wiki pages, and use those pages to answer general,
project-specific, and comparative architecture questions.

The project follows a three-layer LLM Wiki design:

1. Raw sources are kept in `raw_sources/`.
2. Reviewed wiki pages are kept in `wiki/`.
3. Agent/query workflow, qmd retrieval, and evaluation documentation live under
   `docs/`, `evaluation/`, and supporting config files.

## Current Scope

Issue 1 sets up the repository structure and working rules.
Issue 2 collects raw source-layer notes from AOSA and selected optional sources.
Issue 4 defines the reviewed wiki schema, templates, linking rules, and
maintainer instructions.
Issue 5 creates the first reviewed project pages, ADRs, shared component pages,
pattern pages, and quality-attribute pages.

The source layer currently targets:

- all AOSA Volume 1 project chapters
- all AOSA Volume 2 project chapters
- selected ByteByteGo architecture and system-design sources

## Repository Structure

```text
.
|-- AGENTS.md
|-- README.md
|-- requirements.txt
|-- raw_sources/
|   |-- aosa/
|   `-- extra_sources/
|-- wiki/
|   |-- index.md
|   |-- log.md
|   |-- projects/
|   |-- adrs/
|   |-- components/
|   |-- patterns/
|   |-- quality-attributes/
|   `-- templates/
|-- questions/
|-- scripts/
|-- evaluation/
|-- docs/
`-- example_answers/
```

## Setup

This project currently has no required runtime dependencies for the source
notes. Later issues may add qmd setup instructions for searching the Markdown
wiki.

```bash
git clone <repo-url>
cd sw-architectures
```

There are no required runtime dependencies for reading or editing the Markdown
wiki. Retrieval tooling can be configured with `qmd.yml`.

## How To Work On Issue 1

Issue 1 is done when:

- The folder structure exists.
- `README.md` explains the project goal and setup.
- `AGENTS.md` explains basic contribution and wiki rules.
- Empty folders are tracked with placeholder files.

## How To Work On Issue 2

For each AOSA project chapter:

1. Read the AOSA chapter.
2. Create one file in `raw_sources/aosa/`.
3. Summarize only architecture-relevant information.
4. Keep source notes separate from generated wiki pages.
5. Include the original source link.

Each source note should cover:

- Source references
- Project purpose
- Architectural style
- Main components
- Interfaces
- Data and state management
- Quality attributes
- Key architectural decisions
- Tradeoffs
- Useful wiki pages to create later

Optional non-AOSA source notes, such as ByteByteGo articles, belong in
`raw_sources/extra_sources/`.

## Contribution Rules

- Work on a branch for each issue.
- Keep raw source notes in `raw_sources/`.
- Keep synthesized wiki content in `wiki/`.
- Do not copy large blocks of source text. Summarize and cite instead.
- Keep links relative inside the repository.
- Update `wiki/log.md` when adding or changing reviewed wiki content.
- Use pull requests so another team member can review content before merging.

## Design Rationale

The knowledge-base design rationale is summarized in
`docs/wiki-design-decisions.md`.
