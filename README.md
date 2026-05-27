# Architecture Wiki

This repository contains a Markdown-based software architecture knowledge base.
The goal is to collect architecture information from AOSA source material,
transform it into reviewed wiki pages, and use those pages to answer general,
project-specific, and comparative architecture questions.

The project follows a three-layer design:

1. Raw sources are kept in `raw_sources/`.
2. Reviewed wiki pages are kept in `wiki/`.
3. Search, chatbot, and evaluation scripts are kept in `scripts/` and
   `evaluation/`.

## Current Scope

Issue 1 sets up the repository structure and working rules.
Issue 2 collects the first AOSA source notes.

The first AOSA projects are:

- nginx
- Git
- MediaWiki
- Hadoop HDFS
- LLVM

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

This project currently only needs Python 3 for later scripts.

```bash
python3 --version
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

There are no runtime dependencies yet. Future issues will add the search and
answer scripts.

## How To Work On Issue 1

Issue 1 is done when:

- The folder structure exists.
- `README.md` explains the project goal and setup.
- `AGENTS.md` explains basic contribution and wiki rules.
- Empty folders are tracked with placeholder files.

## How To Work On Issue 2

For each AOSA project:

1. Read the AOSA chapter.
2. Create one file in `raw_sources/aosa/`.
3. Summarize only architecture-relevant information.
4. Keep source notes separate from generated wiki pages.
5. Include the original source link.

Each source note should cover:

- Project purpose
- Architectural style
- Main components
- Interfaces
- Data and state management
- Quality attributes
- Key architectural decisions
- Tradeoffs

## Contribution Rules

- Work on a branch for each issue, for example `issue-2-aosa-sources`.
- Keep raw source notes in `raw_sources/`.
- Keep synthesized wiki content in `wiki/`.
- Do not copy large blocks of source text. Summarize and cite instead.
- Keep links relative inside the repository.
- Update `wiki/log.md` when adding or changing wiki content.
- Use pull requests so another team member can review content before merging.

## Planned Commands

These commands will be implemented in later issues:

```bash
python scripts/search_wiki.py "How does nginx achieve scalability?"
python scripts/answer_question.py "Compare nginx and Hadoop HDFS in terms of scalability."
```
