+++
author = "Yubao"
title = "graphrag"
date = "2025-07-10"
description = "graphrag"
image="https://microsoft.github.io/graphrag/img/GraphRag-Figure1.jpg"
tags = [
    "RAG",
]
categories = [
    "RAG",
]
+++

# Graphrag

## Graphrag是什么?

GraphRAG 是一种结构化的、分层的检索增强生成（RAG）方法，而不是使用纯文本片段的语义搜索方法。GraphRAG 过程包括从原始文本中提取出知识图谱，构建社区层级(这种结构通常用来描述个体、群体及它们之间的关系，帮助理解信息如何在社区内部传播、知识如何共享以及权力和影响力如何分布)，为这些社区层级生成摘要，然后在执行基于 RAG 的任务时利用这些结构。

GraphRAG 是一个旨在利用大语言模型（LLMs）从非结构化文本中提取结构化数据的数据处理工具套件。

GraphRAG可以通过LLM来实现自动的创建知识图谱。

## Graphrag安装与配置

官方版本：

- https://github.com/microsoft/graphrag.git

- https://github.com/Azure-Samples/graphrag-accelerator.git 

Solution Accelerator 包，该包提供了与 Azure 资源的端到端用户体验。

但是在官方版本中不支持ollama本地大模型。如果使用官版本+Ollama会有很多的坑，部分代码需要修改。

找到一个可以作用本地ollam服务的版本：

- https://github.com/TheAiSingularity/graphrag-local-ollama.git

## graphrag-local-ollama 配置

- 安装ollama， https://ollama.com/download

Linux:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

Get LLM (https://ollama.com/library):

```sh
ollama pull mistral
ollama pull nomic-embed-text
```

- Conda environment, python version >= 3.10

```sh
conda create -n rag python=3.10
conda activate rag
pip install ollama
```

Ubuntu 20.04 安装 python3.10的方法：

```sh
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update

sudo apt install python3.10 python3.10-venv python3.10-dev

# install pip
wget https://bootstrap.pypa.io/get-pip.py
python3.10 get-pip.py
```

- 配置[graphrag-local-ollama](https://github.com/TheAiSingularity/graphrag-local-ollama)

```sh
git clone https://github.com/TheAiSingularity/graphrag-local-ollama.git
cd graphrag-local-ollama/
pip install -e .
```

- 准备测试数据

```sh
mkdir -p ./ragtest/input
cp input/* ./ragtest/input
```

- Initialize the ./ragtest folder to create the required files:

```sh
python -m graphrag.index --init --root ./ragtest
```

- 配置settings.yaml与.env

可以参考graphrag-local-ollama中的配置文件

```sh
cp settings.yaml ./ragtest
```

主要是修改以下内容：

```yaml
encoding_model: cl100k_base
skip_workflows: []
llm:
  api_key: ${GRAPHRAG_API_KEY}
  type: openai_chat # or azure_openai_chat
  model: mistral
  model_supports_json: true # recommended if this is available for your model.
  # max_tokens: 4000
  # request_timeout: 180.0
  api_base: http://localhost:11434/v1
embeddings:
  ## parallelization: override the global parallelization settings for embeddings
  async_mode: threaded # or asyncio
  llm:
    api_key: ${GRAPHRAG_API_KEY}
    type: openai_embedding # or azure_openai_embedding
    model: nomic-embed-text
    api_base: http://localhost:11434/api
```

如果是使用ollama, 那么不需要配置.env，不需要修改api_key。 需要修改两处model以及api_base.

如果ollama不是运行在本机，那么``http://localhost:11434``要替换成服务器的IP地址, 并确保端口是可访问的``sudo ufw allow 11434``.

- Run the indexing, which creates a graph:

```sh
python -m graphrag.index --root ./ragtest
```

可能需要运行比较长的时间。每次运行会在output下生成一个以时间戳命名的文件，可以使用``--resume xxx`` 来节省时间，使用此参数后会生成一个以xxx命名的文件。

- Run a query: Only supports Global method

```sh
python -m graphrag.query --root ./ragtest --method global "What is machine learning?"
```

- Visualization

Pass the path to the .graphml file to the below line in visualize-graphml.py:

```python
graph = nx.read_graphml('output/20240708-161630/artifacts/summarized_graph.graphml') 
```

```python
python visualize-graphml.py
```

![image-20240822161232083](imgs/RAG/image-20240822161232083.png)

# Tips

## 官方 graphrag 安装

```sh
pip3.10 install graphrag
or
pip install git+https://github.com/microsoft/graphrag
```

## ollama如何使用

- 如何给ollama配置代理

ollama并不会使用命令行里设置的代理。

```sh
cat /etc/systemd/system/ollama.service

Environment="https_proxy=http://109.105.32.96:55685"
Environment="http_proxy=http://109.105.32.96:55685"
```

- 如何修改存储位置

```sh
Environment="OLLAMA_MODELS=/mnt/data/Software/LLM_Models"
```

对于Windows，可以设置环境变量``OLLAMA_MODELS``。

- 如何重启

```sh
sudo systemctl daemon-reload
sudo systemctl restart ollama
sudo systemctl restart ollama.service
```

- 如何查看运行状态

```sh
sudo systemctl status ollama
```

# Issues

- Error running pipeline

```sh
{"type": "error", "data": "Error running pipeline!", "stack": "Traceback (most recent call last):\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/graphrag/index/run.py\", line 325, in run_pipeline\n    result = await workflow.run(context, callbacks)\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/datashaper/workflow/workflow.py\", line 369, in run\n    timing = await self._execute_verb(node, context, callbacks)\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/datashaper/workflow/workflow.py\", line 410, in _execute_verb\n    result = node.verb.func(**verb_args)\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/graphrag/index/verbs/graph/clustering/cluster_graph.py\", line 102, in cluster_graph\n    output_df[[level_to, to]] = pd.DataFrame(\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/pandas/core/frame.py\", line 4299, in __setitem__\n    self._setitem_array(key, value)\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/pandas/core/frame.py\", line 4341, in _setitem_array\n    check_key_length(self.columns, key, value)\n  File \"/mnt/data/Software/miniforge/envs/rag/lib/python3.10/site-packages/pandas/core/indexers/utils.py\", line 390, in check_key_length\n    raise ValueError(\"Columns must be same length as key\")\nValueError: Columns must be same length as key\n", "source": "Columns must be same length as key", "details": null}
```

在使用原版graphrag + ollama时遇到这个问题，期初认为是setting配置的问题，实际上是代码的问题。

- 解决requests不信任自签名证书的问题

python requests库使用了[certifi](https://certifiio.readthedocs.io/)这个库来存储证书，所以默认情况下不使用系统的证书目录来进行验证。

查看certificate 位置：

```sg
import certifi
print(certifi.where())
```

如果你把额外的证书放在PEM捆绑文件中，你可以使用这两个环境变量来覆盖Python OpenSSL和Requests使用的默认证书存储：

```sh
export SSL_CERT_FILE=/etc/ssl/certs/S.pem
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/S.pem
```

- Run pipeline error

![image-20240822143027275](imgs/RAG/image-20240822143027275.png)

# References

- [docker镜像加速源配置](https://blog.csdn.net/llc580231/article/details/139979603)

- https://ollama.com/download

- [How to Install Python 3.10 on Ubuntu 24.04, 22.04 or 20.04](https://linuxcapable.com/how-to-install-python-3-10-on-ubuntu-linux/)

- [Anaconda 镜像使用帮助-源](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)

- https://docs.useanything.com/installation/desktop/linux#install-using-the-installer-script

- https://console.groq.com/login

- [Ollama模型下载路径替换！靠谱！（Linux版本）](https://blog.csdn.net/yyh2508298730/article/details/138288553)

- [Ollama 中文文档](https://ollama.qianniu.city/index.html)

- https://hf-mirror.com/

- 如何在Python中使用certifi（附实例）[尼耳多](https://juejin.cn/user/3051900006047581/posts)

- Python certifi：如何在Python中使用SSL证书[尼耳多](https://juejin.cn/user/3051900006047581/posts)

- https://github.com/Ikaros-521/GraphRAG-Ollama-UI

- https://github.com/TheAiSingularity/graphrag-local-ollama

- https://github.com/open-webui/open-webui

- https://github.com/HelgeSverre/ollama-gui

- [Anything LLM](https://anythingllm.com/)
