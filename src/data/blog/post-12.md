---
title: Netlifyでデベロップエラーが発生しました
slug: "2021-09-08"
date: "2021-09-08"
tags: ["error","Netlify"]
eyecatch: "../images/netlify.png"
id: "12"
---

Gatsbyでサイト制作をしたものをNetlifyでホスティングする際、デベロップエラーが発生した時の解決方法です。

## nodeのバージョンのせいでエラーになってた

![netlify-error](//images.ctfassets.net/28yc8d4hnjoo/4swlyjEKgkR4R4wLxPkI5z/9f9238177fb269187b728cb2ae9a6f28/netlify-error.jpg)

今回出したエラーの内容ですが`error`の付いてる文章を翻訳してみると「 `extract-files@11.0.0`: エンジン`node`はこのモジュールと互換性がありません。期待されたバージョンは `^12.20 || >= 14.13`でした。`12.18.0`になりました。」「 互換性のないモジュールが見つかりました。」「`Yarn`インストール時のエラー」と書いてました。<br/>
翻訳しても意味がよくわからなかったので、とりあえずわかる範囲から潰していきます。<br/>
「 `extract-files@11.0.0:` エンジン`node`はこのモジュールと互換性がありません。期待されたバージョンは`^12.20 || >= 14.13`でした。`12.18.0`になりました。」
というエラーなので、とりあえず`node -v`でバージョンを確認します。<br/>
すると、`14.17.4`で、バージョンアップが必要とかの問題ではありませんでした。

## ビルドの依存関係を管理する

Netlifyの公式ドキュメントを見てみると、現在インストールしている`node`バージョンを固定する必要があるみたいです。
固定する方法は２つあるみたいですが、環境変数で管理する方法が簡単でした。
 Site settings > Build & deploy > Environment > Environment variables.まで行って、環境変数を保存します。
Edit variablesをクリック
`Key:NODE_VERSION`
`Value:14.17.4`（現在インストールしているnodeバージョン）
Saveで保存
以上で解決出来ました。