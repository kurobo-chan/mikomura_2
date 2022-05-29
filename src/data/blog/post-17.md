---
title: Adobe After Effects で制作したアニメーションをGatsbyJSサイトに表示する
slug: "2021-09-09"
date: "2021-09-09"
tags: ["AdobeAfterEffects","plugin","react"]
eyecatch: "../images/reactJS.png"
id: "17"
---

ネット上には様々な方法で表示方法がありますが、個人的に一番簡単に感じた方法で、Adobe After Effects で作ってみたアニメーションをGatsbyサイトに表示させてみました。<br/>
ここでの説明はAfterEffectsプラグイン`Bodymovin`で`json`ファイルをエクスポートをしている状態からの説明です。

[$card](https://github.com/airbnb/lottie-web)

## 🍼事前準備

`src`フォルダーの中に新規フォルダ`animation`を作成します。
次に新規コンポーネントファイルを作成（ここでは`animation.js`）、そしてReactコンポーネントのベースを用意しておきます。

```js:animation.js
import React from "react"
export default function Animation) {
return (

)
}
```

その`animation`フォルダの中にAfterEffectsからエクスポートした`json`ファイルと、`animation.js`ファイルを入れます。

## ☕プラグインreact-lottieを使う

lottie公式ドキュメントから紹介されている`react-lottie`プラグインを使用します。

[$card](https://airbnb.io/lottie/#/other-platforms?id=web)

[$card](https://github.com/chenqingspring/react-lottie)

インストールします。

```shell
yarn add react-lottie
```

## 🍵例

```js:title=animation.js
import React from "react"
import Lottie from 'react-lottie';
import * as animationData from './pinjump.json'

export default function Home() {
const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
return (
 <Lottie options={defaultOptions}
         height={400}
         width={400}/>
)
}
```

`import Lottie from 'react-lottie';``import * as animationData from './pinjump.json'`でプラグインとjsonファイルをインポートします。変数defaultOptionsでオプション設定します。

- loop　繰り返し再生 true / false / numberデフォルト:false 
- autoplay 自動再生　true / false　デフォルト:false
- animationData　jsonファイル
- rendererSettings　書き出し設定
    - preserveAspectRatio　アスペクト比　preserveAspectRatio
- width　コンテナの幅　デフォルト: 100%
- height　コンテナの高さ　デフォルト: 100%