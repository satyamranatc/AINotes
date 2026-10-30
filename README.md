# AI Engineering Curriculum

A clear, visual, step-by-step learning resource covering Machine Learning, Deep Learning & FNNs, NLP, OpenCV & Computer Vision, Generative AI (`[LLM, Vector Storage, RAG, Agents, MCP]`), and Frontier Research (`JEPA, Mamba, Sparse MoE, Test-Time Compute`).

Every page follows **[`WRITING_RULES.md`](WRITING_RULES.md)**: plain-English one-liner first, real-life analogy, numbered steps, custom inline SVG diagrams, math explained in words with worked numbers, syntax-highlighted runnable code, and a quick cheat sheet.

---

## Curriculum Modules (7 Interactive Web Guides)

| Module | File | Topics Covered |
|---|---|---|
| **1. Machine Learning** | [`index.html`](index.html) | Regression vs. Classification, Linear Regression, KNN, SVM, Logistic Regression, Decision Trees, Random Forest, Gradient Descent, Feature Scaling & Bias-Variance |
| **2. Deep Learning & FNN** | [`dl.html`](dl.html) | Perceptrons, Feedforward Neural Networks (FNN / MLP), Activation Functions (ReLU, GELU, Sigmoid, Softmax), Backpropagation Chain Rule, Adam, Dropout & PyTorch loop |
| **3. Natural Language Processing** | [`nlp.html`](nlp.html) | Subword Tokenization (BPE), Bag-of-Words & TF-IDF, Dense Embeddings & Cosine Similarity, Scaled Dot-Product Self-Attention ($Q, K, V$) & Transformers |
| **4. OpenCV & Computer Vision** | [`cv.html`](cv.html) | Image Tensors `(H, W, C)` & Color Spaces (BGR/RGB/HSV), 2D Convolution Kernels, Gaussian Blur, Canny Edge Detection, Contours, CNNs & Vision Transformers (ViT) |
| **5. GenAI Part 1: LLMs & RAG** | [`genai.html`](genai.html) | **[LLM]** Autoregressive decoding, Temperature/Top-P, Gemini & Groq APIs, Roles & Sliding Window Memory; **[Vector Storage]** HNSW & ChromaDB; **[RAG]** Two-phase grounded generation |
| **6. GenAI Part 2: Agents & MCP** | [`agents.html`](agents.html) | **[LCEL]** `prompt \| model \| parser` & Pydantic schemas; **[Tool Calling]** 4-step handshake; **[Agents]** ReAct loop (`Thought -> Action -> Observation`); **[MCP]** Host/Client/Server & FastMCP |
| **7. Frontier Research & JEPA** | [`research.html`](research.html) | **JEPA** (Joint-Embedding Predictive Architecture: I-JEPA & V-JEPA World Models), **Mamba** (Selective State Space Models), **Sparse Mixture of Experts (MoE)**, **Test-Time Compute** & Flow Matching |

### Companion Markdown Notes & Style Guide
- **[`WRITING_RULES.md`](WRITING_RULES.md)**: The 10 Golden Rules, component library, diagram standards, and pre-publish checklist.
- **[`ML_NOTES.md`](ML_NOTES.md)**: Markdown summary of Classical Machine Learning.
- **[`GENAI_NOTES.md`](GENAI_NOTES.md)**: Markdown summary of `[LLM, Vector Storage, RAG, Agents, MCP]`.

---

## Viewing Locally

```bash
# Open directly in macOS browser:
open index.html

# Or run a local HTTP server:
python3 -m http.server 8000
# Visit http://localhost:8000
```
