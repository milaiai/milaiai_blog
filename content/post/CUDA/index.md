---
author: "yubao"
title: "Nvidia-cuda"
image: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*Z_vXwV0SPudOAdlZnoAkWA.png"
draft: false
date: 2025-07-01
description: "Nvidia-cuda"
tags: ["Nvidia"]
archives: ["2025/07"]
---

# Cuda

- [CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)

- set env
  
  ```sh
  export PATH=/usr/local/cuda/bin:$PATH
  ```

- [CUDA Toolkit 12.3](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_local)
  
  ```sh
  wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
  sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
  wget https://developer.download.nvidia.com/compute/cuda/12.3.2/local_installers/cuda-repo-ubuntu2004-12-3-local_12.3.2-545.23.08-1_amd64.deb
  sudo dpkg -i cuda-repo-ubuntu2004-12-3-local_12.3.2-545.23.08-1_amd64.deb
  sudo cp /var/cuda-repo-ubuntu2004-12-3-local/cuda-*-keyring.gpg /usr/share/keyrings/
  sudo apt-get update
  sudo apt-get -y install cuda-toolkit-12-3
  ```

Install Driver

```sh
sudo apt-get install -y cuda-drivers

sudo apt-get install -y nvidia-kernel-open-545
sudo apt-get install -y cuda-drivers-545
```

# Cudnn

- https://developer.nvidia.com/rdp/cudnn-archive 
# 查看显卡计算能力 Compute Capability

[GeForce and TITAN Products](https://developer.nvidia.com/cuda-gpus)
Geforce RTX 3060    8.6

# Check Nvidia version

## deviceQuery

```sh
cd /usr/local/cuda-11.3/samples/1_Utilities/deviceQuery

./devicequery
```

Copy to HOME folder to make if not maked before.

```sh
~./deviceQuery
./deviceQuery Starting...

 CUDA Device Query (Runtime API) version (CUDART static linking)

Detected 1 CUDA Capable device(s)

Device 0: "NVIDIA GeForce RTX 3060 Laptop GPU"
  CUDA Driver Version / Runtime Version          11.4 / 11.3
  CUDA Capability Major/Minor version number:    8.6
  Total amount of global memory:                 5947 MBytes (6235422720 bytes)
  (030) Multiprocessors, (128) CUDA Cores/MP:    3840 CUDA Cores
  GPU Max Clock rate:                            1702 MHz (1.70 GHz)
  Memory Clock rate:                             7001 Mhz
  Memory Bus Width:                              192-bit
  L2 Cache Size:                                 3145728 bytes
  Maximum Texture Dimension Size (x,y,z)         1D=(131072), 2D=(131072, 65536), 3D=(16384, 16384, 16384)
  Maximum Layered 1D Texture Size, (num) layers  1D=(32768), 2048 layers
  Maximum Layered 2D Texture Size, (num) layers  2D=(32768, 32768), 2048 layers
  Total amount of constant memory:               65536 bytes
  Total amount of shared memory per block:       49152 bytes
  Total shared memory per multiprocessor:        102400 bytes
  Total number of registers available per block: 65536
  Warp size:                                     32
  Maximum number of threads per multiprocessor:  1536
  Maximum number of threads per block:           1024
  Max dimension size of a thread block (x,y,z): (1024, 1024, 64)
  Max dimension size of a grid size    (x,y,z): (2147483647, 65535, 65535)
  Maximum memory pitch:                          2147483647 bytes
  Texture alignment:                             512 bytes
  Concurrent copy and kernel execution:          Yes with 2 copy engine(s)
  Run time limit on kernels:                     Yes
  Integrated GPU sharing Host Memory:            No
  Support host page-locked memory mapping:       Yes
  Alignment requirement for Surfaces:            Yes
  Device has ECC support:                        Disabled
  Device supports Unified Addressing (UVA):      Yes
  Device supports Managed Memory:                Yes
  Device supports Compute Preemption:            Yes
  Supports Cooperative Kernel Launch:            Yes
  Supports MultiDevice Co-op Kernel Launch:      Yes
  Device PCI Domain ID / Bus ID / location ID:   0 / 1 / 0
  Compute Mode:
     < Default (multiple host threads can use ::cudaSetDevice() with device simultaneously) >

deviceQuery, CUDA Driver = CUDART, CUDA Driver Version = 11.4, CUDA Runtime Version = 11.3, NumDevs = 1
Result = PASS
```

## NVIDIA X server settings

![https://linuxconfig.org/images/nvidia-check-version-application.png](https://linuxconfig.org/images/nvidia-check-version-application.png)

## lspci查看GPU型号

```sh
~ lspci | grep -i nvidia
01:00.0 VGA compatible controller: NVIDIA Corporation Device 2560 (rev a1)
01:00.1 Audio device: NVIDIA Corporation Device 228e (rev a1)
```

## nvidia-smi

Fan：显示风扇转速，数值在0到100%之间，是计算机的期望转速，如果计算机不是通过风扇冷却或者风扇坏了，显示出来就是N/A；
Temp：显卡内部的温度，单位是摄氏度；
Perf：表征性能状态，从P0到P12，P0表示最大性能，P12表示状态最小性能；
Pwr：能耗表示；
Bus-Id：涉及GPU总线的相关信息；
Disp.A：是Display Active的意思，表示GPU的显示是否初始化；
Memory Usage：显存的使用率；
Volatile GPU-Util：浮动的GPU利用率；
Compute M：计算模式；

## Check driver version

查看NVIDIA驱动版本

```sh
 ~ cat /proc/driver/nvidia/version
 NVRM version: NVIDIA UNIX x86_64 Kernel Module  470.86  Tue Oct 26 21:55:45 UTC 2021
 GCC version:  gcc version 8.4.0 (Ubuntu 8.4.0-3ubuntu2)
```

OR

```sh
udo dpkg --list | grep nvidia-*
[sudo] password for yubao:
ii  libnvidia-cfg1-470:amd64                        470.86-0ubuntu0.20.04.1                    amd64        NVIDIA binary OpenGL/GLX configuration library
ii  libnvidia-common-465                            470.86-0ubuntu0.20.04.1                    all          Transitional package for libnvidia-common-470
ii  libnvidia-common-470                            470.86-0ubuntu0.20.04.1                    all          Shared files used by the NVIDIA libraries
ii  libnvidia-compute-465:amd64                     470.86-0ubuntu0.20.04.1                    amd64        Transitional package for libnvidia-compute-470
ii  libnvidia-compute-470:amd64                     470.86-0ubuntu0.20.04.1                    amd64        NVIDIA libcompute package
ii  libnvidia-compute-470:i386                      470.86-0ubuntu0.20.04.1                    i386         NVIDIA libcompute package
ii  libnvidia-container-tools                       1.7.0-1                                    amd64        NVIDIA container runtime library (command-line tools)
ii  libnvidia-container1:amd64                      1.7.0-1                                    amd64        NVIDIA container runtime library
```

# Errors

```sh
F1213 06:10:43.716547   365 im2col.cu:61] Check failed: error == cudaSuccess (209 vs. 0)  no kernel image is available for execution on the device
*** Check failure stack trace: ***
    @     0x7fe53d7a20cd  google::LogMessage::Fail()
    @     0x7fe53d7a3f33  google::LogMessage::SendToLog()
    @     0x7fe53d7a1c28  google::LogMessage::Flush()
    @     0x7fe53d7a4999  google::LogMessageFatal::~LogMessageFatal()
    @     0x7fe53a9c0e95  caffe::im2col_gpu<>()
    @     0x7fe53a7bfeb6  caffe::BaseConvolutionLayer<>::conv_im2col_gpu()
    @     0x7fe53a7bffb6  caffe::BaseConvolutionLayer<>::forward_gpu_gemm()
    @     0x7fe53a971c41  caffe::ConvolutionLayer<>::Forward_gpu()
    @     0x7fe53a8e5322  caffe::Net<>::ForwardFromTo()
    @     0x7fe53a8e5437  caffe::Net<>::Forward()
    @     0x7fe53e1d210a  Classifier::Predict()
    @     0x7fe53e1c2549  segnet_ros::SegNet::SegmentImage()
    @     0x7fe53e1c5088  segnet_ros::SegNet::Run()
    @     0x7fe53b53ebcd  (unknown)
    @     0x7fe53b3156db  start_thread
    @     0x7fe53cf2571f  clone
[segnet_action_server-2] process has died [pid 351, exit code -6, cmd /root/catkin_ws/devel/lib/segnet_ros/segnet_action_server __name:=segnet_action_server __log:=/root/.ros/log/5ff90f90-5bdb-11ec-be69-e02be97a7691/segnet_action_server-2.log].
log file: /root/.ros/log/5ff90f90-5bdb-11ec-be69-e02be97a7691/segnet_action_server-2*.log
```

Solution:

- Check Your GPU Compute Capability
  [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus)
- [ caffe运行错误： im2col.cu:61] Check failed: error == cudaSuccess (8 vs. 0) invalid device function](https://www.cnblogs.com/haiyang21/p/7381032.html)
- [error == cudaSuccess (209 vs. 0) no kernel image is available for execution on the device](https://viencoding.com/article/216)
- [Nvidia/Titan RTX Check failed: error == cudaSuccess (48 vs. 0) no kernel image is available for execution on the device 1290](https://github.com/CMU-Perceptual-Computing-Lab/openpose/issues/1290)

# References

- [NVIDIA CUDA Toolkit Release Notes](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html) 
