# Architecture Wiki Maintainer Rules

Use this file as the shared instruction sheet for maintainers updating the
Architecture Wiki.

## Source Rules

- Raw source notes live in `raw_sources/`.
- AOSA source notes live in `raw_sources/aosa/`.
- Optional sources, such as ByteByteGo articles, live in `raw_sources/extra_sources/`.
- Raw sources are treated as immutable input notes after review. Correct clear
  errors in a follow-up change with a log entry instead of silently rewriting
  source history during wiki synthesis.
- Source notes should summarize architecture facts instead of copying long
  passages.
- Every source note must include a source URL.

## Wiki Rules

- Wiki pages live in `wiki/`.
- Project pages belong in `wiki/projects/`.
- Architecture decision records belong in `wiki/adrs/`.
- Shared component pages belong in `wiki/components/`.
- Pattern pages belong in `wiki/patterns/`.
- Quality attribute pages belong in `wiki/quality-attributes/`.
- Reusable page skeletons belong in `wiki/templates/`.
- Project pages may include a concise architecture summary based on the
  architecture-haiku concept: three short lines that state the architectural
  structure, dominant force, and central tradeoff. Keep these summaries factual
  and source-supported.
- Use frontmatter on reviewed wiki pages. Required fields are `title`, `type`,
  `status`, and `sources`. Add page-specific fields such as `projects`,
  `components`, `patterns`, `quality_attributes`, or `adrs` when useful.

## Linking Rules

- Project pages should link to source notes.
- Project pages should link to related ADRs.
- ADRs should link to affected components and quality attributes.
- ADRs should link to functional requirements where those requirements are
  stated on a project page.
- Related ADRs should link to each other when decisions influence one another.
- Component pages should link back to the projects where they appear.
- Quality attribute pages should compare the projects where the attribute is
  important.
- Pattern pages should list projects where the pattern appears.

## Ingestion Rules

1. Read the raw source note and identify only architecture-relevant claims.
2. Create or update reviewed wiki pages under `wiki/` using the matching
   template from `wiki/templates/`.
3. Preserve traceability by linking every project page and ADR to its source
   note.
4. Prefer one concise page per concept. Extend an existing shared component,
   pattern, or quality attribute page when the concept appears in multiple
   projects.
5. Update `wiki/index.md` with every new reviewed page and a one-line summary.
6. Append an entry to `wiki/log.md` for each ingest, query-support update, lint
   pass, or manual validation pass.

## ADR Rules

- ADRs use a MADR-style Markdown shape: context, decision, consequences,
  considered options, and links.
- Use sequential project-scoped filenames, such as
  `nginx-adr-001-event-driven-worker-model.md`.
- ADRs capture significant architecture choices, not every implementation
  detail.
- ADRs should connect decisions to components, quality attributes, patterns, and
  project functional requirements.

## Validation Rules

- Check that all relative links resolve before finishing wiki work.
- Check that every reviewed page has frontmatter.
- Check that `wiki/index.md` links to all reviewed pages.
- Check that `wiki/log.md` has a dated append-only entry.
- Do not invent missing information. If a source note does not support a claim,
  leave the claim out or mark it as not yet documented.

## Agent Answer Workflow Rules
1. **Read `wiki/index.md` first** as the primary navigation source to locate relevant architecture documentation.
2. **Use `qmd` retrieval** from the configured collections when deeper context, semantic matching, or multi-file search is required.
3. **Prefer reviewed wiki pages** over raw sources. Use `raw_sources/` notes only for verification fallback.
4. **Cite exact file paths** for all claims made in the output.
5. **Do not invent missing information.** If the context is insufficient, explicitly declare it.

For detailed response layout specifications and constraint edge-cases, see `../docs/answering-rules.md`.

## Review Rules

- Check source links before accepting new source notes.
- Prefer clear architecture facts over broad descriptions.
- Avoid unsupported claims.
- Keep pages short enough to be useful for retrieval.
- Record important wiki updates in `wiki/log.md`.
