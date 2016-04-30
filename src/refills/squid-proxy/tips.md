---
bid: squid-proxy
rid: tips
title: TIPS
date: 2016/04/29
layout: refill.jade
---

## Tips
- [Reload Squid Proxy Server Without Restarting Squid Daemon](http://www.cyberciti.biz/faq/howto-linux-unix-bsd-appleosx-reload-squid-conf-file/)

`kill -HUP`だとうまく機能しなかった、`--help`も効かないのでそのうち調べる
```bash
$ kill $(cat /usr/local/var/run/squid.pid)
```
reload the squid after making changes to squid.conf file
```bash
$ /usr/local/sbin/squid -k reconfigure
```

### Black List / White List
- [squid で特定のサイトをアクセス拒否する](http://futuremix.org/2005/07/squid-access-deny)
- [squid で特定のサイトのみアクセスを許可する](http://futuremix.org/2005/07/squid-access-allow)
- [su – root » Blog Archive » squidでURLフィルタ](http://www.p-runner.net/wordpress/?p=275)

### Launch on Startup (OSX)

#### with ログイン項目
- システム環境設定 > ユーザとグループ > ユーザ名 > ログイン項目 にsquidを追加

#### with launchctl
- [Installing Squid Proxy Server on Mac OS X Snow Leopard | Biboroku](http://okomestudio.net/biboroku/?p=816)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>squid</string>
    <key>OnDemand</key>
    <false/>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/sbin/squid</string>
    </array>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
```
```bash
$ sudo launchctl load -w /Library/LaunchDaemons/squid.plist
```


## Memo
- `acl myaclname` で定義して `http_access allow myaclname` で利用
- `http_access` は上から評価され、マッチするとそこで切り上げる。  
  例えば allow localnet の下に allow password を記述しても、localnet 内の端末は常に許可される。
