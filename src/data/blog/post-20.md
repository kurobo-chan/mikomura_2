---
title: reactJSでスクロールをするとクラスを付けたり外したりする
slug: "2021-09-30"
date: "2021-09-30"
tags: ["javascript","react"]
eyecatch: "../images/reactJS.png"
id: "20"
---

ReactJSで任意のところまでスクロールすると任意の要素にクラスを付けたり外したりするようにします。<br/>
スクロールするとトップに戻るボタンを表示させたり固定ヘッダーがスクロールするとヘッダーを変化させたりさせます。

## Reactフック (Hook)のuseEffect を使う

`useEffect` は関数の範囲（コンポーネント）で `useEffect` を記述することで実行後（レンダー後）に副作用は起こります。<br/>
副作用(`side-effect`)とは実行（レンダー）されている関数の範囲（コンポーネント）外の何かに影響を与えるものです。

- [副作用フックの利用法](https://ja.reactjs.org/docs/hooks-effect.html)
- [`useEffect`](https://ja.reactjs.org/docs/hooks-reference.html#useeffect)

```js:title=scroll.js
import React from "react"
import { useEffect } from "react"

export default function Scroll({ children })
{
     useEffect(() => {
     window.addEventListener("scroll", () => {
       if (window.pageYOffset > 100) {
         document.querySelector(".header-btn").classList.add("blue")
       } else {
         document.querySelector(".header-btn").classList.remove("blue")
       }
     })
   }, [])

  return (
    <div >
      {children}
    </div>
  )
}
```

