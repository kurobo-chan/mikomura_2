---
title: Javascriptでスライドショー作成
slug: "2021-09-04"
date: "2021-09-04"
tags: ["css","HTML","javascript"]
eyecatch: "../images/js.png"
id: "16"
---

プラグインを使わず、WEBサイトでよく見るスライドショーをJavaScriptを使って出来るだけシンプルに作成してみました。

[demo](https://codepen.io/kurobo-chan/pen/bGRwKON)

## JSで対応する部分とCSSで対応する部分を区別する

今回作成するスライドショーは三枚の画像を0.8s毎に1.5sかけてフェードイン表示で自動再生させます。なので、JSでは0.8s毎に画像を切り替える作業を、CSSで1.5sかけてフェードイン表示する作業をしてもらいます。

```html
 <div class="mySlides fade image">imageA</div>
 <div class="mySlides fade image">imageB</div>
 <div class="mySlides fade image">imageC</div> 
<div>
<span class="dot"></span>
<span class="dot"></span>
<span class="dot"></span>
</div>
```

```css
/*style */
.image{
 width:500px;
 height:100px;
}
.image:nth-of-type(1){
 background:red;
}
.image:nth-of-type(2){
 background:green;
}
.image:nth-of-type(3){
 background:pink;
}
/* dots*/
.dot {
 cursor: pointer;
 height: 15px;
 width: 15px;
 margin: 0 2px;
 background-color: #bbb;
 border-radius: 50%;
 display: inline-block;
 transition: background-color 0.6s ease;
}
/*xxxxxxxxxxxxxxxxxxxxxxxxxx */
/* JavaScript Style */
/* images default */
.mySlides {
 display:none;
}
.active,
.dot:hover {
 background-color: #717171;
}
/* Fade animation */
.fade {
 animation-name: fade;
 animation-duration: 1.5s;
}
@keyframes fade {
 0% {
  opacity: 0.4;
 }
 100% {
  opacity: 1;
 }
}
```

```js
let slideIndex = 0;
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 8000);
}
```

## スライド画像の初期設定をします

変数 `let slideIndex =0;`を設定して、関数 `showSlides();` を実行します。<br/>
次に関数 `showSlides();`の設定を記述します。<br/>
変数 `i` を作成。<br/>
変数 `slides` を作成、そして `mySlides` クラス（画像）を変数 `slides` に代入。<br/>
変数 `dots` を作成、そして `dot` クラスを変数 `dots` に代入。

```js
for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
```

for文で 画像を表示にする設定をします。

## for文

```js
for (ステートメント1;ステートメント2; ステートメント3) {
  // 実行されるコードブロック
}
```

ステートメント1は、コードブロックの実行前に（1回）実行されます。<br/>
ステートメント2は、コードブロックを実行するための条件を定義します。<br/>
ステートメント3は、コードブロックが実行された後に（毎回）実行されます。

そして、変数 `slideIndex++` して`1`を加算します。

```js
if (slideIndex > slides.length) {
    slideIndex = 1;
  }
```

もし、変数 `slideIndex` が 変数 `slides` の総数より上回る場合は、変数 `slideIndex` は `1` となる設定をします。

## ドットの初期設定をします

```js
for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
```

## それぞれの仕上げをする

```js
slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
```

で、条件に合った変数 `sliddesIndex` に `-1`して画像を表示させ、ドットに `active` クラスを置換します。

```js
setTimeout(showSlides, 8000);
```

最後に `setTimeout()` で`0.8s`毎に関数を実行させて、完成です。