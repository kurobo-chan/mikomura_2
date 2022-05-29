---
title: Gatsby でクリックしたアクティブのリンクに任意のクラスを追加
slug: "2022-01-31"
date: "2022-01-31"
tags: ["react","gatsby","plugin"]
eyecatch: "../images/Gatsby.png"
id: "31"
---

現在アクティブな`Link`に任意のクラス（`"selected"`クラス）を追加します。Gatsbyには、あらかじめ`@reach/router`プラグインが導入されていますのでインストールとインポートする必要はありません。

[$card](https://reach.tech/router/)

![現在アクティブなLinkに任意のクラス（"selected"クラス）を追加します](//images.ctfassets.net/28yc8d4hnjoo/rKFEKLcIRyNoWgw2MU7hk/863ab57f39d168280813cb05bd13276c/activeclassname.jpg)

## 完成コード

```js:title=TagList.js
import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

export default function TagListCarousel(){
const data = useStaticQuery(graphql`
    query {
      allMicrocmsTag(sort: { fields: tag, order: ASC }) {
        edges {
          node {
            tag
            tagId
            tagSlug
          }
        }
      }
    }
  `);
return (
<React.Fragment>
<div className="tagList">
{data.allMicrocmsTag.edges.map(({ node }) => (
              <React.Fragment>
                <div key={node.tagId} className="carousel-cell">
                  <Link to={`/tag/${node.tagSlug}/`} activeClassName="selected">
                    {node.tag}
                  </Link>
                </div>
              </React.Fragment>
            ))}
</div>
</React.Fragment>
)
}
```

`activeClassName`で任意のクラス名を追加するだけです。このページ内だけで使用する場合は以上で作業はおわりです。しかし、別ページからリンクをクリックした場合はクラスが追加できません。もう一作業が必要です。

```js:title=blogpost-template.js
import * as React from "react";
import { graphql, Link } from "gatsby";

export default function BlogPost({ data, location, pageContext }){
return(
<div className="tagList">
            <div className="tagList-container">
              {data.microcmsBlog.tag.map((tag) => (
                <div className="tagLink" key={tag.id}>
                  <Link to={`/tag/${tag.tagSlug}/`} activeClassName="selected">
                    {tag.tag}
                  </Link>
                </div>
              ))}
            </div>
          </div>
)
}
export const query = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    microcmsBlog(id: { eq: $id }) {
      title
      publishDateJP: publishDate(formatString: "YYYY.MM.DD")
      publishDate
      content
      eyecatch {
        url
        height
        width
      }
      tag {
        id
        tag
        tagSlug
      }
    }
  }
`;
```

## 別ページからタグをクリックしてもアクティブなリンクにクラス名を追加する

クラス名が追加出来ない原因はGatsbyは新しいページの読み込みごとにブラウザは新しいページを取得して最初からやり直すため、キャッシュされたリソースはすべて失われるからです。ファイル内のローカルリンクを自動的にインターセプトするGatsbyプラグイン`gatsby-plugin-catch-links`をインストールします。

[$card](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)

```shell
yarn add gatsby-plugin-catch-links
```

でインストールします。
`gatsby-config.js`ファイルに挿入します。

```js:title=gatsby-config.js
plugins: [gatsby-plugin-catch-links]
```

そして`gatsby develop`して完了です。