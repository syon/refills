---
rid: 1462633
bid: github-pages
rcd: amazon-s3-bucket-policy
srcpath: github-pages/amazon-s3-bucket-policy.md
title: Amazon S3に画像を置いてアクセス制御
date: 2016.5.8
layout: refill.jade
---

![hedgehog](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/hello/hedgehog.jpg)
https://s3-ap-northeast-1.amazonaws.com/syon.github.io/hello/hedgehog.jpg

この画像（出典^[http://gahag.net/001616-hedgehog-animal/]）は Amazon S3 に置いてアクセス制御を行っています。
このサイト`syon.github.io`からは表示できますが、画像の URL を直接ブラウザで
表示しようとしても拒否されます（はじめの表示と更新ボタンではキャッシュが使われるかもしれません）。


## GitHubに画像ファイルを置かないようにしたい
- GitHub Pages 上の Web ページに掲載する画像を Amazon S3 に置く
- GitHub のリポジトリは 1GB 未満が推奨されている
  - [What is my disk quota? - User Documentation](https://help.github.com/articles/what-is-my-disk-quota/)  

#### おことわり
- GitHub 自身が Jekyll 等を使ってブログを運営することを許しているので、
  普通に記事を書いて軽量な画像をいくつか載せる程度の使用ならばリポジトリに画像を置いておいてもよいのでは、
  というのが個人的な見解です
- ブログ用途でもこの方法をとると、Markdown で記事を書くときに画像 URL を相対指定できなくなって面倒です
- ここで想定するケースは、S3 に置いた大量の画像ファイルを GitHub Pages から動的に参照して表示するといった使い方です
- GitHub Pages だからといって何か特別な解説はありません。1つの具体例としてご覧ください。


## Amazon S3への画像配置とアクセス制御
- 意図しないアクセスによって Amazon からの請求額が高くならないようにする
- [Amazon S3 (スケーラブルなクラウドストレージサービス ) | AWS](https://aws.amazon.com/jp/s3/)
  - [料金 - Amazon S3 | AWS](https://aws.amazon.com/jp/s3/pricing/)
  - [AWS 簡易見積りツール](http://calculator.s3.amazonaws.com/index.html)

### バケットポリシー

- [AWS Policy Generator](http://awspolicygen.s3.amazonaws.com/policygen.html)  
  公式のジェネレータを使うこともできます。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Give access if referer is set",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::syon.github.io/*"],
      "Condition": {
        "StringLike": {
          "aws:Referer": [
            "http://syon.github.io/*",
            "https://syon.github.io/*"
          ]
        }
      }
    }
  ]
}
```

Version
: 任意の日付ではなく、バリデータのバージョン。

Resource
: S3 バケット名を `username.github.io` に合わせています。

#### バケットポリシーの適用

![Amazon S3 Bucket Policy](https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills/chronicle/201605/bucket-policy.png)


## 参考記事

- [バケットポリシーの例 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/example-bucket-policies.html)
- [wordpress のアップロード画像を S3 に置いて、アクセス制御も行う | GANCHIKU.com](http://old.ganchiku.com/blog/2011/11/633.html)
