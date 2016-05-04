---
bid: squid-proxy
rid: auth
title: auth
date: 2016/05/04
layout: refill.jade
---

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
