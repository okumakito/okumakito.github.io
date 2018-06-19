# A brief proof of the Holm's method (2018/06/18)

## The Holm's method

* The Holm's method (also known as the Holm-Bonferroni method) is a method for controlling the familywise error rate (FWER) in multiple comparisons.

* It is less conservative than the Bonferroni's method; that is, more comparisons are judged as significant in the Holm's method than in the Bonferroni's method.

* The reason for this discrepancy comes from the fact that the Holm's method implicitly considers the number of comparisons where the alternative hypothesis is true, whereas the Bonferroni's method does not.

* Procedure:
    * For sorted p-values $p_1\leq p_2\leq\cdots\leq p_n$ and a given significance level $\alpha$, select p-values iteratively from the smallest one as long as the criterion $p_i\leq \alpha/(n-i+1)$ is met.
    * Stop the iteration at the first violation of the criterion.
    * Reject the hypotheses corresponding to the selected p-values.

* I here give a brief proof why the Holm's method is able to control the FWER.

## A brief proof

* Assume that the null hypothesis is true for $n_0$ comparisons and the alternative hypothesis is true for the remaining $n-n_0$ comparisons.

* Let $I_0$ denote the index set corresponding to the comparisons where the null hypothesis is true. We then write:

    $$i^*=\arg\min_{i\in I_0}p_i.$$

* An upper bound of the FWER for the Holm's method is derived as follows (explanations are given after the equations):

    $$\begin{array}{c}
    \mathrm{FWER} &=& \mathbb{P}(\mathrm{FP}\geq 1),\\
    &\leq& \mathbb{P}(p_{i^*}\leq\frac{\alpha}{n-i^*+1}),\\
    &\leq& \mathbb{P}(p_{i^*}\leq\frac{\alpha}{n_0}),\\
    &=& \mathbb{P}\left(\bigcup_{i\in I_0}(p_i\leq\frac{\alpha}{n_0})\right),\\
    &\leq& \sum_{i\in I_0}\mathbb{P}(p_i\leq\frac{\alpha}{n_0}),\\
    &=& n_0\times\frac{\alpha}{n_0},\\
    &=& \alpha.
    \end{array}$$

    * Line 1: The FWER is, by definition, the probability that at least one false positive (FP) occurs.
    * Line 2: The occurrence of FP(s) implies that $p_{i^*}$ meets the criterion. This can be seen from its contraposition that if $p_{i^*}$ does not satisfy the criterion, the iteration must stop there according to the Holm's method, and thus no other comparisons where the null hypothesis is true are evaluated.
    * Line 3: Since all p-values less than or equal to $p_{i^*}$ (excluding itself) are corresponding to the alternative hypothesis, whose number is at most $n-n_0$, we obtain $i^*-1\leq n-n_0$. This gives $\alpha/(n-i^*+1)\leq\alpha/n_0$.
    * Line 4: The condition that the *minimum* p-value is less than or equal to $\alpha/n_0$ is equivalent to the condition that *at least one* p-value is less than or equal to $\alpha/n_0$.

    * Line 5: We here used the Boole's inequality.

    * Line 6: The cardinality of $I_0$ is $n_0$.

