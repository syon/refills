---
rid: 1462450
bid: github-pages
rcd: autodeploy-wercker-metalsmith
srcpath: github-pages/autodeploy-wercker-metalsmith.md
title: Metalsmith & Wercker 自動デプロイ
category: GitHub Pages
date: 2016.5.6
layout: refill.jade
---

#### wercker.yml
```yaml
box: node

build:
  steps:
    - npm-install

deploy:
  steps:
    - script:
        name: install git
        code: |
          apt-get update
          apt-get install git -y

    - script:
        name: Makefile make
        code: |
          make build

    - lukevivier/gh-pages:
        token: $GH_TOKEN
        basedir: refills
```


## 解説

- box に git がインストールされていないためデプロイ時にインストール
- `lukevivier/gh-pages` は lukevivier 氏が作った GitHub Pages デプロイ用の wercker step
  - [lukevivier/step-gh-pages](https://app.wercker.com/#applications/51f71ee369cd738a32001822/tab/details/)
  - [lvivier/step-gh-pages: deploy github pages with wercker](https://github.com/lvivier/step-gh-pages)

### GitHub アクセストークンと Wercker の設定
`$GH_TOKEN` は GitHub の個人設定で生成したトークンを Wercker 経由で割り当てています。
詳しくは別のページでまとめていますので参照ください。

- [GitHubアクセストークンとWerckerの設定 :: GitHub Pages \| Refills](https://syon.github.io/refills/rid/1462280/)

### 実例

- [syon/refills](https://github.com/syon/refills) ==このサイトです！==
- [syon/wiki](https://github.com/syon/wiki)
