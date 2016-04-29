---
bid: squid-proxy
rid: config
title: Squidの設定
date: 2016/04/29
layout: refill.jade
---

## Config

- [Proxyサーバの設定（squid）：tech.ckme.co.jp](http://tech.ckme.co.jp/proxy.shtml)
- [Squidによるプロキシサーバーの構築](http://linux.kororo.jp/cont/server/squid.php)

```bash
$ sudo vim /etc/squid3/squid.conf
```

    # Example rule allowing access from your local networks.
    # Adapt to list your (internal) IP networks from where browsing
    # should be allowed
    ### ここにプロキシサーバ接続許可ネットワークを記述 ###
                    :
                    :
    # Example rule allowing access from your local networks.
    # Adapt localnet in the ACL section to list your (internal) IP networks
    # from where browsing should be allowed
    http_access allow localnet  #コメント解除
    http_access allow localhost

    # And finally deny all other access to this proxy
    http_access deny all

```bash
$ sudo service squid3 restart
```

### ポート開放

```bash
$ sudo ufw allow 3128
```

### 動作確認

```bash
# Ubuntu
$ sudo netstat -lpn | grep squid
```
```bash
# OSX
$ lsof -i :3128
```
