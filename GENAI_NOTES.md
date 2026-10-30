# Generative AI Engineering Notes: [LLM, Vector Storage, RAG, Agents, MCP]

A fast, plain-English reference covering all five pillars of modern Generative AI engineering, plus frontier architectures (JEPA, Mamba, Sparse MoE).

- **Web Module 5 (Part 1):** [`genai.html`](genai.html) — **LLMs, Vector Storage & RAG**
- **Web Module 6 (Part 2):** [`agents.html`](agents.html) — **LangChain LCEL, Tool Calling, Autonomous Agents & MCP**
- **Web Module 7 (Frontier):** [`research.html`](research.html) — **JEPA (I-JEPA / V-JEPA), Mamba SSMs, Mixture of Experts & Test-Time Compute**

---

## Pillar 1: Large Language Models (LLMs)

**In one line:** An LLM predicts one sub-word token at a time by computing logits $\mathbf{z}_t$, scaling by Temperature $T$, applying Softmax, sampling a token, and appending it back to the input sequence.

$$P(w_t \mid w_{1:t-1}) = \operatorname{softmax}\left(\frac{\mathbf{z}_t}{T}\right)$$

- **Temperature ($T$):** $T = 0.0$ picks the single highest-probability token (best for code, SQL, extraction). $T \in [0.6, 0.9]$ flattens probabilities for creative writing.
- **Statelessness & Roles:** LLMs have zero built-in memory across API calls. Keep `messages[0]` (`role: "system"`) pinned and slide a window over the most recent `user` and `assistant` turns.

---

## Pillar 2: Vector Storage

**In one line:** Vector Databases (ChromaDB, FAISS, pgvector) store text chunks alongside their dense embedding vectors so you can retrieve the Top-$K$ most semantically similar passages in milliseconds.

- **Similarity Metric:** Cosine Similarity $\cos(\theta) = \frac{\mathbf{a}\cdot\mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$.
- **Index Structure:** **HNSW (Hierarchical Navigable Small World)** builds a multi-layer proximity graph for $O(\log N)$ approximate nearest-neighbor lookup.

---

## Pillar 3: Retrieval-Augmented Generation (RAG)

**In one line:** RAG eliminates hallucinations on private or dynamic data by retrieving the Top-$K$ relevant chunks from Vector Storage and injecting them into the LLM's prompt before generation.

1. **Offline Indexing:** Load docs $\to$ Split into 300–500 token chunks $\to$ Embed $\to$ Upsert into Vector Storage.
2. **Online Retrieval + Generation:** Embed user query $\to$ Query Vector Storage for Top-$K$ chunks $\to$ Construct grounded prompt (`Context + Question`) $\to$ Call LLM at $T = 0$.

---

## Pillar 4: Tool Calling & Autonomous Agents

**In one line:** Tool calling is a 4-step handshake where the LLM emits structured JSON arguments and your local runtime executes the Python function; an **Autonomous Agent** wraps tool calling inside a **ReAct loop** (`Thought -> Action -> Observation`) until the goal is achieved.

1. **Step 1:** App sends user prompt + JSON schemas of available tools to the LLM.
2. **Step 2:** LLM returns `tool_calls` (function name + JSON arguments).
3. **Step 3:** App executes the local Python function and captures the return value.
4. **Step 4:** App appends a `ToolMessage` (`role="tool"`) and calls the LLM again to synthesize the final answer or take the next step.

---

## Pillar 5: Model Context Protocol (MCP)

**In one line:** MCP is a universal JSON-RPC 2.0 standard ("USB-C for AI") that connects any **MCP Host/Client** to any **MCP Server** exposing `@mcp.tool()`, `@mcp.resource()`, and `@mcp.prompt()` over `stdio` or `Streamable HTTP`.

| Component | Role |
|---|---|
| **MCP Host** | The user-facing AI app (IDE, desktop client, custom agent runtime). |
| **MCP Client** | Protocol connector inside the host that maintains a 1:1 session with a server. |
| **MCP Server** | Lightweight service (built with `FastMCP`) exposing Tools, Resources, and Prompts. |
