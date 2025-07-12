---
author: "Yubao"
title: "Colmap"
image: "img/cover.jpg"
draft: false
date: 2024-01-19
description: "Colmap"
tags: ["colmap"]
archives: ["2024/01"]
---


# Install

- Get repo
```sh
git clone https://github.com/colmap/colmap
```
- https://colmap.github.io/install.html
- install dependencies
```sh
sudo apt-get install \
    git \
    cmake \
    ninja-build \
    build-essential \
    libboost-program-options-dev \
    libboost-filesystem-dev \
    libboost-graph-dev \
    libboost-system-dev \
    libeigen3-dev \
    libflann-dev \
    libfreeimage-dev \
    libmetis-dev \
    libgoogle-glog-dev \
    libgtest-dev \
    libsqlite3-dev \
    libglew-dev \
    qtbase5-dev \
    libqt5opengl5-dev \
    libcgal-dev \
    libceres-dev
```
- ``vim CMakeLists.txt``
```sh
set(CMAKE_CUDA_ARCHITECTURES 75 86)
``` 
- build
```sh
git clone https://github.com/colmap/colmap.git
cd colmap
mkdir build
cd build
cmake .. -GNinja
ninja
sudo ninja install
```
