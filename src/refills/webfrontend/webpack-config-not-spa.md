---
bid: webfrontend
rid: webpack-config-not-spa
title: SPA ではない Webpack 設定サンプル
date: 2016/12/10
layout: refill.jade
---

![AWAKE](AWAKE.png)

# 要点 (TL;DR)

Webpack の学習を兼ねて、数ページ程度の小規模 Web サイトを効率的に開発する土台を作りましたのでご紹介します。話を簡潔にするため、一旦は SPA ではないサイトを目標にしました。
作成したサイトを GitHub Pages に公開するところまでご案内します。

### 実現したいこと

- ファイル変更監視とオートリロード
- 素の HTML は書きたくないので Pug (Jade)
- ページ遷移あり
- Bootstrap & jQuery を使う
- CSS は Sass っぽく書いてベンダープレフィックス自動付与
- Google Fonts で Web フォント利用
- FontAwesome でアイコン利用
- JavaScript は ES2015
- Wercker で自動ビルド＆デプロイして GitHub Pages に公開

### サンプルリポジトリ

AWAKE - GitHub
: https://github.com/syon/awake

DEMO
: https://syon.github.io/awake/

# 概要

## 採用技術

- webpack
  - `webpack-dev-server`
    `source-map`
    `html-webpack-plugin`
- Babel
  - `ES2015`
- PostCSS
  - `Autoprefixer`
    `PreCSS`
- Style
  - `Bootstrap`
    `jQuery`
    `Google Fonts`
    `FontAwesome`
- Template
  - `Pug (Jade)`

## 構造

```bash
awake
├── src
│   ├── css
│   │   ├── partials
│   │   │   └── _variables.css
│   │   └── app.css
│   ├── img
│   │   └── bg.jpg
│   ├── js
│   │   └── awake.js
│   ├── pug
│   │   └── root.pug
│   ├── app.js
│   ├── hello.pug
│   ├── index.pug
│   └── world.pug
├── .gitignore
├── README.md
├── package.json
├── webpack.config.js
└── wercker.yml
```

## webpack.config.js

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: {
    javascript: './app.js',
  },

  output: {
    path: __dirname + '/www',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: 'www',
    port: 3000
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        // https://github.com/babel/babel-loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      // Bootstrap - https://github.com/shakacode/bootstrap-loader#jquery
      // FontAwesome - https://gist.github.com/Turbo87/e8e941e68308d3b40ef6
      { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
      { test: /\.(woff2?|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AWAKE',
      template: 'index.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'AWAKE - Hello',
      filename: 'hello.html',
      template: 'hello.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'AWAKE - World',
      filename: 'world.html',
      template: 'world.pug'
    })
  ],

  postcss: function() {
    var precss = require('precss');
    var autoprefixer = require('autoprefixer');
    return [
      autoprefixer({ browsers: ['IE 9', 'IE 10', 'IE 11', 'last 2 versions'] }),
      precss
    ];
  }
};
```

# 解説

## ファイル変更監視とオートリロード

`webpack-dev-server` を使って実現します。

__webpack.config.js（抜粋）__
```js
  devServer: {
    contentBase: 'www',
    port: 3000
  },
```

開発をはじめるには、以下のコマンドを実行します。

```bash
$ npm start
```

完成したら、ビルドします。`www` フォルダに結果が出力されます。

```bash
$ npm run build
```


## ページ遷移あり & 素の HTML は書きたくないので Pug (Jade)

この例では、ページのテンプレートエンジンとして Pug を使用します。
ページを分けるには `html-webpack-plugin` を読み込んで、以下のように設定します。

__webpack.config.js（抜粋）__
```js
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AWAKE',
      template: 'index.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'AWAKE - Hello',
      filename: 'hello.html',
      template: 'hello.pug'
    }),
    new HtmlWebpackPlugin({
      title: 'AWAKE - World',
      filename: 'world.html',
      template: 'world.pug'
    })
  ],
```
```bash
awake
├── src
│   ├── pug
│   │   └── root.pug
│   ├── hello.pug
│   ├── index.pug
│   └── world.pug
```

## Bootstrap & jQuery & FontAwesome を使う

Bootstrap については [bootstrap-loader](https://github.com/shakacode/bootstrap-loader) というものがあります。導入の利点は

__srt/app.js（抜粋）__
```js
require('bootstrap-loader');
```

と書いてシンプルに済むことですが、結局のところ webpack への導入は CSS や Web フォントファイルを個々の Loader で読み込む必要があります。つまり、Web ページ上で利用したいライブラリを使うには Loader で読み込ませれば OK ということがわかります。

## CSS は Sass っぽく書いてベンダープレフィックス自動付与

- [Sassを捨ててPostCSSに移行したのでそのときの工程メモ \- Qiita](http://qiita.com/nabeliwo/items/0aeea21e95f3fbab3955)

この記事が実現したいことに近かったのですが、変数まわりで納得行かなかったのでやめました。というのも、変数を集めた外部ファイルで色を管理したいだけだったものの実現できなかったからです。色の定義を color.js みたいなのにまとめて PostCSS に食わせる方法もありましたが、特にこだわりがないので PreCSS を採用することで Sass っぽいのがスムーズに実現したのでこれでよしとしました。

```bash
awake
├── src
│   ├── css
│   │   ├── partials
│   │   │   └── _variables.css
│   │   └── app.css
```

__src/css/partials/\_variables.css__
```scss
$LogoColor: rgba(0, 0, 0, 0.7);
```

__src/css/app.css__
```scss
@import "partials/variables";
```

### エディタでのシンタックスカラー問題

拡張子が css なので、エディタで開くと階層を使った記述でカラーリングされない問題が発覚しました。そのために scss 拡張子を維持するのもどうかと思ったので、Atom で見つけた以下のパッケージを導入することで解決しました。

- [language\-postcss](https://atom.io/packages/language-postcss)

## Google Fonts で Web フォント利用

以下の例は、webpack が関係ないことを示しています。
通常利用時と同じく、Web ページを開いた際にインターネット上の Google のサーバにアクセスして Web フォントを利用しているに過ぎません。

__src/css/app.css__
```scss
@import url('https://fonts.googleapis.com/css?family=Belleza');

/***/

#app {
  h1 {
    margin: 0;
    font-family: 'Belleza', sans-serif;
    font-size: 12vmax;
    color: $LogoColor;
    font-kerning: normal;
    text-rendering: optimizeLegibility;
  }

/***/
```

別の方法として、`root.pug` にスタイルタグの読み込みをさせることもできます。また、もしインターネットに接続しない環境で利用したい場合には @import 先の URL で得られる CSS からフォントファイルをダウンロードして Loader に読み込ませればいけるのではないでしょうか。

## JavaScript は ES2015

これについては他でよく述べられているので詳細を割愛します。

__webpack.config.js（抜粋）__
```js
  module: {
    loaders: [
      {
        // https://github.com/babel/babel-loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      },
```

## Wercker で自動ビルド＆デプロイして GitHub Pages に公開

別の記事にまとめましたので、こちらを参照ください。

- [GitHub Pages :: Webpack & Wercker 自動デプロイ \| Refills](/refills/github-pages/autodeploy-wercker-webpack/)


# Dependencies

__package.json（抜粋）__
```js
  "dependencies": {
    "bootstrap-loader": "^1.3.1",
    "bootstrap-sass": "^3.3.7",
    "font-awesome": "^4.7.0"
  },
  "devDependencies": {
    "autoprefixer": "^6.5.3",
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-preset-es2015": "^6.18.0",
    "css-loader": "^0.26.1",
    "exports-loader": "^0.6.3",
    "file-loader": "^0.9.0",
    "html-webpack-plugin": "^2.24.1",
    "imports-loader": "^0.6.5",
    "jquery": "^3.1.1",
    "node-sass": "^3.13.0",
    "postcss-loader": "^1.1.1",
    "postcss-nested": "^1.0.0",
    "postcss-simple-vars": "^3.0.0",
    "precss": "^1.4.0",
    "pug": "^2.0.0-beta6",
    "pug-loader": "^2.3.0",
    "resolve-url-loader": "^1.6.0",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.3",
    "webpack-dev-server": "^1.16.2"
  }
```
