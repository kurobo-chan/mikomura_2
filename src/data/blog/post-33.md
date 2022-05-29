---
title: ReactJSサイトで任意のページのみにクラスを追加させてみた。
slug: "2021-11-11"
date: "2021-11-11"
tags: ["react","javascript"]
eyecatch: "../images/reactJS.png"
id: "33"
---

サイト制作の際、トップページにのみ特定のクラスを付けて、デザインを変更したかったので、ReactJSで動的にクラスを追加出来るようにしてみました。

## How to use

`useRequireLogin.js`ファイルを作成して、`useRequireLogin`コンポーネントのベース内に追加したい要素にクラスを追加するコードを追加します。`useEffect`フックでレンダー後に呼び出しするように設定します。実行したいファイル`index.js`にインポートし、`useRequireLogin()`で実行します。

```js:title=useRequireLogin.js
import { useEffect } from "react";

export function useRequireLogin() {
  useEffect(() => {
    document.querySelector(".container").classList.add('home');
  }, []);
}
```

```js:title=index.js
import React from "react";
import { useRequireLogin } from "../components/Home/useRequireLogin";
export default function Home() {
  useRequireLogin();
  return ()
}
```