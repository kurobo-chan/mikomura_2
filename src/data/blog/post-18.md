---
title: JavaScriptを使わずにアコーディオンメニューを作れる
slug: "2021-09-23"
date: "2021-09-23"
tags: ["css","HTML"]
eyecatch: "../images/HTML.png"
id: "18"
---

今までアコーディオンメニューを作る時はCSSでアニメーションを作り、クリックタイミングをJSで作ってたのですが、HTMLでJSのクリックタイミングの部分を作れることが発覚したので、ここにメモしました。

## HTML の詳細折りたたみ要素`details`と概要やラベルは`summary`要素を使う

[`summary`:概要明示要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/summary)

[`details`: 詳細折りたたみ要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/details)

```html
  <details>
                <summary>クリック</summary>
                <ul>
                  <li>要素１</li>
                  <li>要素２</li>
                </ul>
              </details>
```

以上で簡単にアコーディオンメニューが出来ました。デベロッパーツールを開くと

![details-before](//images.ctfassets.net/28yc8d4hnjoo/7M1hzLbKvCBCcQvt3zUt6T/86e777ebdf327d564fb7ec078b1bf437/details-before.jpg)

クリックをすると`details`タグに`open`属性が付きます。

![details-after](//images.ctfassets.net/28yc8d4hnjoo/5n9qTwY6gfxxdPId0hXA9z/c5ae29afeeb8d94cf47e9c9af9727246/details-after.jpg)

## もっと滑らかなアコーディオンメニューにする

デフォルトの状態だとただ、表示非表示のアクションになってるので滑らかなアコーディオンメニューにカスタムしてみました。

[🚗demo](https://codepen.io/kurobo-chan/pen/RwgYqYj)

```css
details {
    width: 500px;
    height: 50px;
    transition: 1.5s;
}
details[open] {
    background: silver;
    height: 500px;
}
summary{
    background: snow;
    cursor: pointer;
    padding: 1em;
    outline: none;
}
```
