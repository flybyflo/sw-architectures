# LLM Wiki Idea Alignment

The Architecture Wiki is designed as a compact, persistent knowledge base for
LLM-assisted architecture answering.

## Assignment Source Links

The assignment references these LLM Wiki materials:

- [Karpathy's LLM Knowledge Bases post](https://x.com/karpathy/status/2039805659525644595)
- [Karpathy's LLM Wiki idea file](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

## Core Idea

Instead of sending raw textbook-scale notes directly into a chatbot context
window, the repository maintains a reviewed Markdown layer. This reviewed layer
contains concise, source-linked pages that an agent can retrieve before falling
back to raw notes.

## Design Consequences

- `wiki/index.md` is the navigation entry point.
- Reviewed pages are organized by projects, ADRs, components, patterns, and
  quality attributes.
- Raw notes remain available for verification but are not the preferred answer
  layer.
- Answer rules require exact file-path citations so generated answers can be
  manually checked.
- Local scripts make retrieval and validation reproducible without a custom
  vector database.

## Pattern Mapping

Karpathy's idea file describes three operating layers: raw sources, a maintained
wiki, and a schema file that tells the agent how to ingest, query, and maintain
the wiki. This repository maps those layers as follows:

- Raw sources: `raw_sources/aosa/` and `raw_sources/extra_sources/`
- Maintained wiki: `wiki/projects/`, `wiki/adrs/`, `wiki/components/`,
  `wiki/patterns/`, and `wiki/quality-attributes/`
- Schema and workflow rules: `AGENTS.md`, `docs/answering-rules.md`, and
  `wiki/log.md`

The workflow also follows the idea file's index-first query pattern through
`wiki/index.md`, with QMD retrieval used when deeper semantic or multi-file
matching is needed.

## Assignment Fit

This implements an LLM knowledge-base-style workflow: source-backed Markdown
pages reduce token usage, preserve traceability, and support chatbot-style
answers to general and project-specific software architecture questions.
