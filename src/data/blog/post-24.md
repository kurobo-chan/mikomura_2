---
title: microCMSのリッチテキストのcodeタグのコードの構文を色を付けて強調表示させる。
slug: "2021-11-14"
date: "2021-11-14"
tags: ["react","plugin","microCMS"]
eyecatch: "../images/reactJS.png"
id: "24"
---

microCMSのリッチテキストのコードに色を付けて強調表示させてみました。

## htmlAST （JSONコード）をレンダリングする処理

```js
import React from "react";
export default function BlogPost() {
return ()
}
```

Reactコンポーネントのベースを用意し、<br/>
[`unifie`](https://github.com/unifiedjs/unified)テキストを処理するための仲介するプラグイン<br/>
[`rehype-parse`](https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse)は`HTML`を解析するプラグイン<br/>
[`rehype-react`](https://github.com/rehypejs/rehype-react)は`rehype`プラグインを`react`に変換するプラグイン<br/>
をインストールします。

```shell
yarn add unified rehype-parse rehype-react
```

```js
const htmlAst = unified()
    .use(parse, { fragment: true })
    .parse(data.microcmsBlog.content);
```

`import { unified } from "unified";`<br/>
`import parse from "rehype-parse";`<br/>
`import rehypeReact from "rehype-react";`でインポート<br/>
`use(parse, { fragment: true })`で`rehype-parse`プラグインを使う指令<br/>
`fragment: true`を入れ忘れると`html,head,body`が付いて変換されます。<br/>
`parse(data.microcmsBlog.content)`で解析する場所を指定します。

```js
const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {}
```

`new rehypeReact({}).Compiler`でオブジェクト型の設計図を作成します。<br/>
Gatsby Remark Componentプラグインのマークダウンテンプレートを使用してます。<br/>
`createElement: React.createElement`で、要素またはコンポーネントを作成します。<br/>
`Fragment: React.Fragment`で、`div`で括る代わりにフラグメントを作成します。<br/>
`components: {}`でリッチテキスト内の要素を処理します。

```js
<div className="entryBody-container">{renderAst(htmlAst)}</div>
```

`renderAst(htmlAst)`で、リッチテキスト内のテキストを`react`処理をする関数を実行します。

## codeタグのコードを強調表示

```shell:title=shell
yarn add react-highlight
```

`react-highlight`プラグインを使用します。インストールします。

[$card](https://github.com/akiran/react-highlight)

```shell:title=shell
import Highlight from 'react-highlight'
```

インポートします。

```js
pre: (props) => {
      return <Highlight>{props.children}</Highlight>;
    },
```

`Highlight`で括るとこのようにコードにクラスが付きます。

![hightlightプラグインで追加されたクラス](//images.ctfassets.net/28yc8d4hnjoo/7L5AL6LwyCqoAVW0S9PFYY/11eda74254f138ca1a8f21b0f120a55e/hightlight.jpg)

`node_modules/highlight.js/styles`フォルダの中にプラグインで用意されたさまざまなデザインの`css`ファイルが用意されているのでこの中から好みのファイルをインポートします。<br/>
今回は`import "/node_modules/highlight.js/styles/agate.css"`をインポートしています。<br/>
`css`のデザインは[こちら](https://highlightjs.org/static/demo/)で確認することが出来ます。<br/>
[`props.children`](https://ja.reactjs.org/docs/composition-vs-inheritance.html)で`pre`の子要素を出力します。

## 完成コード

```js:title=post.js
import React from "react";
import { graphql } from "gatsby";
import { unified } from "unified";
import parse from "rehype-parse";
import rehypeReact from "rehype-react";
import Highlight from "react-highlight";
import "/node_modules/highlight.js/styles/agate.css"
const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    pre: (props) => {
      return <Highlight>{props.children}</Highlight>;
    },
  },
}).Compiler;

export default function BlogPost({ data }) {
  const htmlAst = unified()
    .use(parse, { fragment: true })
    .parse(data.microcmsBlog.content);
  return (
    <React.Fragment>
        <main className="main">
          <div className="entry-container">
            <section className="entryBody">
              <div className="entryBody-container">{renderAst(htmlAst)}</div>
            </section>
          </div>
        </main>
    </React.Fragment>
  );
}
export const query = graphql`
  query {
    microcmsBlog {
      content
    }
  }
`;
```

