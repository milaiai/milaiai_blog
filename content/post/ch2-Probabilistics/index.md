+++
author = "Yubao"
title = "机器人概率基础"
date = "2025-07-10"
description = "机器人概率基础"
image = "img/landmark_obs.jpg"
toc = true
tags = [
    "Robotics","SLAM",
]
archives = ["2025/07"]

+++


![](https://github.com/ryuichiueda/LNPR_SLIDES/raw/39cbbb13e890b9dd0eecb09b5d4ec28f25aff61c/figs/sensor_experiment.jpg)



# 平均値

 $$\mu = \frac{1}{N}\sum_{i=0}^{N-1} z_i$$

- $z_0, z_1, \dots, z_{N-1}$: センサ値
- $N$: センサ値の個数

# 分散、標準偏差



$$\sigma^2 = \frac{1}{N-1}\sum_{i=0}^{N-1} (z_i - \mu)^2 \quad (N>1)$$

# (素朴な）確率分布

ここでやりたいこと: 度数分布から、
未来にどんなセンサ値が得られそうかを予想

* ただし、集める個数によって値が変わってはいけないので度数分布を頻度でなく割合に * $P_{\textbf{z}\text{LiDAR}}(z) = N_z / N$　（$N_z$: センサの値が$z$だった頻度） * 全センサ値の種類に関して$P_{\textbf{z}\text{LiDAR}}(z)$を足し合わせると1に
  $P_{\textbf{z}\text{LiDAR}}(z)$を確率と呼びましょう

# Samples

draw:


$$
z \sim P_{\textbf{z}\text{LiDAR}}
$$

# Probabilistic Model

![](https://github.com/ryuichiueda/LNPR_SLIDES/raw/39cbbb13e890b9dd0eecb09b5d4ec28f25aff61c/figs/sensor_200_histgram.png)

ガウス分布の当てはめ

连续的情况
$$
p(z | \mu, \sigma^2 ) = \frac{1}{\sqrt{2\pi}\sigma} e^{ - \frac{(z - \mu)^2}{2\sigma^2}}
$$

$$
p(x | \mu, \sigma^2 )
$$
- $\mu$: 平均値、$\sigma$: 標準偏差


![](https://github.com/ryuichiueda/LNPR_SLIDES/raw/39cbbb13e890b9dd0eecb09b5d4ec28f25aff61c/figs/gauss_200.png)

## 確率密度関数 Probability Density Function, PDF
ガウス分布からの確率の求め方: $p(x | \mu, \sigma^2 )$を積分
$p$の値を密度と言う
密度を積分すると確率に（体積と同じ）
例
センサの値が$210$より小さい確率: $P(z < 210) = \int_{-\infty}^{210} p(z | \mu, \sigma^2 ) dz$
センサの値が$210$: $P(z = 210) = \int_{-209.5}^{210.5} p(z | \mu, \sigma^2 ) dz$

密度を返す関数$p$: 確率密度関数
$p$の形状や$p$そのものも確率分布と呼ぶことがある
ガウス分布は特に$\mathcal{N}$と表記される
$$
\mathcal{N}(z | \mu, \sigma^2 ), \mathcal{N}(\mu, \sigma^2)
$$

などと表記



```python
from scipy.stats import norm

zs = range(190, 230)
ys = [ norm.pdf(z, mu, stddev) for z in zs ]

plt.plot(zs, ys)
plt.show()
```



## 累積分布関数 Cumulative Distribution Function, CDF


$P(z < a) = \int_{-\infty}^a p(z) dz$

を累積分布関数と呼ぶ
右図
$P(a \le z < b) = P(z < b) - P(z < a)$

![](https://github.com/ryuichiueda/LNPR_SLIDES/raw/39cbbb13e890b9dd0eecb09b5d4ec28f25aff61c/figs/cdf.png)



## 期待値



- 期待値: 無限にセンサ値をドローしたときの平均値

  $\langle z \rangle_{P(z)}$、$\langle z \rangle_{p(z)}$と表現

$$
\langle z \rangle_{P(z)} = \sum_{-\infty}^{\infty} zP(z)
$$

- 一般化した期待値
$z$が$p(z)$に従うとき、$f(z)$の値はどうなる？

$$
\langle f(z) \rangle_{p(z)} = \int_{-\infty}^{\infty} f(z)p(z) dz
$$

期待値の性質

線形性
$\big\langle f(z) + \alpha g(z) \big\rangle_{p(z)} = \big\langle f(z) \big\rangle_{p(z)} + \alpha \big\langle g(z) \big\rangle_{p(z)}$
$\big\langle f(z) + \alpha \big\rangle_{p(z)} = \big\langle f(z) \big\rangle_{p(z)} + \alpha \big\langle 1 \big\rangle_{p(z)} = \big\langle f(z) \big\rangle_{p(z)} + \alpha$

平均値
$\langle z \rangle_{p(z)} = \mu$、$\langle z - \mu \rangle_{p(z)} = 0$

分散
$\langle (z - \mu)^2 \rangle_{p(z)} = \sigma^2$
　
