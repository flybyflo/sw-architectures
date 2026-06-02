# Architecture Wiki Demo Script

This script demonstrates the current Architecture Wiki retrieval workflow,
answer generation, and validation evidence.

## Act 1: Start From The Reviewed Index

Action:

```bash
sed -n '1,140p' wiki/index.md
```

Narration:

The system starts from `wiki/index.md` instead of searching arbitrary text
chunks. The index lists reviewed projects, ADRs, components, patterns, quality
attributes, and raw verification sources.

## Act 2: Answer A Project-Specific Question

Question:

```text
What are the main components of nginx, and how do the master and worker processes interact?
```

Action:

```bash
qmd search "nginx worker event loop" -c architecture-wiki
```

Expected path:

- `wiki/projects/nginx.md`
- `wiki/components/event-loop.md`
- `wiki/adrs/nginx-adr-001-event-driven-worker-model.md`

Result:

Show Q01 from `evaluation/evaluation-results.md`.

## Act 3: Answer A General System-Design Question From Reviewed Pages

Question:

```text
How do caching strategies impact consistency?
```

Action:

```bash
qmd search "cache-aside write-through consistency" -c architecture-wiki
```

Expected path:

- `wiki/patterns/caching-strategies.md`
- `wiki/quality-attributes/consistency.md`

Result:

Show Q11 from `evaluation/evaluation-results.md`. The current implementation no
longer needs to fall back to raw source notes for this evaluated caching
question.

## Act 4: Demonstrate Honest Coverage Gaps

Question:

```text
Which questions are currently unanswerable from the reviewed wiki due to missing content?
```

Action:

```bash
qmd search "Bash Asterisk source-only projects" -c architecture-wiki
```

Narration:

The reviewed wiki contains generic component, pattern, and quality-attribute
pages, plus reviewed pages for the projects used in the full question bank.
It still does not contain reviewed pages for every raw AOSA source or every
specialized architecture topic. The answer should name those gaps instead of
inventing reviewed coverage.

Result:

Show Q22 from `evaluation/evaluation-results.md`.

## Act 5: Run Structural Validation

Action:

```bash
node scripts/validate-wiki.mjs
```

Narration:

The validation script checks relative links, reviewed-page frontmatter, index
coverage, source URLs, and local absolute file URI portability.

## Act 6: Run Full Question-Bank Retrieval Validation

Action:

```bash
node scripts/check-questions.mjs
```

Narration:

This checks all 24 provided testing questions against the real QMD
`architecture-wiki` collection, with raw-source fallback only where the question
is explicitly about coverage gaps.
