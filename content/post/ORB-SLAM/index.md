+++
author = "Yubao"
title = "ORB_SLAM3"
date = "2024-12-10"
description = "ORB_SLAM3"
image = "https://camo.githubusercontent.com/1b85904badac830a45287a07cc68d4473141c343248512c51ee77324ad91112a/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f48794c4e712d39384c526f2f302e6a7067"
tags = [
    "ORB_SLAM", "SLAM",
]
categories = [
    "SLAM",
]
archives = ["2024/12"]
draft = false
+++

# Get ORB_SLAM3

```sh
git clone https://github.com/yubaoliu/ORB_SLAM3.git
cd ORB_SLAM3
git checkout dev
```

# Deploy ORB_SLAM3

- Build OpenCV
  OpenCV will be installed when you install the ROS.

- Build thirdparties

```sh
chmod +x build.sh
./build.sh
```


# 使用Realsense运行ORB_SLAM3
- Start realsense camera node

```sh
roslaunch realsense2_camera rs_rgbd.launch
```

- Start ORB_SLAM3 node

```sh
roslaunch orb_slam3 realsense.launch 
```

