---
title: Gatsbyサイトのbodyタグにクラスを追加してみました。
slug: "2021-11-12"
date: "2021-11-12"
tags: ["gatsby","plugin"]
eyecatch: "../images/Gatsby.png"
id: "23"
---

Gatsbyサイトのbodyタグにクラスを追加してみました。

```shell:title=shell
yarn add gatsby-plugin-react-helmet react-helmet
```

プラグイン`gatsby-plugin-react-helmet`をインストールします。

[$card](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-react-helmet)

このプラグインで`head`タグ内のタイトル、メタ属性などを追加できます。<br/>
`gatsby-config.js`でプラグインを追加します。

```js:gatsby-config.js
plugins: [gatsby-plugin-react-helmet]
```

`seo.js`ページに戻り`import { Helmet } from "react-helmet";`をインポート

```js:title=seo.js
<Helmet>
 <body className="body" />
</Helmet>
```

`Helmet`タグ内に記述するだけで追加出来るようになります。

