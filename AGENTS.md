# Architecture Wiki Maintainer Rules

Use this file as the shared instruction sheet for people or agents updating the
Architecture Wiki.

## Source Rules

- Raw source notes live in `raw_sources/`.
- AOSA source notes live in `raw_sources/aosa/`.
- Optional sources, such as ByteByteGo articles, live in `raw_sources/extra_sources/`.
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

## Linking Rules

- Project pages should link to source notes.
- Project pages should link to related ADRs.
- ADRs should link to affected components and quality attributes.
- Component pages should link back to the projects where they appear.
- Quality attribute pages should compare the projects where the attribute is
  important.
- Pattern pages should list projects where the pattern appears.

## Answer Rules

- Answers should be based on reviewed wiki pages when possible.
- If a wiki page is missing or unclear, check the raw source note.
- Every answer should list the wiki or source files used.
- Say when the wiki does not contain enough information.

## Review Rules

- Check source links before accepting new source notes.
- Prefer clear architecture facts over broad descriptions.
- Avoid unsupported claims.
- Keep pages short enough to be useful for retrieval.
- Record important wiki updates in `wiki/log.md`.
