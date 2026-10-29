# Machine Learning Models — Teacher's Notes: Editorial Blog Publication

An editorial publication and reference blog designed for deep, distraction-free technical reading.

## Architecture & Design Principles

- **Pure Vanilla CSS (`styles.css`)**: Built with custom properties (`:root`), modular layout tokens, responsive typography, and Apple-inspired restraint. No external UI frameworks or heavy runtimes.
- **Strictly Static Reading Experience**: Non-interactive, publication-grade reading flow.
- **Zero Emojis**: Replaced with clean typographic hierarchy, metadata pills, and structured comparison tables.
- **Integrated High-Precision Vector Diagrams**:
  - **Figure 1.1**: *Linear Regression* — Coordinate plane, fitted line ($\hat{y} = mx + b$), residual error vectors ($e_i = y_i - \hat{y}_i$), slope triangle, and intercept.
  - **Figure 2.1**: *K-Nearest Neighbors* — 2D metric space, $K=1$ vs. $K=5$ neighborhood circles, majority consensus vote.
  - **Figure 3.1**: *Support Vector Machine* — Separating hyperplane ($w^Tx + b = 0$), canonical margin planes ($w^Tx + b = \pm 1$), support vectors on the gutter, margin width ($2/\|w\|$).
  - **Figure 4.1**: *Logistic Regression* — The Sigmoid curve $\sigma(z)$, decision boundary threshold at $P=0.5$, continuous log-odds mapping.
  - **Figure 5.1**: *Decision Tree* — Hierarchical binary branching, split logic on attendance and study hours, node sample sizes ($N$) and Gini impurity.
  - **Figure 6.1**: *Random Forest* — Bootstrap sample generation, decorrelated tree training ($\sqrt{P}$ feature subsampling), and plurality vote aggregation.
  - **Figure 7.1**: *Bias-Variance Tradeoff* — Underfitting (High Bias), Optimal Generalization, and Overfitting (High Variance) comparison.
- **Mathematical Typography**: Formulated with KaTeX for publication-quality rendering of equations ($MSE$, Sigmoid, Binary Cross-Entropy, Gini Impurity, Shannon Entropy, and Information Gain).

## Files

- [`index.html`](file:///Users/satyamrana/Desktop/Projects/AI/index.html): The complete editorial article with semantic HTML5 tags and inline vector diagrams.
- [`styles.css`](file:///Users/satyamrana/Desktop/Projects/AI/styles.css): The vanilla CSS stylesheet powering the responsive layout, typography, tables, and print styles.

## Viewing in Browser

You can open [`index.html`](file:///Users/satyamrana/Desktop/Projects/AI/index.html) directly in any modern browser (Safari, Chrome, Firefox, Edge) or serve it locally:

```bash
# Optional local HTTP server:
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

