# QMD Retrieval Workflow

## Setup Instructions and Indexing
To configure the retrieval system over the Architecture Wiki, run the following commands to add the collections and their contexts:

```bash
# 1. Add collections
qmd collection add ./wiki --name architecture-wiki
qmd collection add ./raw_sources --name raw-sources

# 2. Add contexts
qmd context add qmd://architecture-wiki "Reviewed Architecture Wiki pages: projects, ADRs, components, patterns, quality attributes."
qmd context add qmd://raw-sources "Raw AOSA and optional source notes used only for verification fallback."

# 3. Generate embeddings (if required for semantic search)
qmd embed
