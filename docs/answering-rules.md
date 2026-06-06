# Agent Answering Rules and Constraints

This document defines how the LLM agent must process and structure answers
extracted from the Architecture Wiki.

## Constraints and Factuality

- **Zero hallucination:** Answer architecture questions using retrieved wiki
  pages or raw source notes. Do not add outside assumptions for specific project
  claims.
- **Reviewed-first retrieval:** Prefer `wiki/` pages. Use `raw_sources/` only
  for verification or missing reviewed coverage.
- **Insufficient context:** If the wiki and raw source notes do not contain
  enough facts to answer the prompt completely, state: "The wiki does not
  contain enough information to answer this question."
- **Granular citations:** Every architectural decision, structural description,
  and project-specific claim must be traceable to an exact file path.

## Expected Answer Structure

All agent outputs must follow this text layout:

```text
Question:
[The user's query]

Pages consulted:
- [List of all Markdown paths checked during index/search/qmd retrieval]

Answer:
[The readable architectural synthesis]

Sources used:
- [List of exact Markdown paths that directly supported the claims]
```
