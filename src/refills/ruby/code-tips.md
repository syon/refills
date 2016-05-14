---
bid: ruby
rid: code-tips
title: CODE TIPS
date: 2016/05/14
layout: refill.jade
---

### コマンドライン引数

- [Rubyメモ - コマンドライン引数](http://www2.atwiki.jp/kmo2/pages/16.html)

```ruby
puts ARGV[0]
```


## 例外
- [Ruby - Railsアプリケーションにおけるエラー処理（例外設計）の考え方 - Qiita](http://qiita.com/jnchito/items/3ef95ea144ed15df3637)


## Debug

### メソッド一覧

```ruby
require 'pp'
pp [].methods.sort
```

### pry
- [Ruby - ググるよりもまずはpry - Qiita](http://qiita.com/Kokudori/items/2b36068cdf2e40e75c2d)

### ブロックコメント

```ruby
=begin
  :
  :
=end
```


## File

### 出力
```ruby
# r:読込 w:上書 a:追記
open("log.txt", "a"){|f| f.write("文字列")}
```

### Path
- [Get Filename without extension from file path in Ruby - Stack Overflow](http://stackoverflow.com/questions/374326/get-filename-without-extension-from-file-path-in-ruby)

```ruby
File.basename("/home/gumby/work/ruby.rb")          #=> "ruby.rb"
File.basename("/home/gumby/work/ruby.rb", ".rb")   #=> "ruby"
```


## CSV
- [Ruby標準添付ライブラリcsvのCSV.tableメソッドが最強な件について](http://melborne.github.io/2013/01/24/csv-table-method-is-awesome/)
    - [Ruby 2.1.0 リファレンスマニュアル class CSV::Table](http://docs.ruby-lang.org/ja/2.1.0/class/CSV=3a=3aTable.html)

```ruby
CSV.table("data.tsv", { :col_sep => "\t", :quote_char => "\"" }) # needs header row
```


## Array

要素数を指定して取得
```ruby
[1,2,3,4,5].take(3)  #=> [1, 2, 3]
[1,2,3,4,5].first(3) #=> [1, 2, 3]
```

- [rubyの配列からnilと空文字を取り除く - Qiita](http://qiita.com/ta1kt0me@github/items/33c4d37a65b69b75ee40)


## Time

### ActiveSupport による日時演算
```ruby
gem 'activesupport'
require 'active_support/all'

Time.now                #=> 2014-10-06 21:39:10 +0900
Time.now.since(3.hours) #=> 2014-10-07 00:39:10 +0900
```

### ActiveSupport による UTC(String) → JST(String) 変換
9時間進めて JST 表記にする
```ruby
gem 'activesupport'
require 'active_support/all'

Time.strptime("2014-10-06 12:39:10 UTC", "%F %T UTC").since(9.hours).strftime("%F %T JST")
#=> "2014-10-06 21:39:10 JST"
```

### rails/blank.rb
- [rails/blank.rb at master · rails/rails](https://github.com/rails/rails/blob/master/activesupport/lib/active_support/core_ext/object/blank.rb)
- [Rails以外の環境でblank?メソッドを使うときの注意 - (ﾟ∀ﾟ)o彡 sasata299's blog](http://blog.livedoor.jp/sasata299/archives/51495666.html)


## Rubyワンライナー

- [Rubyワンライナー入門 - maeharinの日記](http://d.hatena.ne.jp/maeharin/20130113/ruby_oneliner)

### ワンライナー基礎

`-e`
: 一番基本的なオプション。スクリプトを実行する。（他のオプションと組み合わせる時は必ず最後に記載する）

```bash
$ ruby -e 'puts "hoge"'
```

### Windowsの環境変数Pathを改行して表示

```bash
echo %path% | ruby -F; -ane 'puts $F'
```

`echo %path%`で出力される内容を、rubyコマンドの引数として渡し、`-n`オプションによって行ごとに処理をループする。ループは Kernel.#gets により組込変数`$_`に格納される。`echo %path%`の場合は`;`区切りの1行文字列のため、ループは1回となる。次に、`-a`オプションによってループの先頭で自動的に $F = $_.split が実行され、結果の格納された`$F`を puts で出力している。splitの区切り文字はデフォルトで半角スペースのようだが、オプション`-F;`で`;`を区切り文字に指定している。

## [rubyを使って簡易webサーバー構築](https://gist.github.com/manji6/5056073)
