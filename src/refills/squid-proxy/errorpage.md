---
rid: 1462463
bid: squid-proxy
rcd: errorpage
srcpath: squid-proxy/errorpage.md
title: エラーページのカスタマイズ
date: 2016.4.29
layout: refill.jade
---

0. `squid.conf`の`TAG: error_directory`にて以下を追記
    - `error_directory /usr/share/squid3/custom_errors`
    - ※ "custom_errors" の名称や配置場所は任意
0. `/usr/share/squid3/`に `custom_errors`ディレクトリを作成
0. `ERR_ACCESS_DENIED`などのファイル（中身はHTML）を作成
    - `/usr/share/squid3/errors/Japanese`のファイル群を参考に
0. restart
