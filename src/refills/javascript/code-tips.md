---
bid: javascript
rid: code-tips
title: CODE TIPS
date: 2016/05/13
layout: refill.jade
---

## 正規表現

- [正規表現 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)
- [JavaScriptで正規表現を複数回実行する際の注意点 - Qiita](http://qiita.com/nanocloudx/items/079685599273f3805f77)

```js
if (str.match(/hoge/)) {
  // 正規表現にマッチ
}
```
```js
if (str.indexOf('hoge') != -1) {
  // 'hoge'に一致
}

if (~str.indexOf('hoge')) {
  // 'hoge'に一致
}
```


## UserAgent

- [JavaScript とかによるブラウザ判定方法のまとめ - etc9](http://d.hatena.ne.jp/Naotsugu/20110927/1317140891)


## EventListener

- [JavaScript - addEventListener / removeEventListener サンプル – nocorica](http://blog.nocorica.jp/2015/05/js-eventlistener/)

- [リサイズイベントのパフォーマンスチューニング | HTML5/CSS3, JavaScript 次世代WEB研究開発](http://lab.informarc.co.jp/javascript/resize_queue.html)


## Parent window, Child window

#### JavaScript access from child window to parent window
```js
/* Parent window */
function parentfunc(arg) {
  console.log(arg); // from child
}
```
```js
/* Child window */
function triggerdfunc() {
  window.opener.parentfunc('from child');
}
```


## 高速化

- [一行で IE の JavaScript を高速化する方法 - IT戦記](http://d.hatena.ne.jp/amachang/20071010/1192012056)


## iPhone の Safari でアドレスバーを隠す

- [iPhone の Safari でアドレスバーを隠すときにやってはいけないこと - メモ用紙](http://d.hatena.ne.jp/scientre/20130611/hide_addressbar_on_iphone)

```js
window.addEventListener("load", function() {
  setTimeout(scrollBy, 100, 0, 1);
}, false);
```


## Windowサイズ
- [JavaScriptで画面サイズを取得する | かえラボBlog](http://kaelab.ranadesign.com/blog/2010/10/javascript-5.html)


## undefined分岐
- [JavaScript：undefined値の判定 - 泥のように](http://blog.tojiru.net/article/205007468.html)

```js
if (typeof a === "undefined") {
```


## setTimeout
- [JavaScript - setTimeout(...,0)などの使いドコロ - Qiita](http://qiita.com/jkr_2255/items/17693ab77beea71a871c)
> じつは、setTimeoutはJavaScriptの言語機能ではなくてブラウザ側の機能です。これも一種のイベントコールバックだと考えるとスッキリします。

### 引数有りのsetTimeout()

- [引数有りのsetTimeout()について ＭＡｘＵｒａの落書き帳　～Ｓｃｒａｗｌ　Ｎｏｔｅ～](http://maxura.blog62.fc2.com/blog-entry-179.html)

```js
setTimeout(function(){
  Fn(arg);
},3000);
```


## タッチパネル対応

```js
var supportTouch  = 'ontouchend' in document;
var EV_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
var EV_TOUCHMOVE  = supportTouch ? 'touchmove' : 'mousemove';
var EV_TOUCHEND   = supportTouch ? 'touchend' : 'mouseup';

$(document).on(EV_TOUCHEND, '#target', function(){ /**/ });
```

- [touch, click, pointerの実装 - タッチイベントとマウスイベント | CodeGrid](https://app.codegrid.net/entry/touch-mouse)


## エラー収集

- [大手Webサービスがクライアント側で発生したJavaScriptのエラーをどう収集しているのか まとめ - Qiita](http://qiita.com/grapswiz/items/4e97968f3d3df97a4c76)


## trim
```js
target = target.replace(/(^\s+)|(\s+$)/g, "");
```
```js
target = $.trim(target);
```

## Form
- [HTML5のValidationでsubmitボタンの状態を変更する - Qiita](http://qiita.com/r7kamura/items/6f68305c01e9c0a02d91)

### Hidden field
- [Create a hidden field in JavaScript - Stack Overflow](http://stackoverflow.com/questions/1000795/create-a-hidden-field-in-javascript)


## Keys in Object
- [[JavaScript] オブジェクトをループでまわす - Qiita](http://qiita.com/phi/items/98975e1bb4995c1f1bcf)

```js
var theObj = {a:1, b:2, c:3}
Object.keys(theObj)
=> ["a", "b", "c"]
Object.keys(theObj).map(function(d){console.log(d)})
=> a
   b
   c
```


## incrimental search

```js
function incrimental search (pattern) {
    try {
        var regex = new RegExp(pattern, "i");
        var trs   = document.getElementsByTagName('tr');
        var len   = trs.length;
        for (var i = 0; i < len; i++) {
            var t = trs[i];
            if (t.className == "line") {
                if (t.innerHTML.match(regex)) {
                    t.style.display = "inline";
                } else {
                    t.style.display = "none";
                }
            }
        }
    } catch (e) {
        // 正規表現の文法エラーを無視する
    }
}
```
```html
<input type="text" name="pattern" onkeyup="grep(this.value)" style="width:10em; border:1px solid #E3E3E3;">
```


## クエリストリングの値を取得
- [javascript - How can I get query string values? - Stack Overflow](http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values)
