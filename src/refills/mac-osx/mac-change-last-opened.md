---
rid: 1525348
bid: mac-osx
rcd: mac-change-last-opened
srcpath: mac-osx/mac-change-last-opened.md
title: Macのファイル属性「最後に開いた日」を変更する
category: macOS
date: 2018.5.3
layout: refill.jade
---

![](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201805/mac-lastopened.png)


## はじめに

まず最初に断っておくと、「最後に開いた日」だけをコマンドから編集することはできないようです。
ここでは、その属性を編集することではなく
__Finder 上で表示される最後に開いた日__ を任意のものに変更することをゴールとします。

## 「最後に開いた日」の詳細

Mac の Finder に表示される「最後に開いた日」は、以下の
2 つの情報を状況に応じて出し分けているように見えます。

1. 直接/間接的に Finder 経由でファイルを開いたときに埋め込まれる Spotlight 属性 `kMDItemLastUsedDate`
1. 上記が存在しないときは、ファイルの変更日

Spotlight 属性 `kMDItemLastUsedDate` は、以下のコマンドで調べることができます。

```bash
$ mdls sample.txt
```

![](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201805/mac-mdls.png)

`xattr` コマンドを使って `kMDItemLastUsedDate`
の直接編集を試してみましたが、うまくいきませんでした。
適当な値で上書きしてから更に空文字で上書きすると属性そのものが消えたりしました。詳しいことはわかりません。

```bash
$ xattr -w com.apple.metadata:kMDItemLastUsedDate '' sample.txt
```


## 「最後に開いた日」を任意の日付に設定する

上記の挙動を踏まえると、以下のようにすれば任意の日付にできます。
要するに、開いた情報を消して変更日を書き換えて実現しています。

* 過去にファイルを開いたりして Spotlight 属性が存在する場合、ファイルをコピーするなどして属性情報のない状態にする
* ファイル変更日を書き換えるコマンドを実行（以下のいずれか）
  * `setfile -m '02/02/2020 12:59:59' sample.txt`
  * `touch -mt 202002021259.59 sample.txt`
* __ファイルを開かない__

ただし、このやり方だと「変更日」と「最後に開いた日」が必ず同じものとなります。

![](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201805/mac-lastopened.png)


## 「変更日」と「最後に開いた日」をそれぞれ任意の日付に設定する

無理やりですが実現できました。システム日付を変えてファイルを開いて戻って来ればいいのです。秒・ミリ秒レベルの調整は難しいでしょう。

![](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201805/mac-lastopendforce.png)


## cf.

* [ファイルの属性情報を探る 時刻編 - ザリガニが見ていた...。](http://d.hatena.ne.jp/zariganitosh/20130404/attribute_datetime)
* [2038年問題 - Wikipedia](https://ja.wikipedia.org/wiki/2038%E5%B9%B4%E5%95%8F%E9%A1%8C)
  * 2038年1月19日3時14分7秒（日本標準時では2038年1月19日12時14分7秒）
