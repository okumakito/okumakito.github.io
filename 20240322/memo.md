# A generalized earth mover's distance with horizontal and vertical transformation (2024/03/22)

## Motivations

Conventional earth mover's distance (EMD) is only based on horizontal transformation (transportation of mass from one place to another), in which differences in low frequency components of distribution shapes are emphasized. To make EMD more sensitive to differences in high frequency components, vertical transformation (local addition or deletion of mass) is also allowed, leading to a generalized EMD.

## Notations

* $P, Q$: Two distributions to be compared.

* $p_i$, $q_i$: probability mass at point $i$ for $P$ and $Q$, respectively.

* $f_{ij}$: flow from point $i$ to point $j$.

* $d_{ij}$: ground distance between point $i$ and point $j$.

* $f_i$: addition (positive) or deletion (negative) at point $i$.

* $\alpha$: a parameter for controlling the balance between horizontal and vertical transformation.

## Conventional EMD (horizontal transformation only)

* Definition
$$\begin{align}D(P,Q)=&\min_{\{f_{ij}\}}\sum_{i,j}f_{ij}d_{ij}\\
&\mathrm{subject\ to}\quad f_{ij}\geq 0,\ \sum_j f_{ij}=p_i,\
\sum_i f_{ij}=q_j.\end{align}$$
* An equivalent representation that allows relay transportation
$$\begin{align}D(P,Q)=&\min_{\{f_{ij}\}\setminus\{f_{ii}\}}\sum_{i,j,i\neq j}f_{ij}d_{ij}\\
&\mathrm{subject\ to}\quad f_{ij}\geq 0,\ \sum_{j,j\neq i}(f_{ij}-f_{ji})=p_i-q_i.\end{align}$$

## A generalized EMD (both horizontal and vertical transformation)

$$\begin{align}\tilde D(P,Q)=&\min_{\{f_{ij}\}\setminus\{f_{ii}\},\{f_i\}}\left[\alpha\sum_{i,j,i\neq j}f_{ij}d_{ij}+(1-\alpha)\sum_i|f_i|\right]\\
&\mathrm{subject\ to}\quad f_{ij}\geq 0,\ \sum_{j,j\neq i} (f_{ij}-f_{ji}-f_i)=p_i-q_i.\end{align}$$