---
author: "yubao"
title: "Caffe"
image: "img/cover.jpg"
draft: true
date: 2020-08-14
description: "Caffe"
tags: ["Caffe"]
archives: ["2021/12"]
---


# Installation

```sh
 sudo apt-get install libprotobuf-dev libleveldb-dev libsnappy-dev libopencv-dev libhdf5-serial-dev protobuf-compiler
```

# Commen Errors

## LMDB

```sh
Could NOT find LMDB (missing: LMDB_INCLUDE_DIR LMDB_LIBRARIES)
```

```sh
sudo apt install libgflags-dev libgoogle-glog-dev liblmdb-dev -y

```

## LevelDB
```sh
CMake Error at /usr/share/cmake-3.16/Modules/FindPackageHandleStandardArgs.cmake:146 (message):
  Could NOT find LevelDB (missing: LevelDB_INCLUDE LevelDB_LIBRARY)
  Call Stack (most recent call first):
    /usr/share/cmake-3.16/Modules/FindPackageHandleStandardArgs.cmake:393 (_FPHSA_FAILURE_MESSAGE)
      cmake/Modules/FindLevelDB.cmake:18 (find_package_handle_standard_args)
        cmake/Dependencies.cmake:44 (find_package)
          CMakeLists.txt:43 (include)
```

## nvcc fatal : Unsupported gpu architecture ‘compute_86‘

Solution:

原因可能是当前的Cuda版本不支持本机GPU的算力。

Method 1:

cmake/Cuda.cmake

```sh
set(Caffe_known_gpu_archs "30 35 50 52 60 61")

set(__nvcc_out "6.1")
```

这个方法能编译通过，但应该不是一个好的解决方案。

Methond 2:

Upgrade Cuda version
- [Windows下用cmake编译Caffe，配置pycaffe](https://blog.csdn.net/weixin_34248023/article/details/86011734)
- [GeForce and TITAN Products](https://developer.nvidia.com/cuda-gpus)

# References
- [2020 经历 ubuntu16.04下的 caffe installa](https://blog.csdn.net/golfbears/article/details/107762254)
