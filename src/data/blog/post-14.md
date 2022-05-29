---
title: Gatsby ビルドエラー（"window" is not available during server side rendering.）
slug: "2021-08-13"
date: "2021-08-13"
tags: ["error","gatsby"]
eyecatch: "../images/Gatsby.png"
id: "14"
---

トップに戻るボタン用のJSコードを`Gatsby build`すると、エラーが出た時の解決方法です。

## エラーコードを読む

```shell
"window" is not available during server side rendering.
See our docs page for more info on this error: https://gatsby.dev/debug-html

WebpackError: ReferenceError: window is not defined
```

このようなエラーコードが出ました。<br/>
翻訳すると、「サーバーサイドレンダリング時に`window`が利用できません。
このエラーの詳細については、`docs`ページを参照してください。`https://gatsby.dev/debug-html`
`WebpackError`です。参照エラー：ウィンドウが定義されていません」
意味がよく分からなかったので言われたどうりドキュメントページにを参照してみました。

## windowオブジェクトが定義されているかどうかを確認する

ドキュメントページを読んでみると、window,documentオブジェクトはこれらは`Node.js`で「グローバルオブジェクト」を参照しているので使用出来なく、修正するには、ウィンドウが定義されているかどうかをコードを呼び出す前に確認して、Gatsbyのビルド中にコードが実行されないようにする必要あるようです。なので、コードサンプルを参考に記述していきます。

```js:title=修正前
import React from "react"
export default function Home() {

    window.onscroll = function () {
      topFunc()
    }

  function topFunc() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("topBtn").classList.add("fedeIn")
    } else {
      document.getElementById("topBtn").classList.remove("fedeIn")
    }
  }
  return (
    <a href="#body" className="topBtn" id="topBtn">
      <span>
        <FontAwesomeIcon icon={faChevronUp} />
        <i className="fas fa-chevron-up" />
      </span>
    </a>
  )
}
```

```js:title=修正後
import React from "react"
export default function Home() {
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      topFunc()
    }
  }
  function topFunc() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("topBtn").classList.add("fedeIn")
    } else {
      document.getElementById("topBtn").classList.remove("fedeIn")
    }
  }
  return (
    <a href="#body" className="topBtn" id="topBtn">
      <span>
        <FontAwesomeIcon icon={faChevronUp} />
        <i className="fas fa-chevron-up" />
      </span>
    </a>
  )
}
```

```js:title=変更部分
 if (typeof window !== "undefined") {
    window.onscroll = function () {
      topFunc()
    }
  }
```