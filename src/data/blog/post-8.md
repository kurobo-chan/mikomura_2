---
title: 静的サイトジェネレーターについて解説
slug: "2021-07-09"
date: "2021-07-09"
tags: ["gatsby","wordPress"]
eyecatch: "../images/Gatsby.png"
id: "08"
---

私はWEB制作をするためにプログラミングの勉強として、HTML,CSS,JavaScriptを習得して、さらにもっと手軽に対応できるツールとしてWordPressを活用してきましたが、静的サイトジェネレーターというツールの存在を知り、そちらの方が自分にとって都合が良かったので変更しました。ここでは、静的サイトジェネレーターとWordPressの違いとそれぞれのメリットとデメリットの解説をします。

## CMSとは

CMS(Contents Management System：コンテンツ・マネジメント・システム)の略で、コンテンツをデータベースに入れて、ページの枠組みを用意します。そしてCMSが個々の記事ページやトップページ、カテゴリーページを作ってくれます。
代表的なツールの一つとしてWordPressがあります。
私が以前使ってたツールです。

## SSGとは

SSG(Static Site Generation)の略で、日本語名だと静的サイトジェネレーターといいます。名前どうり、基本的には静的なページを生成してそれをホスティング（サーバを借りること）することになります。<br/>
そして、静的なページを生成する際にはデータベースなどからのデータを活用することができます。<br/>
これは[Jamstack](https://jamstack.org/what-is-jamstack/)に繋がっていくことになります。
※Jamstackとは、[Netlify](https://www.netlify.com/)のBiilmann氏が提唱したものです。静的なHTMLをベースに、JavaScriptを使いAPIを通じて高速で安全なサイトおよび動的アプリを生成するモダンなアーキテクチャ（構築スタイル）です。

## 個人的に感じたCMSとSSGのメリットとデメリット

### CMSのメリット

- HTMLやCSSなど、Web制作の専門知識がなくても、サイト作成が可能。
- テーマテンプレートが豊富にあるのでデザインやコーディングの知識も不要。
- 利用者が多いので、WordPressに関する情報が豊富。

### CMSのデメリット

- 高速化を考える今どきのサイトに重い動的システムを取り入れている。
- 動的なシステムやデータベースを抱える複雑な構造にはセキュリティリスクを考える必要がある。
- セキュリティ対策のためにCMSのアップデートがめんどくさい。
- コストがかかる。

### SSGのメリット

- 動的システムを抱えないので高速。
- 構造がシンプルでセキュリティリスクが低い。
- 画像最適化、PWA、OGP、アナリティクスなどの今どきのWEBに求められることに高いレベルで対応できる。
- 管理の手間がかからないクラウドサービスを活用出来る。
- 無料のサービスを活用してコストゼロで運用出来る。

### SSGのデメリット

- プログラミング知識が必要になる。
- 日本語の情報源が少ない。

## CMSとSSGのそれぞれの構造

![cms](//images.ctfassets.net/28yc8d4hnjoo/3S2sy91aBd7YRWcrXV1PVw/0a4fd8834b65bb515970d472cf856887/cms.svg)

![ssg](//images.ctfassets.net/28yc8d4hnjoo/Bs04itbEzJxprfRYBslRc/e58a984394b92e1776bca4685c5a8036/ssg.svg)

## いくつかの静的サイトジェネレーターの中で、Gatsbyを選択した理由

[$card](https://www.gatsbyjs.com/)

- プラグインが豊富
- 安定していて人気が高い　[$card](https://tsh.io/state-of-frontend/#jamstack)
- 公式ドキュメントが豊富
- WordPress と類似した特徴がある
- コストがかからない
- WordPrdssほどセキュリティ対策やアップデートに気にならなくて良いと思った。