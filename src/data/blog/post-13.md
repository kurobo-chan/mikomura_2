---
title: 出来るだけシンプルにJavaScriptコードを書く（トップに戻るボタン）
slug: "2021-08-11"
date: "2021-08-11"
tags: ["css","javascript"]
eyecatch: "../images/js.png"
id: "13"
---

ホームページでよく見るスクロールに追従するトップに戻るボタンをJavaScriptとCSSで作成しました。<br/>
CSSで対応出来ることはCSSで対応して、JavaScriptはCSSで対応出来ない分だけ記述して、出来るだけシンプルで短いコードで記述してみました。<br/>
理由は、現在のブラウザはCSSを画面に反映させる処理が高度に最適化されていて、JavaScriptよりもパフォーマンスが良いですし、コードを書く私自身のパフォーマンスもそちらの方が良いからです。

## 今回の作業の中でJSが必要な部分の洗い出し

このようなボタンを作成します。<br/>
最初は非表示で、スクロールしたらフェードインで右下に表示させるボタンです。<br/>
スクロールしたら表示させる部分以外はCSSで対応出来そうです。<br/>
スクロールしたらしたら表示→JavaScript<br/>
それ以外→CSS<br/>
で作成していきます。

## JavaScriptの解説

```js
  window.onscroll = function () {      
    topFunc();
  };
  function topFunc() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("topBtn").classList.add("fedeIn");
  } else {
    document.getElementById("topBtn").classList.remove("fedeIn");
  }
}
```

`onscroll`プロパティでウィンドウをスクロールした時にイベントを発生させるように設定します。今回の関数名は`topFunc()`。
Y軸方向のスクロール量が100px以上の時、`fedeIn`クラスを追加。そうでない場合は`fedeIn`クラスを削除するコードにします。

### 論理演算子

`aaa && bbb`は`aaa`を評価し`aaa`が`true`なら`bbb`を返し、`false`なら`aaa`を返します。<br/>
`aaa || bbb`は`aaa`を評価し、`aaa`が`true`なら`aaa`を返し、`false`なら`bbb`をかえします。

## CSSの解説

```css
html{
   scroll-behavior: smooth;
}
.topBtn {
  width: 50px;
  height: 50px;
  background: #f06d06;
  color: white;
  display: grid;
  place-content: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  transition: 1s;
  opacity: 0;
  pointer-events: none;
}
.feadIn {
  opacity: 1;
  pointer-events: auto;
}
```

`scroll-behavior: smooth;`でスクロールの振る舞いを設定。<br/>
`topBtn`クラスでデザインのコードと、初期値設定で`opacity:0;``oopinter-events:none;`でボタンを非表示設定。<br/>
`fadeIn`クラスで表示後の設定をして完成です。