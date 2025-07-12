
+++
author = "Yubao"
title = "Linux使用技巧"
date = "2022-03-10"
description = "Linux使用技巧"
image = "img/cover.jpg"
tags = [
    "Linux",
]
archives = ["2022/03"]

+++

# 查看各文件大小

```sh
du -h --max-depth=1
```

# 查看剩余空间

```sh
~ df . -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme1n1p6  492G  457G  9.6G  98% /
```

# Kernel

```sh
sudo add-apt-repository ppa:cappelikan/ppa
sudo apt update
sudo apt install mainline
```

- https://askubuntu.com/questions/700214/how-do-i-install-an-old-kernel



