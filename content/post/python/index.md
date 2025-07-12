---
author: "Yubao"
title: "Python"
image: "img/cover.jpg"
draft: false
date: 2024-01-28
description: "python"
tags: ["python","conda","pip","conda"]
archives: ["2024/01"]
---

# Conda

- https://docs.anaconda.com/free/anaconda/install/linux/
  
  ```sh
  wget -c https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Linux-x86_64.sh
  ```

# pip

- [pip使用国内镜像源](https://www.runoob.com/w3cnote/pip-cn-mirror.html)

- Usefusl
  
  ```sh
  pip3 install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

- ``~/.pip/pip.conf``
  
  ```sh
  [global]
  index-url = https://pypi.tuna.tsinghua.edu.cn/simple
  [install]
  trusted-host = https://pypi.tuna.tsinghua.edu.cn
  ```

- pip国内的一些镜像
  
  - 阿里云 http://mirrors.aliyun.com/pypi/simple/
  - 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
  - 豆瓣(douban) http://pypi.douban.com/simple/
  - 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
  - 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

# Pytorch

- https://pytorch.org/

```sh
pip3 install torch torchvision torchaudio
```

# Pip source list

https://www.cnblogs.com/chenjo/p/14071864.html

~/.pip/pip.conf

```sh
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host=mirrors.aliyun.com
```

# Set source list for pip install

```sh
pip install pymysql -i https://pypi.tuna.tsinghua.edu.cn/simple/

// 国内源
pip install 包名-i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
```

# References

- [pip安装包报错Could not find a version that satisfies the requirement pymysql (from versions: none)](https://zhuanlan.zhihu.com/p/361790784)
