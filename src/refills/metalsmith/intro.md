---
bid: metalsmith
rid: intro
title: 基本と使い方
date: 2016/05/23
layout: refill.jade
wip: true
---

(Draft)

- Official
  - EVERYTHING IS A PLUGIN
  - HOW DOES IT WORK?
  - INSTALL IT
  - A LITTLE SECRET
  - THE PLUGINS
- About Makefile


## Plugin basic

```js
.use(
  hello({ hoge: "fuga" })
)
```
```js
function hello(arg) {
  console.log(arg.hoge); // fuga

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
