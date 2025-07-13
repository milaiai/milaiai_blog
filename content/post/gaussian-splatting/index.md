---
author: "Yubao"
title: "gaussian_splatting"
image: "img/cover.jpg"
draft: true
date: 2024-01-19
description: "3D-gausssian"
tags: ["3D-gaussian"]
archives: ["2024/01"]
---


# Install

- Cuda:  12.2
- conda env;

```sh
conda create -n gaussian_splatting python=3.8
conda activate gaussian_splatting

pip3 install torch torchvision torchaudio

pip3 install  plyfile tqdm  pillow

pip3 install submodules/diff-gaussian-rasterization
pip3 install submodules/simple-knn
```





