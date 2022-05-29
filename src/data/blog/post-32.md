---
title: ReactJSでコピーライトの西暦を現在の西暦に動的に表示させる
slug: "2022-02-15"
date: "2022-02-15"
tags: ["react","javascript"]
eyecatch: "../images/reactJS.png"
id: "32"
---

## 完成コード

```js:title=copyright.js
import React, { useState, useEffect } from "react";

export default function CopyLight() {
  const [date, setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear());
  useEffect(() => {
    getYear();
  }, []);
  return (
    <React.Fragment>
      <div className="postCopyLight copyLight">
        {" "}
        &copy; pipparanoki - {date}
      </div>
    </React.Fragment>
  );
}
```

## 説明

- `import React, { useState, useEffect } from "react"`で、`useState`と`useEffect`フックを使用するのでインポートします。
- `const [date, setDate] = useState()`で、ステートフックを利用します。 新しい状態変数を宣言します。`date`は現在の状態の値。`setDate`は状態の値を変更する関数。
- `const getYear = () => setDate(new Date().getFullYear())`で、状態の値を変更する関数setDate()を現在の年数を取得する関数を宣言します。
- `useEffect(() => {getYear(); }, [])`で、`useEffect`フックでレンダーが終了した後にgetYear()現在の年数を取得する関数を毎回動作するようにします。第二引数は`[]`にします。
- `&copy; pipparanoki - {date}`で、`date`で現在の年数を表示させます。