+++
author = "Yubao"
title = "LangChain"
date = "2024-08-31"
description = "Lang Chain"
tags = [
    "LangChain",
]
categories = [
    "LangChain",
]
image = "https://github.com/langchain-ai/langchain/raw/master/docs/static/img/logo-dark.svg"
+++


# Introduction

Build context-aware reasoning applications

**LangChain** is a framework for developing applications powered by large language models (LLMs).

- https://python.langchain.com/v0.2/docs/introduction/


![](https://python.langchain.com/v0.2/assets/images/rag_landscape-627f1d0fd46b92bc2db0af8f99ec3724.png)

# User Guide
## Install

```sh
pip install langchain

#--optional--
pip install langchain_community langchain_ollama langchain_chroma
```

## Use Ollama

有两种方式使用ollama本地大模型

- Method: use langchain_community

```python
# Method 1: Using LangChain's base classes and components directly
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

output_parser = StrOutputParser()

llm = Ollama(model="llama3.1")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are world class technical documentation writer."),
    ("user", "{input}")
])
chain = prompt | llm | output_parser

print(chain.invoke({"input": "how can langsmith help with testing?"}))
```

- Method: use langchain_ollama

```python
# Method 2: Using LangChain's Ollama wrapper
from langchain_ollama import OllamaLLM

model = OllamaLLM(model="llama3.1")
res = model.invoke("Come up with 10 names for a song about parrots")
print(res)
```

# References

- https://github.com/XingYu-Zhong/LangChainStudy
- https://www.langchain.com/

- https://chat.langchain.com/
- [LangChain｜Ollama结合LangChain使用的速通版](https://blog.csdn.net/qq_46106285/article/details/137430941)
- https://www.llamaindex.ai/
- [Langchain最新0.2版讲解](https://www.bilibili.com/video/BV1RXbWedETA/?p=2&spm_id_from=pageDriver)