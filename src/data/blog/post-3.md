---
title: GatsbyサイトにTwitterの投稿を埋め込みたい
slug: "2021-06-14"
date: "2021-06-14"
tags: ["gatsby", "plugin", "react", "twitter"]
eyecatch: "../images/twitter.png"
id: "03"
---

## プラグインreact-twitter-widgets

[$card](https://github.com/andrewsuzuki/react-twitter-widgets)

## How to use

1. react-twitter-widgetsをインストール

```shell
yarn add react-twitter-widgets
```

2. インポートしたいファイルにインポート

```js:title=twitterWidgets.js
import { Timeline } from 'react-twitter-widgets'
<Timeline
　　　　dataSource={{
　　　　　　　　　　　sourceType: "profile",
　　　　　　　　　　　screenName: "kurobochan",
　　　　　　　　　　　id: "xxxxxxxxxxxxxxxxxxx",
 　　　　　　　　　　}}
　　　　options={{
　　　　　　　　　　　lang: "ja",
　　　　　　　　　　　height: "400",
　　　　　　　　　　　theme: "dark",
　　　　　　　　　}}
```

3. 確認する

![twitterPost](../images/TwitterPosts.jpg "Twitter Post")

埋め込むことが出来ました。このプラグインは詳しい説明はほとんどされてませんが、[デモページ](https://andrewsuzuki.github.io/react-twitter-widgets/?path=/story/timeline--profile-basic)を参考にすると特に説明は無くても簡単に実装出来ました。今回は自分の投稿と日本語で、背景をダークにしたかったので、このような記述にしました。
`id`は`Twitter ID`を入力します。