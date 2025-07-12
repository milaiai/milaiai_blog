+++
author = "Yubao"
title = "Network"
date = "2019-03-10"
description = "Network"
image = "img/cover.jpg"
tags = [
    "Network",
]
archives = ["2019/03"]

+++

# DNS

vim /etc/resolv.conf

```sh
nameserver 8.8.8.8
nameserver 8.8.4.4
```


# APT

```sh
$ sudo touch /etc/apt/apt.conf.d/proxy.conf
$ sudo gedit /etc/apt/apt.conf.d/proxy.conf
```

```sh
Acquire {
  HTTP::proxy "http://127.0.0.1:8080";
    HTTPS::proxy "http://127.0.0.1:8080";
    }
```

# Sftp

- 安装 ssh 服务端
sudo apt-get install openssh-server
- 显示 sshd 即可以成功连接
ps -e |grep ssh
- 如果不显示 sshd
sudo /etc/init.d/ssh start
