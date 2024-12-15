# Katz, et al. (1978) の近似式の導出 (2024/12/15)

## 背景と目的

* 陽性尤度比 (positive likelihood ratio, PLR, LR+) と陰性尤度比 (negative likelihood ratio, NLR, LR-) の信頼区間の近似式が [Katz, et al. (1978)](https://doi.org/10.2307/2530610) で提案されている。
* この論文のMethod Cの導出が書いていなかったのでここに載せる。

## Katzの近似式

* 陽性尤度比と陰性尤度比は、混同行列の要素をTP (true positive), FN (false negative), FP (false positive), TN (true negative) として以下で定義される。
  \begin{align}
  PLR&=\frac{TP/(TP+FN)}{FP/(FP+TN)},\\
  NLR&=\frac{FN/(TP+FN)}{TN/(FP+TN)}.\end{align}
* どちらも、二項分布に従う2つの独立な確率変数 $X_1\sim B(n_1,p_1)$, $X_2\sim B(n_2,p_2)$, $X_1 \perp\!\!\!\perp X_2$ を使って以下の形で表せる。
  $$T=\frac{X_1/n_1}{X_2/n_2}.$$
* Katzの論文のMethod Cでは以下の正規分布近似を使う。ただし、小文字は対応する確率変数の観測値とする。
  \begin{align}\log T &= \log\frac{X_1}{n_1} - \log\frac{X_2}{n_2},\\
  \log\frac{X_1}{n_1} &\sim N\left(\log\frac{x_1}{n_1}, \frac{1}{x_1}-\frac{1}{n_1}\right),\\
  \log\frac{X_2}{n_2} &\sim N\left(\log\frac{x_2}{n_2}, \frac{1}{x_2}-\frac{1}{n_2}\right),\\
  \log T &\sim N\left(\log\frac{x_1}{n_1} - \log\frac{x_2}{n_2}, \frac{1}{x_1}-\frac{1}{n_1} + \frac{1}{x_2}-\frac{1}{n_2}\right).\\
  \end{align}
* あとは正規分布の信頼区間を求めて指数関数で変換すれば $T$ の信頼区間になる。
* 平均はともかく分散が分かりづらいので次節で説明する。

<div style="page-break-after:always;"></div>
## 近似式の導出

* 対数を取る前の式の分母と分子に対して同じ形の正規分布近似を使うので、以下では片方だけ考える。
* 改めて、二項分布に従う確率変数 $X\sim B(n,p)$ を考える。
* さて、関数 $f(z) = \log z$ を $z=a$ のまわりでTaylor展開すると以下になる。
  \begin{align}f(z) &= f(a) + (z-a)f'(a) + \cdots,\\
  \log z&=\log a + (z-a)\frac{1}{a} + \cdots.
  \end{align}
* ここに $z=X/n$, $a=p$ を代入して1次の項で打ち切ると以下になる。
  $$\log\frac{X}{n} \simeq \log p + \left(\frac{X}{n}-p\right)\frac{1}{p}=
  \log p-1+\frac{X}{np}.$$
* つまり、対数関数を $X/n=p$ における接線で線形近似したことになる。当然、$X/n\approx p$ でなければ成り立たないので、$n$ は十分大きい必要がある。
* 平均値は以下になる。
  $$E\left[\log\frac{X}{n}\right] \simeq E\left[\log p-1+\frac{X}{np}\right] = \log p.$$
* 実際には真の $p$ の値は分からないので、推定値 $\hat p=x/n$ を $p$ に代入すると以下のようにKatzの式が出てくる。
  $$E\left[\log\frac{X}{n}\right] \simeq \log\frac{x}{n}.$$
* 同様に分散を計算すると以下のようになる。
  $$V\left[\log\frac{X}{n}\right] \simeq V\left[\log p-1+\frac{X}{np}\right]
  = \frac{np(1-p)}{(np)^2} = \frac{1-p}{np}.$$
* ここに $p \simeq \hat p=x/n$ を代入すると以下のようにKatzの式が出てくる。
  $$V\left[\log\frac{X}{n}\right] \simeq \frac{1-x/n}{n\cdot(x/n)}
  = \frac{1}{x} - \frac{1}{n}.$$

## 補足など

* 対数を取ることで分布の概形が正規分布に近くなる訳ではない。元々正規分布に十分近いことを仮定しており、その線形変換をしただけである。
