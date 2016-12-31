---
bid: heroku
rid: static-site
title: Herokuを使ってサクッと無料で静的サイトを公開
date: 2017/01/01
layout: refill.jade
---

すでに手元にある HTML などのファイルをインターネットに公開したい場合に、
クラウドサービスを利用すると便利です。
今回は無料で利用できる Heroku を使ったやり方を紹介します。

- [Cloud Application Platform | Heroku](https://www.heroku.com/)

Heroku でアカウントを登録したら、コマンドラインで扱うために Heroku CLI をインストールします。

- [Heroku CLI \| Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-cli)

インストールが完了したら、`$ heroku login` でログインします。


## ひな形をダウンロード

- https://github.com/syon/awake
  - Download ZIP

ダウンロードした ZIP ファイルを、任意の場所に展開します。
その後、ディレクトリ名を `awake` からサイト名に変更してください。
ここでは仮に `your-site-name` として説明していきます。

ちなみに `$ git clone` して利用することもできますが、あとで自分のリポジトリとして
Git 管理したり GitHub にプッシュしたい場合に面倒なので、こちらの方法を取るほうが手っ取り早いです。


## ターミナルで操作

まずはサンプルがHeroku上で動作するかを確認しましょう。

```bash
$ cd your-site-name
$ heroku create your-site-name
$ git push -u heroku master
$ heroku open
```

要領がわかったところで、お手元のファイルを `public` ディレクトリに配置します。  
変更内容をコミットして Heroku にアップロードして完了です。

```bash
$ git add -A
$ git commit -am "commit message"
$ git push -u heroku master
```


## ローカルで動作確認したいとき

動作に必要な Node.js のパッケージをインストールします。

```bash
$ npm install
```

HTTP サーバを起動してブラウザで確認します。

```bash
$ npm start
```

- http://localhost:5000

修正が必要になったら、そのまま `public` ディレクトリの内容を変更します。
反映されない場合は、ブラウザのキャッシュを確認してみてください。
HTTP サーバは `control + C` で停止します。


## Basic認証をかける

ユーザー名とパスワードを使ってWebサイトに閲覧制限をかけることができます。  
`Procfile` を以下のように編集します。

```bash
web: serve public --auth
```

変更内容をコミットします。

```bash
$ git commit -am "basic auth"
```

Herokuサーバに、Basic認証に使うユーザー名とパスワードを設定します。

```bash
$ heroku config:set SERVE_USER username
$ heroku config:set SERVE_PASSWORD password
```

リポジトリをHerokuに反映して完了です。

```bash
$ git push -u heroku master
```
