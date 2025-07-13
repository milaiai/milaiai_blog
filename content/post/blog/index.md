---
author: "Yubao"
title: "Blog Building"
image: "img/cover.jpg"
draft: true
date: 2025-01-28
description: "Hugo"
tags: ["hugo"]
archives: ["2025/01"]
---

# Hugo

## Requirements

- Get NVM
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
- Install node.js
```sh
nvm install v22.16.0
```
- [Hugo Extend](https://github.com/gohugoio/hugo/releases/tag/v0.147.9)
Must install extended version
- npm

```sh
npm install -g postcss-cli
npm install -g autoprefixer
npm install fuse.js

npm install postcss postcss-cli autoprefixer --save-dev
```

## 添加搜索

- [A simple and realtime local search of hugo 实现简单且实时的本地搜索](https://discourse.gohugo.io/t/a-simple-and-realtime-local-search-of-hugo/39215/1)


## Hugo SLACK theme

- https://stack.jimmycai.com/

## Math

```txt
    <script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js' type='text/javascript'>    
    MathJax.Hub.Config({
        HTML: ["input/TeX","output/HTML-CSS"],
        TeX: { extensions: ["AMSmath.js","AMSsymbols.js"],
               equationNumbers: { autoNumber: "AMS" } },
        extensions: ["tex2jax.js"],
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: { inlineMath: [ ['$','$'] ],
                   displayMath: [ ['$$','$$']  ],
                   processEscapes: true
                  },
        "HTML-CSS": { availableFonts: ["TeX"],
                      linebreaks: { automatic: true } }
    });
    </script>
```

##  systemd 服务

- vim /etc/systemd/system/hugo.service

```sh
[Unit]
Description=Hugo Web Server
After=network.target

[Service]
User=hugo
User=ubuntu
Group=ubuntu
Environment="PATH=/usr/bin:/usr/local/bin:/home/ubuntu/milaiai_blog/node_modules/.bin"
WorkingDirectory=/home/ubuntu/milaiai_blog
ExecStart=/usr/local/bin/hugo serve --bind=0.0.0.0 --port=1313 --baseURL=www.milaiai.com
Restart=on-failure  # 修改为失败时重启
RestartSec=10s       # 新增重启间隔
StandardOutput=file:/var/log/hugo.log
StandardError=file:/var/log/hugo-error.log

[Install]
WantedBy=multi-user.target
```

- 重新加载并重启服务
```sh
sudo systemctl daemon-reload
sudo systemctl restart hugo
sudo systemctl status hugo
```

- Check Status

```sh
hugo.service - Hugo Web Server
     Loaded: loaded (/etc/systemd/system/hugo.service; enabled; preset: enabled)
     Active: active (running) since Sun 2025-07-13 09:42:46 UTC; 4min 46s ago
   Main PID: 152036 (hugo)
      Tasks: 8 (limit: 1086)
     Memory: 27.3M (peak: 88.9M swap: 1.2M swap peak: 1.2M)
        CPU: 11.428s
     CGroup: /system.slice/hugo.service
             └─152036 /usr/local/bin/hugo serve --bind=0.0.0.0 --port=1313 --baseURL=www.milaiai.com

Jul 13 09:42:46 instance-cloud systemd[1]: Started hugo.service - Hugo Web Server.
```

## 将Site.BaseURL改为相对地址

例1，将
```
href="{{ $.Site.BaseURL }}/categories/{{ $key | urlize  }}">{{ $key | humanize }}</a>
```

改为：

```
href='{{ "/categories/" | relLangURL }}{{ $key | urlize  }}'>{{ $key | humanize }}</a>
```

搜索整个项目中所有包含 .Site.BaseURL 的地方

统一替换为 relURL 或 relLangURL 函数

例2：
```
<a href='{{ "/" | relLangURL }}'>
```
->
```
<a href='{{ "/" | relLangURL }}'>
```

# Google Analysis

```sh
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RTVEDN0E3G"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RTVEDN0E3G');
</script>
```