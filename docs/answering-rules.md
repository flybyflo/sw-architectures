# Agent Answering Rules & Constraints

This document defines how the LLM agent must process and structure answers extracted from the Architecture Wiki.

## Constraints & Factuality
* **Zero Hallucination:** The agent must answer architecture questions using *only* retrieved wiki pages or raw sources where possible. Do not bring outside training data assumptions for specific project claims.
* **Insufficient Context:** If the wiki or raw sources do not contain enough facts to answer the prompt completely, the agent must explicitly state: `"The wiki does not contain enough information to answer this question."`
* **Granular Citations:** Every claim, architectural decision, or structural description must be accompanied by its file path reference.

## Expected Answer Structure
All agent outputs must strictly follow this text layout:

```text
Question:
[The user's query]

Pages consulted:
- [List of all markdown paths checked during index/qmd retrieval]

Answer:
[The readable architectural synthesis]

Sources used:
- [List of exact markdown paths that directly supported the claims]
