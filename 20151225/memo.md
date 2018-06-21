# L0正則化のQUBOへの変換 (2015/12/25)

## 説明

* 以下の圧縮センシングを考える。
    $$\begin{align} 
    y = A x + \eta.
    \end{align}$$
    * 観測値: $y \in R^M$
    * 観測行列: $A \in R^{M\times N}$, $M<N$
    * 推定したい入力: $x \in R^N$
    * ノイズ: $\eta \in R^M$

* この問題を$x$がスパース (多くの成分が0) という仮定のもとで解く。L1正則化がよく用いられるが、ここではL0正則化を考える。ここで$\lambda>0$はパラメータを表す。
    $$\begin{align} 
    \min_x\Bigl\{ \frac{1}{2}\Vert y - A x\Vert_2^2 + \lambda \Vert x\Vert_0\Bigr\}.
    \end{align}$$

* この問題を以下の形式で表されるQUBO (quadratic unconstrained binary optimization) にマッピングする方法を考える。ここで$z_i\in\{0,1\}$. 尚、$z_i^2=z_i$より、自己結合成分は一次の項として書くことも出来る。
    $$\begin{align} 
    H = \sum_{i,j} Q_{ij} z_i z_j.
    \end{align}$$



# QUBOへのマッピング

* まず、$x_n\ (n=1,2,\ldots,N)$をL-bitで表す。ここで$d$, $C$は範囲を表す定数を表す。
    $$\begin{align} 
    x_n &= 2^{-d}(2^0z_{n,1}+2^1z_{n,2}\cdots+2^{L-1}z_{n,L}) - C,\\
        &= 2^{-d}\sum_{l=1}^L 2^{l-1}z_{n,l} - C.
    \end{align}$$

* 次に、$x_n$のL0ノルムを表すための補助ビット$w_n\in\{0,1\}$を用意する。基底状態において$w_n=\Vert x_n\Vert_0$を満たすよう、次のような罰金項を追加する。
    $$\begin{align} 
    E_n = \sum_{l=1}^L(1-w_n)z_{n,l}.
    \end{align}$$

* 目的関数は次のようになる。ここで$\nu>0$はパラメータを表す。
    $$\begin{align} 
    H = \frac{1}{2}\sum_{m=1}^M \left(y_m - \sum_{n=1}^N a_{mn}x_n\right)^2+\lambda\sum_{n=1}^N w_n + \nu\sum_{n=1}^N E_n.
    \end{align}$$
  
* 第一項は次のように展開出来る。
    $$\begin{align} 
    H_1 &= \frac{1}{2}\sum_{m=1}^M \left(y_m - \sum_{n=1}^N a_{mn}x_n\right)^2,\\
    & = \frac{1}{2}\sum_{m=1}^M \left(y_m^2 - 2y_m\sum_{n=1}^N a_{mn}x_n+\sum_{n=1}^N\sum_{n'=1}^N a_{mn}a_{mn'}x_n x_{n'}\right),\\
    &= \frac{1}{2}\sum_{m=1}^M y_m^2-\sum_{n=1}^N h_nx_n+\frac{1}{2}\sum_{n=1}^N\sum_{n'=1}^N J_{nn'}x_nx_{n'},\\
    h_n &= \sum_{m=1}^M y_m a_{mn},\\
    J_{nn'} &= \sum_{m=1}^M a_{mn}a_{mn'}.
    \end{align}$$

* 第一項を展開したうちの第二項は次のように展開出来る。
    $$\begin{align} 
    H_{1,2} &= -\sum_{n=1}^N h_nx_n,\\
    &= -\sum_{n=1}^N h_n\left(2^{-d}\sum_{l=1}^L 2^{l-1}z_{n,l} - C\right),\\
    &= -2^{-d}\sum_{n=1}^N \sum_{l=1}^L h_n2^{l-1}z_{n,l} + C\sum_{n=1}^N h_n.
    \end{align}$$

* 第一項を展開したうちの第三項は次のように展開出来る。ただし、$J_{nn'}=J_{n'n}$を使った。
    $$\begin{align} 
    H_{1,3} &= \frac{1}{2}\sum_{n=1}^N\sum_{n'=1}^N J_{nn'}x_nx_{n'},\\
    &= \frac{1}{2}\sum_{n=1}^N\sum_{n'=1}^N J_{nn'}\left(2^{-d}\sum_{l=1}^L 2^{l-1}z_{n,l} - C\right)\left(2^{-d}\sum_{l'=1}^L 2^{l'-1}z_{n',l'} - C\right),\\
    &=2^{-2d-1}\sum_{n=1}^N\sum_{n'=1}^N \sum_{l=1}^L \sum_{l'=1}^L J_{nn'}2^{l+l'-2}z_{n,l}z_{n',l'}\\
    &\quad-2^{-d}C\sum_{n=1}^N\sum_{n'=1}^N \sum_{l=1}^L J_{nn'}2^{l-1}z_{n,l}+\frac{C^2}{2}\sum_{n=1}^N\sum_{n'=1}^N J_{nn'}.
    \end{align}$$

* 以上をまとめると、目的関数は以下のようになる。
    $$\begin{align} 
    H &=2^{-2d-1}\sum_{n=1}^N\sum_{n'=1}^N \sum_{l=1}^L \sum_{l'=1}^L J_{nn'}2^{l+l'-2}z_{n,l}z_{n',l'}\\
    &\quad-2^{-d}C\sum_{n=1}^N\sum_{n'=1}^N \sum_{l=1}^L J_{nn'}2^{l-1}z_{n,l}\\
    &\quad-2^{-d}\sum_{n=1}^N \sum_{l=1}^L h_n2^{l-1}z_{n,l}\\
    &\quad+\lambda\sum_{n=1}^N w_n + \nu\sum_{n=1}^N \sum_{l=1}^L(1-w_n)z_{n,l} + \mathrm{const.,}\\
    h_n &= \sum_{m=1}^M y_m a_{mn},\\
    J_{nn'} &= \sum_{m=1}^M a_{mn}a_{mn'}.
    \end{align}$$


* 最終的に必要なスピン数は$N(L+1)$になる。