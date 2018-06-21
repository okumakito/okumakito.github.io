# CIMの分岐点における支配的固有ベクトルの向きについて (2016/06/07)

## 説明

* CIM (Coherent Ising Machine) で最初に原点が不安定化してpitchfork分岐が起こる際の支配的固有ベクトルの向きについて確認した。

* 結論としては、結合行列$J$の最大固有値に対応する固有ベクトル (支配的固有ベクトル) と一致する。

* 一般には、このベクトルに符号関数を適用したものは、求めたいもの (ハミルトニアンを最小化するスピン配位) と一致しない。

* このことは、CIMで最初に生じる発振解は必ずしも解きたい組み合わせ最適化問題の最適解に対応していない、という数値計算での経験則を裏付けるものと考えられる。

* 別の観点では、行列の固有ベクトルが多項式時間で計算可能であるのに対し、イジングモデルの基底状態を求める問題はNP困難なので、P$\neq$NPが正しければそもそも一般には各成分の符号は一致しないはずである。


## 式と計算

* ハミルトニアン ($s_i\in\{\mbox{}-1,1\}$ $(i=1,2,\ldots,N)$, $J$は対称行列)
    $$\begin{align} 
    H = -\sum_{i,j}J_{ij}s_i s_j.
    \end{align}$$

* ただし、ここでは原点が平衡点となる状況を考えたいので、Zeeman項は0とした。

* $Jの$特性方程式
    $$\begin{align}
    |\lambda I - J|=0.
    \end{align}$$

* $J$の固有値 (上式の解)
    $$\begin{align}
    \lambda_1 \geq \lambda_2 \geq \ldots \geq \lambda_N.
    \end{align}$$
    
* $J$の固有ベクトルを並べた行列 (各列が固有ベクトル) を$P$とおくと、
    $$\begin{align}
    JP = P\Lambda.
    \end{align}$$

* CIMの式 (同相成分のみ、直角位相成分は0とおいた)
    $$\begin{align}
    \mathrm{d} c_i = [(-1+p-c_i^2)c_i + \sum_j \xi_{ij} c_j]\mathrm{d}t + \frac{1}{A_s}\sqrt{c_i^2+\frac{1}{2}}\mathrm{d}W_{i}.
    \end{align}$$

* 変数の置き換え ($-1+p\to\mu$, $c_i\to x_i$, $\xi_{ij}\to \alpha J_{ij}$, $\alpha>0$)
    $$\begin{align}
    \mathrm{d} x_i = [(\mu-x_i^2)x_i + \alpha\sum_j J_{ij}x_j]\mathrm{d}t + \sigma\mathrm{d}W_i.
    \end{align}$$

* ただし、ここでは分岐点近傍のみを考えるので、ノイズは一定強度とした。

* ノイズを除いた式
    $$\begin{align}
    \dot x_i = (\mu-x_i^2)x_i + \alpha\sum_j J_{ij}x_j.
    \end{align}$$

* 原点におけるヤコビアン ($J$が既に使われているので、ここでは$B$とおいた)
    $$\begin{align}
    B = \mu I + \alpha J.
    \end{align}$$

* 特性方程式
    $$\begin{align}
    |\lambda I - B|=|(\lambda-\mu)I-\alpha J|=0.
    \end{align}$$

* $B$の固有値 (上式の解、$J$の固有値を使って書ける)
    $$\begin{align}
    \alpha\lambda_1+\mu \geq \alpha\lambda_2+\mu \geq \ldots \geq \alpha\lambda_N+\mu.
    \end{align}$$

* $B$の固有ベクトルは$J$と同じであることが確認出来る。
    $$\begin{align}
    BP = (\mu I+\alpha J)P = \mu P+\alpha P\Lambda =P(\mu I +\alpha\Lambda).
    \end{align}$$

* 以上より、原点は$J$の最大固有値$\lambda_1$が$\alpha\lambda_1+\mu<0$のとき安定であり、これが0となった時に分岐が起こり、その際の支配的固有ベクトルは$J$の支配的固有ベクトルに等しい。