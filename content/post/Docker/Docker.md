+++
author = "Yubao"
title = "Docker Proxy Setting"
date = "2024-01-10"
description = "Docker Proxy Setting"
image =  "https://blog.codewithdan.com/wp-content/uploads/2023/06/Docker-Logo-1024x576.png"
tags = [
"Docker",
]
archives = ["2024/01"]
draft = false
+++

# daemon

You may meet such error:

```sh
ERROR: Service 'web' failed to build: Get https://registry-1.docker.io/v2/library/python/manifests/2.7: net/http: TLS handshake timeout
```

xxxxxxxxxx set(CMAKE_BUILD_TYPE Debug)​rosrun --prefix 'gdb -ex run --args' [package_name] [node_name]sh

```sh
{
  “registry-mirrors”:[“https://docker.mirrors.ustc.edu.cn”]
}
```

# commands

*   systemctl daemon-reload
*   systemctl restart docker
*   remove all images and containers

```sh
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```

# Docker Proxy

Sometimes we need to download the developing packages from the external Network when do the research.
However, I found I cannot let docker access the proxy depoloyed on my host machine especially in the build stage, such as "docker-compose build".

Usually the proxy on the host can be used when the container is up (docker-compose up).

## Successful Configuration for "docker-compose build"

*   Check the IP address on your host. Use the IP like "192.168.1.7", rather than "127.0.0.1". Because "127.\*" is inside the docker container. A temperary docker container is used when you build the docker image.
*   Let the proxy server listen the IP and port, "192.168.1.7"  that you set in the previous step. By default, the proxy server only can listen "127.0.0.1". **Note: this is the reason why I failed in the past.**

## docker-compose example

```sh
version: '2.3'
services:
  proxy:
    image: yubaoliu/proxy
    build:
        context: .
        dockerfile: Dockerfile
        args:
            http_proxy: $http_proxy
            https_proxy: $https_proxy
    runtime: nvidia
    stdin_open: true
    tty: true
    privileged: true
    command: xterm
    network_mode: host
    environment:
        - DISPLAY
        - QT_X11_NO_MITSHM=1
        - http_proxy=$http_proxy
        - https_proxy=$https_proxy
    dns:
        - 8.8.8.8
        - 8.8.4.4
    volumes:
        - /tmp/.X11-unix:/tmp/.X11-unix:rw
        - ~/.Xauthority:/root/.Xauthority
```

## env example

```sh
http_proxy=http://192.168.1.7:41091
https_proxy=http://192.168.1.7:41091
```

## Dockerfile example

```sh
FROM golang:1.12

RUN curl www.google.com --max-time 3
```

## How to test proxy

```sh
curl www.google.com --max-time 3
```

## How to restart docker

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Global config

This is a global config. Not suggested to use.

vim ~/.docker/config.json

```sh
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://192.168.1.7:41091",
     "httpsProxy": "http://192.168.1.7:41091",
     "noProxy": ""
   }
 }
}
```

## Set Proxy inside the  Dockerfile

Not suggested to use.

```sh
FROM golang:1.12

ENV http_proxy "http://192.168.1.7:1087"
#ENV HTTP_PROXY "http://127.0.0.1:1087"
ENV https_proxy "http://192.168.1.7:1087"
#ENV HTTPS_PROXY "http://127.0.0.1:1087"

RUN curl www.google.com --max-time 3
```

## Use build-arg

```sh
docker build -t anguiao/nginx-brotli . --build-arg http_proxy=http://172.21.0.9:8118 --build-arg https_proxy=http://172.21.0.9:8118
```

注意：在写代理地址时，不可写成 127.0.0.1 或者 localhost，应使用宿主机的 IP。我这里使用的是宿主机的内网 IP，可根据网络环境进行适当的改动。

## docker.service.d

mkdir /etc/systemd/system/docker.service.d

```sh
[Service]
 # NO_PROXY is optional and can be removed if not needed
 # Change proxy_url to your proxy IP or FQDN and proxy_port to your proxy port
 # For Proxy server which require username and password authentication, just add the proper username and password to the URL. (see example below)

 # Example without authentication
 Environment="HTTP_PROXY=http://proxy_url:proxy_port" "NO_PROXY=localhost,127.0.0.0/8"

 # Example with authentication
 Environment="HTTP_PROXY=http://username:password@proxy_url:proxy_port" "NO_PROXY=localhost,127.0.0.0/8"
```

# references

*   [使用代理构建 Docker 镜像](https://blog.anguiao.com/archives/use-proxy-when-building-docker-image.html)
*   [docker build时怎么用http proxy代理?](https://segmentfault.com/q/1010000004613949)
