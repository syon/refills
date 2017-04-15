---
rid: 1473780
bid: metalsmith
rcd: plugins
srcpath: metalsmith/plugins.md
title: 主要プラグインの一覧と解説
date: 2016/06/29
layout: refill.jade
---

## Table of contents

- metalsmith-drafts
- metalsmith-autoprefixer
- metalsmith-sass
- metalsmith-less
- metalsmith-assets
- metalsmith-markdown-remarkable
- metalsmith-asciidoc
- metalsmith-prism
- metalsmith-jade
- metalsmith-layouts
- metalsmith-permalinks
- metalsmith-mapsite
- metalsmith-watch


## [metalsmith-drafts](https://github.com/segmentio/metalsmith-drafts)
ドラフト（下書き）を管理するプラグインです。下書き状態としたいコンテンツファイルの先頭 (YAML front-matter) に `draft: true` と記述すると、パイプラインから除去されます。

ただし、この方法だと下書き状態のまま生成物を確認することができません。
実例として `development` 環境では下書きも生成するが `production` 環境では除去したい、
を実現するには以下のようにします。

```bash
$ export NODE_ENV=development
```

```js
function draftsInDev() {
  if (process.env.NODE_ENV !== 'development') {
    return drafts();
  } else {
    return function(){};
  }
}
```

```js
  .use(draftsInDev())
```

`export` の管理には npm パッケージの [dotenv](https://github.com/motdotla/dotenv) を使うと便利です。


## [metalsmith-autoprefixer](https://github.com/esundahl/metalsmith-autoprefixer)
Autoprefixer プラグインです。 CSS ファイルを対象に、ベンダープレフィックスを自動で付加します。
Sass や Less プラグインを使っている場合には、その後に呼び出します。

- [postcss/autoprefixer](https://github.com/postcss/autoprefixer)  
  Parse CSS and add vendor prefixes to rules by Can I Use


## [metalsmith-sass](https://github.com/stevenschobert/metalsmith-sass)
Sass プラグインです。拡張子`.sass`または`.scss`ファイルを CSS に変換します。
ただし、Sass のソースファイルや配置ディレクトリをプラグインに渡す必要はありません。
Metalsmith の流儀として、すべてのソースファイルがプラグインの処理対象となるからです。

- [Sass: Syntactically Awesome Style Sheets](http://sass-lang.com/)  
  Sass 公式サイト

### !! Incompatible with Node v6.x
2016/06 現在、`"node-sass": "^3.1.2"` に依存しているため Node v6.x では動作しません。
Fork してなんとかするか、 Sass を諦めて metalsmith-less に切り替えます。

### パーシャルについて

ファイル名が`_variables.sass`などのように先頭にアンダースコアが付いている場合、
パーシャルと判断され出力ファイル群から削除されます。もちろん削除されると言っても、
プラグイン間に流れる処理過程のソースファイルから除去されるだけであり、元のファイルは残ります。
そのため、パイプライン内のパーシャルファイルが消えても、変換対象の Sass ファイルは
ソースディレクトリにそのまま残っているパーシャルを import などで参照することができます。

参考までに、パイプライン内のソースファイル名を列挙するコードを紹介します。
下記のコードで本プラグインの記述を挟むと、パーシャルが消え Sass ファイルの拡張子が`.css`に変わる様子が見られます。

```js
  .use(function(f,m,d){console.log(Object.keys(f));d();})
```

### outputDir オプション

変換した CSS ファイルの出力先は `Metalsmith.destination() + outputDirOption` で定義されます。
outputDir オプションに `css/` のようにパス文字列を渡すとそこにすべて配置されます。
この場合、元あった階層は維持されません。構造を維持したい場合はオプションにパス文字列を変換する
関数を渡します（詳しくはプラグインの README 参照）。
公式サンプルのように `replace` を使って、`scss` フォルダにあったファイルを `css` フォルダに配置することができます。


## [metalsmith-less](https://github.com/christophercliff/metalsmith-less)
Less プラグインです。拡張子 `.less` ファイルを CSS に変換します。 上記 Sass プラグインと同様、ソースファイルや配置ディレクトリをプラグインに渡す必要はありません。 Metalsmith の流儀として、すべてのソースファイルがプラグインの処理対象となるからです。

対象とする Less ファイルはオプションの `pattern` で指定することができます。


## [metalsmith-assets](https://github.com/treygriffith/metalsmith-assets)
`Metalsmith.source()` で定義したソースファイル群に、そことは別のディレクトリにあるアセットファイル（各種ライブラリや画像）を含めます。
例えば Metalsmith で扱うコンテンツがマークダウンで、ソースフォルダには `.md` ファイルのみを配置したい、
アセットファイルはあえて別の階層に置いて管理したい、という場合に役立ちます。

実際にはサイト固有のスタイルシートを用意することと思います。今どきは Sass などを使うのが便利なため、
`metalsmith-sass` プラグインと組み合わせてビルドすることになるでしょう。


## [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable)

Markdown の実装の1つである __[Remarkable](https://github.com/jonschlinkert/remarkable)__ を使って、拡張子`.md`または`.markdown`ファイルを HTML に変換します。プラグインに渡された引数は内部 Remarkable の function にそのまま渡しているため、透過的に扱うことができます。引数の preset や options だけでなく、Remarkable 自体のプラグイン機構である`use()`を適用することもできます。

- [jonschlinkert/remarkable](https://github.com/jonschlinkert/remarkable)  
  Remarkable

- [Remarkable demo](http://jonschlinkert.github.io/remarkable/demo/)  
  LIVE DEMO で Remarkable を試す

- [packages with keyword ‘remarkable-plugin’ - npm](https://www.npmjs.com/browse/keyword/remarkable-plugin)  
  Remarkable のプラグイン一覧

### Remarkable plugins

- [remarkable-emoji](https://github.com/scrollback/remarkable-emoji)  
  絵文字プラグイン。 `:laughing:` のように書くと絵文字に変換されます。
  ただし、 Front matter を使用していると機能しないようです…。
  今どきは OS とブラウザが進化しているので、そのまま絵文字を文書に打ち込めば大体表示されます💁

- [remarkable-classy](https://github.com/andrey-p/remarkable-classy)  
  クラス割当プラグイン。 Markdown 記述要素の末尾に `{blue}` のように書くと HTML 変換時に `class="blue"` が割り当てられます。


## [metalsmith-asciidoc](https://github.com/ndhoule/metalsmith-asciidoc)
AsciiDoc の実装の1つである __[Asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js)__ を使って、拡張子 `.adoc` または `.asciidoc` ファイルを HTML に変換します。

- [AsciiDoc Home Page](http://www.methods.co.nz/asciidoc/)  
  AsciiDoc 本家
- [asciidoctor/asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js)  
  Asciidoctor の JavaScript 版


## [metalsmith-prism](https://github.com/Availity/metalsmith-prism)
__[Prism.js](http://prismjs.com/)__ を使ってシンタックスハイライトを実現します。
拡張子が`html`または`htm`のファイルを対象に適用されます。
Markdown プラグインを使っている場合は、それよりも後にこのプラグインを動作させる必要があります。

- [Prism - Supported languages](http://prismjs.com/#languages-list)  
  Prism でシンタックスハイライトが可能な言語の一覧


## [metalsmith-jade](https://github.com/ahmadnassri/metalsmith-jade)
Jade プラグインです。拡張子 `.jade` を HTML ファイルに変換します。

### useMetadata オプション

Metalsmith のメタデータを Jade 内の処理で扱えるように渡すかどうかを指定します。


## [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts)
A metalsmith plugin for layouts


## [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks)

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

- [syon/wiki](https://syon.github.io/wiki/)  
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


## [metalsmith-mapsite](https://github.com/superwolff/metalsmith-mapsite)
__[sitemap.js](https://github.com/ekalinin/sitemap.js)__ を使ってサイトマップ (sitemap.xml) を生成するプラグインです。

### hostname オプション（必須）
URL を生成するための、ベースとなるパスを指定します。
例えばこのサイトのように GitHub Pages のプロジェクトページとして公開する場合は `'https://syon.github.io/refills/'` となります。
他のオプションを使用しない場合に、引数をオブジェクト形式ではなく文字列として1つ渡すと hostname 扱いしてくれます。

### omitIndex オプション
URL の末尾が `index.html` の場合に除外します。
metalsmith-permalinks を使うときに便利です。


## [metalsmith-watch](https://github.com/FWeinb/metalsmith-watch)
A metalsmith plugin to watch for a changes and trigger rebuilds.
