---
bid: metalsmith
rid: plugins
title: プラグインの解説
date: 2016/05/04
layout: refill.jade
---

## metalsmith-asciidoc


## metalsmith-sass


## metalsmith-assets


## [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable)

Markdown の実装の1つである __[Remarkable](https://github.com/jonschlinkert/remarkable)__ を使って、拡張子`.md`または`.markdown`ファイルを HTML に変換します。プラグインに渡された引数は内部 Remarkable の function にそのまま渡しているため、透過的に扱うことができます。引数の preset や options だけでなく、Remarkable 自体のプラグイン機構である`use()`を適用することもできます。

- [jonschlinkert/remarkable](https://github.com/jonschlinkert/remarkable)  
  Remarkable

- [Remarkable demo](http://jonschlinkert.github.io/remarkable/demo/)  
  LIVE DEMO で Remarkable を試す

- [packages with keyword ‘remarkable-plugin’ - npm](https://www.npmjs.com/browse/keyword/remarkable-plugin)  
  Remarkable のプラグイン一覧


## metalsmith-prism


## metalsmith-jade


## metalsmith-layouts


## metalsmith-permalinks

例えば `about.html` であれば `about/index.html` に変換して出力することで、
以下のような URL でアクセスできるようにします。URLの`index.html`は省略できることを利用しています。

- `http://example.com/about.html`  
  ↓
- `http://example.com/about/`

### ファイル管理上の利点
このプラグインの強みは__ファイル毎に定義したメタデータで出力先を振り分けることができる__ことです。
言い換えると__URLで表現するディレクトリの通りに配置しなくてもよい__のです。
例えば、カテゴリを含まない記事IDでアクセスするようなURL構造のサイトを考えます。
コンテンツが充実してくると、1つのフォルダに100を超えるような Markdown ファイルで溢れ返ります。
これらを内部的に日付やカテゴリで区切って整理するものの、URLはその構造を隠して短く、といったことが実現できます。

- [syon/wiki](http://syon.github.io/wiki/)  
  記事IDでアクセスするサイトの実例
- [wiki/src/md at master · syon/wiki](https://github.com/syon/wiki/tree/master/src/md)  
  Markdown ファイル名の頭文字で内部的にフォルダ分けした実例

### 使用上の注意
対象となるHTMLファイルと同じ階層にあるのファイル（拡張子`.html`以外）を複製して
新しいディレクトリを作り出すことで実現しているため、無駄なファイルがどんどん増えてしまいます。
これは変換前のHTMLに記述された画像などの参照情報が同階層に対して行われている可能性に対する配慮と思われます。

この挙動はオプション `relative` を使って OFF にすることができます。
OFF にすると同階層に対する参照が失われるため、同階層の画像などを別の場所に移し、
ルートパスを使った書き方にすることで対処します。
デメリットとしては、例えば Markdown 記述時の画像の配置先が離れること、参照先もそれを意識した
記述とする必要があることが挙げられます。ローカルのエディタ上で画像もプレビューしながら書くためには、
ルートパスの記述に対応したエディタを選ぶ必要があります。参考までに、Atom は対応しているようです。

- [metalsmith-permalinks #relative-files](https://github.com/segmentio/metalsmith-permalinks#relative-files)  
  Relative Files について

- [ルートパスって何？ | レモンのいれもんデザイン備考録](http://remonnoiremon.com/?p=471)  
  ルートパスの図解による説明


## metalsmith-mapsite