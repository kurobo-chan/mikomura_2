---
title: スクロールして要素が見えたらクラスを追加するJavaScript
slug: "2021-08-21"
date: "2021-08-21"
tags: ["API","javascript"]
eyecatch: "../images/js.png"
id: "15"
---

最近、スクロールして要素が見えたら指定の要素をアニメーションさせる動作をさせるサイトをよく見ます。私もそんなおしゃれなサイトを作成したいのですがその場合、苦手分野でもあるJavaScriptを使うのでどうしてもプラグインで逃げて今まで過ごしてきました・・・。<br/>
流石にこのままではいけませんので一からコードを書けるように頑張ってみました。

## どの部分をJavaScriptを使うのか考察する

しかし、長いコードにしたくありません。今回はスクロールするとアニメーションする予定の要素が表示されたタイミングでアニメーションする動作を作成します。

[demo](https://codepen.io/kurobo-chan/pen/eYROywO)

今回作成するものはアニメーションする部分はCSSで対応して、スクロールして要素が見えたタイミングで～実行する。という部分をJavaScriptで対応します。

## `Intersection Observer API`

[$card](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)

監視したい要素が別の要素 (もしくはviewport) に入ってきたり出ていったりする時、まだ両要素が交差する量がある一定の量を満たす時、実行されるコールバック関数を登録するが出来ます。

[$card](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API#a_simple_example)

## HTMLとCSSの準備

```html
<div class="boxWrap">
 <div class="boxs">
  <div class="box box1" id="target"></div>
  <div class="box box2"id="target2"></div>
 </div>
</div>
```

```css
.boxWrap{
 height:3000px;
 display: grid;
 align-items:center;
}
.boxs{
 display:grid;
 gap:300px;
}
.box::before{
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background:red;
  content: "";
  transition: 3s;
}
.box1{
 position:relative;
 height:300px;
 background:orange;
}
.box1::before{
 position: absolute;
 right:0;
 top:100px;
 background:blue;
}
.box2{
 position:relative;
 height:300px;
 background:green;
}
.box2::before{
 position: absolute;
 left:0;
 top:100px;
}
.move.box1::before{
 right: 80vw;
 transition: right 3s;
}
.move.box2::before{
 left: 80vw;
 transition: left 3s;
}
```

## セットアップ

変数を準備してオブザーバーをインストールします。

```js
const numSteps = 20.0;
let targetElement;
let prevRatio = 0.0;
// Set things up
window.addEventListener(
  "load",
  (event) => {
    targetElement = document.querySelector("#target");
    createObserver();
  },
  false
);
window.addEventListener(
  "load",
  (event) => {
    targetElement = document.querySelector("#target2");
    createObserver();
  },
  false
);
```

- `numSteps`視認率が`0.0`から`1.0`の間にどのくらいの数の閾値を設定するか示す定数。
- `prevRatio`ターゲット要素の閾値を超えた最後の視認率を記録するための変数。

ID`#target`と`#target2`を関数名`createObserver()`を生成、そして、それぞれ設定・インストール処理をします。

## `IntersectionObserver` の作成

```js
function createObserver() {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };
  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(targetElement);
}
```

関数名 `createObserver()`で`IntersectionObserver`を新規作成します。<br/>
`options`でオプション設定します。<br/>
`root:null`でドキュメントビューポートに対してターゲット要素がどのくらい見えているかという変化を監視します。<br/>
`rootMargin`でマージンオフセットの設定。<br/>
`threshold`で視認率の閾値のリスト。関数名`buildThresholdList()`を生成、設置。<br/>
`new IntersectionObserver(handleIntersect, options);`でオブザーバーを新規作成、そして、関数handleIntersect を生成、`options` を指定します。<br/>
そして、`observe()`で要素の監視を設定します。<br/>
構文：`IntersectionObserver.observe(targetElement);`

## 閾値比率の配列を組み立てる

視認率の閾値のリスト。関数名`buildThresholdList()`を設定します。

```js
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
```

## 交差の変換の処理

オブザーバーの関数`handleIntersect()`の設定をして、どう処理するか設定します。

```js
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.classList.add("move");
    } else {
      entry.target.classList.remove("move");
    }
    prevRatio = entry.intersectionRatio;
  });
}
```

`entries`でターゲット要素の閾値を超えた最後の視認率`prevRatio`より、現在表示されているターゲット要素`entry.intersectionRatio`が表示割合が上昇しているのか、そうでないのかの処理をします。
ここでは、上昇していれば`move`クラスを追加。そうでなければ`move`クラスを削除する処理をします。<br/>
最後に、交差する割合が上がっているか下がっているかを追跡するために、変数 `prevRatio`に現在の比率を代入し完成です。