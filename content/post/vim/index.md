+++
author = "Yubao"
title = "VIM"
date = "2024-03-10"
description = "VIM"
image = "img/cover.jpg"
tags = [
"VIM",
]
archives = ["2024/03"]
draft = true
+++

# Copy and Paste

- 查看是否已案装clipboard

```shell
vim --version | grep clipboard
-clipboard         +keymap            +printer           +vertsplit
+eval              -mouse_jsbterm     -sun_workshop      -xterm_clipboard
```

需要安装vim-gtk，但是案装时可能遇到以下问题。

```shell
sudo apt install vim-gtk
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 vim-gtk3 : Depends: vim-common (= 2:8.2.3995-1ubuntu2.23) but 2:9.0.0749-0york0~22.04 is to be installed
            Depends: vim-runtime (= 2:8.2.3995-1ubuntu2.23) but 2:9.0.0749-0york0~22.04 is to be installed角 Debug
```

解决方案

```shell
sudo aptitude install vim-gtk3 vim-gtk
```

在安装过程中对vim版本进行降级

```shell
Accept this solution? [Y/n/q/?] n
The following actions will resolve these dependencies:

     Downgrade the following packages:
1)     vim [2:9.0.0749-0york0~22.04 (now) -> 2:8.2.3995-1ubuntu2.23 (jammy-security, jammy-updates)]
2)     vim-common [2:9.0.0749-0york0~22.04 (now) -> 2:8.2.3995-1ubuntu2.23 (jammy-security, jammy-updates)]
3)     vim-nox [2:9.0.0749-0york0~22.04 (now) -> 2:8.2.3995-1ubuntu2.23 (jammy-security, jammy-updates)]
4)     vim-runtime [2:9.0.0749-0york0~22.04 (now) -> 2:8.2.3995-1ubuntu2.23 (jammy-security, jammy-updates)]
5)     vim-tiny [2:9.0.0749-0york0~22.04 (now) -> 2:8.2.3995-1ubuntu2.23 (jammy-security, jammy-updates)]
```

安装成功后查看：

```shag-0-1ilfcvil2ag-1-1ilfcvil2
vim --version | grep clipboard
+clipboard         +keymap            +printer           +vertsplit
+eval              -mouse_jsbterm     -sun_workshop      +xterm_clipboard
```

# 

# Debug

* [go-vim-debugging-with-gdb](https://www.dannyadam.com/blog/2019/05/debugging-in-vim/)
* [Vim 调试：termdebug 入门](https://www.codeleading.com/article/95143882155/)
* [Debugging in Vim](https://www.dannyadam.com/blog/2019/05/debugging-in-vim/)
* [How to use ConqueGDB in Vim](https://gist.github.com/RobinCPC/228eceed32dea10f32e2b3d41ad930c8)
* [How does debugging with VIM and gdb?](https://medium.com/@948/how-does-debugging-with-vim-and-gdb-3ab5ed0dcd0f)

```sh
Termdebug
:packadd termdebug
```

# Markdown

* [HELLO](Hello.cpp)

* [VIM 之插件篇](http://wilson-blog.cn/post/2019/06/16/vim-apply.html)

```python
import cv2
echo "hello"
```

$$
a+b - 1= c^2
$$

![](https://image.vimjc.com/images/691e0c29gy1fnnj08ml3qg20k807x3zq.gif)

Command    Function
Ctrl + ]    Go to definition
Ctrl + T    Jump back from the definition
Ctrl + W Ctrl + ]    Open the definition in a horizontal split
:ts <tag_name>    List the tags that match <tag_name>
:tn    Jump to the next matching tag
:tp    Jump to the previous matching tag

# Shortcuts

- Ctrl+] : 取出当前光标下的word作为tag的名字并进行跳转。
- Ctrl+t or Ctrl + o: 跳转到前一次的tag处
- Ctrl+w+]: 分割当前窗口，并且跳转到光标下的tag

# Ctags

- 查看ctags支持的语言
  
  ```sh
  ctags --list-languages
  ```

- 查看语言和扩展名的对应关系
  
  ```sh
  ctags --list-maps
  ```

- 查看ctags可以识别和记录的语法元素
  
  ```sh
  ctags --list-kinds
  ctags --list-kinds=c++
  ```

- 对当前目录下所有ctags支持的语言格式文件生成tags
  
  ```sh
  ctags -R *
  ```
  
  ctags 默认并不会提取所有标识符的tag标签，以下命令可以生成更加详细的tag文件

```sh
ctags -R --c++-kinds=+p+l+x+c+d+e+f+g+m+n+s+t+u+v --fields=+liaS --extra=+q
```

- 只对特定文件生成tags
  
  ```sh
  ctags `find -name "*.h"`
  ```

- 用于跳转到指定的tag。例如：
  
  ```sh
  tag tagname
  ```

- 列出曾经访问过的tag的列表

```sh
tags
```

- 同名tag
  如果存在多个同名的tag，tag命令会给出一个tag的列表，可以通过键入tag的序号来选择tag；也可以通过tselect来过滤tag，如：:tselect tagname

如果要在多个tag间移动，可以使用如下命令：

```sh
:tfirst             go to first match
:[count]tprevious   go to [count] previous match
:[count]tnext       go to [count] next match
:tlast              go to last match
```

- 其他
  如果是多个tags文件，可以通过设置tags选项来引入更多的tags文件。例如: :set tags=./tags, ./../tags, ./*/tags

使用tag命令时，可以输入部分tag名，然后使用Tab键进行补全。

# References

- [ Vim自动生成tags插件vim-gutentags安装和自动跳转方法-Vim插件(10)](https://vimjc.com/vim-gutentags.html)
- [Vim使用ctags实现函数跳转-Vim入门教程(13)](https://vimjc.com/vim-ctag.html)
