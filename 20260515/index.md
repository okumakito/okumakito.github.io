# A brief explanation of relation between quantile function and mean (2026/05/15)

[gimmick: math]()

Given a continuous random variable \\(X\\) and its quantile function \\(Q(y)\\) with \\(y\in[0,1]\\), the following relation is known:

$$E[X]=\int_0^1Q(y)dy.$$

A brief explanation is given below.

### Annotations

* \\(f(x)\\): probability density function (PDF) of \\(X\\)

* \\(F(x)\\): cumulative distribution function (CDF) of \\(X\\)

* \\(Q(y)\\): quantile function (QF) satisfying \\(Q(y)=F^{-1}(y)\\)

### Preliminaries

* Relation between PDF and CDF:
  $$F'(x) = f(x).$$

* Definition of the mean:
  $$E[X] = \int_{-\infty}^\infty x f(x) dx.$$

* Variable transformation: If \\(X\\) is transformed as \\(x=g(y)\\) and \\(y=h(x)\\) where \\(g\\) is monotonic and \\(h=g^{-1}\\), the mean becomes as follows:
  $$\begin{align}E[X] &= \int_0^1 g(y) f(g(y)) |g'(y)|dy,\\\\
  &=\int_0^1 g(y) f(g(y)) \frac{1}{|h'(g(y))|}dy.\end{align}$$
  Intuitively, \\(|dx/dy|=|g'(y)|\\) can be seen as \\(dx=|g'(y)|dy\\). Similarly, \\(|dy/dx|=|h'(x)|\\) can be seen as \\(dy=|h'(x)|dx=|h'(g(y))|dx\\).

### Explanation

* Since  \\(y=F(x)\\) and \\(x=Q(y)\\), we can substitute \\(g\leftarrow Q\\) and \\(h\leftarrow F\\) as follows:
  $$E[X] =\int_0^1 Q(y) f(x) \frac{1}{|F'(x)|}dy.$$
  Here, arguments of \\(f\\) and \\(F\\) are intentionally kept as \\(x\\).

* Since \\(F'(x)=f(x)\\) and \\(f(x)\geq 0\ (\forall x)\\), we get:
  $$E[X]=\int_0^1Q(y)dy.$$

* Note that if there are regions with \\(f(x)=0\\), \\(F(x)\\) is constant within each region, and \\(Q(y)\\) has discrete changes there. However, such discontinuity doesn't affect the integral of \\(Q(y)\\).