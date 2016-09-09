---
bid: metalsmith
rid: intro
title: 思想の解説と活用事例
date: 2016/09/10
layout: refill.jade
---

## Metalsmith とタスクランナー、その思想

今どきの Web 制作・開発は、その基礎である HTML, CSS, JavaScript の作成を手書きで
行うことが少なくなってきました。その背景には、新しい技術の採用による表現力や効率の向上と
互換性の維持が根底にあります。

具体的には、文章には Markdown 、HTMLには Haml/Jade 、CSS には Sass/Less 、
JavaScript には Coffee/ES2015 が多く使われています。
記述するのは効率的になりましたが、その代わりにこれらの中間言語のようなものを変換する
手間が増えてしまいました。
そこで流行したのが Grunt や Gulp などのタスクランナーと呼ばれるツールです。
しかし Metalsmith はそれらとはまた少し違い、単純なプリプロセッサとしての役割を超えた
__「静的ファイルの生成」を主眼に置いた思想__ でできています。

メタルスミス（金属細工師）という名は、材料となる金属を加工していくことで作品を仕上げることに
なぞらえて付けられたのでしょう。与えられた材料を、決められた工程のとおり順番に加工して
仕上げていきます（参考：[金属加工 \- Wikipedia](https://ja.wikipedia.org/wiki/%E9%87%91%E5%B1%9E%E5%8A%A0%E5%B7%A5)）。


## 「すべてはプラグインである」

公式サイトに “EVERYTHING IS A PLUGIN” とあるように、
Metalsmith は本体とプラグインのみで構成されます。
あらかじめ用意したファイル群をインプットとし、`src`フォルダに格納します。
プラグインを順番に適用して、出来上がったものが`build`フォルダに出力されます。
イメージを図で表現してみると、以下のように抽象化できます。

```
,---------.
|   src   +-----.
`---------'     |
           ,----+-----.
           | Plugin A |
           `----+-----'
                |
           ,----+-----.
           | Plugin B |
           `----+-----'
                |
           ,----+-----.
           | Plugin C |
           `----+-----'
,---------.     |
|  build  +-----'
`---------'
```

このイメージはとても重要です。他のタスクランナーや静的サイトジェネレータとは違い、
直列の __パイプライン処理機構__ を構築する、という方がしっくりきます。

実際の活用事例を見てみましょう。公式サイトの例はあっさりしすぎているので、今あなたが見ている
このサイト Refills のソースコードを一部省略して掲載します。
そう、ここも Metalsmith で構築されているのです。
何をやっているか、なんとなくつかめた気がしませんか。

> https://github.com/syon/refills/blob/master/build.js

```js
Metalsmith(__dirname)
  .use(draftsInDev())
  .use(collections(...)
  .use(refills())
  .use(assets(...))
  .use(less())
  .use(autoprefixer())
  .use(markdown(...))
  .use(prism())
  .use(jade(...))
  .use(permalinks(...))
  .use(layouts({engine: 'jade'}))
  .use(mapsite(...))
  .use(watching())
  .build(function(err) {
    if (err) throw err;
  });
```
