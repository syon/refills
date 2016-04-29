---
bid: squid-proxy
rid: directory
title: Squidのディレクトリ
date: 2016/04/29
layout: refill.jade
---

#### Ubuntu
- squid
    - `?`
- service
    - `service squid start`
    - `service squid stop`
- squid.conf
    - `/etc/squid3/squid.conf`
- error_directory
    - `/usr/share/squid3/errors/Japanese`

#### OSX (Homebrew)
- squid
    - `/usr/local/sbin/squid`
- squid.conf
    - `/usr/local/etc/squid.conf`
- error_directory
    - `/usr/local/opt/squid/share/errors/ja-jp`
- pid
    - `/usr/local/var/run/squid.pid`
- auth programs
    - basic (NCSA)  
      `/usr/local/opt/squid/libexec/basic_ncsa_auth`
    - digest  
      `/usr/local/opt/squid/libexec/digest_file_auth`

```bash
auth_param digest program /usr/local/opt/squid/libexec/digest_file_auth /usr/local/opt/squid/passwd
auth_param digest children 20 startup=0 idle=1
auth_param digest realm proxy
auth_param digest nonce_garbage_interval 5 minutes
auth_param digest nonce_max_duration 30 minutes
auth_param digest nonce_max_count 50

acl password proxy_auth REQUIRED

http_access allow password
```
