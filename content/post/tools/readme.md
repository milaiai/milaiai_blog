---
author: "Yubao"
title: "tools"
image: "img/cover.jpg"
draft: true
date: 2023-12-28
description: "tools"
tags: ["tools"]
archives: ["2023/12"]
---

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

