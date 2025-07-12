+++
author = "Yubao"
title = "ROS Installation"
date = "2023-12-10"
description = "ROS Installation"
image = "img/cover.jpg"
tags = [
    "ROS",
]
archives = ["2023/12"]

+++

# Installation

- http://wiki.ros.org/ROS/Installation

# rosdep update

Error Message:

```sh
Warning: running 'rosdep update' as root is not recommended.
  You should run 'sudo rosdep fix-permissions' and invoke 'rosdep update' again without sudo.
  ERROR: error loading sources list:
          ('The read operation timed out',)
          reading in sources list data from /etc/ros/rosdep/sources.list.d
          Hit https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/osx-homebrew.yaml
          Hit https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/base.yaml
          Hit https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/python.yaml
          Hit https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/ruby.yaml
          Hit https://raw.githubusercontent.com/ros/rosdistro/master/releases/fuerte.yaml
          Query rosdistro index https://raw.githubusercontent.com/ros/rosdistro/master/index-v4.yaml
          Skip end-of-life distro "ardent"
          Skip end-of-life distro "bouncy"
          Skip end-of-life distro "crystal"
          Skip end-of-life distro "dashing"
          Skip end-of-life distro "eloquent"
          Add distro "foxy"
          ERROR: Service 'rdsslam' failed to build: The command '/bin/sh -c rosdep update' returned a non-zero code: 1
```

# References

- [rosdep update 超时失败2021最新解决方法](https://blog.csdn.net/Kenny_GuanHua/article/details/116845781)
  
  ```
  
  ```

# Common Questions

## usb_cam

Q:

```shell
WARNING: package "usb_cam" should not depend on metapackage "image_transport_plugins" but on its packages instead
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~  traversing 3 packages in topological order:
-- ~~  - test_pkg
-- ~~  - learning_topic
-- ~~  - usb_cam (plain cmake)
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CMake Error at /opt/ros/melodic/share/catkin/cmake/catkin_workspace.cmake:100 (message):
  This workspace contains non-catkin packages in it, and catkin cannot build
  a non-homogeneous workspace without isolation.  Try the
  'catkin_make_isolated' command instead.
Call Stack (most recent call first):
  CMakeLists.txt:67 (catkin_workspace)


-- Configuring incomplete, errors occurred!
Makefile:534: recipe for target 'cmake_check_build_system' failed
make: *** [cmake_check_build_system] Error 1
Invoking "make cmake_check_build_system" failed
```

A:

删除usb_cam文件下的**package.xml**
