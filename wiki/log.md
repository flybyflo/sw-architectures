# Wiki Log

Log entries are append-only. Each entry should name the date, change type,
scope, source notes consulted, reviewed pages changed, validation performed,
and follow-up work.

## 2026-05-27

- Created initial repository structure for the Architecture Wiki.
- Added initial AOSA source notes for nginx, Git, MediaWiki, Hadoop HDFS, and
  LLVM.
- Added initial maintainer rules in `AGENTS.md`.
- Created a comprehensive typical software architecture question bank under `questions/typical-architecture-questions.md` to establish the evaluation surface.

## 2026-05-29

### Wiki schema and initial reviewed content

- Change type: schema, templates, reviewed wiki content, and link validation.
- Scope: issues #4 and #5.
- Source notes consulted:
  - `raw_sources/aosa/nginx.md`
  - `raw_sources/aosa/git.md`
  - `raw_sources/aosa/mediawiki.md`
  - `raw_sources/aosa/hadoop-hdfs.md`
  - `raw_sources/aosa/llvm.md`
- Reviewed pages created:
  - project pages for nginx, Git, MediaWiki, Hadoop HDFS, and LLVM
  - ADRs for each selected project's main architectural decision
  - shared component pages for event loop, object database, plugin system,
    NameNode, and intermediate representation
  - pattern pages for event-driven architecture, layered architecture,
    client-server, and content-addressed storage
  - quality-attribute pages for performance, reliability, scalability,
    modifiability, and security
- Templates created for projects, ADRs, components, patterns, quality
  attributes, and raw source notes.
- Added `docs/wiki-design-decisions.md` to document the knowledge-base design
  rationale for assignment reporting.
- Validation: pages include frontmatter, relative links, index entries, and
  source-note traceability.
- Follow-up: add more reviewed pages from the remaining AOSA and extra source
  notes.
