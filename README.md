# AI Engineering Curriculum

A free, simple and fast way to learn core Machine Learning and modern Generative AI engineering. Each topic is explained in plain language first, with a diagram, a worked example and a recap. The math and deeper theory come after that.

## Pages

| # | Page | Topics | Notes (Markdown) |
|---|---|---|---|
| 1 | [`index.html`](index.html): Machine Learning Models | Linear Regression, KNN, SVM, Logistic Regression, Decision Trees, Random Forest, metrics, model selection, core concepts | [`ML_NOTES.md`](ML_NOTES.md) |
| 2 | [`genai.html`](genai.html): LLMs, LangChain & MCP | Tokens & sampling, Gemini/Groq APIs, roles & chat history, LangChain LCEL, tool calling, Model Context Protocol | [`GENAI_NOTES.md`](GENAI_NOTES.md) |

## How every topic is structured

`In one line` → `Analogy` → `How it works (steps)` → `Diagram` → `Key terms` → `Math in words + worked example` → `Code` → `When to use / avoid` → `Common mistakes` → `Recap`

The full writing and design rules are in **[`WRITING_RULES.md`](WRITING_RULES.md)**. Read it before you add or edit content.

## Features

- **Plain vanilla stack:** `styles.css` + `script.js`. No frameworks and no build step.
- **Easy navigation:** a roadmap at the top of each page, a sticky sidebar that highlights where you are, a "Contents" sheet on mobile, linkable headings, and prev/next page links.
- **Readable code:** zero-dependency syntax highlighting ("Calm Night" theme), line numbers and one-click copy.
- **Math:** KaTeX rendering. Heavy derivations sit inside collapsible "Deep dive" panels.
- **Diagrams:** hand-drawn inline SVG for every topic.
- **Print-friendly:** navigation is hidden and deep dives expand when you print.

## View locally

```bash
open index.html            # macOS
# or
python3 -m http.server 8000   # then visit http://localhost:8000
```
