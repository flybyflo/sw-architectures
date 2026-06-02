# LLM Wiki Idea Alignment

The Architecture Wiki is designed as a compact, persistent knowledge base for
LLM-assisted architecture answering.

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

## Assignment Fit

This implements an LLM knowledge-base style workflow: source-backed Markdown
pages reduce token usage, preserve traceability, and support chatbot-style
answers to general and project-specific software architecture questions.
