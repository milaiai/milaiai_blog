---
author: "Yubao"
title: "Blog Building"
image: "img/cover.jpg"
draft: true
date: 2024-01-28
description: "Hugo"
tags: ["hugo"]
archives: ["2024/01"]
---

# Nodejs


- [How to install Node.js 21 on Ubuntu](https://joshtronic.com/2023/11/12/how-to-install-node-js-21-on-ubuntu/)

# Hugo


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