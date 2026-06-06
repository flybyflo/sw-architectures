# QMD Retrieval Workflow

The Architecture Wiki uses real QMD retrieval. Reviewed wiki pages are preferred
because they are shorter, linked, and manually structured for answer generation.

## Installation

Install QMD:

```bash
npm install -g @tobilu/qmd
```

Verify:

```bash
qmd --version
```

## Collection Setup

The repository includes `qmd.yml` for the two collection names used here.

```bash
qmd collection add ./wiki --name architecture-wiki
qmd collection add ./raw_sources --name raw-sources
qmd context add qmd://architecture-wiki "Reviewed Architecture Wiki pages: projects, ADRs, components, patterns, quality attributes."
qmd context add qmd://raw-sources "Raw AOSA and optional source notes used only for verification fallback."
qmd embed
```

## Search Examples

Reviewed wiki only:

```bash
qmd search "cache-aside" -c architecture-wiki
qmd search "event loop" -c architecture-wiki
qmd query $'lex: api gateway rate limiting\nvec: api gateway policy routing' -c architecture-wiki --no-rerank
```

Raw-source fallback:

```bash
qmd search "Bash parser redirections" -c raw-sources
```

## Answer Flow

1. Read `wiki/index.md`.
2. Open the most relevant reviewed pages.
3. Use QMD when semantic or multi-file context is needed.
4. Use raw source notes only to verify or fill missing reviewed coverage.
5. Cite exact file paths in the final answer.

## Full Question-Bank Check

Run all 24 provided testing questions against the configured QMD collections:

```bash
node scripts/check-questions.mjs
```

The script uses typed `lex` and `vec` queries with `--no-rerank` so it exercises
real indexed retrieval without invoking reranker or query-expansion downloads.
