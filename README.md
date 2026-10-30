# AI Engineering Curriculum

A clear, visual, step-by-step learning resource covering the History, Legends, Ethics & Metaphysics of AI, Machine Learning, Deep Learning & FNNs, NLP, OpenCV & Computer Vision, Generative AI (`[LLM, Vector Storage, RAG, Agents, MCP]`), Frontier Research (`JEPA, Mamba, Sparse MoE, Test-Time Compute`), and the **Top 100 Data Science, ML & GenAI Interview Questions (2026 Edition)**.

Every page follows **[`WRITING_RULES.md`](WRITING_RULES.md)**: plain-English one-liner first, real-life analogy, numbered steps, custom inline SVG diagrams, math explained in words with worked numbers, syntax-highlighted runnable code, and a quick cheat sheet.

---

## Curriculum Modules (Landing Page + 10 Interactive Web Guides)

| Module | File | Topics Covered |
|---|---|---|
| **Flagship Landing Page** | [`index.html`](index.html) | Awwwards-inspired interactive hero with live Latent Manifold canvas, Story & Philosophy monograph portal leading to `story.html`, and 10-Module Architectural Bento Grid |
| **0. Story, Legends & Philosophy of AI** | [`story.html`](story.html) | AI in the Modern Era (Software 1.0 → 2.0 → 3.0), 5-Act History of AI (1950–2026), **Portrait Gallery & Gratitude to the Legends of AI** (Turing, Shannon, McCarthy, Hinton, Bengio, LeCun, Fei-Fei Li, Vaswani), **AI Ethics**, **Human Psychology**, and **Metaphysics** (Chinese Room, Plato's Cave & Embeddings, Qualia & Teleology) |
| **Data Science Toolkit** | [`ds.html`](ds.html) | **[NumPy]** Vectorization, `axis=0` vs `axis=1`, `reshape(-1, 1)` & Broadcasting; **[Pandas for ML]** `loc` vs `iloc`, missing-value imputation without leakage, IQR outlier clipping, `groupby`, `merge`, dates & One-Hot encoding; **[Matplotlib]** `fig, ax = plt.subplots()` & 4 ML diagnostic plots; **[Streamlit]** Interactive ML web apps & `@st.cache_resource` |
| **1. Machine Learning** | [`ml.html`](ml.html) | Regression vs. Classification, Linear Regression, KNN, SVM, Logistic Regression, Decision Trees, Random Forest, Gradient Descent, Feature Scaling & Bias-Variance |
| **2. Deep Learning: FNN, CNN & TensorFlow** | [`dl.html`](dl.html) | Perceptrons, Feedforward Neural Networks (FNN / MLP), Activation Functions, Backpropagation Chain Rule, **Convolutional Neural Networks (CNN) Step-by-Step**, **TensorFlow & `tf.keras` Explained**, and building both **FNN & CNN in TensorFlow** + PyTorch |
| **3. Natural Language Processing** | [`nlp.html`](nlp.html) | Subword Tokenization (BPE), Bag-of-Words & TF-IDF, Dense Embeddings & Cosine Similarity, Scaled Dot-Product Self-Attention ($Q, K, V$) & Transformers |
| **4. OpenCV & Computer Vision** | [`cv.html`](cv.html) | Image Tensors `(H, W, C)` & Color Spaces (BGR/RGB/HSV), 2D Convolution Kernels, Gaussian Blur, Canny Edge Detection, Contours, CNNs & Vision Transformers (ViT) |
| **5. GenAI Part 1: LLMs & RAG** | [`genai.html`](genai.html) | **[LLM]** Autoregressive decoding, Temperature/Top-P, Gemini & Groq APIs, Roles & Sliding Window Memory; **[Vector Storage]** HNSW & ChromaDB; **[RAG]** Two-phase grounded generation |
| **6. GenAI Part 2: Agents & MCP** | [`agents.html`](agents.html) | **[LCEL]** `prompt \| model \| parser` & Pydantic schemas; **[Tool Calling]** 4-step handshake; **[Agents]** ReAct loop (`Thought -> Action -> Observation`); **[MCP]** Host/Client/Server & FastMCP |
| **7. Frontier Research & JEPA** | [`research.html`](research.html) | **JEPA** (Joint-Embedding Predictive Architecture: I-JEPA & V-JEPA World Models), **Mamba** (Selective State Space Models), **Sparse Mixture of Experts (MoE)**, **Test-Time Compute** & Flow Matching |
| **8. Top 100 Interview Q&A (2026)** | [`interview.html`](interview.html) | **100 All-Time Best Interview Questions & Answers** across Classical ML, Deep Learning & NLP, OpenCV & Vision, LLMs & Transformers, RAG & Vector Databases, Agents & MCP, Frontier Research (JEPA/Mamba/MoE), and MLOps & Production (Indore IT Corridor & Global AI Hiring 2026) |

### Companion Markdown Notes & Style Guide
- **[`WRITING_RULES.md`](WRITING_RULES.md)**: The 10 Golden Rules, component library, diagram standards, and pre-publish checklist.
- **[`INTERVIEW_100.md`](INTERVIEW_100.md)**: Full Markdown reference of all 100 interview questions and answers.
- **[`ML_NOTES.md`](ML_NOTES.md)**: Markdown summary of Classical Machine Learning.
- **[`GENAI_NOTES.md`](GENAI_NOTES.md)**: Markdown summary of `[LLM, Vector Storage, RAG, Agents, MCP]`.

---

## Viewing Locally

```bash
# Open the Prologue & Story page directly in macOS browser:
open story.html

# Or run a local HTTP server:
python3 -m http.server 8000
# Visit http://localhost:8000/story.html
```
