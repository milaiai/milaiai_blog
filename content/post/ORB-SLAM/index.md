+++
author = "Yubao"
title = "ORB_SLAM3"
date = "2019-03-10"
description = "ORB_SLAM3"
image = "img/cover.jpg"
tags = [
    "ORB_SLAM3",
]
archives = ["2021/12"]

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

