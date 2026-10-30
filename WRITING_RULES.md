# Writing Rules — How We Write This Curriculum

> **Mission:** Be the best resource for learning AI. A reader should understand a topic **simply** and **quickly**, and still find the depth they need when they want it.

Every page, section, diagram and code sample follows these rules. If a change breaks one, fix the change, not the rule. If a rule stops working, update this file first.

---

## 0. The 10 Golden Rules (memorize these)

1. **Big picture first, details later.** Start with *what it is* and *why it matters*. Formulas and edge cases come after.
2. **One idea per paragraph.** Keep paragraphs to 2–4 sentences.
3. **Simple words win.** Write "pick", not "select optimally". Write "splits the data", not "partitions the feature space".
4. **Define every term the first time you use it.** If the reader has to Google it, we failed.
5. **Show, then tell.** Give an example or diagram *before* the abstract definition.
6. **Every formula gets a plain-English sentence** and a **worked example with real numbers**.
7. **Every topic has a diagram.** If you can draw it, draw it.
8. **Answer "when do I use this?"** Every topic ends with *When to use / When to avoid* and a *Recap*.
9. **Scannable beats clever.** Use headings, numbered steps, tables and bold key terms so a reader can skim in 30 seconds.
10. **Be correct.** Simple is never an excuse to be wrong. Check the math, the code and the diagram coordinates.

---

## 1. Who We Write For

- **Primary reader:** a motivated student or junior engineer. They know basic Python and school-level math (algebra, a bit of probability). They do **not** know ML jargon yet.
- **Secondary reader:** someone revising before an interview or exam. They need the *Recap*, the tables and the formulas fast.
- **Test:** could a smart 16-year-old follow the first two paragraphs of every section? If not, simplify.

---

## 2. Voice & Style

| Do | Don't |
|---|---|
| Talk to the reader: "you", "we" | Write in passive academic voice: "it is posited that…" |
| Short sentences (aim for under 20 words) | Sentences that need to be read twice |
| Active verbs: "the model learns", "the tree asks" | Noun piles: "parameter estimation optimization procedure" |
| Concrete examples: study hours → marks, spam emails, house prices | Abstract placeholders with no story |
| Confident and calm | Hype ("revolutionary", "ultra", "blazing") |
| Bold the **key term** once, where it is defined | Bold whole sentences |

### Jargon translation table (use the left column)

| Write this | Instead of this |
|---|---|
| splits the data into groups | partitions the feature space into hyper-rectangles |
| how wrong the model is (the **loss**) | the objective function to be minimized |
| the model's guess, $\hat{y}$ | the model's computed estimation |
| the correct answer, $y$ | the verified ground truth |
| memorizes the training data (**overfits**) | exhibits high variance on unseen distributions |
| too simple to capture the pattern (**underfits**) | excessive model stiffness |
| the probability that… | the posterior conditional probability |
| sends / returns | emits / dispatches / transmits |

Technical terms are allowed — **after** the plain version. Pattern: *plain idea first, then* "This is called **X**."

> Example: "The tree keeps asking yes/no questions until each group is mostly one class. A group that contains only one class is called **pure**."

### Formatting

- **No emojis.** Use typography, badges and callouts instead.
- **British/American spelling:** American (e.g., "optimize", "color").
- **Numbers:** digits for all measurements and math ($K = 5$, 63.2%), words for one–nine in plain prose.
- **Currency examples:** use ₹ for Indian examples consistently, or plain units.

---

## 3. The Standard Topic Template

Every major topic (an `h2` section such as "Linear Regression" or "Tool Calling") uses this order. Skip a block only if it truly does not apply.

| # | Block | Purpose | Component |
|---|---|---|---|
| 1 | Badges | Category at a glance (Regression / Classification / …) | `.section-badge-container` |
| 2 | Title | `h2` with number: "3. Support Vector Machine (SVM)" | `h2` |
| 3 | **In one line** | One sentence a reader can repeat to a friend | `.tldr` |
| 4 | Real-life analogy | Connects the idea to something familiar | `.callout.callout-analogy` |
| 5 | How it works | 3–6 numbered steps, plain words | `ol.steps` |
| 6 | Diagram | The picture that makes it click | `.figure-container` |
| 7 | Key terms | 3–6 terms the reader must know | `dl.terms` |
| 8 | The math | Formula → plain sentence → worked example | `.math-card` (+ `details.deep-dive` for heavy theory) |
| 9 | Code (if relevant) | Minimal, runnable, commented | `.code-container` |
| 10 | When to use / avoid | Decision help | `.decision-grid` |
| 11 | Common mistakes | Traps beginners fall into | `.callout.callout-warning` |
| 12 | Recap | 3–5 bullets to remember | `.recap` |

### Page-level template

1. **Header**: category, title, one-sentence subtitle, meta (level, reading time).
2. **"What you'll learn" + "Before you start"**: `.learn-grid`.
3. **Roadmap**: clickable cards for every major section: `ol.roadmap`.
4. Topics (template above).
5. Comparison tables / selection guide.
6. **Cheat sheet** (one table that summarizes the page).
7. **Prev / Next page navigation**: `nav.page-nav`.
8. Footer.

---

## 4. Component Library (copy–paste snippets)

Only use these components. Do not invent new visual patterns or add inline `style=""` attributes to content. If something new is truly needed, add it to `styles.css` **and** document it here.

### 4.1 In one line
```html
<div class="tldr">
  <span class="tldr-label">In one line</span>
  <p>KNN labels a new point by looking at its K closest neighbors and taking a vote.</p>
</div>
```

### 4.2 Callouts
```html
<div class="callout callout-analogy">
  <div class="callout-title">Think of it like this</div>
  <p>…</p>
</div>
```
| Class | Title to use | Use for |
|---|---|---|
| `callout callout-analogy` | "Think of it like this" | Real-life analogy |
| `callout callout-tip` | "Pro tip" | Practical advice |
| `callout callout-warning` | "Common mistakes" | Traps and misconceptions (prefer a `<ul>`) |
| `callout` | "Key insight" | The one idea that unlocks the topic |
| `callout callout-secondary` | "Real-world example" | Production use case |

Maximum **3 callouts per topic**. Callouts lose power when overused.

### 4.3 Numbered steps
```html
<ol class="steps">
  <li><strong>Measure distances.</strong> Find how far the new point is from every training point.</li>
  <li><strong>Pick the K closest.</strong> …</li>
</ol>
```
Each step starts with a short **bold action**, then one sentence of explanation.

### 4.4 Key terms
```html
<dl class="terms">
  <dt>Support vectors</dt><dd>The training points closest to the boundary. They alone decide where it goes.</dd>
  <dt>Margin</dt><dd>The empty gap between the boundary and the nearest points.</dd>
</dl>
```

### 4.5 Math card + deep dive
```html
<p>The model's guess is a straight line:</p>
<div class="math-card"><div class="math-display">$$\boxed{\hat{y} = mx + b}$$</div></div>
<p><strong>In words:</strong> start at <em>b</em>, then add <em>m</em> for every unit of <em>x</em>.</p>

<details class="deep-dive">
  <summary>Deep dive: why squared error? <span class="summary-hint">Optional</span></summary>
  <div class="deep-dive-body"> … proofs, derivations, advanced variants … </div>
</details>
```
Rules for math:
- Use `$$…$$` for display math and `$…$` for inline math (KaTeX).
- Use `\boxed{}` only for the **one key formula** of a block, not for every line.
- Immediately follow every formula with **"In words:"**.
- Every key formula gets a **worked example with small, round numbers**.
- Put derivations, proofs and advanced variants inside `details.deep-dive`, so the main path stays short.

### 4.6 Decision grid
```html
<div class="decision-grid">
  <div class="decision-box use"><div class="decision-box-title">When to Use</div><ul><li>…</li></ul></div>
  <div class="decision-box avoid"><div class="decision-box-title">When to Avoid</div><ul><li>…</li></ul></div>
</div>
```
3–4 bullets each; each bullet is a concrete situation, not an abstract property.

### 4.7 Recap
```html
<div class="recap">
  <div class="recap-title">Recap</div>
  <ul><li>…</li></ul>
</div>
```

### 4.8 Page intro and roadmap
```html
<div class="learn-grid">
  <div class="learn-box"><h4>What you'll learn</h4><ul><li>…</li></ul></div>
  <div class="learn-box"><h4>Before you start</h4><ul><li>…</li></ul></div>
</div>

<ol class="roadmap">
  <li><a href="#part-1-linear-regression">
    <span class="roadmap-step">Step 1</span>
    <span class="roadmap-title">Linear Regression</span>
    <span class="roadmap-desc">Predict a number with a straight line</span>
  </a></li>
</ol>
```

### 4.9 Prev / next navigation
```html
<nav class="page-nav" aria-label="Pages">
  <a class="next" href="genai.html">
    <span class="page-nav-label">Next</span>
    <span class="page-nav-title">LLMs, LangChain &amp; MCP</span>
  </a>
</nav>
```
Use `class="prev"` for the previous link (it sits on the left).

---

## 5. Code Rules

Code blocks are highlighted automatically by `script.js` (Python by default) with the **Calm Night** theme, line numbers and a Copy button.

```html
<div class="code-container">            <!-- add data-lang="bash" | "json" | "text" for non-Python -->
  <div class="code-header">
    <span class="code-filename">groq_hello.py</span>
    <span class="code-lang-tag">Python</span>
  </div>
  <pre><code>from groq import Groq
...</code></pre>
</div>
```

1. **Runnable as-is** (after installing packages and setting API keys). No pseudo-code in code blocks.
2. **Short:** aim for under 40 lines. Split bigger examples into steps.
3. **Comment the *why*, not the *what*.** Number the comments to match the steps in the text: `# 1. Create the client`.
4. **Show the install command** once per library in a `data-lang="bash"` block.
5. Use realistic but simple names (`get_weather`, `order_id`), never `foo`/`bar`.
6. Escape `<`, `>`, `&` inside `<pre>` as `&lt;`, `&gt;`, `&amp;`.
7. Indent with 4 spaces. No trailing whitespace. Keep lines under ~90 characters.
8. After a code block, add 1–3 sentences: *what to notice* in the output.

---

## 6. Diagram Rules

Diagrams are hand-written inline SVG inside `.figure-container`. They must be **accurate, labelled and readable on mobile**.

### Structure
```html
<figure class="figure-container">
  <div class="figure-header">
    <span class="figure-number">Figure 3.1</span>
    <span class="figure-title">Short, plain title</span>
  </div>
  <div class="figure-svg-wrapper">
    <svg viewBox="0 0 680 320" width="100%" role="img" aria-label="Full description for screen readers"> … </svg>
  </div>
  <figcaption><strong>What to notice:</strong> one or two sentences that tell the reader what to look at.</figcaption>
</figure>
```

### Visual conventions
| Element | Value |
|---|---|
| Canvas | `viewBox` width 680–720; height as needed |
| Font | `font-family="-apple-system, sans-serif"`; min size **11** (labels), 12–13 (titles). Never below 10 |
| Primary line / model | `#0066cc`, stroke 2.5 |
| Data points | `#1d1d1f` (neutral), class A `#2563eb`, class B `#d97706` |
| Error / warning | `#ef4444` (dashed for residuals or gaps) |
| Good / success | `#16a34a` on `#f0fdf4` |
| Neutral boxes | fill `#f8fafc`, stroke `#94a3b8` |
| Axes / arrows | `#515154` / `#64748b`, stroke 1.5 |
| Grid | `#f0f0f4`, stroke 1 |

### Rules
1. **One message per diagram.** If the caption needs "and also…", make two diagrams.
2. **Label everything** the reader needs: axes, classes, arrows, key values. Include a legend for colors.
3. **Geometry must be correct.** Points that are "on the margin" must actually lie on the line; everything must stay inside the `viewBox`.
4. **Flow goes left → right or top → bottom.** Number the steps on process diagrams (1, 2, 3 …).
5. Unique `id`s for `<marker>` elements across the whole page (`arrow-knn`, `arrow-mcp`…).
6. Diagram numbers follow the section number: Figure 3.1, 3.2 for section 3.
7. Captions start with **"What to notice:"**.

---

## 7. Layout & Navigation Rules

- Every `h2` topic lives in a `<section id="…">` with a short, stable, kebab-case id.
- The **sidebar TOC** lists every section in page order with the same numbering as the `h2`. The mobile "Contents" sheet is generated from it automatically.
- Every page has: roadmap at the top, cheat sheet near the end, prev/next nav at the bottom.
- Tables: max 4–5 columns; first column is the thing being compared, in bold. Use `wide-breakout` only for comparison tables with 5 columns.
- Never rely on color alone; pair color with a label or shape.
- No inline `style=""` in content; use components.

---

## 8. Pre-Publish Checklist

- [ ] Every topic follows the template (one-liner, analogy, steps, diagram, math in words, use/avoid, mistakes, recap).
- [ ] No sentence needs to be read twice. Jargon is defined on first use.
- [ ] Every formula has "In words:" plus a worked example; the arithmetic is correct.
- [ ] Every diagram: labelled, accurate geometry, caption starts with "What to notice:".
- [ ] Code is runnable, under ~40 lines, highlighted, and explained afterwards.
- [ ] TOC, roadmap and `h2` numbering all match. All `#anchors` resolve.
- [ ] Page works at 375px width (mobile) and prints cleanly.
- [ ] Markdown notes (`*_NOTES.md`) are updated to match the HTML page.

