# Copy and Paste

XTerm 内复制贴上
用鼠标选取想复制的内文，按 shift + insert (Ins) 即可在 XTerm 的里面贴上想复制的文字。

XTerm 外复制
如果要把 XTerm 内的文字复制出来就有点麻烦了。

先打开 ~/.Xresources ( 或是建立一个 )，内文输入如下

```sh
XTerm*selectToClipboard: true
```

接着打开 terminal 执行以下指令

```sh
xrdb -merge ~/.Xresources
```

再重新打开 XTerm 即可使用 ctrl + c 复制文字到外面了
