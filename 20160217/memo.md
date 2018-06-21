# Pythonで正規分布の平均値の信頼区間を計算する方法 (2016/02/17)

## 説明

* あまりにも基本的なことなのだが、ネット上で検索したら間違った例が意外と沢山見つかったので、以下に正しいと思われるコードを載せる。

```
import numpy as np
from scipy import stats

n_samples = 100
alpha     = 0.95

data     = np.random.randn(n_samples)

mean_val = np.mean(data)
sem_val  = stats.sem(data)  # standared error of the mean
ci       = stats.t.interval(alpha, len(data)-1, loc=mean_val, scale=sem_val)
  
print('mean:', mean_val)
print('confidence interval:', ci)

```

## 補足

* 使うのはT分布であって、正規分布ではない。サンプル数が大きい場合には差はほぼ無いが、小さい場合には真の平均値 (この場合は0) を含む区間の割合が95%から大きくずれてしまう。

* また、SEMは標準偏差をサンプル数Nのルートで割ったものだが、標準偏差の計算にはNでなくN-1を用いた方が良い。つまり、N-1を用いて標準偏差を計算した後で、それをNのルートで割るのが良い。前項と同様、サンプル数が小さい場合に差が顕著になる。stats.sem()を使えば大丈夫だが、numpyのstd()関数を使う場合は、デフォルトではNを使うようになっているので注意。