---
rid: 1462462
bid: squid-proxy
rcd: directory
title: Squidのディレクトリ
date: 2016/04/29
layout: refill.jade
---

## Ubuntu
squid
: `?`

service
: `service squid start`
: `service squid stop`

squid.conf
: `/etc/squid3/squid.conf`

error_directory
: `/usr/share/squid3/errors/Japanese`


## OSX (Homebrew)

squid
: `/usr/local/sbin/squid`

squid.conf
: `/usr/local/etc/squid.conf`

log
: `/usr/local/var/logs/`

error_directory
: `/usr/local/opt/squid/share/errors/ja-jp`

pid
: `/usr/local/var/run/squid.pid`

auth programs
: basic (NCSA)  
  `/usr/local/opt/squid/libexec/basic_ncsa_auth`
: digest  
  `/usr/local/opt/squid/libexec/digest_file_auth`
