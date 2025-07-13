+++
author = "Yubao"
title = "Tools"
date = "2024-08-01"
description = "Tools"
tags = [
    "Tools",
]
categories = [
    "Tools",
]
series = ["series_tool"]
aliases = ["aliases_tool"]
draft = true
+++

# Software

## Typro如何设置代理

- Method 1:

```sh
typora --proxy-server=address:port
```

- Method 2:

打开高级设置

![](https://i0.hdslb.com/bfs/article/b730151c71f8adcb68b638bfd5f5f37e9878f798.png@1256w_952h_!web-article-pic.avif)

```sh
"flags": [["proxy-server", "address:port"]]
"flags": [["proxy-server", "socks5://127.0.0.1:1080"]]
```

# Windows
## Office
- LKY Office Tools
- PDFgear

## Management
- MycomputerManager
- PowerToys

# Sophus

```sh
RUN git clone https://github.com/yubaoliu/Sophus.git \
    && cd Sophus \
    && git checkout master \
    && mkdir build \
    && cd build \
    && cmake .. -DCMAKE_BUILD_TYPE=Release \
    && make -j3 \
    && make install 
```

# G2O

```sh
RUN git clone https://github.com/yubaoliu/g2o.git \
    && cd g2o \
    && mkdir build \
    && cd build \
    && cmake .. -DCMAKE_BUILD_TYPE=Release \
    && make -j 3 \
    && make install
```

