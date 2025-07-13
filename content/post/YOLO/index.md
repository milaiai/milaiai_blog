+++
author = "Yubao"
title = "YOLO"
date = "2025-02-25"
description = "YOLO"
tags = [
    "YOLO",
]
categories = [
    "YOLO",
]
draft = false
image = "https://datawhalechina.github.io/thorough-pytorch/%E7%AC%AC%E4%B9%9D%E7%AB%A0/figures/pipeline.jpg"
+++

# onnx

## Introduction

![框架](https://datawhalechina.github.io/thorough-pytorch/%E7%AC%AC%E4%B9%9D%E7%AB%A0/figures/pipeline.jpg)

- ONNX官网：https://onnx.ai/

- ONNX GitHub：https://github.com/onnx/onnx

> **ONNX( Open Neural Network Exchange)** 是 Facebook (现Meta) 和微软在2017年共同发布的，用于标准描述计算图的一种格式。ONNX通过定义一组与环境和平台无关的标准格式，使AI模型可以在不同框架和环境下交互使用，ONNX可以看作深度学习框架和部署端的桥梁，就像编译器的中间语言一样。由于各框架兼容性不一，我们通常只用 ONNX 表示更容易部署的静态图。硬件和软件厂商只需要基于ONNX标准优化模型性能，让所有兼容ONNX标准的框架受益。目前，ONNX主要关注在模型预测方面，使用不同框架训练的模型，转化为ONNX格式后，可以很容易的部署在兼容ONNX的运行环境中。目前，在微软，亚马逊 ，Facebook(现Meta) 和 IBM 等公司和众多开源贡献的共同维护下，ONNX 已经对接了下图的多种深度学习框架和多种推理引擎。
> 
> **ONNX Runtime** 是由微软维护的一个跨平台机器学习推理加速器，它直接对接ONNX，可以直接读取.onnx文件并实现推理，不需要再把 .onnx 格式的文件转换成其他格式的文件。PyTorch借助ONNX Runtime也完成了部署的最后一公里，构建了 PyTorch --> ONNX --> ONNX Runtime 部署流水线，我们只需要将模型转换为 .onnx 文件，并在 ONNX Runtime 上运行模型即可。

## Installation

```sh
# 激活虚拟环境
conda activate env_name # env_name换成环境名称
# 安装onnx
pip install onnx 
# 安装onnx runtime
pip install onnxruntime # 使用CPU进行推理
# pip install onnxruntime-gpu # 使用GPU进行推理
```

## ONNX模型的检验

```py
import onnx
# 我们可以使用异常处理的方法进行检验
try:
    # 当我们的模型不可用时，将会报出异常
    onnx.checker.check_model(self.onnx_model)
except onnx.checker.ValidationError as e:
    print("The model is invalid: %s"%e)
else:
    # 模型可用时，将不会报出异常，并会输出“The model is valid!”
    print("The model is valid!")
```

## 模型转换为ONNX格式

```py
import torch.onnx 
# 转换的onnx格式的名称，文件后缀需为.onnx
onnx_file_name = "xxxxxx.onnx"
# 我们需要转换的模型，将torch_model设置为自己的模型
model = torch_model
# 加载权重，将model.pth转换为自己的模型权重
# 如果模型的权重是使用多卡训练出来，我们需要去除权重中多的module. 具体操作可以见5.4节
model = model.load_state_dict(torch.load("model.pth"))
# 导出模型前，必须调用model.eval()或者model.train(False)
model.eval()
# dummy_input就是一个输入的实例，仅提供输入shape、type等信息 
batch_size = 1 # 随机的取值，当设置dynamic_axes后影响不大
dummy_input = torch.randn(batch_size, 1, 224, 224, requires_grad=True) 
# 这组输入对应的模型输出
output = model(dummy_input)
# 导出模型
torch.onnx.export(model,        # 模型的名称
                  dummy_input,   # 一组实例化输入
                  onnx_file_name,   # 文件保存路径/名称
                  export_params=True,        #  如果指定为True或默认, 参数也会被导出. 如果你要导出一个没训练过的就设为 False.
                  opset_version=10,          # ONNX 算子集的版本，当前已更新到15
                  do_constant_folding=True,  # 是否执行常量折叠优化
                  input_names = ['input'],   # 输入模型的张量的名称
                  output_names = ['output'], # 输出模型的张量的名称
                  # dynamic_axes将batch_size的维度指定为动态，
                  # 后续进行推理的数据可以与导出的dummy_input的batch_size不同
                  dynamic_axes={'input' : {0 : 'batch_size'},    
                                'output' : {0 : 'batch_size'}})
```

## 使用ONNX Runtime进行推理

```py
# 导入onnxruntime
import onnxruntime
# 需要进行推理的onnx模型文件名称
onnx_file_name = "xxxxxx.onnx"

# onnxruntime.InferenceSession用于获取一个 ONNX Runtime 推理器
ort_session = onnxruntime.InferenceSession(onnx_file_name)  

# 构建字典的输入数据，字典的key需要与我们构建onnx模型时的input_names相同
# 输入的input_img 也需要改变为ndarray格式
ort_inputs = {'input': input_img} 
# 我们更建议使用下面这种方法,因为避免了手动输入key
# ort_inputs = {ort_session.get_inputs()[0].name:input_img}

# run是进行模型的推理，第一个参数为输出张量名的列表，一般情况可以设置为None
# 第二个参数为构建的输入值的字典
# 由于返回的结果被列表嵌套，因此我们需要进行[0]的索引
ort_output = ort_session.run(None,ort_inputs)[0]
# output = {ort_session.get_outputs()[0].name}
# ort_output = ort_session.run([output], ort_inputs)[0]
```

1. PyTorch模型的输入为tensor，而ONNX的输入为array，因此我们需要对张量进行变换或者直接将数据读取为array格式，我们可以实现下面的方式进行张量到array的转化。

```py
def to_numpy(tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()
```

## ONNX可视化

- https://github.com/lutzroeder/netron

# 模型推理

## 如何使用torch.hub进行推理

- 依赖
  
  ```shell
  pip install ultralytics
  ```

-　使用

```shell
  torch.hub.load(
  repo_or_dir, 
  model, 
  *args, 
  ource='github', or 'local'
  force_reload=False,
  verbose=True,
  skip_validation=False, **kwargs)
```

```shell
import torch
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # official model
model = torch.hub.load('ultralytics/yolov5:master', 'yolov5s')  # from branch
model = torch.hub.load('ultralytics/yolov5', 'custom', 'yolov5s.pt')  # custom/local model
model = torch.hub.load('.', 'custom', 'yolov5s.pt', source='local')  # local repo
```

- 在线推理

```sh
import torch

# Model loading
# model = torch.hub.load("ultralytics/yolov5", "yolov5s")  # Can be 'yolov5n' - 'yolov5x6', or 'custom'

model = torch.hub.load(
            "./",
            "custom",
            path=f"{local_model_path}/{model_name}",
            device=device,
            source='local',
            force_reload=[True if "refresh_yolov5" in opt else False][0],
            _verbose=True,
)

# Inference on images
img = "https://ultralytics.com/images/zidane.jpg"  # Can be a file, Path, PIL, OpenCV, numpy, or list of images

# Run inference
results = model(img)

# Display results
results.print()  # Other options: .show(), .save(), .crop(), .pandas(), etc.
```

- 评论

    1. 需要安装ultralytics与torchvision, 可能不太适合Raspery Pi等嵌入式平台
    2. 需要yolo源码，需要hubconf.py入口脚本
    3. ``model = torch.hub.load("ultralytics/yolov5", "yolov5s")``是从github下载

# Jetson Nano

## version

- nvcc

```shell
$ nvcc --version                                                                               
nvcc: NVIDIA (R) Cuda compiler driver                                                                                             
Copyright (c) 2005-2024 NVIDIA Corporation                                                                                        
Built on Wed_Aug_14_10:14:07_PDT_2024                                                                                             
Cuda compilation tools, release 12.6, V12.6.68                                                                                    
Build cuda_12.6.r12.6/compiler.34714021_0 
```

# References

- [9.1 使用ONNX进行部署并推理 &#8212; 深入浅出PyTorch](https://datawhalechina.github.io/thorough-pytorch/%E7%AC%AC%E4%B9%9D%E7%AB%A0/9.1%20%E4%BD%BF%E7%94%A8ONNX%E8%BF%9B%E8%A1%8C%E9%83%A8%E7%BD%B2%E5%B9%B6%E6%8E%A8%E7%90%86.html))

# Errors

- Start Jupyter Notebook inside vscde

Q:

```shell
The kernel failed to start due to the missing module 'decorator'. Consider installing this module.
Click <a href='https://aka.ms/kernelFailuresMissingModule'>here</a> for more info.
```

A:

```shell
conda install --name yolo --update-deps --force-reinstall ipykernel
```

- OpenCV CUDA

Q:

When use

```shell
model = cv2.dnn.readNetFromONNX('../runs/train/exp3/weights/best.onnx')

model.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA) # cv::dnn::DNN_BACKEND_CUDA. DNN_BACKEND_OPENCV
model.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA) # DNN_TARGET_CPU
```

Get this error:

```shell
Traceback (most recent call last):                                                                                                
  File "/home/nvidia/yolov5/detect/./cv_onnx.py", line 40, in <module>                                                      
    outputs = model.forward()                                                                                                     
cv2.error: OpenCV(4.11.0) /io/opencv/modules/dnn/src/net_impl.cpp:119: error: (-215:Assertion failed) preferableBackend != DNN_BAC
KEND_CUDA || IS_DNN_CUDA_TARGET(preferableTarget) in function 'validateBackendAndTarget' 
```
