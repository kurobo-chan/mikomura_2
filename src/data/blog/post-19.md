---
title: とても使いやすかったスライドショープラグイン「Flickity」について
slug: "2021-09-27"
date: "2021-09-27"
tags: ["plugin"]
eyecatch: "../images/HTML.png"
id: "19"
---

スライドショーを実装するとき、プラグインを使うととても便利なのですが、様々なプラグインがある中で個人的にとても使いやすかったプラグインの紹介します。

[$card](https://flickity.metafizzy.co/)

一番気に入ったのところは、HTML5のデータ属性を利用できるところでした。
タッチ、レスポンシブ、フリックで、JavaScriptとjQueryの使用が可能です。

## 🚀How to use

CDNをHTMLファイルに貼り付けます。

```html
<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
```

HTMLをこのように記述します。

```html
<div class="main-carousel" data-flickity>
  <div class="carousel-cell">...</div>
  <div class="carousel-cell">...</div>
  <div class="carousel-cell">...</div>
  ...
</div>
```

コンテナ要素と子セル要素のセットで記述をして、コンテナ要素に`data-flickity`属性をつけます。基本的な記述は以上になります。

## 🛸オプション設定

[Options](https://flickity.metafizzy.co/options.html)

```html
<div class="main-carousel" data-flickity='{ "wrapAround": true }'>
  <div class="carousel-cell">...</div>
  <div class="carousel-cell">...</div>
  <div class="carousel-cell">...</div>
  ...
</div>
```

- `draggable`：ドラッグとフリックを有効にします。カルーセルに2つ以上のスライドがある場合、デフォルトで有効になります。`draggable: false`
- `freeScroll`：特定の位置で固定させずにスクロールさせることができます。`freeScroll: true`
- `wrapAround`：ループさせるかどうか。`wrapAround: true`
- `groupCells`：任意のグループ毎にスライドさせるかどうか。`groupCells: true`　`groupCells: 2`　`groupCells: '80%'`
- `autoPlay`：自動再生の設定　`autoPlay: true` `autoPlay: 1500`
- `pauseAutoPlayOnHover`：自動再生で、デフォルトではユーザーがカルーセルにカーソルを合わせると、自動再生が一時停止します。この動作を無効にします。`autoPlay: 1500` `pauseAutoPlayOnHover: false`
- `fullscreen`：全画面表示を有効にするかどうか。`fullscreen: true`

