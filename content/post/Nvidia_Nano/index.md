# 刷机

- 硬件连接
  刷机之前，先使用跳线帽/跳线的两端分别连接Jetson Xavier NX开发板的第三个引脚FC_REC与第四个引脚GND（开发板进行短接后，通电会进入recovery模式），之后电源端口接入 19V 电源, Micro-usb 端口接入配套的 Micro USB 线连到ubuntu 系统的主机上。
  
  ![](/home/yubao/images/2025-03-11-15-19-48-dd0e9a38b682cfc66972abb733593aea.jpg)

- 安装sdkmanager
  https://developer.nvidia.com/sdk-manager

- 运行Nvidia SDK manager
  
  ```sh
  sdkmanager
  ```

<img title="" src="file:///home/yubao/images/2025-03-11-14-55-33-image.png" alt="" width="359">

登陆帐号，出现下面界面，则说明链接开发板成功。

![](/home/yubao/images/2025-03-11-16-06-39-image.png)

Step 1:

![](/home/yubao/images/2025-03-11-15-12-38-image.png)

Step 2:

这个过程需要输入本机管理员密码。

![](/home/yubao/images/2025-03-11-15-15-09-image.png)

Step 3:

![](/home/yubao/images/2025-03-11-15-18-14-image.png)

如遇到以下问：

![](/home/yubao/images/2025-03-11-15-49-49-image.png)

查看板子是否被识别到：

![](/home/yubao/images/2025-03-11-16-05-42-image.png)

# CUDA

## CUDA, CUDNN version

- https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html

nvcc --version 显示的是CUDA runtime API的版本

nvidia-smi显示的是driver API的版本

通常，driver api的版本能向下兼容runtime api的版本**，即 **nvidia-smi 显示的版本大于nvcc --version 的版本通常不会出现大问题。

## CUDA Toolkit

- https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local

```shell
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/arm64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.8.1/local_installers/cuda-tegra-repo-ubuntu2204-12-8-local_12.8.1-1_arm64.deb
sudo dpkg -i cuda-tegra-repo-ubuntu2204-12-8-local_12.8.1-1_arm64.deb
sudo cp /var/cuda-tegra-repo-ubuntu2204-12-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-8 cuda-compat-12-8
```

## Your GPU Compute Capability

- [CUDA GPUs - Compute Capability | NVIDIA Developer](https://developer.nvidia.com/cuda-gpus)
- [Jetson Products](https://developer.nvidia.com/embedded/develop/hardware)

| GPU                                                                                                                                                                                                                                                                                                     | Compute Capability |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [Jetson AGX Orin](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/), [Jetson Orin NX](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/), [Jetson Orin Nano](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) | 8.7                |
| [Jetson AGX Xavier](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-agx-xavier/), [Jetson Xavier NX](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-xavier-nx/)                                                                                      | 7.2                |
| [Jetson TX2](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-tx2/)                                                                                                                                                                                                             | 6.2                |
| [Jetson Nano](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-nano/)                                                                                                                                                                                                           | 5.3                |

## CUDNN

- [cuDNN 9.8.0 Downloads | NVIDIA Developer](https://developer.nvidia.com/cudnn-downloads?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local)

```shell
wget https://developer.download.nvidia.com/compute/cudnn/9.8.0/local_installers/cudnn-local-tegra-repo-ubuntu2204-9.8.0_1.0-1_arm64.deb
sudo dpkg -i cudnn-local-tegra-repo-ubuntu2204-9.8.0_1.0-1_arm64.deb
sudo cp /var/cudnn-local-tegra-repo-ubuntu2204-9.8.0/cudnn-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cudnn
```

## Pytorch版本选择

- https://pytorch.org/

应该选择与 nvcc --version 对应的CUDA版本匹配的Pytorch
