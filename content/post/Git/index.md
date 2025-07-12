+++
author = "Yubao"
title = "Github使用技巧"
date = "2022-03-10"
description = "Github使用技巧"
image = "img/cover.jpg"
tags = [
    "Tools",
]
archives = ["2022/03"]

+++

# 使用Github的方法
- 利用镜像下载
- 通过代理网站下载
- Gitee中转fork仓库下载
- 修改 HOSTS 文件进行加速
- 科学上网 (略)

# 加速网站

- https://gitclone.com/
- [ghproxy](https://ghproxy.com/)
- [GitHub 文件加速](https://github.abskoop.workers.dev/)
- https://gh.api.99988866.xyz
- http://toolwa.com/github/
- https://github.zhlh6.cn
- https://fhefh2015.github.io/Fast-GitHub/  浏览器插件
- https://mirror.ghproxy.com/
- https://www.github.do/
- https://hub.0z.gs/
- https://ghgo.feizhuqwq.workers.dev/
- https://git.yumenaka.net/

# 通过修改 HOSTS 文件进行加速
第一步：获取 github 的 global.ssl.fastly 地址 访问：http://github.global.ssl.fastly.net.ipaddress.com/#ipinfo 获取cdn和ip域名：

得到：199.232.69.194 https://github.global.ssl.fastly.net

第二步：获取github.com地址

访问：https://github.com.ipaddress.com/#ipinfo 获取cdn和ip：

得到：140.82.114.4 http://github.com

查询以下三个链接的DNS解析地址

- github.com
- assets-cdn.github.com
- github.global.ssl.fastly.net

修改Host文件：
- Windows： C:\Windows\System32\drivers\etc\hosts
- Linux:  /etc/hosts


# 其它仓库
- https://gitee.com/


# GitHub raw 加速
GitHub raw 域名并非 github.com 而是 raw.githubusercontent.com，上方的 GitHub 加速如果不能加速这个域名，那么可以使用 Static CDN 提供的反代服务。

将 raw.githubusercontent.com 替换为 raw.staticdn.net 即可加速。

# Tips

# IP 网址查询

- [ipaddress](https://link.zhihu.com/?target=https%3A//www.ipaddress.com/)

## Update the http post buffer value

```sh
git config --global http.postBuffer 1048576000
```

# Common Questions

## gnutls_handshake() failed: The TLS connection was non-properly terminated

```shell
Cloning into 'Sophus'...
fatal: unable to access 'https://github.com/yubaoliu/Sophus.git/': gnutls_handshake() failed: The TLS connection was non-properly terminated.
ERROR: Service 'orbslam3' failed to build: The command '/bin/sh -c git clone https://github.com/yubaoliu/Sophus.git && cd Sophus && git checkout master && mkdir build && cd build && cmake .. -DCMAKE_BUILD_TYPE=Release && make -j3 && make install' returned a non-zero code: 128
```

Solution:

```sh
git config --global --unset https.https://github.com.proxy  
git config --global --unset http.https://github.com.proxy
```
## error: RPC failed; curl 56 GnuTLS recv error (-54): Error in the pull function.

Error Message:

```sh
error: RPC failed; curl 56 GnuTLS recv error (-54): Error in the pull function.
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```

# References
- [2022目前三种有效加速国内Github](https://segmentfault.com/a/1190000041466088)
- [hash](https://hash.red/#/register?code=76hhflR4)
