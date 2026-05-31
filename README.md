# Architecture Wiki

This repository contains a Markdown-based software architecture knowledge base. The goal is to collect architecture information from raw AOSA and distributed systems source materials, transform them into a highly-linked, reviewed wiki layer, and use the knowledge base to answer project-specific, comparative, and general architecture questions.

The project implements a three-layer LLM Wiki architecture:
1. **Raw Source Layer (`raw_sources/`)**: Contains immutable book chapters (`aosa/`) and modern system design articles (`extra_sources/`).
2. **Reviewed Wiki Layer (`wiki/`)**: Contains high-fidelity project syntheses, MADR-style architecture decisions, components, patterns, and quality attribute comparisons.
3. **Retrieval and Evaluation Layer (`docs/`, `evaluation/`)**: Contains strict LLM/agent formatting rules, manual validation reports, a question bank, and execution workflow guides.

---

## 📂 Repository Structure

```text
.
├── AGENTS.md               # Architecture Wiki maintainer rules & workflow instructions
├── README.md               # Project guide and setup instructions
├── requirements.txt        # Python dependency placeholder file
├── qmd.yml                 # QMD CLI config for indexing wiki & raw collections
├── raw_sources/            # Raw, immutable source notes
│   ├── aosa/               # Summarized chapters from the Architecture of Open Source Applications
│   └── extra_sources/      # Modern distributed systems system-design notes (e.g., ByteByteGo)
├── wiki/                   # Reviewed, synthesized wiki layer
│   ├── index.md            # Primary directory index (retrieval entry point)
│   ├── log.md              # Append-only maintainer change log
│   ├── projects/           # Project synthesis pages (nginx, Git, MediaWiki, HDFS, LLVM)
│   ├── adrs/               # Architecture Decision Records (MADR format)
│   ├── components/         # Modular building block pages (e.g., NameNode, Event Loop)
│   ├── patterns/           # Reusable architectural patterns (e.g., Client-Server)
│   ├── quality-attributes/ # Comparative quality attribute pages (e.g., Performance)
│   └── templates/          # Standard page skeletons for wiki maintenance
├── questions/              # Selected software architecture question bank
├── evaluation/             # Manual evaluation files
│   ├── evaluation-questions.md     # The selected set of 18 evaluation questions
│   ├── evaluation-results.md       # Generated answers following strict layout rules
│   ├── manual-validation.md        # Correctness/Completeness scores and audit notes
│   └── wiki-fixes-from-evaluation.md # Roadmap for expanding wiki patterns and components
└── docs/                   # Supporting documentation
    ├── agent-tools.md              # LLM tool guidelines and retrieval constraints
    ├── answering-rules.md          # Mandatory LLM answer structure instructions
    ├── query-workflow.md           # Setup details for QMD retrieval CLI
    ├── wiki-design-decisions.md    # Design decisions behind the wiki's organization
    ├── final-report.md             # Project's final comprehensive report
    └── demo-script.md              # Scenario script for system demonstration
```

---

## ⚙️ Setup & QMD Retrieval

### 1. Basic Setup
This project uses pure Markdown files for its knowledge representation, meaning it has no required runtime database dependencies for standard usage.
```bash
git clone <repo-url>
cd sw-architectures
```

### 2. QMD Retrieval Setup
The retrieval engine over the wiki is configured using `qmd.yml`. To register the collections and contexts, you can run the following CLI commands (refer to [docs/query-workflow.md](docs/query-workflow.md) for more details):
```bash
# Register reviewed wiki collection
qmd collection add ./wiki --name architecture-wiki
qmd context add qmd://architecture-wiki "Reviewed Architecture Wiki pages: projects, ADRs, components, patterns, quality attributes."

# Register raw verification fallback collection
qmd collection add ./raw_sources --name raw-sources
qmd context add qmd://raw-sources "Raw AOSA and optional source notes used only for verification fallback."

# Compile search index embeddings
qmd embed
```

### 3. Simulating QMD Search in Shell
If `qmd` is not installed on your system, you can simulate search and keyword retrieval over the collections using high-efficiency grep commands:
```bash
# Keyword query over reviewed wiki collection
grep -rnw "./wiki" -e "event loop"

# Keyword query over raw sources fallback collection
grep -rnw "./raw_sources" -e "cache-aside"
```

---

## 📈 System Evaluation & Validation

### 1. Ingest & Answer Pipeline
To run a complete evaluation pass:
1. **Read `wiki/index.md` first**: Check if the concept is covered in the reviewed layers.
2. **Execute Retrieval**: Search using the index. If missing, use simulated `qmd` grep searches over the folders.
3. **Draft Answer**: Synthesize the answer strictly obeying the structure in [docs/answering-rules.md](docs/answering-rules.md):
   ```text
   Question:
   [User query]

   Pages consulted:
   - [List of paths checked]

   Answer:
   [Synthesis]

   Sources used:
   - [List of direct support paths]
   ```

### 2. Manual Validation Checklist
To validate generated answers:
1. **Zero Hallucination check**: Ensure the output does not bring in outside assumptions (e.g. Git packfile details not in sources).
2. **Path Citation verify**: Every claim must link directly to an exact supporting file path under `wiki/` or `raw_sources/`.
3. **Honesty under Blank Space**: For unpopulated areas (e.g. Q22), verify that the agent correctly states the info is missing rather than inventing facts.
4. **Scoring**: Grade correctness (1-5) and completeness (1-5) in the validation log.

---

## 🔗 Documentation Links

- **Final Comprehensive Report**: [docs/final-report.md](docs/final-report.md)
- **Demo Script**: [docs/demo-script.md](docs/demo-script.md)
- **Design Rationale**: [docs/wiki-design-decisions.md](docs/wiki-design-decisions.md)
- **Evaluation Questions**: [evaluation/evaluation-questions.md](evaluation/evaluation-questions.md)
- **Generated Answers**: [evaluation/evaluation-results.md](evaluation/evaluation-results.md)
- **Scoring & Auditing Report**: [evaluation/manual-validation.md](evaluation/manual-validation.md)
- **Roadmap & Gaps Analysis**: [evaluation/wiki-fixes-from-evaluation.md](evaluation/wiki-fixes-from-evaluation.md)
