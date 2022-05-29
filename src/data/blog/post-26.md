---
title: ReactJSでボタンをクリックすると任意の個数づつ要素を表示させる
slug: "2022-01-03"
date: "2022-01-03"
tags: ["react","javascript"]
eyecatch: "../images/reactJS.png"
id: "26"
---

記事一覧ページを６個まで表示し、ボタンをクリックする毎に６個づつ記事要素を表示させます。

## 完成コード

```js:title=blogpage.js
import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import Imgix from "react-imgix";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BlogPage({ data }) {
  const allGridElements = data.allMicrocmsBlog.edges;
  const [list, setList] = useState([...allGridElements.slice(0, 6)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allGridElements.length > 6);
  const handleLoadMore = () => {
    setLoadMore(true);
  };
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < allGridElements.length;
      const nextResults = isMore
        ? allGridElements.slice(currentLength, currentLength + 6)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]);
  useEffect(() => {
    const isMore = list.length < allGridElements.length;
    setHasMore(isMore);
  }, [list]);
  return (
      <main className="main">
        <div className="main-container">
          <section className="posts">
            <div className="posts-container grid12">
              {list.map(({ node }) => (
                <article className="post" key={node.id}>
                  <Link
                    to={`/blog/post/${node.slug}/`}
                    className="post-container"
                  >
                    <figure className="post-figure">
                      <Imgix
                        src={node.eyecatch.url}
                        imgixParams={{ ar: "16:9" }}
                        sizes="100%"
                        htmlAttributes={{
                          alt: node.title,
                        }}
                      />
                    </figure>
                    <div className="post-text">
                      <h2>{node.title}</h2>
                      <time className="post-time" dateTime={node.publishDate}>
                        {node.publishDateJP}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="articleMore">
              {hasMore ? (
                <button className="articleMoreButton" onClick={handleLoadMore}>
                  <ExpandMoreIcon />
                </button>
              ) : (
                <p>No more results</p>
              )}
            </div>
          </section>
          <CopyLight />
        </div>
      </main>
  );
}

export const query = graphql`
  query {
    allMicrocmsBlog(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          id
          title
          slug
          publishDateJP: publishDate(formatString: "YYYY.MM.DD")
          publishDate
          eyecatch {
            url
            height
            width
          }
        }
      }
    }
  }
`;
```

## 説明

### 基本となる定義付け

`const allGridElements = data.allMicrocmsBlog.edges` で全記事の配列の変数を定義します。<br/>
React Hooksで`const [list, setList] = useState([...allGridElements.slice(0, 6)])` リストの状態を定義します。<br/>
React Hooksで `const [loadMore, setLoadMore] = useState(false)` もっと読込みする状態を定義します。[... を使用する](https://ja.reactjs.org/docs/jsx-in-depth.html#spread-attributes)
React Hooksで `const [hasMore, setHasMore] = useState(allGridElements.length > 6)` 読込みが多いかどうかの状態を定義します。<br/>
`const handleLoadMore = () => { setLoadMore(true) }` もっと読込みするボタンの変数を定義します。

### リストの読込みに必要な処理

`const currentLength = list.length` でリストの現在の状態の長さを定義。<br/>
`const isMore = currentLength < allGridElements.length` でリストの現在の状態の長さは全記事の配列の変数の長さより短い事を定義します。<br/>
[三項演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)を使って、`const nextResults = isMore ? allGridElements.slice(currentLength, currentLength + 6) : [] `で、`isMore` を評価し、`isMore`が`true`なら`allGridElements.slice(currentLength, currentLength + 6)`（現在の記事の長さから現在の記事の長さとプラス６記事追加）を、`falce`なら `[]`を返すことを定義。<br/>
`setList([...list, ...nextResults])`で通常は現在のリストの状態`list`を、値が更新されると`nextResults`に変更されます。<br/>
`setLoadMore(false)`で値が変更された場合はもっと読込みする状態を`false`にします。<br/>
`if (loadMore && hasMore) {}`で`loadMore`もっと読込みする状態が`true`の場合`hasMore`読込みが多いかどうかの状態を返し、それ以外の場合は`loadMore`もっと読込みする状態を返します。[論理積(&&)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND)<br/>
`useEffect(() => { setList([...list, ...nextResults]);` `setLoadMore(false);}, [loadMore, hasMore])`でReact Hooks useEffectを使って更新時にリストの読込みに必要な処理を実行させます。<br/>
`[loadMore, hasMore]`第二引数で`loadMore`もっと読込みする状態と`hasMore`読込みが多いかどうかの状態の値が変更されたタイミングで`setList([...list, ...nextResults])`と`setLoadMore(false)`を実行します。

### 読込みが多いかどうかの処理

`const isMore = list.length < allGridElements.length`で現在の`list`の長さは全記事の長さより短いことを定義。
`useEffect(() => {setHasMore(isMore)}, [list])`でReact Hooks useEffectを使って更新時に読込みが多いかどうかの処理を実行させます。
`[list]`第二引数で`list`の値が変更されたタイミングで`setHasMore(isMore)`を実行します。

### ボタンクリックで実行する

`{hasMore ? (<button className="articleMoreButton" onClick={handleLoadMore}><ExpandMoreIcon /></button>) : (<p>No more results</p>)}`で、`hasMore`読込みが多いかどうかの状態を評価し、`hasMore`読込みが多いかどうかの状態が`true`なら`<button className="articleMoreButton" onClick={handleLoadMore}><ExpandMoreIcon /></button>`を、`false`なら`<p>No more results</p>`を返します。


