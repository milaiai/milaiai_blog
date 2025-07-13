+++
author = "Yubao"
title = "NFS共享服务配置"
date = "2025-07-05"
description = "NFS"
draft = false
image = "https://blog.tinned-software.net/wp-content/uploads/linux_penguin_NFS.png"
tags = [
    "NFS",
]
archives = ["2025/07"]
+++

# 服务器

## 安装

```sh
sudo apt update
sudo apt install nfs-kernel-server
```

## 配置文件

/etc/exports

```sh
/srv/nfs4         192.168.33.0/24(rw,sync,no_subtree_check,crossmnt,fsid=0)
/srv/nfs4/backups 192.168.33.0/24(ro,sync,no_subtree_check) 192.168.33.3(rw,sync,no_subtree_check)
/srv/nfs4/www     192.168.33.110(rw,sync,no_subtree_check)
/mnt/nfs_share subnet(rw,sync,no_subtree_check)
/var/nfs/general    client_ip(rw,sync,no_subtree_check)
/home               client_ip(rw,sync,no_root_squash,no_subtree_check)
```

- fsid=0定义了 NFS 根目录
- crossmnt选项是必要的，用来分享被导出目录的子目录
- ro                          该主机对该共享目录有只读权限
- rw                         该主机对该共享目录有读写权限, The client is granted both read and write permission to the volume.
- root_squash         客户机用root用户访问该共享文件夹时，将root用户映射成匿名用户
- no_root_squash   客户机用root访问该共享文件夹时，不映射root用户, As mentioned earlier, NFS will translate any request from the remote root user to a non-privileged user. This is an intended security feature to prevent unwanted access to the host system. However, using this option will disable this behavior.
- all_squash            客户机上的任何用户访问该共享目录时都映射成匿名用户
- anonuid                将客户机上的用户映射成指定的本地用户ID的用户
- anongid                将客户机上的用户映射成属于指定的本地用户组ID
- sync                      资料同步写入到内存与硬盘中, Forces NFS to write the changes to disk before replying. It offers a more stable and consistent experience. The reply will reflect the actual state of the remote volume. However, the file operations will be slower.
- async                    资料会先暂存于内存中，而非直接写入硬盘
- no_subtree_check: Prevents subtree checking. If not disabled, hosts will be forced to check the existence of the file in the exported tree for every single request from the client. It can lead to many problems, for example, a file is renamed while the client is using it. In most cases, disabling subtree checks is the way to go.
- insecure                允许从这台机器过来的非授权访问

绑定其他挂载目录

```sh
sudo mount --bind /opt/backups /srv/nfs4/backups
sudo mount --bind /var/www /srv/nfs4/www
```

上面的绑定，重启之后便会失效，可以修改fstab文件实现永久绑定。

永久挂载：  /etc/fstab

```sh
/opt/backups /srv/nfs4/backups  none   bind   0   0
/var/www     /srv/nfs4/www      none   bind   0   0
```

使配置文件生效

```sh
sudo exportfs -ra
```

查看共享文件

```sh
 sudo exportfs -v
```

exportfs用法

-a ：全部mount或者unmount /etc/exports中的内容
-r ：重新mount /etc/exports中分享出来的目录
-u ：umount 目录
-v ：将详细的信息输出到屏幕上

# 防火墙

```sh
sudo ufw status
```

```sh
sudo ufw enable
sudo ufw disable
sudo ufw status
```

允许某个IP或any访问nfs端口

```sh
sudo ufw allow nfs
sudo ufw allow from 31.171.250.221 to any port nfs
sudo ufw allow from any to any port nfs
```

查看端口

```sh
$rpcinfo -p
program vers proto   port  service
    100000    4   tcp    111  portmapper
    100000    3   tcp    111  portmapper
    100000    2   tcp    111  portmapper
    100000    4   udp    111  portmapper
    100000    3   udp    111  portmapper
    100000    2   udp    111  portmapper
    100005    1   udp  39242  mountd
    100005    1   tcp  20048  mountd
    100005    2   udp  52780  mountd
    100005    2   tcp  20048  mountd
    100005    3   udp  53401  mountd
    100005    3   tcp  20048  mountd
    100003    3   tcp   2049  nfs
    100003    4   tcp   2049  nfs
    100227    3   tcp   2049
    100003    3   udp   2049  nfs
    100227    3   udp   2049
    100021    1   udp  42315  nlockmgr
    100021    3   udp  42315  nlockmgr
    100021    4   udp  42315  nlockmgr
    100021    1   tcp  42315  nlockmgr
    100021    3   tcp  42315  nlockmgr
    100021    4   tcp  42315  nlockmgr
```

确认nfs相关服务组件及端口占用如下:

| 服务名称       | 端口名称  | 协议名称    | 备注            |
| ---------- | ----- | ------- | ------------- |
| nfs        | 2049  | tcp/udp | 端口固定          |
| portmapper | 111   | tcp/udp | 端口固定          |
| mountd     | 20048 | tcp/udp | 端口不固定，需人为修改固定 |
| nlockmgr   | 42315 | tcp/udp | 端口不固定，需人为修改固定 |

- 更改mountd 服务端口为20048

```sh
echo "mountd 20048/tcp" >> /etc/services
echo "mountd 20048/udp" >> /etc/services
```

- 更改nlockmgr 服务端口为42315
  
  ```sh
  echo "fs.nfs.nlm_udpport=42315" >> /etc/sysctl.conf
  echo "fs.nfs.nlm_tcpport=42315" >> /etc/sysctl.conf
  sysctl -p
  ```

- nfs服务端防火墙开放相关服务固定端口
  服务端防火墙开放2049 、111 、20048 、42315 端口，此时客户端可正常访问挂载

```sh
ufw allow 2049/tcp
ufw allow 2049/udp
ufw allow 111/tcp
ufw allow 111/udp
ufw allow 20048/tcp
ufw allow 20048/udp
ufw allow 42315/tcp
ufw allow 42315/udp
```

# 客户端

```sh
sudo apt install nfs-common
```

## 挂载

```sh
$ sudo mount host_ip:/var/nfs/general /nfs/general
$ sudo mount host_ip:/home /nfs/home
```

## 卸载

```sh
sudo umount /nfs/general
```

# 常用命令与技巧

## versions

```sh
$sudo cat /proc/fs/nfsd/versions
-2 +3 +4 +4.1 +4.2
```

## 文件访问权限

```sh
sudo chown -R nobody:nogroup /mnt/nfs_share/
```

## 重启服务

```sh
sudo systemctl restart nfs-kernel-server
```

## 查看挂载情况

```sh
$df -h
$showmount -e IP
```

## 查看大小

```sh
du -sh /nfs/general
```

## 客户端nfs挂载协议与服务端不一致, 可以用nfsvers来指定NFS的版本

```sh
mount -t nfs -o nfsvers=3 x.x.x.x:/share /mnt
```

## nfs无法提供锁服务

- 使用远程锁：启动服务端rpc.statd服务，使用这个服务提供远程锁
- 使用本地锁：客户端挂载指定-o nolock，查看此时客户端挂载参数使用本地锁（local_lock=all）

```sh
mount -t nfs -o nolock x.x.x.x:/share /mnt
```

# References

- [Installing NFS on Ubuntu 20.04 server](https://medium.com/geekculture/installing-nfs-on-ubuntu-20-04-server-3993bf9ac1b6)
- [How to Install NFS Client and Server on Ubuntu 20.04](https://www.howtoforge.com/how-to-install-nfs-client-and-server-on-ubuntu-2004/)
- [如何在 Ubuntu 18.04 上安装和配置 NFS 服务器](https://cloud.tencent.com/developer/article/1626660)
- [linux服务器 NFS + 防火墙配置](https://blog.csdn.net/lincy100/article/details/6417743)
- [nfs常见问题处理](https://www.cnblogs.com/luxf0/p/15544783.html)
