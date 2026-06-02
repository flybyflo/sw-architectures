# Agent Tools and Retrieval Rules

The LLM or agent must follow these rules to search the Architecture Wiki.

## Retrieval Rules

1. Read `wiki/index.md` first.
2. Prefer reviewed `wiki/` pages for answers.
3. Use `qmd search "<query>" -c architecture-wiki` when the index does not
   clearly identify the relevant reviewed pages.
4. Use typed `qmd query` with `--no-rerank` when semantic or multi-file matching
   is needed, for example
   `qmd query $'lex: api gateway\nvec: client service topology' -c architecture-wiki --no-rerank`.
5. Use `raw_sources/` only for checking missing or uncertain claims.
6. Return source page paths with every answer.

## Validation Rule

Before final submission or after adding wiki pages, run:

```bash
node scripts/validate-wiki.mjs
```

For retrieval coverage of the full provided question bank, run:

```bash
node scripts/check-questions.mjs
```
