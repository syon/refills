---
rid: 1481296
bid: github-pages
rcd: autodeploy-wercker-webpack
srcpath: github-pages/autodeploy-wercker-webpack.md
title: Webpack & Wercker 自動デプロイ
date: 2016.12.10
layout: refill.jade
---

#### wercker.yml
```yaml
box: node

build:
  steps:
    - npm-install
    - script:
        name: install git
        code: |
          apt-get update
          apt-get install git -y
    - script:
        name: webpack
        code: |
          npm run build

deploy:
  steps:
    - lukevivier/gh-pages:
        token: $GH_TOKEN
        basedir: www
```


## 解説

- box に git がインストールされていないためデプロイ時にインストール
- `lukevivier/gh-pages` は lukevivier 氏が作った GitHub Pages デプロイ用の wercker step
  - [lukevivier/step-gh-pages](https://app.wercker.com/#applications/51f71ee369cd738a32001822/tab/details/)
  - [lvivier/step-gh-pages: deploy github pages with wercker](https://github.com/lvivier/step-gh-pages)

### GitHub アクセストークンと Wercker の設定
`$GH_TOKEN` は GitHub の個人設定で生成したトークンを Wercker 経由で割り当てています。
詳しくは別のページでまとめていますので参照ください。

- [GitHub アクセストークンと Wercker の設定](../oauth-access-token/)

### 実例

- [syon/awake](https://github.com/syon/awake)
  - [SPA ではない Webpack 設定サンプル](/refills/webfrontend/webpack-not-spa/)
