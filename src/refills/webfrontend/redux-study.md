---
rid: 1483023
bid: webfrontend
rcd: redux-study
srcpath: webfrontend/redux-study.md
title: Redux 学習の軌跡と自作サンプルの解説
category: React
date: 2016.12.30
layout: refill.jade
---

![Redux Study](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201612/redux-study.png)

### DEMO

- [Redux Study](https://syon.github.io/redux-study/)

### 対象

React の基礎を身につけた上で Redux に入門する人向けです。

### 範囲

公式の [Basics · Redux](http://redux.js.org/docs/basics/) で紹介されている範囲で理解を深めます。
幸い、これを翻訳してくださった方がいらっしゃるので、それを読んで学習します。

- Actions
- Reducers
- Store
- Data Flow
- Usage with React

### 公式

- https://github.com/reactjs/redux
- [Read Me · Redux](http://redux.js.org/)


## 読んだ記事

### 概念を理解する

- [Reactive State Machine \(Japanese\) // Speaker Deck](https://speakerdeck.com/inamiy/reactive-state-machine-japanese)

- [Introduction to Redux // Speaker Deck](https://speakerdeck.com/axross/introduction-to-redux)

### 基礎を身につける

- [Redux入門【ダイジェスト版】10分で理解するReduxの基礎 \- Qiita](http://qiita.com/kiita312/items/49a1f03445b19cf407b7)
  - [Redux入門 1日目 Reduxとは\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/b001839150ab04a6a427)
  - [Redux入門 2日目 Reduxの基本・Actions\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/8f8d047e5cbd87399ccb)
  - [Redux入門 3日目 Reduxの基本・Reducers\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/7fdce94912d6d9c801f8)
  - [Redux入門 4日目 Reduxの基本・Stores\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/377787c24efac64f2495)
  - [Redux入門 5日目 Reduxの基本・Data Flow\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/ae3ce31521ad24dd699f)
  - [Redux入門 6日目 ReduxとReactの連携\(公式ドキュメント和訳\) \- Qiita](http://qiita.com/kiita312/items/d769c85f446994349b52)

### 例を見て体験する

- [Examples · Redux](http://redux.js.org/docs/introduction/Examples.html)
- [redux/examples at master · reactjs/redux](https://github.com/reactjs/redux/tree/master/examples)
- [ReduxのExampleを徹底図解 \| 人生と仕事を楽しむブログ](http://blog.andgenie.jp/articles/1021)

#### 参考
- [Coffee, jQueryで書いていたElectronアプリをES6, React, Reduxで書き直した \- k0kubun's blog](http://k0kubun.hatenablog.com/entry/2016/03/21/114626)
- [mizchi の Redux 考 \- Togetterまとめ](https://togetter.com/li/911228)
- [なぜReduxを使うのか // Speaker Deck](https://speakerdeck.com/kuy/nazereduxwoshi-ufalseka)
- [Clean Architecture in React – Medium](https://medium.com/@axross/wip-react-clean-architecture-386c950d8b3a)


## 役に立つ図

> ![Redux Structure](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201612/redux-structure.jpg)
> [Reactive State Machine \(Japanese\) // Speaker Deck](https://speakerdeck.com/inamiy/reactive-state-machine-japanese)

> ![](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201612/redux-data-flow.png)
> [Introduction to Redux // Speaker Deck](https://speakerdeck.com/axross/introduction-to-redux)


## 実際に作ってみる

いろいろな記事を読んでイマイチよくわからなかった部分がありました。
上に挙げた図のように Actions や Reducers という概念は出てきますが、
__ソースコード上で一体どれを指しているのか迷う__ ことがあって、何度も読み直しました。

そこで ==「自分だったらこう書いてあったらわかりやすい」== を目指して実際に作ってみることにしました。

### サンプルの題材と作成方針

公式のサンプルにあるカウンターよりも詳細、かつ Todo アプリよりも簡素なものを考えました。
そこで思いついたのが RGB の3色を制御することでした。上述のような迷いを解決するために、
以下の目的を達成することを念頭に置いてコードを書きました。

- Action とか ActionCreator がよくわからない
- State が複数ある場合はどうするのか
- State がオブジェクトのときどうするのか
- 1つのアクションが複数の State に作用するときどうするのか
- 各ソースコードファイルの役割の明確化

### 構成

開発の土台は、公式のサンプルを流用するのが手っ取り早いです。
今回はカウンターアプリを拡張していくことにしました。

- 元にした公式のサンプル（カウンター）
  - [Redux Counter Example · reactjs/redux](https://github.com/reactjs/redux/tree/master/examples/counter)
- 自作したサンプルのリポジトリ
  - https://github.com/syon/redux-study

![Redux Study Workspace](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201612/redux-study-ws.png)


## 実際に作ってみてわかったこと

Action / ActionCreator は、出来上がったアクションを返すのか（Action）、引数をもとに
内部で判断してアクションを導き出すもの（ActionCreator）という理解に至りました。
呼び出し側で事前にアクションが決まっている場合は前者、状況に応じてアクションを変えたい場合に後者
という使い分けをするのだと思います。

__actions/index.js__
```js
// Action
const hitReset = { type: 'RESET' }

// ActionCreator
const hitR = (isPlus = true) => {
  if (isPlus) {
    return { type: 'HIT_INCR_R' }
  } else {
    return { type: 'HIT_DECR_R' }
  }
}
```

また、今回のサンプルでは R+ など色に変化を与えるボタンを押すと、色とカウンターの両方が
作用するようになっています。この挙動の実現に当初は `dispatch` を2度呼んで Color と
Count の両方にアクションを伝えていたのですが、ColorReducer 内でプリントデバッグしていた際に
Count に対するアクションも流れてくることに気づきました。
つまり、__アクションはすべての Reducer に対して伝えられる__ のですね。
ということで、カウンターを増加させるアクションすべてをリネームし `HIT_INCR_R` のように
HIT を先頭につけ、正規表現でそれを拾い上げてカウントアップするようにしてみたところ
これがうまくいきました。どことなくアンチパターン臭がしますが、そういう仕組みなんだよと示唆する
ためにも今回はよしとしましょう。

__reducers/CountReducer.js__
```js
const count = (state = initialState, action) => {
  switch (true) {
    case /^HIT/.test(action.type):
      return state + 1
    case /RESET/.test(action.type):
      return initialState
    default:
      return state
  }
}
```

ここまでを抑えた上で最後に実装してみたのが RESET ボタンでした。
`{ type: 'RESET' }` を Store に Dispatch し、Color と Count の両方が反応するように
どちらの Reducer にもそれを待ち構える形で記述します。

__reducers/ColorReducer.js__
```js
const color = (state = initialState, action) => {
  switch (action.type) {
    case 'HIT_INCR_R':
      return Object.assign({}, state, {
        r: state.r >= 255 ? 0 : state.r + 15
      })
    /* 中略 */
    case 'RESET':
      return initialState
    default:
      return state
  }
}
```

## おわりに

次は Advanced な領域に踏み込んで、非同期処理や Middleware を扱いたいと考えています。
しかし、参考記事に挙げたような懐疑的な声もあります。銀の弾丸はありませんので、規模や目的に
合ったものを選択していきましょう。実際にその手で試してから、ね。
