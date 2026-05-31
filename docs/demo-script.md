# Architecture Wiki Demo Script

This script provides a step-by-step walkthrough to demonstrate the Architecture Wiki retrieval workflow, answer generation, and evaluation system.

---

## 🎭 Roles
- **Presenter**: Developer or LLM Agent representing the maintainer organization.
- **Audience**: Engineering managers, senior architects, or developers evaluating the knowledge base.

---

## 🎬 Act 1: The Retrieval Workflow (Step-by-Step)

### Step 1: Navigating through the Reviewed Wiki Index
* **Action**: Open [wiki/index.md](../wiki/index.md) in your editor.
* **Narrator Says**:
  > "Instead of feeding arbitrary chunks of text to an LLM, our system is designed to navigate the Architecture Wiki structurally. We start with `wiki/index.md` as our primary directory. This page lists all reviewed projects, ADRs, components, patterns, and quality attributes."

### Step 2: Answering a Project-Specific Question (Q01 - nginx)
* **Action**: Ask the agent or simulate a query using `grep` to locate nginx workers:
  ```bash
  grep -rnw "./wiki" -e "worker"
  ```
* **Narrator Says**:
  > "Let's locate where nginx worker details reside. The index immediately points us to `wiki/projects/nginx.md` and `wiki/adrs/nginx-adr-001-event-driven-worker-model.md`. The LLM reads these files and synthesizes the answer, strictly citing its sources."
* **Result**: Show the generated answer in the console or display Q01 from [evaluation/evaluation-results.md#q01-nginx-component-architecture--process-interaction](../evaluation/evaluation-results.md):
  ```text
  Pages consulted:
  - wiki/index.md
  - wiki/projects/nginx.md
  ...
  Sources used:
  - wiki/projects/nginx.md
  - wiki/components/event-loop.md
  - wiki/adrs/nginx-adr-001-event-driven-worker-model.md
  ```

---

## 🎬 Act 2: Handling General System Design & Falling Back (Act 2)

### Step 1: Querying a Distributed System Topic (Q11 - Caching)
* **Action**: Query the system about caching strategies. Since `wiki/index.md` does not list a reviewed caching pattern, trigger `qmd` / keyword search:
  ```bash
  grep -rnw "./raw_sources" -e "cache-aside"
  ```
* **Narrator Says**:
  > "What happens if we ask a general system-design question like, 'How do caching strategies impact consistency?' The primary index does not list a reviewed page for this. The agent automatically falls back to raw extra sources, finding `raw_sources/extra_sources/bytebytego-caching-strategies.md` via `qmd` (grep) search, and generates a factual response."
* **Result**: Display Q11 from [evaluation/evaluation-results.md](../evaluation/evaluation-results.md) highlighting the fallback citations in `Sources used`.

---

## 🎬 Act 3: Assessing Blank Space & Honesty (Act 3)

### Step 1: Querying the Gaps (Q22 - Coverage Gaps)
* **Action**: Run the gap assessment query:
  ```bash
  grep -rnw "./wiki/components" -e ".gitkeep"
  ```
* **Narrator Says**:
  > "RAG systems often hallucinate answers when they lack information. Watch what happens when we ask our agent: 'Which concepts are currently unanswerable due to empty components folders?' Instead of making up definitions, the agent reads the directory and honestly reports that no reviewed pages exist for modern microservice components, pointing out exactly where the roadmap needs additions."
* **Result**: Display the answer to Q22.

---

## 🎬 Act 4: Reviewing the Roadmaps and Logs

### Step 1: Inspecting the Roadmaps
* **Action**: Open [evaluation/wiki-fixes-from-evaluation.md](../evaluation/wiki-fixes-from-evaluation.md) and [wiki/log.md](../wiki/log.md).
* **Narrator Says**:
  > "Evaluation is not just a passive check; it actively drives the growth of our knowledge base. The gaps we identified in the evaluation have been logged in `wiki-fixes-from-evaluation.md`, setting a clear roadmap for creating reviewed pages on API Gateways, Sharding, and Messaging Topologies. Every evaluation pass is permanently logged in the append-only `wiki/log.md`."

---

## 🏁 Conclusion
* **Narrator Says**:
  > "This demo shows that by separating raw sources from reviewed pages, enforcing index-first retrieval, and writing strict agent guidelines, we create a deterministic software architecture wiki. It ensures zero hallucinations, complete verification capability, and an actionable path for continuous documentation growth."
