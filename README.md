# Architecture Wiki

This repository contains a Markdown-based software architecture knowledge base
for answering general, project-specific, and comparative questions about
software architecture.

The implementation follows a three-layer LLM Wiki structure:

1. **Raw Source Layer (`raw_sources/`)**: AOSA chapter notes and optional
   high-quality external source notes.
2. **Reviewed Wiki Layer (`wiki/`)**: Synthesized project pages, ADRs,
   components, patterns, and quality attribute pages.
3. **Retrieval and Evaluation Layer (`qmd.yml`, `scripts/`, `docs/`,
   `questions/`, `evaluation/`)**: QMD retrieval configuration, structural
   validation, answer rules, question sets, generated answers, and manual
   validation evidence.

## Repository Structure

```text
.
├── AGENTS.md
├── README.md
├── qmd.yml
├── raw_sources/
│   ├── aosa/
│   └── extra_sources/
├── wiki/
│   ├── index.md
│   ├── log.md
│   ├── projects/
│   ├── adrs/
│   ├── components/
│   ├── patterns/
│   ├── quality-attributes/
│   └── templates/
├── scripts/
│   ├── check-questions.mjs
│   └── validate-wiki.mjs
├── questions/
├── evaluation/
├── example_answers/
└── docs/
```

## Reviewed Wiki Coverage

The reviewed layer currently covers nine AOSA projects:

- nginx
- Git
- Mercurial
- MediaWiki
- Moodle
- Hadoop HDFS
- LLVM
- Eclipse
- Jitsi

It also includes reviewed generic architecture pages synthesized from optional
extra sources:

- Components: API Gateway, Message Broker
- Patterns: API Gateway Topology Tradeoffs, Asynchronous Messaging, Caching
  Strategies, Database Sharding, Distributed Reliability, Event Sourcing, Load
  Balancing, Plugin Architecture, plus core AOSA-derived patterns
- Quality attributes: Availability, Consistency, Modifiability, Performance,
  Reliability, Scalability, Security

The remaining AOSA notes are available in `raw_sources/aosa/` as source-backed
inputs for future reviewed pages.

## Retrieval Workflow

Start with the reviewed index:

```bash
sed -n '1,180p' wiki/index.md
```

Install QMD if needed:

```bash
npm install -g @tobilu/qmd
```

Register the wiki and raw-source collections:

```bash
qmd collection add ./wiki --name architecture-wiki
qmd collection add ./raw_sources --name raw-sources
qmd context add qmd://architecture-wiki "Reviewed Architecture Wiki pages: projects, ADRs, components, patterns, quality attributes."
qmd context add qmd://raw-sources "Raw AOSA and optional source notes used only for verification fallback."
qmd embed
```

Use QMD for retrieval:

```bash
qmd search "cache-aside" -c architecture-wiki
qmd search "event loop" -c architecture-wiki
qmd query $'lex: api gateway rate limiting\nvec: api gateway policy routing' -c architecture-wiki --no-rerank
```

## Validation Workflow

Run the structural validation:

```bash
node scripts/validate-wiki.mjs
```

The validator checks:

- relative Markdown links
- frontmatter on reviewed wiki pages
- `wiki/index.md` coverage for reviewed pages
- source URLs in raw source notes
- portability issues such as absolute local file URI links

Run the full provided question-bank retrieval check:

```bash
node scripts/check-questions.mjs
```

That check validates Q01-Q24 against the real QMD `architecture-wiki`
collection and uses `raw-sources` only for explicit fallback coverage checks.

## Answering Workflow

For chatbot-style answers:

1. Read `wiki/index.md`.
2. Prefer reviewed `wiki/` pages.
3. Use `qmd search` or typed `qmd query` when the index is not enough.
4. Fall back to `raw_sources/` only for verification or missing reviewed
   coverage.
5. Follow `docs/answering-rules.md` and cite exact Markdown file paths.

## Evaluation Evidence

- Design rationale: `docs/wiki-design-decisions.md`
- Final report: `docs/final-report.md`
- Demo script: `docs/demo-script.md`
- Question bank: `questions/typical-architecture-questions.md`
- Evaluation questions: `evaluation/evaluation-questions.md`
- Generated answers: `evaluation/evaluation-results.md`
- Manual validation: `evaluation/manual-validation.md`
- Gap and fix log: `evaluation/wiki-fixes-from-evaluation.md`
