```markdown
# Agent Tools and Retrieval Rules

The LLM/agent must follow these rules to efficiently search the persistent Architecture Wiki.

## Retrieval Rules

1. Read `wiki/index.md` first.
2. Use `qmd` if the index does not clearly identify the relevant pages.
3. Prefer `wiki/` pages for answering.
4. Use `raw_sources/` only for checking missing or uncertain claims.
5. Return source page paths with every answer.
