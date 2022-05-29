---
title: GatsbyとCSSでモーダルウィンドウ制作
slug: "2021-06-30"
date: "2021-06-30"
tags: ["gatsby","react","css"]
eyecatch: "../images/Gatsby.png"
id: "07"
---

GatsbyとCSSで複数コンテンツのモーダルウィンドウを作成してみました。

## ボタンとコンテンツをmapで囲む

```js:title=modal.js
export default function Modal({ data }) {
  return (
    <div>
      {data.allMicrocmsBlog.edges.map(({ node }) => (
        <div key={node.id}>
              <a href={`#${ node.id }`}>{ node.title}</a>
          <div id={`${node.id}`} className="modalDialog">
            <div>
              <a href="#close" title="Close" className="close">
                X
              </a>
              <h2>{node.title}</h2>
              <p>{node.preface}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export const query = graphql`
  query {
    allMicrocmsBlog {
      edges {
        node {
          title
          id
          preface
        }
      }
    }
  }
`
```

これですべてのコンテンツとボタンが出力されました。モーダルスイッチの`a`タグの`href`属性とコンテンツの`div`タグの`id`属性に各コンテンツ`id`を付けます。`href`属性には頭に`#`が必要です。

```js
<a href={`#${ node.id }`}>{ node.title}</a>
<div id={`${node.id}`} className="modalDialog">
          ...
 </div>
```

## CSSでコンテンツにモーダルウィンドウのデザインをする

```css
@charset "UTF-8";
.modalDialog {
    z-index: 99999;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    opacity: 0;
    pointer-events: none;
    transition: opacity 400ms ease-in;
}

.modalDialog:target {
    opacity: 1;
    pointer-events: auto;
}

.modalDialog>div {
    box-sizing: border-box;
    position: relative;
    width: 400px;
    margin: 10% auto;
    padding: 5px 20px 13px 20px;
    border-radius: 10px;
    background: #fff;
}

.close {
    position: absolute;
    top: -10px;
    right: -12px;
    width: 24px;
    border-radius: 12px;
    background: #606061;
    box-shadow: 1px 1px 3px #000;
    color: #FFFFFF;
    font-weight: bold;
    line-height: 25px;
    text-align: center;
    text-decoration: none;
}

.close:hover {
    background: #00d9ff;
}
```