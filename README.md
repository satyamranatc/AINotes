# AI Playbook (2026–2027) — From Zero to AI Engineer

A reading-first learning platform combining a well-written technical blog, a beginner-friendly textbook, and an engineering handbook. Progress step-by-step from zero knowledge to building, evaluating, and deploying production AI systems.

---

## 🗺️ The 5-Stage Learner Journey

1. **Stage 1 — Understand AI**: What AI is, its capabilities & limits, tokens, context windows, and math intuition without gatekeeping.
2. **Stage 2 — Learn from Data**: Python essentials, exploratory data analysis, data cleaning, and classical machine learning.
3. **Stage 3 — Understand Intelligent Models**: Neural networks, backpropagation step-by-step, vision, and language transformers.
4. **Stage 4 — Build AI Applications**: Generative AI, multimodal prompting, RAG pipelines, autonomous agents, and MCP servers.
5. **Stage 5 — Ship Reliable AI**: Rigorous evaluation datasets, LLM-as-judge, security against prompt injection, latency/cost monitoring, and deployment.

---

## 🏛️ The 10 Learning Pillars

| Pillar | Focus | Status | Core Topics |
| :--- | :--- | :--- | :--- |
| **01: AI Foundations** | Stage 1 | Planned | Models vs algorithms vs parameters, tokens, what AI can/cannot do |
| **02: Python, Math & Data** | Stage 1 | Planned | NumPy vectorization, Pandas cleaning, vectors, gradient intuition |
| **03: Data Science** | Stage 2 | Planned | Data lifecycle, EDA, hypothesis testing, SQL, data leakage |
| **04: Machine Learning** | Stage 2 | **Live Guide** | Supervised, Unsupervised, RL, Self-Sup, Regression, Classification, Traps |
| **05: Deep Learning & Nets** | Stage 3 | Planned | Artificial neurons, backprop step-by-step, activations, CNNs |
| **06: NLP & Language Models** | Stage 3 | Planned | Tokenization, embeddings, self-attention, transformers, LLM training |
| **07: Generative & Multimodal**| Stage 4 | Planned | Diffusion, multimodal, local inference (GGUF), MCP tools |
| **08: RAG, Agents & Automation**| Stage 4 | Planned | Vector search, reranking, tool calling, agent memory, loops, guardrails |
| **09: AI Engineering & Eval** | Stage 5 | Planned | Serving with FastAPI, evaluation datasets, latency & cost tracing |
| **10: AI Security & Ethics** | Stage 5 | Planned | Prompt injection, least-privilege tools, red-teaming, governance |

---

## 📖 The 10-Step Pedagogy Structure

Every article in the AI Playbook follows a consistent 10-step sequence to guarantee conceptual clarity before formulaic depth:

1. **01 The Question** — What problem are we trying to solve?
2. **02 The Real-Life Example** — An everyday analogy (e.g. child learning cat pictures)
3. **03 The Visual Explanation** — Clean, interactive paradigm architecture explorer
4. **04 The Concept in Plain English** — Features, labels, predictions, dials
5. **05 The Mathematics (Decoded)** — Formula with every symbol explained underneath
6. **06 The Runnable Python Code** — Clean, tested Python with terminal output
7. **07 Common Mistakes & Traps** — Overfitting, data leakage, accuracy illusions
8. **08 Test Your Understanding** — Interactive 3-question quiz with instant answers
9. **09 Try It Yourself** — Hands-on mini-challenge
10. **10 Continue Learning** — Direct link to the next milestone

---

## 🎨 Design System

- **Default Theme**: Soft White (`#F7F9FC` background, `#FFFFFF` surface, `#172033` crisp high-contrast body text, `#1C9995` soothing teal accents).
- **Optional Dark Mode**: Seamless toggle (`#05060A` background, `#0C0E15` surface, `#2DD4BF` teal).
- **Typography**: 17.5px body, 1.72 line-height, 68–75ch optimal paragraph width for relaxed, book-like reading sessions.
- **Reading Levels**: Beginner, Intermediate, and Advanced view toggles.

---

## 🚀 Quick Start

Open the files directly in any web browser, or run a local server:

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

- `index.html` — The main portal featuring the 5 stages and 10 pillars.
- `ml.html` — The live flagship Machine Learning guide with interactive diagrams and quizzes.
- `ML_NOTES.md` — Offline markdown study guide.
