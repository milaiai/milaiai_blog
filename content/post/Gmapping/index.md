+++
author = "Yubao"
title = "GMAPPING"
date = "2025-03-10"
description = "GMAPPING"
image = "https://vstoneofficial.github.io/lightrover_webdoc/img/gmapping_1.png"
tags = [
    "SLAM",
]
archives = ["2025/03"]
draft = false
+++


# Introduction

Gmapping是一个基于**2D激光雷达**使用**[RBPF](https://zhida.zhihu.com/search?content_id=146416736&content_type=Article&match_order=1&q=RBPF&zhida_source=entity)**（Rao-Blackwellized Particle Filters）算法完成**二维栅格地图**构建的SLAM算法。

**优点**：gmapping可以实时构建室内环境地图，在小场景中计算量少，且地图精度较高，对激光雷达扫描频率要求较低。

**缺点**：随着环境的增大，构建地图所需的内存和计算量就会变得巨大，所以gmapping不适合大场景构图。一个直观的感受是，对于200x200米的范围，如果栅格分辨率是5cm，每个栅格占用一个字节内存，那么每个粒子携带的地图都要16M的内存，如果是100粒子就是1.6G内存。

# SLAM问题分解

[FastSLAM](https://zhida.zhihu.com/search?content_id=146416736&content_type=Article&match_order=1&q=FastSLAM&zhida_source=entity)算法独辟蹊径，采用RBPF方法，将SLAM算法分解成两个问题。一个是机器人定位问题，另一个是已知机器人位姿进行地图构建的问题。

![](https://pic3.zhimg.com/v2-a00eededd72d4ff85e100d27a647a804_1440w.jpg)

其中p(x1:t | u1:t, z1:t)表示估计机器人的轨迹，p(m|x1:t, z1:t) 表示在已知机器人轨迹和传感器观测数据情况下，进行地图构建的闭式计算。

### 机器人轨迹增量估计分解

FastSLAM算法采用[粒子滤波](https://zhida.zhihu.com/search?content_id=146416736&content_type=Article&match_order=1&q=%E7%B2%92%E5%AD%90%E6%BB%A4%E6%B3%A2&zhida_source=entity)来估计机器人的位姿，并且为每一个粒子构建一个地图。所以，每一个粒子都包含了机器人的轨迹和对应的环境地图。 现在我们着重研究一下 p(x1:t | u1:t, z1:t) 估计机器人的轨迹 。 通过使用贝叶斯准则对 p(x1:t | u1:t, z1:t) 进行公式推导如式

![](https://pic4.zhimg.com/v2-54334a55337320b290ef84809acc0081_1440w.jpg)

经过上面的公式推导，这里将机器人轨迹估计转化成一个增量估计的问题，用p(x1:t-1 | u1:t-1, z1:t-1) 表示**上一时刻的机器人轨迹**，用上一时刻的粒子群表示。每一个粒子都用**运动学模型**p(xt | xt-1, ut)进行状态传播，这样就得到每个粒子对应的**预测轨迹** 。对于每一个传播之后的粒子，用**观测模型**p(zt | xt)进行**权重计算**归一化处理，这样就得到该时刻的机器人轨迹。之后根据估计的轨迹以及观测数据进行**地图构建**。



![](https://pic4.zhimg.com/v2-43de5710ed8810c7a40a212013c3231f_1440w.jpg)



# References

- [不可错过的gmapping算法使用与详细解释](https://zhuanlan.zhihu.com/p/262287388)


