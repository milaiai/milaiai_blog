---
author: "yubao"
title: "OpenCV Usage"
image: "img/cover.jpg"
draft: false
date: 2021-12-14
description: "OpenCV"
tags: ["OpenCV"]
archives: ["2021/12"]
---

# CMake Usage

```sh
cmake_minimum_required(VERSION 2.8)
project( DisplayImage )
find_package( OpenCV REQUIRED )
include_directories( ${OpenCV_INCLUDE_DIRS} )
add_executable( DisplayImage DisplayImage.cpp )
target_link_libraries( DisplayImage ${OpenCV_LIBS} )
```

Basic variables:

- OpenCV_LIBS                     : The list of all imported targets for OpenCV modules.
- OpenCV_INCLUDE_DIRS             : The OpenCV include directories.
- OpenCV_COMPUTE_CAPABILITIES     : The version of compute capability.
- OpenCV_ANDROID_NATIVE_API_LEVEL : Minimum required level of Android API.
- OpenCV_VERSION                  : The version of this OpenCV build: "3.3.1"
- OpenCV_VERSION_MAJOR            : Major version part of OpenCV_VERSION: "3"
- OpenCV_VERSION_MINOR            : Minor version part of OpenCV_VERSION: "3"
- OpenCV_VERSION_PATCH            : Patch version part of OpenCV_VERSION: "1"
- OpenCV_VERSION_STATUS           : Development status of this build: ""

Advanced variables:

- OpenCV_SHARED                   : Use OpenCV as shared library
- OpenCV_INSTALL_PATH             : OpenCV location
- OpenCV_LIB_COMPONENTS           : Present OpenCV modules list
- OpenCV_USE_MANGLED_PATHS        : Mangled OpenCV path flag

Deprecated variables:

- OpenCV_VERSION_TWEAK            : Always "0"

# Test example

```cap
#include <stdio.h>
#include <opencv2/opencv.hpp>
using namespace cv;
int main(int argc, char** argv )
{
    if ( argc != 2 )
    {
        printf("usage: DisplayImage.out <Image_Path>\n");
        return -1;
    }
    Mat image;
    image = imread( argv[1], 1 );
    if ( !image.data )
    {
        printf("No image data \n");
        return -1;
    }
    namedWindow("Display Image", WINDOW_AUTOSIZE );
    imshow("Display Image", image);
    waitKey(0);
    return 0;
}
```

# Tips

- CUDA >= 12.0 is not supported in OpenCV 4.5.4.

## 如何确认 是否GPU加速的OpenCV版本

```cpp
   if (cv::cuda::getCudaEnabledDeviceCount() > 0) {
       std::cout << "GPU acceleration is available." << std::endl;
   } else {
       std::cout << "No GPU acceleration support found." << std::endl;
   }
   return 0;
```

```python
if cv2.cuda.getCudaEnabledDeviceCount() > 0:
    print("GPU is available!")
else:
    print("[Warning] GPU is not available!!")
```

Verify:

```py
import cv2
print(cv2.cuda.getCudaEnabledDeviceCount())
```

# Possible Errors

## fatal error: dynlink_nvcuvid.h: No such file or directory

```sh
In file included from /home/yubao/Software/opencv/build/modules/cudacodec/opencv_cudacodec_pch_dephelp.cxx:1:
/home/yubao/Software/opencv/modules/cudacodec/src/precomp.hpp:60:18: fatal error: dynlink_nvcuvid.h: No such file or directory
   60 |         #include <dynlink_nvcuvid.h>
         |                  ^~~~~~~~~~~~~~~~~~~
         compilation terminated.
```

cat modules/cudacodec/src/precomp.hpp

```cpp
#if CUDA_VERSION >= 9000
    #include <dynlink_nvcuvid.h>
#else
    #include <nvcuvid.h>
#endif
```

cuda10 does not provide dynlink_nvcuvid.h any more

- [OpenCV CUDA 10 安装 dynlink_nvcuvid.h 问题解决方法](https://www.cnblogs.com/penguins/p/10214817.html)

## error: ‘CODEC_FLAG_GLOBAL_HEADER’ was not declared in this scope

```sh
/home/yubao/Software/opencv/modules/videoio/src/cap_ffmpeg_impl.hpp:1573:21: error: ‘CODEC_FLAG_GLOBAL_HEADER’ was not declared in this scope; did you mean ‘AV_CODEC_FLAG_GLOBAL_HEADER’?
 1573 |         c->flags |= CODEC_FLAG_GLOBAL_HEADER;
      |                     ^~~~~~~~~~~~~~~~~~~~~~~~
      |                     AV_CODEC_FLAG_GLOBAL_HEADER
```

将CODEC_FLAG_GLOBAL_HEADER改为：

AV_CODEC_FLAG_GLOBAL_HEADER

vim modules/videoio/src/cap_ffmpeg_impl.hpp

```cpp
#define AV_CODEC_FLAG_GLOBAL_HEADER (1 << 22)
#define CODEC_FLAG_GLOBAL_HEADER AV_CODEC_FLAG_GLOBAL_HEADER
```

## error: ‘AVFMT_RAWPICTURE’ was not declared in this scope

```sh
/home/yubao/Software/opencv/modules/videoio/src/cap_ffmpeg_impl.hpp:1604:30: error: ‘AVFMT_RAWPICTURE’ was not declared in this scope
 1604 |     if (oc->oformat->flags & AVFMT_RAWPICTURE) {
```

```cpp
#define AVFMT_RAWPICTURE 0x0020
```

## char* str = PyString_AsString(obj)

```sh
/home/ai/yubao/opencv/modules/python/src2/cv2.cpp:652:1: warning: missing initializer for member ‘_typeobject::tp_print’ [-Wmissing-field-initializers]
/home/ai/yubao/opencv/modules/python/src2/cv2.cpp: In function ‘bool pyopencv_to(PyObject*, T&, const char*) [with T = cv::String; PyObject = _object]’:
/home/ai/yubao/opencv/modules/python/src2/cv2.cpp:856:34: error: invalid conversion from ‘const char*’ to ‘char*’ [-fpermissive]
  856 |     char* str = PyString_AsString(obj);
In file included from /home/ai/yubao/opencv/modules/python/src2/cv2.cpp:1498:
/home/ai/yubao/opencv/build/modules/python3/pyopencv_generated_types.h: In function ‘bool pyopencv_to(PyObject*, T&, const char*) [with T = cv::FileNode; PyObject = _object]’:
/home/ai/yubao/opencv/build/modules/python3/pyopencv_generated_types.h:1343:40: warning: implicitly-declared ‘constexpr cv::FileNode& cv::FileNode::operator=(const cv::FileNode&)’ is deprecated [-Wdeprecated-copy]
 1343 |     dst = ((pyopencv_FileNode_t*)src)->v;
```

Solution:

vim /home/ai/yubao/opencv/modules/python/src2/cv2.cpp

```sh
template<>
bool pyopencv_to(PyObject* obj, String& value, const char* name)
{
    (void)name;
    if(!obj || obj == Py_None)
        return true;
    //char* str = PyString_AsString(obj);
    const char* str = PyString_AsString(obj);
    if(!str)
        return false;
    value = String(str);
    return true;
}
```

## blenders.cpp

Error Message:

```sh
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp: In member function ‘virtual void cv::detail::MultiBandBlender::feed(cv::InputArray, cv::InputArray, cv::Point)’:
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:412:39: error: ‘cv::cuda::device’ has not been declared
             using namespace cv::cuda::device::blend;
                                       ^~~~~~
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:412:47: error: ‘blend’ is not a namespace-name
             using namespace cv::cuda::device::blend;
                                               ^~~~~
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:412:52: error: expected namespace-name before ‘;’ token
             using namespace cv::cuda::device::blend;
                                                    ^
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:415:17: error: ‘addSrcWeightGpu32F’ was not declared in this scope
                 addSrcWeightGpu32F(_src_pyr_laplace, _weight_pyr_gauss, _dst_pyr_laplace, _dst_band_weights, rc);
                 ^~~~~~~~~~~~~~~~~~
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:415:17: note: suggested alternative: ‘addWeighted’
                 addSrcWeightGpu32F(_src_pyr_laplace, _weight_pyr_gauss, _dst_pyr_laplace, _dst_band_weights, rc);
                 ^~~~~~~~~~~~~~~~~~
                 addWeighted
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:419:17: error: ‘addSrcWeightGpu16S’ was not declared in this scope
                 addSrcWeightGpu16S(_src_pyr_laplace, _weight_pyr_gauss, _dst_pyr_laplace, _dst_band_weights, rc);
                 ^~~~~~~~~~~~~~~~~~
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:419:17: note: suggested alternative: ‘addWeighted’
                 addSrcWeightGpu16S(_src_pyr_laplace, _weight_pyr_gauss, _dst_pyr_laplace, _dst_band_weights, rc);
                 ^~~~~~~~~~~~~~~~~~
                 addWeighted
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp: In member function ‘virtual void cv::detail::MultiBandBlender::blend(cv::InputOutputArray, cv::InputOutputArray)’:
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:554:41: error: ‘cv::cuda::device’ has not been declared
             using namespace ::cv::cuda::device::blend;
                                         ^~~~~~
/home/yubao/Software/opencv_3.3.1/modules/stitching/src/blenders.cpp:554:49: error: ‘blend’ is not a namespace-name
             using namespace ::cv::cuda::device::blend;
```

Solution:

Comment "BUILD_CUDA_STATUS".

## CV_GRAY2RGB

Error message:

```cpp
VINS-Fusion/vins_estimator/src/featureTracker/feature_tracker.cpp:456:36: error: ‘CV_GRAY2RGB’ was not declared in this scope
     cv::cvtColor(imTrack, imTrack, CV_GRAY2RGB);
                                    ^~~~~~~~~~~
```

Solution:

- Method1: Switch to OpenCV 3.x
  
  ```cpp
  https://docs.opencv.org/3.0.0/df/d4e/group__imgproc__c.html
  #include <opencv2/imgproc/types_c.h>
  or
  #include <opencv2/imgproc/imgproc_c.h>
  ```

- Mehthod2: modify parameters according to higher OpenCV version

# References
