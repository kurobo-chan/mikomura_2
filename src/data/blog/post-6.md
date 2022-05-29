---
title: GatsbyでSNSシェアボタンを付ける
slug: "2021-06-28"
date: "2021-06-28"
tags: ["gatsby","react","plugin"]
eyecatch: "../images/Gatsby.png"
id: "06"
---

GatsbyサイトにSNSシェアボタンを設定する方法です。

## React用プラグイン`react-sharingbuttons`

React用プラグイン`react-sharingbuttons`を使用します。

[$card](https://github.com/caspg/react-sharingbuttons)

```shell
 yarn add react-sharingbuttons
```

をインストール、インポートしたいファイルにインポートします。

```js
import { Facebook, Twitter } from 'react-sharingbuttons'
```

プラグインが定義したcssもインポートします。

```js
import 'react-sharingbuttons/dist/main.css'
```

このように記述します。

```js:title=sharingButtons.js
const sharingButtons = () => {
 const url = 'https://github.com/caspg/react-sharingbuttons'
 const shareText = 'Check this site!'

 return (
  <div>
   <Facebook url={url} />
   <Twitter url={url} shareText={shareText} />
  </div>
 )
}
```

デフォルトのデザインを変更したい場合は、HTMLにこのようなクラスが付いてきますので、そのクラスを使ってカスタムします。

```js
<a href="https://your.website" class="react-sharing-button__link react-sharing-button--twitter">
 <svg class="react-sharing-button__icon">...</svg>
 <span class="react-sharing-button__text">Share me</span>
</a>
```