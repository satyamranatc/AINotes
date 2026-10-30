# Top 100 Data Science, ML & Generative AI Interview Questions (2026 Edition)

> Curated from 2025–2026 technical interviews across Indore's engineering hubs (Persistent Systems, Impetus, Yash Technologies, InfoBeans, TCS, Infosys) and global AI teams. Interactive web version: [`interview.html`](interview.html).


---

## Classical ML

### Q001. What is the Bias-Variance Tradeoff, and how do you diagnose Underfitting vs. Overfitting from learning curves?
**Bias** is error from overly rigid assumptions (e.g., fitting a straight line to curved data -> **Underfitting**: both train and test errors are high). **Variance** is error from excessive sensitivity to training noise (e.g., an unpruned Decision Tree -> **Overfitting**: train error is near 0, but test error is high). **Fix Overfitting:** add regularization ($L_1/L_2$), prune `max_depth`, use Bagging (Random Forest), or collect more data. **Fix Underfitting:** engineer non-linear features, increase model capacity, or reduce regularization.

### Q002. Why does L1 (Lasso) regularization produce sparse zero weights for feature selection, while L2 (Ridge) shrinks weights evenly near zero?
In **L1 (Lasso)**, the penalty is $\lambda \sum |w_j|$, whose derivative is a constant $\pm \lambda$ all the way to zero—creating diamond-shaped constraint corners on the axes that push weak feature weights to **exact $0$**. In **L2 (Ridge)**, the penalty is $\lambda \sum w_j^2$, whose gradient $2\lambda w_j$ shrinks as $w_j \to 0$ (circular constraint), so weights approach zero asymptotically but rarely hit exact zero.

### Q003. What are the 4 core assumptions of Linear Regression (LINE), and what breaks if they are violated?
1. **Linearity** between predictors and target (violated -> systematic curve in residual plot). 2. **Independence** of errors (violated in time-series -> autocorrelation; check with Durbin-Watson). 3. **Normality** of residuals (violated -> unreliable $p$-values and confidence intervals). 4. **Equal Variance / Homoscedasticity** (violated -> cone-shaped residuals; fix with log-transform of target $y$ or Weighted Least Squares).

### Q004. What is Multicollinearity, why does it hurt Linear/Logistic Regression more than Random Forests, and how do you detect it?
**Multicollinearity** occurs when two or more input features are highly correlated (e.g., house area in sq.ft. and area in sq.meters). In Linear/Logistic Regression, it inflates coefficient variance so weights swing wildly and lose interpretability. Detect it via **Variance Inflation Factor ($	ext{VIF} = \frac{1}{1 - R_j^2} > 5$)** and fix it by dropping redundant features, using Ridge ($L_2$), or applying PCA. Tree models are mostly immune on predictive accuracy because they split one feature at a time.

### Q005. Why does Logistic Regression use Binary Cross-Entropy (Log Loss) instead of Mean Squared Error (MSE)?
Passing the sigmoid $\sigma(z) = \frac{1}{1+e^{-z}}$ into MSE creates a **non-convex loss surface** with flat plateaus and local minima where gradients vanish ($\sigma'(z) \to 0$). **Binary Cross-Entropy** $-\frac{1}{n}\sum[y_i\ln p_i + (1-y_i)\ln(1-p_i)]$ comes from Maximum Likelihood Estimation of a Bernoulli distribution—it is strictly **convex**, and its gradient simplifies cleanly to $(p_i - y_i)\mathbf{x}_i$.

### Q006. How do you interpret a Logistic Regression weight $w_j = 0.693$ in business terms for stakeholders?
A 1-unit increase in feature $x_j$ adds $w_j$ to the **log-odds** $\ln(\frac{p}{1-p})$, which multiplies the **Odds Ratio** by $e^{w_j}$. Since $e^{0.693} \approx 2.0$, a 1-unit increase in $x_j$ **doubles the odds** of the positive outcome (holding other features constant).

### Q007. In Support Vector Machines (SVM), what are Support Vectors, and how does the C hyperparameter trade off margin width vs. errors?
**Support Vectors** are the training points that lie directly on (or inside) the margin boundaries $\mathbf{w}^T\mathbf{x}+b = \pm 1$; they alone determine the hyperplane orientation. The soft-margin penalty **$C$** controls the tradeoff: a **large $C$** heavily punishes misclassifications (narrow margin, higher variance/overfitting), while a **small $C$** tolerates some margin violations in exchange for a wider, smoother safety corridor ($2/\|\mathbf{w}\|$).

### Q008. How does the RBF (Gaussian) Kernel Trick work in SVM without computing infinite-dimensional coordinates?
The RBF kernel $K(\mathbf{x}, \mathbf{z}) = \exp(-\gamma \|\mathbf{x} - \mathbf{z}\|^2)$ computes the dot product $\phi(\mathbf{x})^T\phi(\mathbf{z})$ in an infinite-dimensional Hilbert space directly from the Euclidean distance in the original space. A large $\gamma$ creates tight, spiky islands around individual data points (overfitting), whereas a small $\gamma$ creates broad, smooth decision boundaries.

### Q009. Why does K-Nearest Neighbors (KNN) fail in high dimensions (the Curse of Dimensionality)?
As dimension count $d$ grows, the volume of a hypercube grows exponentially ($r^d$), causing all data points to become sparse and roughly equidistant from the query point ($\frac{d_{\max} - d_{\min}}{d_{\min}} \to 0$). When the nearest neighbor is almost as far away as the farthest neighbor, local proximity loses meaning. Fix by reducing dimensions first (PCA, UMAP, or feature selection).

### Q010. Compare Gini Impurity vs. Shannon Entropy in Decision Trees. When does the choice matter?
Both measure node class mixing: $\text{Gini} = 1 - \sum p_i^2$ (max $0.5$ for binary) and $\text{Entropy} = -\sum p_i \log_2 p_i$ (max $1.0$ bit). They produce nearly identical trees ($>98\%$ agreement), but **Gini is faster** because it avoids computing logarithms ($\log_2$), making it the default in scikit-learn's CART implementation.

### Q011. How does Random Forest decorrelate its trees, and what is Out-Of-Bag (OOB) evaluation?
Random Forest uses two randomization steps: 1. **Bootstrap Aggregation (Bagging)**—each tree trains on $N$ rows sampled with replacement. 2. **Feature Subsampling**—each split only considers a random subset of $m \approx \sqrt{p}$ features so one dominant predictor doesn't make every tree identical. Because each bootstrap draw leaves out $(1 - 1/n)^n \approx e^{-1} \approx 36.8\%$ of rows, those unseen rows form a free validation set called the **Out-Of-Bag (OOB)** sample.

### Q012. Compare Bagging (Random Forest) vs. Gradient Boosting (XGBoost / LightGBM). Which one reduces Bias vs. Variance?
**Random Forest (Bagging)** trains deep, independent trees in parallel and averages them to **reduce Variance**. **Gradient Boosting (XGBoost / LightGBM)** trains shallow trees *sequentially*, where each new tree fits the negative gradient (residual errors) of the ensemble so far to **reduce Bias**. XGBoost usually wins on structured tabular benchmarks, while Random Forest is harder to overfit and easier to tune.

### Q013. Your fraud dataset has 99.5% legitimate transactions and 0.5% fraud. Why is 99.5% Accuracy useless, and how do you handle it?
A dummy model that predicts 'Legitimate' for every row gets $99.5\%$ accuracy while catching $0\%$ of fraud! Instead: 1. Evaluate with **PR-AUC (Precision-Recall AUC)**, $F_1$-score, and Recall at a fixed False Positive budget. 2. Use **class weights** (`scale_pos_weight` in XGBoost or `class_weight='balanced'`) to penalize missed fraud $200\times$ more. 3. Tune the probability threshold $\tau$ (e.g., flag at $p \ge 0.15$ instead of $0.50$).

### Q014. What are the 3 most common causes of Data Leakage in real-world ML interviews?
1. **Preprocessing before splitting:** Fitting `StandardScaler`, `SimpleImputer`, or `SMOTE` on the full dataset before `train_test_split` (always wrap inside a `sklearn.pipeline.Pipeline`). 2. **Target leakage / anachronistic features:** Including a column updated *after* the event (e.g., `loan_closed_date` or `chargeback_amount` when predicting default at application time). 3. **Group leakage:** Putting multiple rows from the same patient or user in both train and test (use `GroupKFold`).

### Q015. When should you use ROC-AUC vs. PR-AUC (Precision-Recall AUC)?
**ROC-AUC** plots True Positive Rate vs. False Positive Rate ($FP / (FP + TN)$). When true negatives ($TN$) are huge (e.g., $99.9\%$ non-fraud), a large spike in false positives barely changes FPR, making ROC-AUC look overly optimistic ($0.98$). **PR-AUC** focuses exclusively on the positive class (Precision vs. Recall) and does not use $TN$, making it the gold standard for heavily imbalanced problems.


---

## Stats, SQL & DS

### Q016. Explain p-value, Type I Error (False Positive), and Type II Error (False Negative) in plain English.
Assuming the Null Hypothesis $H_0$ (no effect) is true, the **$p$-value** is the probability of observing a test statistic at least as extreme as the one in your sample due to random chance alone. **Type I Error ($\alpha$)**: rejecting a true $H_0$ (convicting an innocent person / shipping a useless feature). **Type II Error ($\beta$)**: failing to reject a false $H_0$ (missing a real effect). Statistical **Power ($1-\beta$)** is the probability of detecting a real effect.

### Q017. What is the Central Limit Theorem (CLT), and why does every Data Scientist rely on it?
The **Central Limit Theorem** states that if you draw sufficiently large independent random samples ($n \ge 30$) from *any* population with finite variance $\sigma^2$, the distribution of the sample mean $\bar{X}$ approaches a **Normal distribution** $\mathcal{N}(\mu, \sigma^2/n)$—even if the underlying data (like e-commerce spend) is heavily skewed. This justifies $z$-tests, $t$-tests, and confidence intervals in A/B testing.

### Q018. How do you design an A/B test for a new checkout recommender, and what is the 'Peeking Problem'?
1. Pick a single primary metric (e.g., Revenue per User or Conversion Rate) and guardrail metrics (page latency). 2. Run a power analysis using baseline conversion, Minimum Detectable Effect (MDE), $\alpha = 0.05$, and power $1-\beta = 0.80$ to compute required sample size $N$. 3. Randomize by `user_id` (to avoid interference). **Peeking Problem:** Checking $p$-values daily and stopping as soon as $p < 0.05$ inflates False Positive rates from $5\%$ to $>25\%$. Wait until sample size $N$ is reached or use sequential testing.

### Q019. Explain MCAR, MAR, and MNAR missing data mechanisms and how to handle each.
**MCAR (Missing Completely at Random):** Missingness is unrelated to any variable (e.g., a sensor glitch)—safe to impute with median/mean. **MAR (Missing at Random):** Missingness depends on other *observed* columns (e.g., younger users skip a survey question)—use `IterativeImputer` (MICE) or KNN imputation. **MNAR (Missing Not at Random):** Missingness depends on the *unobserved value itself* (e.g., ultra-high-income earners leave `income` blank)—always add a binary `is_income_missing` indicator column!

### Q020. Compare Z-Score vs. IQR (Interquartile Range) for Outlier Detection. When does Z-score fail?
The **Z-score** ($z = \frac{x - \mu}{\sigma}$, threshold $|z| > 3$) uses the mean and standard deviation, which are themselves distorted by extreme outliers in skewed distributions. The **IQR method** flags points outside $[Q_1 - 1.5\text{IQR},\; Q_3 + 1.5\text{IQR}]$ where $\text{IQR} = Q_3 - Q_1$; because quartiles are rank-based, IQR is robust to heavy skew and extreme values.

### Q021. What is the difference between Pearson and Spearman correlation?
**Pearson ($r$)** measures strictly *linear* proportionality between two continuous variables and is sensitive to outliers. **Spearman ($\rho$)** computes Pearson correlation on the *rank order* of the values, capturing any monotonic relationship (even exponential curves) and resisting extreme outliers.

### Q022. Bayes' Theorem Interview Classic: A disease affects 1% of people. A test is 99% sensitive (TPR) and 99% specific (TNR). If a person tests positive, what is the probability they actually have the disease?
By Bayes' Theorem: $P(D|+) = \frac{P(+|D)P(D)}{P(+|D)P(D) + P(+|\neg D)P(\neg D)} = \frac{0.99 \times 0.01}{(0.99 \times 0.01) + (0.01 \times 0.99)} = \frac{0.0099}{0.0099 + 0.0099} = \mathbf{50\%}$. Because the base rate (prior) is so low ($1\%$), the $1\%$ false-positive rate across the $99\%$ healthy population equals the true positives!

### Q023. SQL Window Functions (Indore Screening Favourite): Explain ROW_NUMBER() vs. RANK() vs. DENSE_RANK() and write a query for the top 2 highest-paid employees per department.
For tied salaries `[100, 100, 90]`: `ROW_NUMBER()` gives `1, 2, 3`; `RANK()` leaves a gap `1, 1, 3`; `DENSE_RANK()` leaves no gap `1, 1, 2`. Query: `WITH ranked AS (SELECT name, dept_id, salary, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk FROM employees) SELECT name, dept_id, salary FROM ranked WHERE rnk <= 2;`

### Q024. SQL Analytics: How do you compute Month-over-Month (MoM) revenue growth using LAG()?
Use `LAG(revenue, 1) OVER (ORDER BY month)` to fetch the prior month's revenue on the same row: `SELECT month, revenue, ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month), 2) AS mom_growth_pct FROM monthly_sales;`

### Q025. Why is iterating over a Pandas DataFrame with .iterrows() 500x slower than vectorized NumPy/Pandas operations?
`.iterrows()` boxes every single row into a new Python `pd.Series` object inside a slow Python bytecode loop, performing dynamic type checks on every row. **Vectorized operations** (`df['total'] = df['price'] * df['qty']`) run contiguous C/SIMD array loops directly on raw memory buffers without Python object overhead.

### Q026. How do you reduce the RAM footprint of a 10 GB Pandas DataFrame by 70%+ before training?
1. Downcast numeric types: `float64` -> `float32` and `int64` -> `int32`/`int16`. 2. Convert low-cardinality string columns to `category` dtype. 3. Load only required columns via `usecols=[...]` or read partitioned Parquet files using PyArrow/Polars instead of CSV.

### Q027. Why do we use Python Generators (yield) when building PyTorch/LLM data pipelines?
A function returning a `list` loads the entire dataset into RAM at once. A **Generator (`yield`)** is a lazy iterator that produces one batch at a time on demand with $O(1)$ memory overhead, allowing you to stream terabytes of JSONL/Parquet training data without Out-Of-Memory crashes.

### Q028. How do you encode high-cardinality categorical features (e.g., 10,000 zip codes) without exploding feature dimensions or leaking target labels?
One-hot encoding creates 10,000 sparse columns. Instead, use **Out-of-Fold Target Encoding** with Bayesian smoothing: compute each category's mean target value strictly on out-of-fold training splits, blended toward the global prior mean $\mu$ for rare zip codes so single-row categories don't overfit.

### Q029. How do you perform Cross-Validation on Time-Series data (e.g., daily retail demand forecasting)?
Never use random `KFold` on time series—it trains on future dates to predict the past (lookahead leakage)! Use **Expanding Window (`TimeSeriesSplit`)** or **Blocked Rolling Origin** validation, where fold $k$ trains strictly on $[t_0, t_k]$ and validates on $[t_k + \text{gap}, t_{k+1}]$.

### Q030. Explain Precision vs. Recall with medical diagnosis vs. spam filtering examples.
**Precision** $= \frac{TP}{TP + FP}$ ('when the model flags positive, how often is it right?'). High precision is critical in **Spam Filtering** so an important job offer isn't sent to spam ($FP$). **Recall** $= \frac{TP}{TP + FN}$ ('out of all real positives, how many did we catch?'). High recall is critical in **Cancer Screening** so a sick patient isn't missed ($FN$).


---

## Deep Learning & FNN

### Q031. Why does a 50-layer Feedforward Neural Network (FNN) without activation functions have the exact same expressive power as a 1-layer Linear Regression model?
Matrix multiplication is associative and closed under linearity: $\mathbf{W}_{50}(\mathbf{W}_{49}\dots(\mathbf{W}_1\mathbf{x})) = (\mathbf{W}_{50}\mathbf{W}_{49}\dots\mathbf{W}_1)\mathbf{x} = \mathbf{W}_{\text{eff}}\mathbf{x}$. Without non-linear activations (ReLU, GELU) between layers to bend the coordinate space, any stack of linear layers collapses into a single linear matrix transformation.

### Q032. What causes the Vanishing and Exploding Gradient problems during Backpropagation, and how do modern architectures solve them?
By the Chain Rule, the gradient at layer 1 multiplies local derivatives across all $L$ layers: $\prod_{l=1}^L \mathbf{W}^{(l)T} f'(z^{(l)})$. For Sigmoid, the maximum derivative is $f'(0) = 0.25$, so $0.25^{20} \approx 10^{-12}$ (**Vanishing**: early layers stop learning). If weights $>1$, gradients grow exponentially (**Exploding**). **Solutions:** ReLU/GELU activations, Residual/Skip connections ($x + F(x)$), He/Xavier initialization, LayerNorm/BatchNorm, and Gradient Clipping.

### Q033. What is the 'Dying ReLU' problem, and how do LeakyReLU, ELU, and GELU fix it?
For standard $\text{ReLU}(z) = \max(0, z)$, if a large learning step pushes a neuron's bias negative so $z < 0$ for all training inputs, its output is $0$ and its local gradient is exact $0$—so the neuron never updates again ('dead neuron'). **LeakyReLU** ($\max(0.01z, z)$) and **GELU** ($z\Phi(z)$) preserve a small non-zero slope for negative inputs so gradients continue to flow.

### Q034. Walk through a 1-neuron Backpropagation step by hand using the Chain Rule.
Suppose input $x = 2$, weight $w = 3$, target $y = 10$, linear output $\hat{y} = wx = 6$, and squared loss $L = \frac{1}{2}(\hat{y} - y)^2 = \frac{1}{2}(6-10)^2 = 8$. By the Chain Rule: $\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial w} = (\hat{y} - y) \cdot x = (6 - 10) \times 2 = -8$. With learning rate $\eta = 0.1$, the updated weight is $w_{\text{new}} = w - \eta \frac{\partial L}{\partial w} = 3 - 0.1(-8) = \mathbf{3.8}$ (bringing the new prediction $3.8 \times 2 = 7.6$ closer to $10$).

### Q035. Compare Batch Normalization (BatchNorm) vs. Layer Normalization (LayerNorm). Why do Transformers use LayerNorm?
**BatchNorm** normalizes each feature channel *across the mini-batch* dimension (great for CNNs with large batches, but breaks on batch size 1 or variable-length sequences). **LayerNorm** normalizes *across all features inside a single token* independently of other samples in the batch—making it invariant to batch size and sequence length, which is essential for Transformers and LLMs.

### Q036. How does Inverted Dropout work during training vs. inference in PyTorch?
During **training** (`model.train()`), Dropout randomly sets a fraction $p$ of activations to $0$ and scales the surviving activations up by $\frac{1}{1-p}$ so the expected sum stays unchanged. During **inference** (`model.eval()`), Dropout is turned completely off (all neurons stay active with zero scaling needed).

### Q037. What is the difference between Adam and AdamW, and why is AdamW the standard optimizer for Deep Learning & LLMs?
Standard **Adam** adds the $L_2$ weight decay penalty directly to the gradient before dividing by the adaptive second-moment $\sqrt{v_t}$—which weakens weight decay on parameters with large historical gradients. **AdamW (Decoupled Weight Decay)** applies weight decay $w \leftarrow (1 - \eta\lambda)w$ separately from the adaptive gradient step, yielding much better generalization in Transformers and FNNs.

### Q038. Why shouldn't you initialize all weights in an FNN to zero (Symmetry Breaking)?
If every weight in a hidden layer starts at $0$ (or the same constant), every neuron in that layer computes the exact same forward activation and receives the exact same backward gradient—meaning all $H$ hidden neurons stay identical forever and act like a single neuron! Use **He Initialization** ($\mathcal{N}(0, 2/n_{\text{in}})$) for ReLU layers and **Xavier/Glorot** for Tanh/Sigmoid.

### Q039. In PyTorch, what is the difference between model.eval() and with torch.no_grad():? Do you need both at inference?
Yes, you need both! `model.eval()` switches layer behavior (disables Dropout and tells BatchNorm to use running statistics instead of batch statistics), whereas `with torch.no_grad():` disables the autograd engine from storing intermediate activation tensors for backpropagation, cutting GPU RAM usage in half and speeding up inference.

### Q040. Why do we subtract max(z) before computing Softmax in code?
In $\operatorname{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}$, if a logit is large (e.g., $z_i = 1000$), $e^{1000}$ overflows to `inf` (`NaN`). Subtracting $c = \max(\mathbf{z})$ from every logit gives $\frac{e^{z_i - c}}{\sum_j e^{z_j - c}}$, which is mathematically identical (since $e^{-c}$ cancels top and bottom) and guarantees the largest exponent is $e^0 = 1$.

### Q041. Why do modern deep learning training schedules use Linear Warmup followed by Cosine Annealing?
At step 0, weights are random and Adam's variance estimate $v_t$ is uncalibrated, so a large learning rate causes early gradient spikes and divergence. **Linear Warmup** ramps the learning rate from $0 \to \eta_{\max}$ over the first $2\text{--}5\%$ of steps to stabilize Adam statistics, and **Cosine Annealing** smoothly decays $\eta$ into a narrow basin at the end of training.

### Q042. How do you calculate the exact number of trainable parameters in an FNN layer nn.Linear(in_features=128, out_features=64)?
Each of the 64 output neurons has 128 incoming weights plus 1 bias term: $\text{Parameters} = (128 \times 64) + 64 = 8,192 + 64 = \mathbf{8,256}$ parameters.


---

## NLP & Transformers

### Q043. How does Byte-Pair Encoding (BPE) Subword Tokenization solve the Out-Of-Vocabulary (OOV) problem?
BPE starts with individual characters/bytes as the base vocabulary and iteratively merges the most frequent adjacent pair into a new subword token until reaching vocabulary size $|V|$ (e.g., $32,000$ or $128,000$). Common words become single tokens, while unseen rare or misspelled words gracefully decompose into smaller subword roots and characters—never collapsing into a generic `<UNK>` token.

### Q044. Compare TF-IDF vs. BM25. Why is BM25 still used inside modern Hybrid RAG systems?
In raw **TF-IDF**, if a keyword appears 20 times in a document, its term-frequency score is $20\times$ higher than appearing once. **BM25** improves TF-IDF in two ways: 1. **Term Frequency Saturation ($k_1$)**—diminishing returns after a word appears a few times. 2. **Document Length Normalization ($b$)**—penalizing long documents that match keywords just by being verbose. BM25 excels at exact SKU, part-number, and acronym matching where dense embeddings struggle.

### Q045. What is the key limitation of static embeddings (Word2Vec / GloVe) compared to contextual Transformer embeddings?
Static models assign a single fixed vector to the string `'apple'`—averaging together the fruit and the tech company. Contextual Transformer models compute token embeddings dynamically via Self-Attention across the surrounding sentence, so `'apple'` in *'sliced a crisp apple'* and *'Apple M4 chip'* get completely different vectors.

### Q046. In Scaled Dot-Product Attention, why do we divide $QK^T$ by $\sqrt{d_k}$ before applying Softmax?
If Query and Key components have mean $0$ and variance $1$, their dot product $\mathbf{q}\cdot\mathbf{k} = \sum_{i=1}^{d_k} q_i k_i$ has mean $0$ and variance $d_k$ (standard deviation $\sqrt{d_k}$). For large $d_k$ (e.g. $64$ or $128$), unscaled dot products grow large in magnitude, pushing Softmax into extreme $0/1$ saturation where gradients vanish. Dividing by $\sqrt{d_k}$ restores unit variance.

### Q047. Why do Transformers use Multi-Head Attention instead of a single large Attention head?
**Multi-Head Attention** projects $Q, K, V$ into $h$ smaller subspaces in parallel (e.g., $h=12$ heads of $d_k = 64$). This allows different heads to attend to different linguistic relationships simultaneously—Head 1 can track pronoun coreference ('it' -> 'animal'), Head 2 can track verb-object syntax, and Head 3 can track adjacent adjectives.

### Q048. Why do Transformers need Positional Encodings, and why has RoPE (Rotary Position Embedding) become the industry standard?
Unlike RNNs, Self-Attention is permutation-equivariant (a bag of words with no built-in sense of word order). Classic sinusoidal encodings add absolute positions to token embeddings. **RoPE (Rotary Position Embedding)** rotates the $Q$ and $K$ vectors in 2D complex planes by an angle proportional to their position index, so the dot product $\mathbf{q}_m^T \mathbf{k}_n$ depends strictly on their *relative distance* $(m - n)$ and extrapolates better to long contexts.

### Q049. Compare Encoder-Only (BERT) vs. Decoder-Only (GPT / Llama) vs. Encoder-Decoder (T5) architectures.
**Encoder-Only (BERT, RoBERTa):** Bidirectional attention (every token sees left and right); best for fast classification, NER, embeddings, and Cross-Encoder reranking. **Decoder-Only (GPT, Gemini, Llama):** Causal masked attention (each token only sees past tokens); best for autoregressive generation, chat, and general reasoning. **Encoder-Decoder (T5, Whisper):** Bidirectional input encoder + autoregressive output decoder.

### Q050. What is the KV Cache in LLM inference, and why does it become the main GPU memory bottleneck?
During autoregressive generation, recomputing Key ($K$) and Value ($V$) matrices for all past tokens at every step would cost $O(L^2)$. The **KV Cache** stores past $K$ and $V$ tensors in GPU VRAM so each new token only computes its own $q_t, k_t, v_t$. To shrink KV Cache memory, modern LLMs use **Grouped-Query Attention (GQA)** (sharing KV heads across multiple Query heads) and **PagedAttention** (vLLM).

### Q051. When are Cosine Similarity, Dot Product, and Euclidean Distance mathematically equivalent?
When all embedding vectors are **$L_2$-normalized to unit length** ($\|\mathbf{a}\| = \|\mathbf{b}\| = 1$), $\cos(\theta) = \frac{\mathbf{a}\cdot\mathbf{b}}{1 \times 1} = \mathbf{a}\cdot\mathbf{b}$ (Dot Product), and squared Euclidean distance is $\|\mathbf{a} - \mathbf{b}\|^2 = 2 - 2(\mathbf{a}\cdot\mathbf{b})$—meaning all three produce the exact same nearest-neighbor ranking!

### Q052. What is Perplexity in language modeling, and what does a Perplexity of 10 mean intuitively?
**Perplexity** is the exponentiated average negative log-likelihood per token: $\text{PPL} = \exp\big(-\frac{1}{T}\sum_{t=1}^T \ln P(w_t | w_{<t})\big)$. Intuitively, a Perplexity of $10$ means that at each step, the model is as uncertain as if it had to choose uniformly among $10$ equally likely next tokens (lower Perplexity = better language model).

### Q053. What is Causal Masking in a Decoder Transformer, and how is it implemented in matrix math?
During training, a Decoder processes the entire target sentence in parallel. To prevent token $t$ from cheating by looking ahead at token $t+1$, we add an upper-triangular mask matrix filled with $-\infty$ above the main diagonal to the attention scores $\frac{QK^T}{\sqrt{d_k}}$ right before Softmax. Since $e^{-\infty} = 0$, future tokens receive exact $0$ attention weight.

### Q054. Why do Transformer blocks place Pre-LayerNorm + Residual Connections around both Attention and FNN sublayers?
In $\mathbf{x}_{l+1} = \mathbf{x}_l + \text{SubLayer}(\text{LayerNorm}(\mathbf{x}_l))$, the additive **residual highway** ($+\mathbf{x}_l$) has a direct derivative of $\mathbf{I}$ (the identity matrix), allowing gradients to flow unimpeded from the final loss straight back to the first layer across $80+$ Transformer blocks without vanishing.


---

## OpenCV & Vision

### Q055. Why does OpenCV load images in BGR order instead of RGB, and what bug does this cause in PyTorch/Matplotlib?
OpenCV (`cv2.imread`) uses **BGR (Blue-Green-Red)** for historical compatibility with early 1990s camera framebuffers and Windows `BITMAPINFO` structs. If you pass a BGR array directly to Matplotlib or a PyTorch model pretrained on RGB ImageNet without `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`, red and blue channels swap—turning faces blue and degrading CNN accuracy by $15\text{--}30\%$.

### Q056. Why is HSV Color Space much better than RGB/BGR for color-based object segmentation under shadows?
In RGB/BGR, color and brightness are entangled across all three channels—a shadow darkens $R$, $G$, and $B$ simultaneously. In **HSV (Hue, Saturation, Value)**, pure color wavelength is isolated in the **Hue ($H$)** channel while lighting brightness sits in **Value ($V$)**, allowing `cv2.inRange()` to track a coloured object reliably across bright sun and deep shadow.

### Q057. Give the formula for the output spatial size of a 2D Convolution layer and compute an example.
For input width $W$, kernel size $K$, padding $P$, and stride $S$: $$W_{\text{out}} = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1$$ **Example:** A $224 \times 224$ image with a $3 \times 3$ kernel, padding $P=1$ ('same' padding), and stride $S=2$ outputs $\lfloor\frac{224 - 3 + 2}{2}\rfloor + 1 = \lfloor 111.5 \rfloor + 1 = \mathbf{112 \times 112}$.

### Q058. Compare Gaussian Blur vs. Median Blur vs. Bilateral Filter in OpenCV.
**Gaussian Blur:** Weighted average using a bell curve; fast general smoothing, but blurs sharp object edges. **Median Blur (`cv2.medianBlur`):** Replaces center pixel with the median of its neighborhood; best for wiping out salt-and-pepper impulse noise. **Bilateral Filter (`cv2.bilateralFilter`):** Weights neighbors by both spatial distance AND intensity similarity—smoothing flat regions while preserving razor-sharp edges.

### Q059. What are the 4 internal stages of the Canny Edge Detector (cv2.Canny)?
1. **Gaussian Smoothing** to suppress camera noise. 2. **Sobel Gradient Magnitude & Angle** ($G = \sqrt{G_x^2 + G_y^2}$). 3. **Non-Maximum Suppression** to thin thick gradient ridges down to 1-pixel-wide local peaks. 4. **Hysteresis Thresholding** (`threshold1`, `threshold2`): pixels above `high` are strong edges; pixels between `low` and `high` are kept only if connected to a strong edge.

### Q060. Explain Morphological Erosion, Dilation, Opening, and Closing in OpenCV.
**Erosion** shrinks bright foreground regions (removes tiny white noise specks). **Dilation** expands bright regions (bridges small gaps). **Opening** = Erosion followed by Dilation (removes background noise specks while preserving object size). **Closing** = Dilation followed by Erosion (seals small dark pinholes inside foreground objects).

### Q061. Why do CNNs vastly outperform fully connected FNNs on raw images?
1. **Parameter Sharing:** A $3 \times 3$ kernel uses the same 9 weights across the entire image instead of learning a separate weight for every pixel pair (a 1MP image into 1,000 FNN neurons would need 1 billion weights in Layer 1 alone!). 2. **Translation Equivariance:** If an object shifts 50 pixels right, its convolutional feature map simply shifts 50 pixels right.

### Q062. What are Intersection over Union (IoU) and Non-Maximum Suppression (NMS) in Object Detection (YOLO)?
**IoU** $= \frac{\text{Area of Overlap}}{\text{Area of Union}}$ measures how well a predicted bounding box matches a ground-truth box (typically $\text{IoU} \ge 0.5$ counts as a hit). Because detectors fire multiple overlapping boxes around the same object, **NMS** sorts boxes by confidence score, keeps the highest-scoring box, and deletes any overlapping box of the same class with $\text{IoU} > \tau_{\text{NMS}}$.

### Q063. How does a Vision Transformer (ViT) process an image without 2D convolutions?
A **Vision Transformer (ViT)** slices an image of size $(H, W, C)$ into non-overlapping $16 \times 16$ patches, flattens and linearly projects each patch into a $D$-dimensional token embedding, prepends a learnable `[CLS]` token, adds 2D positional embeddings, and passes the sequence through a standard Transformer Encoder.

### Q064. What is a 1x1 Pointwise Convolution (used in ResNet Bottlenecks and MobileNet), and why is it useful?
A $1 \times 1$ convolution looks at a single spatial pixel $(x, y)$ across all $C_{\text{in}}$ channels and projects it to $C_{\text{out}}$ channels. It acts as a learnable channel-wise linear bottleneck—shrinking 256 channels down to 64 before an expensive $3 \times 3$ convolution, cutting FLOPs by $4\text{--}8\times$.


---

## LLMs, Vector DB & RAG

### Q065. When should you choose Prompt Engineering vs. RAG vs. Fine-Tuning (LoRA) in a production AI project?
1. **Prompt Engineering + Few-Shot:** Always start here—zero training cost, solves formatting and reasoning instructions. 2. **RAG (Retrieval-Augmented Generation):** Best when the model needs *dynamic, private, or citable knowledge* (company docs, live inventory) with zero retraining when facts change. 3. **Fine-Tuning (LoRA/QLoRA):** Best when you need to change the model's *behavior, tone, domain jargon, or strict schema latency* (or distill a 70B model into a fast 8B model).

### Q066. Explain Temperature vs. Top-P (Nucleus) vs. Top-K sampling. Should you tune Temperature and Top-P at the same time?
**Temperature ($T$)** scales logits ($\mathbf{z}/T$) before Softmax. **Top-$K$** keeps a fixed count $K$ of top tokens. **Top-$P$ (Nucleus)** dynamically keeps the smallest set of top tokens whose cumulative probability exceeds $P$ (e.g., $0.90$). Vendor best practice (OpenAI/Anthropic/Google) is to **tune Temperature OR Top-$P$, not both simultaneously**; for RAG, SQL, and tool calling, set $T = 0.0$.

### Q067. Compare Fixed-Size Chunking vs. Recursive Character Chunking vs. Semantic/Markdown Header Chunking for RAG.
**Fixed-size chunking** slices blindly every $N$ tokens, often cutting sentences or tables in half. **Recursive Character Chunking** splits hierarchically by paragraphs (`\n\n`), then lines (`\n`), then sentences (`. `) with a $10\text{--}15\%$ overlap so context stays intact. **Markdown/Document-Aware Chunking** splits along section headers (`#`, `##`) and keeps tables/code blocks whole, prepending the parent section title to every chunk.

### Q068. How does the HNSW (Hierarchical Navigable Small World) index work inside Vector Databases like Chroma, Milvus, and Qdrant?
Brute-force Flat KNN compares the query vector against all $N$ vectors ($O(N)$). **HNSW** builds a multi-layer proximity graph: the top layer has very few nodes with long 'highway' edges to jump rapidly across the vector space, and lower layers have denser local edges. Search starts at the top layer and greedily descends to the bottom layer in **$O(\log N)$ time**, controlled by `M` (max edges per node) and `efSearch` (recall vs. latency knob).

### Q069. Compare Flat Index vs. IVF (Inverted File Index) vs. HNSW in FAISS/Vector Storage.
**Flat (`IndexFlatIP`):** $100\%$ exact recall, zero index build time, but slow $O(N)$ search. **IVF (`IndexIVFFlat`):** Clusters vectors into $k$ Voronoi cells via K-Means and searches only the `nprobe` closest centroids—low memory footprint. **HNSW (`IndexHNSWFlat`):** Fastest query latency and highest recall at scale, at the cost of higher RAM usage for storing graph edges.

### Q070. Why does Hybrid Search (BM25 + Dense Vector Search + Reciprocal Rank Fusion) beat pure Vector Search in enterprise RAG?
Dense embeddings capture semantic synonyms ('refund' $\leftrightarrow$ 'reimbursement') but often fail on exact part numbers, error codes (`ERR_4092`), or rare proper nouns. Combining sparse keyword **BM25** with dense **Vector Search** and merging their ranked lists via **Reciprocal Rank Fusion** ($\text{RRF}(d) = \sum \frac{1}{60 + \text{rank}_i(d)}$) gives the best of both worlds.

### Q071. What is the difference between a Bi-Encoder (Embedding Model) and a Cross-Encoder (Reranker) in a 2-stage RAG pipeline?
A **Bi-Encoder** embeds the query and documents *separately* so millions of document vectors can be pre-computed and searched in 5ms via HNSW—but query and document tokens never attend to each other directly. A **Cross-Encoder Reranker** (e.g., `bge-reranker` or Cohere Rerank) feeds `[CLS] Query [SEP] Document` together into a Transformer so every query token attends to every document token. Because Cross-Encoders are slow, we retrieve Top-50 with a Bi-Encoder and rerank down to the best Top-5 with a Cross-Encoder.

### Q072. What is the 'Lost in the Middle' phenomenon in long-context LLMs, and how does it affect RAG?
Research (Liu et al.) showed that LLMs recall facts placed at the very **beginning (primacy)** or very **end (recency)** of a long prompt with high accuracy, but accuracy drops significantly when relevant facts sit buried in the middle of 20+ retrieved chunks. Fix: rerank and pass only the Top 4–6 highest-precision chunks, or place the most relevant chunks at the edges of the context block.

### Q073. How do you quantitatively evaluate a RAG system in production using the RAGAS triad?
Evaluate three independent links (the **RAG Triad**): 1. **Context Precision & Recall:** Did the retriever fetch the relevant ground-truth chunks at the top? 2. **Faithfulness (Groundedness):** Is every claim in the LLM's answer supported strictly by the retrieved chunks (no hallucination)? 3. **Answer Relevance:** Did the final response actually address the user's question?

### Q074. A client says their RAG chatbot still hallucinates numbers and policies. Give 5 concrete engineering fixes.
1. Set `temperature = 0.0` and enforce a system rule: *'Answer strictly from the provided context; if absent, reply I do not have enough information.'* 2. Require **inline chunk citations** (`[Source: doc_id]`) validated via Pydantic. 3. Add a **Cross-Encoder Reranker** and similarity cutoff threshold (drop chunks with cosine similarity $< 0.65$). 4. Use **Hybrid Search (BM25 + Dense)** so exact numbers/codes are retrieved. 5. Preserve Markdown tables intact during PDF parsing.

### Q075. What is HyDE (Hypothetical Document Embeddings) and Multi-Query Retrieval?
Short user queries (e.g., *'PTO policy?'*) often embed poorly compared to long declarative handbook paragraphs. In **HyDE**, an LLM first generates a hypothetical ideal answer paragraph, and we embed *that paragraph* to search the Vector DB (document-to-document similarity). In **Multi-Query Retrieval**, the LLM rewrites an ambiguous user question into 3 distinct search queries and takes the union of retrieved chunks.

### Q076. How do you handle complex PDFs containing financial tables and multi-column layouts in RAG?
Standard `PyPDF` text extraction scrambles multi-column rows and destroys table headers. Instead: 1. Use layout-aware parsers (`Docling`, `Unstructured`, or multimodal vision-LLM parsing) to convert tables into clean **Markdown or HTML tables**. 2. Index a natural-language summary of each table for vector retrieval while storing the full raw Markdown table in metadata (`ParentDocumentRetriever`) to inject into the LLM prompt.

### Q077. How do you defend an enterprise LLM/RAG app against Prompt Injection and PII Leakage?
1. **Input/Output Guardrails:** Run fast classifiers (Llama Guard, Presidio) to redact PII (Aadhaar, PAN, SSN, emails) before sending prompts to external APIs. 2. **Privilege Separation & RBAC in Vector Storage:** Filter vector queries by the authenticated user's access token (`WHERE allowed_role = user.role`) at the database level—never rely on the system prompt alone to hide confidential documents. 3. Delimit untrusted retrieved text clearly in XML tags (`<context>...</context>`).

### Q078. Why can't you just swap Embedding Models (e.g., from OpenAI text-embedding-3-small to BGE-large) without re-indexing your Vector Database?
Every embedding model learns its own incompatible coordinate system and dimensionality (e.g., 1536D vs. 1024D, with completely different rotation axes). Comparing a query vector from Model B against document vectors from Model A produces meaningless cosine scores. Switching embedding models always requires re-embedding and re-indexing all stored chunks.

### Q079. How do you cut LLM cost and latency by 60%+ in high-traffic production RAG?
1. **Semantic Caching (Redis / GPTCache):** Embed incoming queries; if cosine similarity with a recently answered query is $\ge 0.95$, return the cached answer in 10ms ($0$ LLM cost). 2. **Prompt Caching:** Pin static system instructions and shared context prefixes at the start of the prompt for $50\text{--}90\%$ input token discounts. 3. **Model Routing:** Route simple queries to fast small models (`gemini-2.5-flash` / `llama-3.1-8b`) and escalate only complex reasoning queries to frontier models.

### Q080. What is GraphRAG (Knowledge Graph + Vector RAG), and when do you need it?
Standard Vector RAG retrieves isolated text chunks and struggles with global, multi-hop questions like *'How are Vendor X's supply delays connected to Q3 revenue across all subsidiaries?'* **GraphRAG** extracts entities and relationships (`(Vendor X) -[SUPPLIES]-> (Part Y) -[USED_IN]-> (Product Z)`) into a Knowledge Graph (Neo4j) and combines graph traversal with vector similarity.


---

## Agents, LangChain & MCP

### Q081. What are the advantages of LangChain Expression Language (LCEL: prompt | model | parser) over legacy LLMChain classes?
Every LCEL component implements the unified `Runnable` interface, giving you automatic support for synchronous `.invoke()`, token-by-token `.stream()`, parallel `.batch()`, async `.ainvoke()`, automatic retries/fallbacks (`.with_fallbacks()`), and transparent schema inspection without hidden prompt mutations.

### Q082. Walk through the exact 4-Step Tool Calling (Function Calling) protocol under the hood. Does the LLM execute your Python code?
**No—the LLM never executes code!** 1. Your app sends the user message + JSON Schemas of available tools to the LLM. 2. The LLM decides a tool is needed and emits a structured `tool_calls` payload (`{"name": "query_db", "arguments": {"id": 101}}`). 3. **Your application runtime** validates the arguments and executes the Python function locally. 4. Your app appends the result as a `role: "tool"` message (matching `tool_call_id`) and invokes the LLM again to synthesize the final response.

### Q083. Why should you use Pydantic with_structured_output() instead of asking the LLM 'Please reply in JSON' and running json.loads()?
Prompt-only JSON often fails in production because the LLM wraps the JSON in ` ```json ... ``` ` markdown fences, adds conversational preambles, or hallucinates missing keys. `with_structured_output(PydanticModel)` binds the exact JSON Schema at the API/constrained-decoding level and validates field types via Pydantic, enabling automatic self-correction retries if validation fails.

### Q084. What is the difference between a fixed Chain/Workflow and an Autonomous ReAct Agent?
In a **Chain/Workflow**, the sequence of steps is hardcoded by the developer in advance (deterministic latency and cost). In an **Autonomous ReAct Agent** (`Reasoning + Acting`), the LLM runs inside a `while` loop (`Thought -> Action/Tool Call -> Observation`), deciding dynamically which tools to call, in what order, and how to recover from tool errors until the goal is satisfied.

### Q085. How do you prevent an Autonomous Agent from getting stuck in an infinite tool-calling loop and burning $500 of API credits?
1. Enforce a hard `max_iterations` / `recursion_limit` (e.g., max 6 steps). 2. Set a per-request token/cost budget and wall-clock timeout. 3. Detect duplicate consecutive `(tool_name, tool_args)` calls and inject a system warning. 4. Require **Human-in-the-Loop (HITL)** confirmation before executing any destructive write tool (`DELETE`, `send_email`, `refund_payment`).

### Q086. When should you use LangGraph instead of a simple LangChain ReAct loop?
Use **LangGraph** when your agent needs explicit **stateful cyclic graphs**, conditional branching edges, persistent checkpointing (pause/resume across human approvals), time-travel debugging, or coordinated multi-agent handoffs with a shared typed `TypedDict` / Pydantic state object.

### Q087. What is the Model Context Protocol (MCP), and how does it turn an N x M integration problem into N + M?
Before MCP, connecting $N$ AI applications (IDEs, desktop chat apps, custom agents) to $M$ data sources (Postgres, GitHub, Slack, Jira) required $N \times M$ custom glue connectors. **MCP (Model Context Protocol)** defines a single open JSON-RPC 2.0 wire standard: each AI app implements 1 MCP Client ($N$) and each tool provider builds 1 MCP Server ($M$), reducing total engineering work to $N + M$.

### Q088. Explain the MCP Architectural Triad: Host vs. Client vs. Server.
1. **MCP Host:** The user-facing AI application (e.g., Claude Desktop, Cursor, Antigravity IDE, or your Python agent app) that manages permissions and coordinates the LLM. 2. **MCP Client:** The protocol connector inside the Host that maintains an isolated 1:1 session with a specific server. 3. **MCP Server:** A lightweight independent process (e.g., built with Python `FastMCP`) that securely exposes Tools, Resources, and Prompts.

### Q089. What are the 3 core primitives exposed by an MCP Server (@mcp.tool, @mcp.resource, @mcp.prompt), and who controls each?
1. **Tools (`@mcp.tool()`):** Model-controlled executable functions with side effects or dynamic computation (e.g., `run_sql_query`, `create_ticket`). 2. **Resources (`@mcp.resource("uri://...")`):** Application/user-controlled read-only data streams (e.g., database schemas, log files, docs) like `GET` endpoints. 3. **Prompts (`@mcp.prompt()`):** User-invoked reusable prompt templates and workflows.

### Q090. Compare the two MCP Transport layers: Stdio vs. Streamable HTTP.
**Stdio (Standard Input/Output):** The MCP Client spawns the MCP Server as a local child subprocess and communicates over `stdin`/`stdout` JSON-RPC messages—zero network setup, ultra-low latency, ideal for local IDE/desktop tools. **Streamable HTTP (replacing legacy SSE):** The MCP Server runs as a remote microservice over HTTP `POST`/`GET` with optional streaming—ideal for shared enterprise cloud deployments with OAuth authentication.


---

## Frontier, MLOps & Scenarios

### Q091. What is JEPA (Joint-Embedding Predictive Architecture — I-JEPA & V-JEPA), and why does it predict in representation space instead of pixel/token space?
Generative models (like Masked Autoencoders or pixel video predictors) force the network to reconstruct every unpredictable surface detail (individual leaves on a tree, water ripples, camera grain). **JEPA** instead encodes both the visible context $x$ and masked target $y$ into abstract embeddings ($s_x, s_y$) and trains a Predictor to estimate $\hat{s}_y$ from $s_x$ and mask position tokens $z$—learning high-level semantic World Models at a fraction of the compute.

### Q092. In JEPA, what is Representation Collapse, and how does the EMA Target Encoder prevent it?
If both the Context Encoder and Target Encoder were trained directly by gradient descent on $\|\hat{s}_y - s_y\|_2^2$, both networks could cheat by outputting a constant vector $\mathbf{0}$ for every input, achieving $0$ loss while learning nothing (**Representation Collapse**). JEPA prevents collapse by applying **stop-gradient** to the Target Encoder and updating its weights $\bar{\theta}$ as a slow **Exponential Moving Average (EMA)** of the Context Encoder: $\bar{\theta} \leftarrow \tau\bar{\theta} + (1-\tau)\theta$.

### Q093. How do State Space Models like Mamba achieve O(L) linear scaling compared to O(L^2) Transformer Self-Attention?
Transformers compute pairwise attention across all $L$ tokens ($O(L^2)$ compute and growing KV cache). **Mamba (Selective SSM)** processes sequences recurrently through a fixed-size hidden state $h_t = \bar{\mathbf{A}}(x_t)h_{t-1} + \bar{\mathbf{B}}(x_t)x_t$ where matrices $\bar{\mathbf{A}}, \bar{\mathbf{B}}, \mathbf{C}$ are functions of the current token $x_t$ (allowing selective memory of important tokens) while using a hardware-aware parallel scan during training for **$O(L)$ linear scaling** and $O(1)$ inference memory per step.

### Q094. How does a Sparse Mixture of Experts (MoE) layer work, and why does it need an Auxiliary Load-Balancing Loss?
An MoE layer replaces a single dense FNN with $N$ expert FNNs and a linear **Router** $G(x) = \operatorname{Softmax}(\operatorname{TopK}(x \cdot W_g))$ that activates only $K=2$ experts per token. Without regularization, the router suffers **routing collapse**—sending all tokens to the same 1 or 2 experts that warmed up first. An **Auxiliary Load-Balancing Loss** (or expert capacity factor) encourages uniform token distribution across all $N$ experts.

### Q095. Explain LoRA (Low-Rank Adaptation) and QLoRA mathematically. Why does LoRA save so much GPU VRAM?
Instead of updating a huge frozen pretrained weight matrix $W_0 \in \mathbb{R}^{d \times k}$ (which requires storing full-size Adam optimizer states $m_t, v_t$), **LoRA** freezes $W_0$ and injects a low-rank update $\Delta W = B A$ where $A \in \mathbb{R}^{r \times k}$, $B \in \mathbb{R}^{d \times r}$, and rank $r \ll d$ (e.g., $r = 16$ vs. $d = 4096$). This cuts trainable parameters by $>99\%$. **QLoRA** goes further by quantizing the frozen base model $W_0$ to **4-bit NormalFloat (NF4)** with paged optimizers, allowing a 70B model to be fine-tuned on a single GPU.

### Q096. Compare RLHF (PPO) vs. DPO (Direct Preference Optimization) for aligning LLMs with human preferences.
**RLHF with PPO** requires training a separate Reward Model on `(chosen, rejected)` pairs and then running complex Reinforcement Learning across 4 models in memory (Policy, Reference, Critic, Reward). **DPO (Direct Preference Optimization)** mathematically reparameterizes the reward function in terms of the policy LLM itself, optimizing preference alignment directly via a simple binary cross-entropy loss on `(prompt, chosen, rejected)` triples with no separate Reward Model or RL loop.

### Q097. What is Test-Time Compute Scaling in modern Reasoning Models, and when does an 8B model with test-time search beat a 70B model?
Instead of spending compute only during pre-training and emitting a single greedy forward pass, **Test-Time Compute** allocates extra inference tokens to generate internal reasoning steps, explore multiple solution branches, run code/math verifiers, and backtrack on errors. On multi-step math, logic, and coding tasks, a smaller model given verification search budget at inference time frequently outperforms a $5\text{--}10\times$ larger single-pass model.

### Q098. How do you serve LLMs at high throughput in production (vLLM vs. naive HuggingFace .generate())?
Naive `.generate()` pads requests to the longest sequence and pre-allocates contiguous GPU memory slabs for `max_seq_len`, wasting $60\%+$ of VRAM on fragmentation. **vLLM** uses **PagedAttention** (managing KV Cache in non-contiguous virtual memory blocks like OS RAM pages) and **Continuous (In-Flight) Batching** (inserting new user requests into the batch the millisecond an earlier request finishes generating), boosting throughput by $10\text{--}20\times$.

### Q099. What is the difference between Data Drift (Covariate Shift) and Concept Drift in MLOps monitoring?
**Data Drift (Covariate Shift):** The distribution of input features $P(X)$ changes, while the true relationship $P(Y|X)$ stays the same (e.g., a marketing campaign brings in younger users; detect with **Population Stability Index PSI** or KS-test). **Concept Drift:** The underlying meaning $P(Y|X)$ changes for the exact same inputs (e.g., customer spending behavior during a sudden lockdown or new fraud tactics), requiring model retraining on fresh labels.

### Q100. 2026 Enterprise Case Study (Asked at Indore Hubs — Persistent / Impetus / Yash / InfoBeans): Design an enterprise Copilot that answers questions across both unstructured PDF contracts AND a live PostgreSQL database.
**Winning 4-Layer Architecture:** 1. **Ingestion & Storage:** Parse PDFs with layout-aware Markdown chunking into a Vector DB (pgvector/Qdrant) with tenant RBAC metadata; expose the PostgreSQL read-replica schema (`@mcp.resource`) and a read-only SQL execution tool (`@mcp.tool`) via an **MCP Server**. 2. **Intent Router / Agent:** A ReAct or LangGraph agent inspects the query—routing contract policy questions to **Hybrid RAG + Cross-Encoder Reranker**, and numeric analytics questions to the **MCP SQL Tool** (or both for multi-hop questions). 3. **Guardrails:** Enforce read-only SQL transactions, row-level tenant filtering, PII redaction, and `temperature=0.0` with mandatory source citations. 4. **Observability:** Log traces in LangSmith/Arize and run nightly automated **RAGAS** and SQL-execution accuracy benchmarks.
