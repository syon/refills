---
rid: 1462806
bid: shell
rcd: fish-shell
srcpath: shell/fish-shell.md
title: fish shell - インストールと設定
category: fish shell
heroimgpath: chronicle/201605/fish-shell-hero.png
date: 2016.5.10
layout: refill.jade
---

## [fish shell](http://fishshell.com/)

- [fishシェルがとても素晴らしかったので、お伝えします。 | megane9988のブログ](http://megane-blog.com/2014/12/15/1461)
- [fish-shellを使ってみませんか - Qiita](http://qiita.com/mtwtk_man/items/dde92d0a6024bc61fa58)
- [zsh から fish にした。 - yoshiori.github.io](http://yoshiori.github.io/blog/2015/11/03/from-zsh-to-fish/)

### [Fisherman](http://fisherman.sh/)

### [oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)
- [oh-my-fish/Themes.md at master · oh-my-fish/oh-my-fish](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md)  
  テーマプレビュー集


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
