---
rid: 1462806
bid: fish-shell
rcd: install
srcpath: fish-shell/install.md
title: インストールと設定
date: 2016.5.10
layout: refill.jade
---

## Install fish shell

```bash
$ brew install fish
$ echo "/usr/local/bin/fish" | sudo tee -a /etc/shells
$ chsh -s /usr/local/bin/fish
```

#### Required fish version: v2.3.0 on Fisherman
https://github.com/fisherman/fisherman#what-is-the-required-fish-version

```bash
$ brew up; and brew upgrade --HEAD fish
```

## Install Fisherman
[fisherman/fisherman: fish plugin manager http://fisherman.sh](https://github.com/fisherman/fisherman)

### config

```bash
# config file
$ vim .config/fish/config.fish
```

```bash
# reload config
$ source .config/fish/config.fish
```

#### writing config.fish

```bash
# .bashrc
export PATH=$HOME/.nodebrew/current/bin:$PATH

# config.fish (command like, space separated)
set PATH $PATH $HOME/.nodebrew/current/bin
```

### set export

```bash
set -gx http_proxy http://localhost:8080
```
