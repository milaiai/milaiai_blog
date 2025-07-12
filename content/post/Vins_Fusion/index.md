+++
author = "Yubao"
title = "VINS FUSION"
date = "2022-04-16"
description = "VINS Fusion"
draft = "false"
image = "img/vins-fusion.jpg"
tags = [
    "VIO",
]
archives = ["2022/04"]

+++

# Introduction


VINS-Fusion 是继 VINS-Mono 和 VINS-Mobile（单目视觉惯导 SLAM 方案）后，香港科技大学沈劭劼老师开源的双目视觉惯导 SLAM 方案，VINS-Fusion 是一种基于优化的多传感器状态估计器，可实现自主应用（无人机，汽车和 AR / VR）的精确自定位。 VINS-Fusion 是 VINS-Mono 的扩展，支持多种视觉惯性传感器类型（单目摄像机+ IMU，双目摄像机+ IMU，甚至仅限双目摄像机）。开源项目组还展示了将 VINS 与 GPS 融合的模组示例。

# Build
- Get project
```sh
git clone https://github.com/yubaoliu/VINS-Fusion -b dev
```
- Ubuntu 16
- ROS
- OpenCV 3.x
```sh
set(OpenCV_DIR "/home/yubao/Software/install/opencv_3.3.1/share/OpenCV")
or
export OpenCV_DIR="/home/yubao/Software/install/opencv_3.3.1/share/OpenCV"
```
- compile
```sh
cd ROS_PROJECT_DIR
catkin_make
```

## Problems
### 编译错误
修改这些变量，之前使用的是C语言版本的API，并没有包含相应的头文件，所以报措。理论上加入相应的C版本的头文件是可以通过的，但是这是API已经不再使用，建议直接改成新的。
- CV_LOAD_IMAGE_GRAYSCALE -> cv::IMREAD_GRAYSCALE
- CV_GRAY2RGB -> cv::COLOR_RGB2GRAY
- CV_FONT_HERSHEY_SIMPLEX -> cv::FONT_HERSHEY_SIMPLEX

## 运行错误
Segment fault.

```sh
[ INFO] [1650104763.260207805]: reading paramerter of camera /home/yubao/catkin_ws/src/VINS-Fusion/config/euroc/cam0_mei.yaml
double free or corruption (out)
```

调用顺序
rosNodeTest.cpp:
```cpp
estimator.setParameter();
//->
featureTracker.readIntrinsicParameter(CAM_NAMES);
//->
camodocal::CameraPtr camera = CameraFactory::instance()->generateCameraFromYamlFile(calib_file[i]);
//->
cv::FileStorage fs( filename, cv::FileStorage::READ );
```

Refer this error: https://github.com/HKUST-Aerial-Robotics/VINS-Fusion/issues/106

这个问题我最终没有解决，错误原因应该是我使用的OpenCV是3.x，但是ROS noetic使用的OpenCV是4.x, ubuntu 20系统中的OpenCV也是4.x. 很可能是因为OpenCV版本冲突。

最终，放弃本机编译，决定使用docker,一劳永逸。


# References

- [Vins-Fusion安装记录](https://zhuanlan.zhihu.com/p/432167383)
- [彻底搞懂视觉-惯性SLAM：vins-fusion原理精讲与源码剖析-视觉传感器部分](https://www.bilibili.com/video/BV1YY41147k2)
- [一起快速上手 VINS-Fusion](https://zhuanlan.zhihu.com/p/62988961)
