# AI Engineering Curriculum: Editorial Publications

An editorial publication and reference architecture designed for deep, distraction-free technical reading across core Machine Learning and modern Generative AI engineering.

## Architecture & Design Principles

- **Pure Vanilla CSS (`styles.css`)**: Built with custom properties (`:root`), modular layout tokens, responsive typography, and Apple-inspired restraint. No external UI frameworks or heavy runtimes.
- **Strictly Static Reading Experience**: Non-interactive, publication-grade reading flow.
- **Zero Emojis**: Replaced with clean typographic hierarchy, metadata pills, and structured comparison tables.
- **Mathematical Typography**: Formulated with KaTeX for publication-quality rendering of equations.
- **Integrated High-Precision Vector Diagrams**: Crisp, scalable inline SVGs for algorithmic mechanics and protocol handshakes.

---

## Curriculum Pillars & Files

### Pillar 1: Machine Learning Foundations
- **Web Article**: [`index.html`](file:///Users/satyamrana/Desktop/Projects/AI/index.html)
- **Markdown Notes**: [`ML_NOTES.md`](file:///Users/satyamrana/Desktop/Projects/AI/ML_NOTES.md)
- **Topics**: Linear Regression, K-Nearest Neighbors, Support Vector Machines, Logistic Regression, Decision Trees, and Random Forests. Includes 7 bespoke vector diagrams and complete mathematical formulations.

### Pillar 2: LLMs, LangChain, Tool Calling & MCP
- **Web Article**: [`genai.html`](file:///Users/satyamrana/Desktop/Projects/AI/genai.html)
- **Markdown Notes**: [`GENAI_NOTES.md`](file:///Users/satyamrana/Desktop/Projects/AI/GENAI_NOTES.md)
- **Topics**: 
  - **LLM Autoregressive Generation**: Temperature, Top-$P$, logit scaling, and sampling loops.
  - **Direct SDK API Invocations**: Google Gemini (`google-genai`) and Groq (`groq`) with streaming and system instructions.
  - **Role Assignment & Chat State**: `system`, `user`, and `assistant` role lifecycle, token budgeting, and sliding window pruning.
  - **LangChain & LCEL**: Runnables, pipe operator composition (`prompt | model | parser`), and structured Pydantic outputs.
  - **Tool Calling (Function Calling)**: The 4-step protocol handshake between model and client execution environments.
  - **Model Context Protocol (MCP)**: Host/Client/Server triad, JSON-RPC 2.0 communication over Stdio/SSE, building FastMCP servers and client agents in Python.

---

## Viewing in Browser

You can open either [`index.html`](file:///Users/satyamrana/Desktop/Projects/AI/index.html) or [`genai.html`](file:///Users/satyamrana/Desktop/Projects/AI/genai.html) directly in any modern browser:

```bash
# Direct launch on macOS:
open index.html
open genai.html

# Or serve locally:
python3 -m http.server 8000
# Then visit: http://localhost:8000
```
