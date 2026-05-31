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

## 2026-05-31

### Evaluation Validation and Gap Identification
- Change type: evaluation, manual validation, gap analysis, and roadmap.
- Scope: issue #8 (Assignment 3+4 final task).
- Source notes consulted:
  - `raw_sources/extra_sources/bytebytego-*.md`
  - `raw_sources/aosa/*.md`
- Validation performed: Manually evaluated 18 architecture questions (Q01-Q17, Q22). All generated answers conform strictly to the docs/answering-rules.md templates.
- Gaps identified: Verified complete coverage for five core projects, but found a lack of synthesized pages in wiki/patterns/ and wiki/components/ for general microservice design blocks (API gateway, sharding, messaging topologies), causing fallback to raw sources.
- Follow-up: Synthesize the planned pages under wiki/components/ and wiki/patterns/ from the ByteByteGo raw sources to eliminate raw source fallback.
