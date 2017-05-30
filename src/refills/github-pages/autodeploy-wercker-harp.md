---
rid: 1462287
bid: github-pages
rcd: autodeploy-wercker-harp
srcpath: github-pages/autodeploy-wercker-harp.md
title: Harp & Wercker 自動デプロイ
date: 2016.5.4
layout: refill.jade
---

#### wercker.yml
```yaml
box: node:5.11-slim

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
      name: Harp compile
      code: |
        node_modules/harp/bin/harp compile harp-src

    - lukevivier/gh-pages:
        token: $GH_TOKEN
        basedir: harp-src/www/works
```


## 解説

- box に git がインストールされていないためデプロイ時にインストール
- harp コマンドは node_modules 内のものを直接指定
- `lukevivier/gh-pages` は lukevivier 氏が作った GitHub Pages デプロイ用の wercker step
  - [lukevivier/step-gh-pages](https://app.wercker.com/#applications/51f71ee369cd738a32001822/tab/details/)
  - [lvivier/step-gh-pages: deploy github pages with wercker](https://github.com/lvivier/step-gh-pages)

### GitHub アクセストークンと Wercker の設定
`$GH_TOKEN` は GitHub の個人設定で生成したトークンを Wercker 経由で割り当てています。
詳しくは別のページでまとめていますので参照ください。

- [GitHub アクセストークンと Wercker の設定](../oauth-access-token/)

### 実例

- [syon/works](https://github.com/syon/works)

### Note (at 2016/05/04)

- 現時点の最新バージョンである Harp v0.20.3 は Node v5 で動作（v6で動作しない）
  - [Add Node v6.0.0 support · Issue #1504 · sass/node-sass](https://github.com/sass/node-sass/issues/1504)  
    node-sass が Node v6 に対応できていない
  - [sintaxi/terraform: Asset pipeline for the Harp Web Server.](https://github.com/sintaxi/terraform)  
    Harp が内部的に使用している Web サーバ Terraform  
    - package.json: `"node-sass": "3.4.2"`
  - Node v5 を使う
    - `box: node:5.11-slim`
