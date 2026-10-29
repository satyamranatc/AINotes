# Machine Learning Models — Teacher's Notes
### Simple Working + Mathematics Under the Hood + Applications + When to Use What

Machine Learning models learn patterns from data and use those patterns to make predictions.

There are two major types of problems:

| Type | Goal | Example |
|---|---|---|
| **Regression** | Predict a numerical value | Predict house prices, salaries, or temperatures. |
| **Classification** | Predict a category or class | Predict spam/not spam, pass/fail, or disease/no disease. |

**Remember:** Regression predicts *how much*, while classification predicts *which category*.

---

# PART 1: REGRESSION

## 1. Linear Regression

**Goal:** Predict a continuous numerical value using a linear relationship.

### A. Working

Suppose we want to predict a student's marks based on study hours.

- Input (X): Study hours.
- Output (Y): Predicted marks.
- The model finds the best-fitting straight line through the training data.
- It learns the slope and intercept that minimize prediction errors.

### B. Mathematics under the hood

**Simple Linear Regression:**

$$y = mx + b$$

| Symbol | Meaning |
|---|---|
| $y$ | Predicted output |
| $x$ | Input feature |
| $m$ | Slope or learned weight |
| $b$ | Intercept or bias |

**Example:**

$$y = 10x + 20$$

If a student studies for 5 hours:

$$y = 10(5) + 20 = 70$$

The predicted marks are 70.

**With multiple features:**

$$y = w_1x_1 + w_2x_2 + \dots + w_nx_n + b$$

For example, house price might depend on area, number of bedrooms, and location. The model learns weights for these features.

**How does it learn?**

It minimizes the Mean Squared Error (MSE):

$$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

Here, $y_i$ is the actual value and $\hat{y}_i$ is the predicted value.

### C. When to use it

**Use when:**
- Predicting house prices or salaries.
- Estimating sales or demand.
- Understanding approximately linear relationships.
- You need an interpretable baseline model.

**Avoid or reconsider when:**
- The relationship is strongly nonlinear.
- Outliers heavily distort the fitted line.
- The data contains complex patterns that a straight line cannot capture.

**Real-life application:** Predicting house prices from area, location, and other property features.

---

# PART 2: CLASSIFICATION

## 2. K-Nearest Neighbors (KNN)

**Goal:** Predict a class by examining the nearest data points.

### A. Working

Imagine a new fruit with:
- Weight = 150 grams.
- Color = Red.

The model compares this fruit with known fruits.

1. Calculate the distance between the new fruit and existing fruits.
2. Find the $K$ nearest fruits.
3. Count their classes.
4. Assign the majority class.

For example, if $K=5$ and the nearest neighbors contain:
- 4 apples.
- 1 orange.

The model predicts **Apple**.

### B. Mathematics under the hood

The most common distance formula is Euclidean distance.

For two points:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

For multiple features:

$$d = \sqrt{\sum_{j=1}^{n}(x_j - z_j)^2}$$

Here, $x$ and $z$ represent two data points.

**Example:**

Point A = (2, 3)  
Point B = (5, 7)

$$d = \sqrt{(5-2)^2 + (7-3)^2} = \sqrt{9 + 16} = 5$$

The distance between them is 5.

### C. Choosing K

| K value | Effect |
|---|---|
| K = 1 | Sensitive to noise and individual data points. |
| Small K | Flexible but may overfit. |
| Large K | Smoother predictions but may underfit. |

### D. When to use it

**Use when:**
- Your dataset is small or medium-sized.
- Similar data points tend to belong to similar classes.
- You want a simple, intuitive model.
- You have meaningful distance measurements.

**Avoid or reconsider when:**
- Your dataset is very large.
- You have many irrelevant features.
- Features have very different scales and you haven't scaled them.
- Predictions need to be extremely fast on a huge dataset.

**Real-life application:** Classifying a new customer based on similar existing customers.

**Teacher's tip:** KNN is a *lazy learner*. It stores training examples and performs much of its work when a prediction is requested.

---

## 3. Support Vector Machine (SVM)

**Goal:** Find a decision boundary that separates classes with the largest possible margin.

### A. Working

Imagine red points represent spam emails and blue points represent legitimate emails. Several lines might separate the two classes.

SVM attempts to find a suitable boundary that maximizes the margin between the classes. The closest training points that determine this boundary are called **support vectors**.

### B. Mathematics under the hood

A linear decision boundary can be written as:

$$w^T x + b = 0$$

The decision function is:

$$f(x) = w^T x + b$$

For binary classification:
- If $f(x) > 0$, predict one class.
- If $f(x) < 0$, predict the other class.

The orthogonal distance from a point $x$ to the boundary is:

$$d = \frac{|w^T x + b|}{\|w\|}$$

For a standard linearly separable SVM, the margin width is:

$$\text{Margin} = \frac{2}{\|w\|}$$

Maximizing the margin is equivalent to minimizing:

$$\frac{1}{2}\|w\|^2 \quad \text{subject to } y_i(w^Tx_i + b) \ge 1$$

For real-world imperfectly separated data, SVM commonly uses a **soft margin** with slack variables.

### C. What is the kernel trick?

Sometimes a straight line cannot separate the classes. SVM can use a kernel function to model nonlinear decision boundaries.

Common kernels:
- Linear kernel
- Polynomial kernel
- RBF (Radial Basis Function) kernel

### D. When to use it

**Use when:**
- You have a small or medium-sized dataset.
- The classes have a meaningful separating boundary.
- You need a strong model for high-dimensional data.
- You want nonlinear boundaries using an appropriate kernel.

**Avoid or reconsider when:**
- Your dataset is extremely large.
- You need very fast training on millions of examples.
- You require easily interpretable probabilities without additional calibration.
- You have not tuned kernel and regularization parameters.

**Real-life application:** Text classification, document categorization, and image classification.

---

## 4. Logistic Regression

**Goal:** Predict the probability that an observation belongs to a class.

Despite its name, Logistic Regression is primarily used for classification.

### A. Working

Suppose we want to predict whether a student will pass an exam.

The model:
1. Combines input features using weights.
2. Calculates a score ($z$).
3. Converts that score into a probability using the sigmoid function.
4. Applies a decision threshold to predict a class.

### B. Mathematics under the hood

First, calculate a linear score:

$$z = w_1x_1 + w_2x_2 + \dots + w_nx_n + b$$

Then apply the sigmoid function:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

The output is bounded between 0 and 1.

**Example:**

Suppose $z = 2$:

$$P = \frac{1}{1 + e^{-2}} \approx 0.881 \quad (88.1\%)$$

If threshold is 0.5:
- Probability $\ge 0.5 \implies$ Pass
- Probability $< 0.5 \implies$ Fail

### C. How does it learn?

Logistic Regression minimizes **Binary Cross-Entropy Loss**:

$$L = -\frac{1}{n}\sum_{i=1}^{n}\Big[y_i\ln(p_i) + (1 - y_i)\ln(1 - p_i)\Big]$$

### D. When to use it

**Use when:**
- Predicting pass/fail or yes/no outcomes.
- Predicting customer churn.
- Estimating the probability of loan default.
- You need an interpretable classification baseline.

**Avoid or reconsider when:**
- The relationship between features and log-odds is highly nonlinear.
- Complex interactions dominate the data and aren't represented in the features.

---

# PART 3: DECISION TREE

## 5. Decision Tree

**Goal:** Make predictions using a sequence of questions and conditions.

### A. Working

Recursively split data based on features that maximize purity at resulting leaf nodes.

```text
             Attendance >= 75%?
                /          \
              Yes           No
              /              \
      Study >= 2 hours?      Fail
          /       \
        Yes        No
        /           \
       Pass         Fail
```

### B. Mathematics under the hood

#### 1. Gini Impurity

$$\text{Gini} = 1 - \sum_{i=1}^{C} p_i^2$$

- 50% Pass / 50% Fail: $\text{Gini} = 1 - (0.5^2 + 0.5^2) = 0.5$ (Maximum impurity)
- 100% Pass: $\text{Gini} = 1 - 1^2 = 0$ (Pure node)

#### 2. Entropy

$$H = -\sum_{i=1}^{C} p_i \log_2(p_i)$$

- 50/50 split: $H = 1\text{ bit}$
- Pure node: $H = 0\text{ bits}$

#### 3. Information Gain

$$\text{IG} = H(\text{Parent}) - \sum_{j} \frac{N_j}{N} H(\text{Child}_j)$$

### C. When to use it

**Use when:**
- You want explainable, rule-based predictions.
- Your data contains nonlinear relationships.
- You have numerical and categorical features.

**Avoid or reconsider when:**
- The tree becomes extremely deep and overfits.
- Predictions need stability across small changes in the dataset.

**Teacher's tip:** Control overfitting using `max_depth`, `min_samples_split`, and `min_samples_leaf`.

---

# PART 4: RANDOM FOREST

## 6. Random Forest

**Goal:** Combine multiple decision trees to make a more reliable prediction.

### A. Working

Ensemble method combining predictions from many trees using majority voting (classification) or averaging (regression).

### B. Mathematics under the hood

1. **Bootstrap Sampling:** Each tree is trained on a random sample drawn with replacement.
2. **Random Feature Selection:** Each split considers only a random subset of features ($\sqrt{p}$ or $p/3$).

**Classification (Majority Voting):**

$$\hat{y} = \operatorname{mode}\{T_1(x), T_2(x), \dots, T_M(x)\}$$

**Regression (Averaging):**

$$\hat{y} = \frac{1}{M}\sum_{m=1}^{M}T_m(x)$$

### C. Why is Random Forest often better?

Reduces variance without substantially increasing bias by averaging out individual tree instability.

---

# PART 5: QUICK COMPARISON TABLE

| Model | Main Idea | Mathematics | Best Suited For | Main Limitation |
|---|---|---|---|---|
| **Linear Regression** | Fit a linear relationship | $y = w^Tx + b$, MSE | Numerical prediction | Struggles with complex nonlinear patterns |
| **KNN** | Find the nearest examples | Euclidean distance | Similarity-based classification | Slow predictions on large datasets |
| **SVM** | Find separating boundary with max margin | Decision boundary, margin, kernels | High-dimensional classification | Computationally expensive on large datasets |
| **Logistic Regression** | Estimate class probabilities | Linear score + sigmoid + cross-entropy | Binary classification | Limited by linear decision boundary |
| **Decision Tree** | Split data using rules | Gini, Entropy, Information Gain | Explainable predictions | Prone to overfitting |
| **Random Forest** | Combine many decision trees | Voting or averaging | General-purpose tabular prediction | Less interpretable than a single tree |

---

# PART 6: METRIC DISTINCTIONS

| Metric | Mainly Used For | What It Measures |
|---|---|---|
| **MSE** | Regression | Squared difference between actual and predicted numerical values |
| **Gini Impurity** | Classification trees | How mixed classes are within a node |
| **Entropy** | Classification trees | Uncertainty about class within a node |
| **Information Gain** | Classification trees | Reduction in entropy after a split |
| **Cross-Entropy Loss** | Logistic Regression | How well predicted probabilities match actual classes |
| **Distance** | KNN | Geometric closeness of two observations |
| **Margin** | SVM | Separation between decision boundary and closest training points |

---

# PART 7: PRACTICAL DECISION GUIDE

| Problem | Recommended Starting Model | Architectural Reason |
|---|---|---|
| Predict house prices | Linear Regression or Random Forest Regressor | Baseline interpretability vs nonlinear capacity |
| Predict student pass/fail | Logistic Regression or Decision Tree | Standard classification baseline & rule visibility |
| Classify fruits via sensor features | KNN | Natural localized metric clustering |
| Classify sparse text data | Logistic Regression or Linear SVM | Efficient in high-dimensional sparse spaces |
| Predict customer churn | Logistic Regression or Random Forest | Odds ratios vs feature interaction modeling |
| Explain loan approval to auditors | Decision Tree | Fully auditable boolean rules |
| Stabilize an erratic decision tree | Random Forest | Decorrelation dampens variance |
| Model nonlinear boundary | SVM with RBF Kernel | Implicit projection to higher-dimensional space |
| Model complex tabular regressions | Random Forest Regressor | Learns feature interactions automatically |

---

# PART 8: FUNDAMENTAL PRINCIPLES

### 1. Feature Scaling
Distance-sensitive algorithms (KNN, SVM, regularized Logistic Regression) require normalization/standardization to prevent large-magnitude features from dominating. Decision trees and Random Forests are scale-invariant.

### 2. Overfitting vs Underfitting
- **Underfitting (High Bias):** Model is too rigid to capture the underlying pattern.
- **Good Fit (Optimal Generalization):** Model learns the true pattern and generalizes to unseen data.
- **Overfitting (High Variance):** Model memorizes stochastic noise in the training set.

### 3. Training vs Inference Pipeline
1. Data Partitioning (Train / Validation / Test)
2. Training (Parameter estimation / Tree splitting)
3. Validation (Hyperparameter tuning)
4. Inference (Generalization test on pristine holdout)

---

### Core Pedagogical Principle

**Don't teach students only the formulas. Teach them which problem each formula solves.**
