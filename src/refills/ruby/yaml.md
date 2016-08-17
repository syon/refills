---
bid: ruby
rid: yaml
title: YAML
date: 2016/08/17
layout: refill.jade
---

## YAML

> 記述方法は__ブロックスタイル__と__フロースタイル__があり、フロースタイルで記述する場合は JSON と同じにすることができます。
> つまり JSON を YAML とみなすことも可能です。

### Array

```ruby
# ブロックスタイル
- milk
- bread
- eggs
# フロースタイル
[milk, bread, eggs]
```

### Nest

> ネストさせたい場合は1つ以上の半角スペースを使います。タブを使ってはいけません。

```ruby
a: a1
b:
  b1: bbb1
  b2: bbb2
c: c1
```


## `*.yml`

```ruby
require 'yaml'

sample = YAML.load_file('sample.yml')
```


## articles

- [YAML Ain't Markup Language \(YAML\) Version 1\.1](http://yaml.org/spec/current.html)
- [YAMLの基本について \- TASK NOTES](http://www.task-notes.com/entry/20150922/1442890800)
