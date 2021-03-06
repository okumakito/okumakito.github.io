# 3-SATからQUBOへの変換 (2015/12/10)

## 説明

* $n$ 変数、$m$ 節の3-SATを $3m$ 頂点の最大独立集合問題 (maximum independent set, MIS) や最大クリーク問題に変換出来ることはよく知られている。

* MISは頂点数と同じ数のスピンを持つQUBO (quadratic unconstrained binary optimization) にマッピング出来る ([Lucas, *Frontiers in Physics* (2014)](http://dx.doi.org/10.3389/fphy.2014.00005)). しかも結合係数は$\{1,0,-1\}$の3値で済む。

* 一方、結合係数を3値に限らなければ、$n+\min(m,n(2n-1))$ スピンでQUBOにマッピング出来る(と思う)。それをここで紹介する。

* きちんと文献調査した訳ではないので、既にどこかの論文で書いてあったり、或いはもっと効率の良いマッピングが知られていたりするかもしれない。

* (2015/12/11 一部修正) 罰金項の強さを1より大きく設定するよう修正。こうしないと補助変数に関する制約が必ずしも満たされない。

## 3体相互作用の扱いについて

* 3変数の相互作用は、[Perdomo-Ortiz, et al., *Scientific Reports* (2012)](http://dx.doi.org/10.1038/srep00571)で提案されている方法 (Supplementary Information, p. 9)を使って2体相互作用に分解出来る。

    * $x_1 x_2 x_3$という項を、新たに補助変数$y=x_1 x_2$を導入することで、$y x_3$と書ける。エネルギー最小状態で$y=x_1 x_2$を満たすように、以下のような罰金項を追加する。

    $$\begin{align} 
    E = c(3y+x_1 x_2-2 y x_1-2y x_2).
    \end{align}$$

    * ここで$c>0$は罰金項の強さを調節するパラメータ。$x_i\in\{0,1\}$なので、$y=x_1 x_2$を満たせば$E=0$, $y\neq x_1 x_2$なら$E>0$である。

## マッピング

* 3-SAT
$$\begin{align} 
\Psi(x_1,\ldots,x_n,\overline x_1,\ldots,\overline x_n)&=(x_1^{(1)}\vee x_2^{(1)}\vee x_3^{(1)})\wedge\ldots\wedge(x_1^{(m)}\vee x_2^{(m)}\vee x_3^{(m)}),\\
x_i^{(p)}&\in\{x_1,\ldots,x_n,\overline x_1,\ldots,\overline x_n\}.
\end{align}$$

* スピン
$$\begin{align} 
x_i &\in \{0,1\},\quad (i=1,\ldots,n),\\
\overline x_i &= 1 - x_i.
\end{align}$$

* 目的関数 ($c>1$なら、基底状態において$H=0$ならば充足可能)
$$\begin{align} 
H &= \sum_{p=1}^m (1-x_1^{(p)})(1-x_2^{(p)})(1-x_3^{(p)}), \\
&= \sum_{p=1}^m (1-x_1^{(p)}-x_2^{(p)}-x_3^{(p)}+x_1^{(p)}x_2^{(p)}+x_1^{(p)}x_3^{(p)}+x_2^{(p)}x_3^{(p)}-x_1^{(p)}x_2^{(p)}x_3^{(p)}),\\
&= \sum_{p=1}^m (1-x_1^{(p)}-x_2^{(p)}-x_3^{(p)}+x_1^{(p)}x_2^{(p)}+x_1^{(p)}x_3^{(p)}+x_2^{(p)}x_3^{(p)}-y^{(p)}x_3^{(p)}\\
&\qquad +c(3y^{(p)}+x_1^{(p)}x_2^{(p)}-2y^{(p)}x_1^{(p)}-2y^{(p)}x_2^{(p)})).
\end{align}$$

* 補助変数の制約が基底状態では必ず満たされる理由

    * 仮に制約を1つ破っていたスピン配位があったとする ($y^{(p)}\neq x_1^{(p)}x_2^{(p)}$)、その状態から$y^{(p)}$を正しい値に変えたとする。

    * そのとき、罰金項全体で $c$ 以上エネルギーが減り、それ以外では$-y^{(p)}x_3^{(p)}$の項によりエネルギーは増えたとしても高々1である。なので、$c>1$ならトータルでエネルギーが減る。

    * 従って、補助変数に関する制約を1つ破っている状態はエネルギー最小状態には成り得ない。

    * 複数の異なる補助変数が制約を破っている場合も、それぞれを修正しても他に影響が無いので、やはり修正した方がエネルギーが低くなる。

    * 同じ補助変数が $k$ 回現れる場合も、修正により減る分が $ck$、増える分は高々 $k$ なので、やはり修正した方がエネルギーが低くなる。

    * 以上より、$c>1$ の場合、基底状態であれば、補助変数は全て正しい値を取る。

  

* 追加した補助ビットの数
$$\begin{align} 
\min(m, \left(\begin{array}{c}2n\\2\end{array}\right))=\min(m,n(2n-1)).
\end{align}$$




  
