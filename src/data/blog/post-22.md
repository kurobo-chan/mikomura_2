---
title: ReactJSでMUIのアイコンを使用する
slug: "2022-01-01"
date: "2022-01-01"
tags: ["react","plugin"]
eyecatch: "../images/reactJS.png"
id: "22"
---

Material iconsはGoogleフォントのアイコンです。無料で使用が出来て表示速度のも速く種類も豊富です。

[$card](https://mui.com/material-ui/icons/#material-icons)

```shell
yarn add @mui/material
```

MUIをインストールします。

```shell
yarn add @mui/icons-material
```

そして、パッケージをインストールします。
ここから使用するアイコンを検索します。
例としてArrowBackのアイコンをクリックするとインポートするコードをコピーしてインポートします。

```js
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
```

そして表示させたい場所に挿入するだけです。

```js
<ArrowBack/>
```

