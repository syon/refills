---
bid: metalsmith
rid: plugin-basic
title: プラグインの構造と使い方
date: 2016/09/10
layout: refill.jade
wip: true
---

※ `build.js` に記述する方式


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

プラグインの使用は `.use()` を連結することで実現します。


## プラグインの構造

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
