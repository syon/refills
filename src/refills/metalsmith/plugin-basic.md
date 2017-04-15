---
rid: 1473779
bid: metalsmith
rcd: plugin-basic
title: プラグインの構造
date: 2016/09/10
layout: refill.jade
---

## 最小構成と独自プラグイン

```js
var Metalsmith = require('metalsmith');

function hello(arg) {
  console.log(arg.hoge); // fuga
  return function(files, metalsmith, done) {
    done();
  }
}

Metalsmith(__dirname)
  .use(
    hello({ hoge: "fuga" })
  )
  .build(function(err){
    if (err) throw err;
  });
```

プラグインの使用は `.use()` を連結することで実現します。その引数に渡すのは、
__Metalsmith プラグインとして定められた関数__ である必要があります。
プラグインによっては `require` したオブジェクトをそのまま渡すものや、
実行結果として関数を返すものがあります。このあたりは JavaScript の基礎なので
Metalsmith の範疇外なのですが、抑えておくとよいでしょう。

```js
  return function(files, metalsmith, done) {
    done();
  }
```


## プラグインの構造

次のコードは、プラグインのよくある構造です。リターンする関数の中でプラグイン内に流れてきた
ファイル群すべてをループし、中身を取り出してタイトルを読み取ったり、
Markdown を HTML に変換したりします。
そして、次のプラグインに処理を渡すために、最後に `done()` を呼びます。プラグインとしての役割が
他と競合しない、独立している場合は初めに `done()` を呼んでさっさと次にバトンを渡す場合もあるようです。

```js
function printFileTitle(arg) {
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file){
      var data = files[file];
      // print front-matter title
      console.log(data.title);
    });
    done();
  }
}
```
