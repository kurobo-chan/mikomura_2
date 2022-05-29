---
title: GatsbyでWEBフォントの使い方（GoogleFonts編）
slug: "2021-06-18"
date: "2021-06-18"
tags: ["gatsby","googleFont","plugin"]
eyecatch: "../images/Gatsby.png"
id: "05"
---

GatsbyでWEBフォントを使う方法はいくつかありますが、個人的に使いやすかった方法を記述します。今回はGoogleFontsです。

## `Fontsource`を使用する

Gatsby公式チュートリアルUsing Web Fontsに沿って実装します。GitHubのFontsourceレポジトリから使用したいフォントを見つけます。

[$card](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource)

1. 右上にある`Go to file`をクリック
2. 今回は`Montserrat`というフォントを使用したいので、`fontsource/`の横に`montserrat`を入力する。するといくつかのファイルが出てくるので`README.md`を選ぶ。 
3. このページにやり方があります。

```shell
yarn add @fontsource/montserrat
```

をインストール。<br/>
インポートしたいファイルにインポート。Using Google Fontsは`layout.js`にインポートを推奨しています。

```js
import "@fontsource/montserrat"; 
```

CSSファイルに

```css
body { font-family: "Montserrat"; }
```

これで設定は完了です。