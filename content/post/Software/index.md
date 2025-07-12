---
author: "Yubao"
title: "software"
image: "img/cover.jpg"
draft: true
date: 2023-12-28
description: "software"
tags: ["software"]
archives: ["2024/12"]
---

# # Miniforge

```shell
wget "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
```

# rclone

```sh
curl https://rclone.org/install.sh | sudo bash
```

# OneDrive

## onedrive

- https://github.com/abraunegg/onedrive/blob/master/docs/ubuntu-package-install.md

- Ubuntu 20

```sh
wget -qO - https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/xUbuntu_20.04/Release.key | sudo apt-key add -

echo 'deb https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/xUbuntu_20.04/ ./' | sudo tee /etc/apt/sources.list.d/onedrive.list

sudo apt install libnotify-dev
sudo apt install onedrive

onedrive --synchronize                                                                                                             
```

## rclone

    - [Setting up OneDrive on Linux](https://kb.uconn.edu/space/IKB/26050527301/Setting+up+OneDrive+on+Linux)

# oh my nvim  and VIM

- https://github.com/hardhackerlabs/oh-my-nvim

## syntax

```sh
vim.keymap.set({mode}, {lhs}, {rhs}, {opts})
```

## File Explore

### Files

- https://shapeshed.com/vim-netrw
  
  ```sh
  :! ls -lF
  :find path/to/file.txt
  :vs path/to/file.txt
  :sp path/to/file.txt
  :tabnew path/to/file.txt
  ```
  
  ### netrw

- https://github.com/prichrd/netrw.nvim

```sh
:Explore - opens netrw in the current window
:Sexplore - opens netrw in a horizontal split
:Vexplore - opens netrw in a vertical split
```

```sh
let g:netrw_banner = 0
let g:netrw_liststyle = 3
let g:netrw_browse_split = 4
let g:netrw_altv = 1
let g:netrw_winsize = 25

" augroup ProjectDrawer
"   autocmd!
"   autocmd VimEnter * :Vexplore
" augroup END
```

### nerdtree

- https://github.com/preservim/nerdtree.git

### fzf

- https://github.com/junegunn/fzf.vim

- https://github.com/junegunn/fzf

- install

```sh
sudo apt install fzf
```

- usage
  
  ```sh
  fzf
  find * -type f | fzf
  ```

fzf --preview 'cat {}'

```
```sh
" Look for files under current directory
:FZF

" Look for files under your home directory
:FZF ~

" With fzf command-line options
:FZF --reverse --info=inline /tmp

" Bang version starts fzf in fullscreen mode
:FZF!

:Files  [PATH]
```

- config

```sh
export FZF_DEFAULT_COMMAND='ag --hidden --ignore .git -l -g ""'

export FZF_DEFAULT_COMMAND="fd --exclude={.git,.idea,.sass-cache,node_modules,build} --type f"
```

- FZF_DEFAULT_OPTS

```sh
export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --preview '(highlight -O ansi {} || cat {}) 2> /dev/null | head -500'"
```

### neo-tree

- https://github.com/nvim-neo-tree/neo-tree.nvim

### nvim-tree

- https://github.com/nvim-tree/nvim-tree.lua

## Comment

- https://github.com/numToStr/Comment.nvim

## Switch code

- [vim-fswitch](https://github.com/derekwyatt/vim-fswitch)

## bookmark

### vim-bookmarks

- https://github.com/MattesGroeger/vim-bookmarks

### vim-signature

- https://github.com/kshenoy/vim-signature

### bookmars.nvim

- https://github.com/tomasky/bookmarks.nvim

## Compile

```sh
!cmake CMakeLists.txt 
:make 

vim 将编译器抛出的错误和警告信息输出到 quickfix 中，执行 :cw 命令即可显示 quickfix
```

# oh my zsh

## Install

```sh
sudo apt install zsh
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
rm ~/.zshrc
```

## Command

```sh
Usage: omz <command> [options]

Available commands:

  help                Print this help message
  changelog           Print the changelog
  plugin <command>    Manage plugins
  pr     <command>    Manage Oh My Zsh Pull Requests
  reload              Reload the current zsh session
  theme  <command>    Manage themes
  update              Update Oh My Zsh
  version             Show the version
```

## Install plugin

- [autojump](https://github.com/wting/autojump#installation)

```sh
sudo apt install autojump
```

- zsh-autosuggestions

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions 
```

- zsh-syntax-highlighting

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

- zsh-extract 

```sh
git clone https://github.com/le1me55i/zsh-extract.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-extract
```

# oh-my-posh

- [Oh My Posh](https://ohmyposh.dev/)

- https://ohmyposh.dev/docs/themes

- [教程 - 使用 Oh My Posh 为 PowerShell 或 WSL 设置自定义提示符](https://learn.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup)

# Powershell

```sh
Install-Module [moudel name] -Scope CurrentUser # 只为当前用户安装

Install-Module git-aliases -AllowColbber

Install-Module posh-git
Install-Module oh-my-posh
```

```sh
winget install JanDeDobbeleer.OhMyPosh
oh-my-posh version
winget upgrade oh-my-posh

notepad $PROFILE
```

- 假设出现`在此系统上禁止运行脚本`的问题，那么需要在shell中执行一下：
  
  ```sh
  Set-ExecutionPolicy remotesigned
  ```

# Oh-my-tmux

- https://github.com/gpakosz/.tmux
- https://github.com/pangliang/oh-my-tmux
- https://github.com/namtzigla/oh-my-tmux/tree/master

# References

- [Vim tutorials](https://www.tutorialspoint.com/vim/index.htm)
- [将VIM打造成C语言IDE](https://github.com/WilsonQ1n/VIM_C_IDE?tab=readme-ov-file#7.1.1)
