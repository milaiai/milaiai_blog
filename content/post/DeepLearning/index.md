+++
author = "Yubao"
title = "深度学习"
date = "2025-03-10"
description = "深度学习"
image = "https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/08/21180434/into-to-nn-infograph2.jpg"
tags = [
    "DL",
]
archives = ["2025/03"]

+++

# Environment Setup

```sh
!pip install numpy scipy matplotlib ipython scikit-learn pandas pillow
```

# Introduction to Artificial Neural Network

![](https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/08/21180434/into-to-nn-infograph2.jpg)

# Activation Function

## Step function

```python
import numpy as np
import matplotlib.pylab as plt

def step_function(x):
    return np.array(x>0, dtype=np.int)

x = np.arange(-5.0, 5.0, 0.1)
y = step_function(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()
```

![image-20200322174612016](https://raw.githubusercontent.com/yubaoliu/assets/image/image-20200322174612016.png)

## Sigmoid Function

```sh
import numpy as np
import matplotlib.pylab as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

#  x = np.array([-1.0, 1.0, 2.0])
#  print(y)

x = np.arange(-5.0, 5.0, 0.1)
y = sigmoid(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()
```

![image-20200323231257374](https://raw.githubusercontent.com/yubaoliu/assets/image/image-20200323231257374.png)

## Relu Function

$$
f(x)=max(0,x)
$$

![](https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/08/21180750/2-1.png)

```sh
import numpy as np
import matplotlib.pylab as plt

def relu(x):
    return np.maximum(0, x)

#  x = np.array([-5.0, 5.0, 0.1])
#  print(y)

x = np.arange(-6.0, 6.0, 0.1)
y = relu(x)
plt.plot(x, y)
plt.ylim(-1, 6)
plt.show()
```

![image-20200323231159016](https://raw.githubusercontent.com/yubaoliu/assets/image/image-20200323231159016.png)

# 损失函数

## 平方和误差

Sum of squared error
$$
E = \frac{1}{2} \sum_{k} (y_k -t_k)^2
$$

## Cross Entropy error

$$
E = - \sum_k t_k log\ y_k
$$

# References

- [What is Rectified Linear Unit (ReLU)? | Introduction to ReLU Activation Function](https://www.mygreatlearning.com/blog/relu-activation-function/#:~:text=ReLU%20function%20is%20its%20derivative%20both%20are%20monotonic.,that%20has%20a%20range%20from%200%20to%20infinity.)
- [Machine Learning Glossary](https://ml-cheatsheet.readthedocs.io/en/latest/index.html)
- [GitHub - NVIDIA-AI-IOT/deepstream_lpr_app: Sample app code for LPR deployment on DeepStream](https://github.com/NVIDIA-AI-IOT/deepstream_lpr_app)