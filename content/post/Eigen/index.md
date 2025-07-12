+++
author = "Yubao"
title = "Eigen"
date = "2022-01-10"
description = "Eigen"
image =  "img/robot-world-coordinate.png"
tags = [
    "Eigen",
]
archives = ["2021/01"]

+++


 ## 1

```sh
In file included from /root/Pangolin/components/pango_opengl/include/pangolin/gl/gldraw.h:31:0,
                 from /root/Pangolin/components/pango_opengl/src/gldraw.cpp:29:
/root/Pangolin/components/pango_opengl/include/pangolin/gl/glformattraits.h:33:24: fatal error: Eigen/Core: No such file or directory
compilation terminated.
CMakeFiles/pango_opengl.dir/build.make:98: recipe for target 'CMakeFiles/pango_opengl.dir/components/pango_opengl/src/gldraw.cpp.o' failed
make[2]: *** [CMakeFiles/pango_opengl.dir/components/pango_opengl/src/gldraw.cpp.o] Error 1
CMakeFiles/Makefile2:830: recipe for target 'CMakeFiles/pango_opengl.dir/all' failed
make[1]: *** [CMakeFiles/pango_opengl.dir/all] Error 2
Makefile:148: recipe for target 'all' failed
```

出现这个问题首先要考虑是否安装了eigen库,可以进行以下命令检查：

```sh
sudo updatedb
locate eigen3
```

如果没装，安装：

```sh
sudo apt-get install libeigen3-dev
```

CMake:
```sh
set(Eigen3_DIR CMAKE_INSTALL_PREFIX/share/eigen3/cmake)
find_package(Eigen3 3.3 REQUIRED)

add_executable(optimization_benchmark optimization_benchmark.cpp)
target_link_libraries(optimization_benchmark Eigen3::Eigen)
```

## 2
```sh
/root/Pangolin/components/pango_vars/include/pangolin/var/varstate.h:33:15: fatal error: any: No such file or directory
compilation terminated.
CMakeFiles/pango_vars.dir/build.make:94: recipe for target 'CMakeFiles/pango_vars.dir/components/pango_vars/src/varstate.cpp.o' failed
make[2]: *** [CMakeFiles/pango_vars.dir/components/pango_vars/src/varstate.cpp.o] Error 1
make[2]: *** Waiting for unfinished jobs....
In file included from /root/Pangolin/components/pango_vars/include/pangolin/var/var.h:37:0,
                 from /root/Pangolin/components/pango_vars/include/pangolin/var/varextra.h:31,
                 from /root/Pangolin/components/pango_vars/src/vars.cpp:28:
/root/Pangolin/components/pango_vars/include/pangolin/var/varstate.h:33:15: fatal error: any: No such file or directory

CMake Error at CMakeLists.txt:88 (add_library):
  Target "pango_windowing" links to target "Eigen3::Eigen" but the target was
  not found.  Perhaps a find_package() call is missing for an IMPORTED
  target, or an ALIAS target is missing?
```

Solution:

```sh
cd Pangolin
./scripts/install_prerequisites.sh recommended
git checkout v0.6
```
