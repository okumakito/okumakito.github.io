# 累積距離を用いた検定 (2024/05/07)

## 背景

* Kolmogorov-Smirnov検定 (以下、KS検定) は、分布の形を一切仮定せずに、2つの確率分布が異なることを示したいときによく用いられる。ただし、検出力がかなり低いという問題がある。

* KS検定は、比較したい2つの分布のそれぞれの累積分布の差の絶対値の上限を検定統計量として使う。

* 一方、下記論文で累積距離が提案された。これは累積分布の差の2乗の面積などに基づく。

  * Iwayama, Hirata, Aihara: Definition of distance for nonlinear time series analysis of marked point process data, Physics Letters A (2017). doi: 10.1016/j.physleta.2016.10.061.

* 以下に累積距離を仮説検定に用いる場合の具体的な検定統計量とp値の計算式を書く。

## 準備

* 確率変数 $X$ の累積分布関数を $F_X(v)$ と書き、生存関数を $S_X(v)$ と書く。
  $$\begin{align}
  F_X(v) &= P(X\leq v),\\
  S_X(v) &= 1 - F_X(v) = P(X>v).\end{align}$$

* 定義関数を $I$ を以下のように書く。
  $$\begin{align}
  I(v\geq c)&=\left\{\begin{array}{ccc}1&\mathrm{if}&v\geq c,\\0&\mathrm{if}&v<c,\end{array}\right.\\
  I(v< c)&=\left\{\begin{array}{ccc}1&\mathrm{if}&v< c,\\0&\mathrm{if}&v\geq c.\end{array}\right.
  \end{align}$$

* 比較したい2群を $x=\{x_1,\ldots,x_n\}$, $y=\{y_1,\ldots,y_m\}$ と書く。

* 経験累積分布と経験生存関数は定義関数を用いて以下のように展開出来る。
  $$\begin{align}
  F_X(v)&=\frac{1}{n}\sum_{i=1}^n I(v\geq x_i),\\
  F_Y(v)&=\frac{1}{m}\sum_{i=1}^m I(v\geq y_i),\\
  S_X(v)&=\frac{1}{n}\sum_{i=1}^n I(v< x_i),\\
  S_Y(v)&=\frac{1}{m}\sum_{i=1}^m I(v< y_i).	
  \end{align}$$

* 全体の最小値と最大値を $a=\min(x\cup y)$, $b=\max(x\cup y)$ と書く。

## 累積距離

* 仮説検定ではマーク無し点過程の場合の累積距離を使う。
  $$D = \sqrt{\int_a^b\left(F_X(v)-F_Y(v)\right)^2dv+
  \int_a^b\left(S_X(v)-S_Y(v)\right)^2dv}.$$
  ここで $(S_X(v)-S_Y(v))^2=(1-F_X(v)-1+F_Y(v))^2=(F_X(v)-F_Y(v))^2$ だが、都合によりこのままにしておく。

* ルートの中身の第一項と第二項をそれぞれ展開する。
  $$\begin{align}
  \int_a^b(F_X(v)-F_Y(v))^2dv &=
  \int_a^b F_X(v)^2dv+\int_a^b F_Y(v)^2dv-2\int_a^b F_X(v)F_Y(v)dv,\\
  \int_a^b(S_X(v)-S_Y(v))^2dv &=
  \int_a^b S_X(v)^2dv+\int_a^b S_Y(v)^2dv-2\int_a^b S_X(v)S_Y(v)dv.
  \end{align}$$

* ひとまず上下の式のそれぞれ右辺第一項を展開する。
  $$\begin{align}
  \int_a^b F_X(v)^2dv&=\int_a^b \left(\frac{1}{n}\sum_{i=1}^n I(v\geq x_i)\right)\left(\frac{1}{n}\sum_{j=1}^n I(v\geq x_j)\right)dv,\\
  &=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n\int_a^b I(v\geq x_i)I(v\geq x_j)dv,\\
  &=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n(b-\max(x_i,x_j)),\\
  &=b-\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n\max(x_i,x_j),\\
  \int_a^b S_X(v)^2dv&=\int_a^b \left(\frac{1}{n}\sum_{i=1}^n I(v< x_i)\right)\left(\frac{1}{n}\sum_{j=1}^n I(v< x_j)\right)dv,\\
  &=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n\int_a^b I(v< x_i)I(v< x_j)dv,\\
  &=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n(\min(x_i,x_j)-a),\\
  &=-a+\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n\min(x_i,x_j).
  \end{align}$$

* 残りの項も同様に計算する。
  $$\begin{align}
  \int_a^b F_Y(v)^2dv&=b-\frac{1}{m^2}\sum_{i=1}^m\sum_{j=1}^m\max(y_i,y_j),\\
  \int_a^b F_X(v)F_Y(v)dv&=b-\frac{1}{nm}\sum_{i=1}^n\sum_{j=1}^m\max(x_i,y_j),\\
  \int_a^b S_Y(v)^2dv&=-a+\frac{1}{m^2}\sum_{i=1}^m\sum_{j=1}^m\min(y_i,y_j),\\
  \int_a^b S_X(v)S_Y(v)dv&=-a+\frac{1}{nm}\sum_{i=1}^n\sum_{j=1}^m\min(x_i,y_j).
  \end{align}$$

* ここで、$\max(v,w)-\min(v,w)=|v-w|$ より、ルートの中身は以下になる。
  $$\begin{align}
  D^2&=-\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n(\max(x_i,x_j)-\min(x_i,x_j))
  -\frac{1}{m^2}\sum_{i=1}^m\sum_{j=1}^m(\max(y_i,y_j)-\min(y_i,y_j))\\
  &\quad +\frac{2}{nm}\sum_{i=1}^n\sum_{j=1}^m(\max(x_i,y_j)-\min(x_i,y_j)),\\
  &=-\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n|x_i-x_j|
  -\frac{1}{m^2}\sum_{i=1}^m\sum_{j=1}^m|y_i-y_j|
  +\frac{2}{nm}\sum_{i=1}^n\sum_{j=1}^m|x_i-y_j|,\\
  &=2\langle|x_i-y_j|\rangle-\langle|x_i-x_j|\rangle-\langle|y_i-y_j|\rangle.
  \end{align}$$

* 従って、累積距離は以下になる。
  $$D=\sqrt{2\langle|x_i-y_j|\rangle-\langle|x_i-x_j|\rangle-\langle|y_i-y_j|\rangle}.$$

* この統計量は、異なる群に属する要素間の平均距離が同じ群に属する要素間の平均距離よりどれだけ大きいかを表している。直観的にも分かりやすい。

# $p$ 値の計算

* 帰無仮説が正しい場合に検定統計量が従う分布を解析的に解けないため、並べ替え検定を使って $p$ 値を計算する。

* $x$ と $y$ を結合した $z=\{z_1,\ldots,z_{n+m}\}=\{x_1,\ldots,x_n,y_1,\ldots,y_m\}$ を用意する。

* 各要素が以下で計算される行列 $U$ を用意する。
  $$u_{ij} = |z_i-z_j|,\quad (i=1,\ldots,n+m;\ j=1,\ldots,n+m).$$

* 行列 $U$ の行と列をそれぞれ $n$ 個と $m$ 個に分けるブロック行列を考える。
  $$
  U = \left[\begin{array}{cc}U_{11}&U_{12}\\U_{21}&U_{22}\end{array}\right].
  $$
  ただし、$U_{21}=U_{12}^T$ である。

* 行列 $A$ の全要素の平均を $\langle A\rangle$ と書くと、累積距離 $D$ は以下のように書ける。
  $$D=\sqrt{2\langle U_{12}\rangle-\langle U_{11}\rangle-\langle U_{22}\rangle}.$$	

* 以下を $K$ 回繰り返す (例えば1000回)。

  * $1$ から $n+m$ までの整数をランダムに並び替える。
  * その順番に従い $U$ の行と列をそれぞれ並び替えた行列を $U'$ とする。
  * $U'$ を使って $U$ と同様に累積距離 $D$ を計算する。$k$ 回目の試行の結果を $D_k$ と書く。

* 元データで計算した累積距離を $D$ として、$p$ 値を以下で計算する。
  $$p = \frac{1}{K}|\{D_k\mid D_k\geq D\}|.$$

## 数値計算

* 少し調べた限り、累積距離を用いた検定 (累積距離検定) は、分布の位置、尺度、形状の違いを捉えることが出来て、KS検定より検出力が高い傾向があった。詳しい調査はまたいつか。