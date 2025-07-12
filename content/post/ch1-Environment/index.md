+++
author = "Yubao"
title = "机器人开发环境介绍"
date = "2019-03-10"
description = "机器人开发环境介绍"
image =  "img/robot-world-coordinate.png"
tags = [
    "Robotics",
]
archives = ["2019/03"]

+++


# 机器人开发环境介绍

In this section, we will tintroduce:

1. the usage case of robots
2. the development environment for simulation (Python + conda)

# 概率机器人详解

概率机器人详解 [Homepage](https://b.ueda.tech/?page=lnpr)

课件: [ryuichiueda/LNPR_SLIDES](https://github.com/ryuichiueda/LNPR_SLIDES)

原书代码:  [ryuichiueda/LNPR_BOOK_CODES](https://github.com/ryuichiueda/LNPR_BOOK_CODES)

My source code: https://github.com/yubaoliu/Probabilistic-Robotics.git

# Robot Introduction

Soccer match:

<iframe width="640" height="480" src="https://www.youtube.com/embed/WuXJ6PxEbNM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Human support robot:

<iframe width="640" height="480" src="https://www.youtube.com/embed/dnHwkP_-tOY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Note:  you can find these videos on https://space.bilibili.com/52620240 too.

# Environment Deployment

- (optional) Anyconda or other virtual Python environment
- Jupyter notebook

You can refer https://www.ybliu.com/2021/01/OpenCV-Python-Development.html to deploy a conda-based development environment.

<iframe src="//player.bilibili.com/player.html?aid=586392884&bvid=BV1Mz4y1D7QJ&cid=289217789&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="620" height="640"> </iframe>

#  Test Environment

## Run jupyter notebook

```sh
jupyter notebook
```

## Add vitual env to notebook:

```sh
conda install -c anaconda ipykernel
python -m ipykernel install --user --name=robotics

jupyter notebook
```

# Draw world coordinate

![](https://github.com/ryuichiueda/LNPR_SLIDES/blob/master/figs/world.png?raw=true)

Source code:

```sh
import matplotlib.pyplot as plt

class World:
    def __init__(self):
        pass
    def draw(self):
        fig = plt.figure(figsize=(8, 8))
        ax = fig.add_subplot(111)
        ax.set_xlim(-5, 5)
        ax.set_ylim(-5, 5)
        ax.set_xlabel("X", fontsize=20)
        ax.set_ylabel("Y", fontsize=20)
        plt.show()
        
world = World()
world.draw()
```

