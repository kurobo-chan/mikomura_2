---
title: Gatsbyサイトに検索フォームを追加する
slug: "2022-01-03"
date: "2022-02-03"
tags: ["algolia","react","gatsby","javascript","plugin","Search Form"]
eyecatch: "../images/Gatsby.png"
id: "30"
---

# 完成コード

Gatsbyサイトに検索機能を追加する方法はいくつかあります。今回はAPIベースの外部検索エンジンを利用します。<br/>
外部検索エンジンもいくつかありますが、その中でもAlgoliaはGatsbyドキュメントにAlgoliaを追加する方法があります。

- [algolia](https://www.algolia.com/)
- [Adding Search with Algolia](https://www.gatsbyjs.com/docs/adding-search-with-algolia/)

[gatsby-plugin-algolia](https://github.com/algolia/gatsby-plugin-algolia)プラグインをインストールします

```shell
yarn add gatsby-plugin-algolia
```

Algoliaアカウントを作成します。[algoliaアカウント登録](https://www.algolia.com/users/sign_up)<br/>
AlgolaのAPIキーを確認します。[https://www.algolia.com/users/sign_in](https://www.algolia.com/users/sign_in)

## Application IDとSearch-Only API KeyとAdmin API Keyを環境変数にします。

 Gatsbyで環境変数を扱うためのプラグイン[`gatsby-plugin-env-variables`](https://www.gatsbyjs.com/plugins/gatsby-plugin-env-variables/)をインストールします。

```shell
yarn add gatsby-plugin-env-variables
```

`gatsby-config.js`ファイルに追加します。

```js:title=gatsby-config.js
{
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "GATSBY_ALGOLIA_APP_ID",
          "GATSBY_ALGOLIA_SEARCH_KEY",
          "ALGOLIA_ADMIN_KEY",
        ],
      },
    },
```

`gatsby-plugin-algolia`プラグインの構成を`gatsby-config.js`ファイルに追加します。

```javascript:title=gatsby-config.js
{
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
```

WindowsのPowerSellで以下のようにして環境変数を設定した上で、実行します。<br/>PowerSellを開いた最初にだけ

```javascript:title=PowerSell
$env:GATSBY_ALGOLIA_APP_ID="XXXXXXXXXX"
$env:GATSBY_ALGOLIA_SEARCH_KEY="XXXXXXXXXXXXXXXXXXXX"
$env:ALGOLIAADMINKEY="XXXXXXXXXXXXXXXXXXXX"
```

そして`gatsby develop`で開発サーバーを開きます。<br/>
`queries: require("./src/utils/algolia-queries")`でAlgoliaプラグインにどのデータのインデックスを作成するかを指示します。
そして再度、`gatsby develop`で開発サーバーを開きます。<br/>
`src`フォルダ内に`utils`フォルダを新規作成し、`algolia-queries.js`ファイルを新規作成します。

## データのインデックスを作成する

```javascript:title=algolia-queries.js
const indexName = `Pages`;
const pageQuery = `{
  pages: allMicrocmsBlog{
    edges {
      node {
        id
        title
        content
        slug
      }
    }
  }
}`;
let striptags = require("striptags");
function sumarrize(html) {
  const metaDescription = striptags(html).replace(/\r?\n/g, "").trim();
  return metaDescription.length <= 3000
    ? metaDescription
    : metaDescription.slice(0, 3000) + "...";
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.pages.edges.map(({ node }) => {
        return {
          id: node.id,
          content: sumarrize(node.content),
          title: node.title,
          slug: node.slug,
        };
      }),
    indexName,
    settings: {
      queryLanguages: ["ja"],
    },
  },
];
module.exports = queries;
```

`const indexName = PagesでAlgolia`の管理画面の`Index`名の変数を定義。<br/>
`const pageQuery`でブログのデータの変数を定義。

## 記事本文が3000字以内に収まるようにトリミングする

[`striptags`](https://github.com/ericnorris/striptags)をインストールします。

```shell
yarn add striptags
```

`const metaDescription = striptags(html).replace(/\r?\n/g, "").trim()`で改行コード`（\r\nまたは\n)`をすべて削除して文字列の両端の空白を削除した加工して変数に定義。

[https://step-learn.com/article/javascript/058-rn-delete.html](https://step-learn.com/article/javascript/058-rn-delete.html)

[https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

`metaDescription.length <= 3000 ? metaDescription : metaDescription.slice(0, 3000) + "..."`は、三項演算子で3000字までの本文の長さを評価し、3000字までの本文が`true`なら`metaDescription`を、`false`なら本文を3000字までスライスし、 `"..."`を追加するようにします。

## クエリのリストを作成します

`query: pageQuery,`でクエリデータは変数`pageQuery`を指定。`transformer:` で`GraphQL`データをAlgoliaレコードの管理画面の各インデックスの識別する名前に変換します。

- `id: node.id,`
- `content: sumarrize(node.content),`
- `title: node.title,`
- `slug: node.slug,`

![algoliafront](//images.ctfassets.net/28yc8d4hnjoo/2Q4TGLXX4LtPPmulpXyKiT/33a23e2fc7fdda4076568227970e14bc/algoliafront.png)

`indexName,`を指定する

![algoliaindex](//images.ctfassets.net/28yc8d4hnjoo/7Lbadiar9x1pv84rlWmIVZ/9ac8df4f0888d58157498c3244161cf4/algoliaindex.png)

`settings:{queryLanguages: ["ja"], },`で言語設定を日本語にする

![algolialang](//images.ctfassets.net/28yc8d4hnjoo/7fBQ2ohW7P6MxF8xcNwpKi/b99f513df36d1e932be558cb47fb16b4/algolialang.png)

`module.exports = queries;`で変数`queries`をモジュールに設定します。これでインデックスの設定を完了したので`gatsby build` します。Algoliaアカウントにログインし、「`Index`」に移動して`Index`「`Pages`」を選択すると、インデックス付きのページデータが表示されます。

## 検索用のユーザーインターフェイスを構築する

虫眼鏡アイコンボタンとして表示され、ユーザーが入力してクリックするとフォームフィールドに検索結果が入力フィールドの下のポップオーバーに表示展開するようにします。<br/>
公式ドキュメントが提供する次のフレームワークをインストールします。

[$card](https://www.gatsbyjs.com/docs/adding-search-with-algolia/#adding-the-user-interface)

- Algoliaが提供する検索インターフェイスを簡単に構築するためのコンポーネントライブラリ。[`React InstantSearch`](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- Algoliaを呼び出すためのシステム（APIクライアント）[`Algolia Search`](https://www.npmjs.com/package/algoliasearch)
- コードにCSSを埋め込むためのGatsbyのスタイル付きコンポーネントプラグイン[`gatsby-plugin-styled-components`](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/)
- 検索バーに虫眼鏡アイコンを追加するためのコンポーネントプラグイン[`Styled Icons`](https://styled-icons.js.org/)

```shell:title=WindowsPowerShell
yarn add react-instantsearch-dom algoliasearch styled-components gatsby-plugin-styled-components @styled-icons/fa-solid
```

`gatsby-config`ファイルにプラグイン`gatsby-plugin-styled-components`を追加してください。

```js:title=gatsby-config.js
plugins: [
    `gatsby-plugin-styled-components`,
  ],
}
```

### 検索ボックス（Search box）を作成します。

ユーザーが検索クエリを入力する入力フィールドを作成します。`components`フォルダの中に`search`フォルダを新規に作成して、その中に`search-box.js`ファイルを新規に作成します。

```js:title=search-box.js
import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { Search as SearchIcon } from "@styled-icons/fa-solid";

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={`searchBox-container ${className}`}>
      <input
        type="text"
        className="search"
        placeholder="サイト内検索"
        spellCheck="false"
        onChange={(e) => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <button type="submit" className="searchButton">
        <SearchIcon className="SearchIcon" />
      </button>
    </form>
  )
);
```

Algoliaが提供する検索インターフェイスプラグイン`connectSearchBox`と虫眼鏡アイコンプラグイン`Search as SearchIcon`をインポートします。

```js:title=search-box.js
import { connectSearchBox } from "react-instantsearch-dom";
import { Search as SearchIcon } from "@styled-icons/fa-solid";
```

`export default connectSearchBox()`でほとんどの作業を検索インターフェイスプラグインで機能します。<br/>
`{ refine, currentRefinement, className, onFocus }`で`React`プロパティコンポーネントを作成します。<br/>
`refine` `currentRefinement`は`Algolia searchbox`から提供されたプロパティです。<br/>
`refine`タイプ：関数　現在のクエリを変更します。<br/>
`currentRefinement` タイプ：文字列　現在のクエリ。<br/>
分割代入で`className` `onFocus`します。<br/>
`onFocus={onFocus}`で`onFocus`イベントは分割代入の`onFocus`プロパリティにします。<br/>
`value={currentRefinement}`で`value`属性（部品の初期値）を現在のクエリ`currentRefinement`にします。<br/>
`onChange={(e) => refine(e.target.value)}`で`onChange`イベントでユーザーによる要素の値の変更が確定したときに発生します。`(e) => refine(e.target.value)`でイベントが実行された時、現在のクエリをイベントを発生させたオブジェクトへの参照を初期値にします。

## 検索結果を表示するためのコンポーネントを作成します

`search`フォルダの中に`search-result.js`ファイルを新規作成します。

```js:title=src/components/search/search-result.js
import { Link } from "gatsby";
import { default as React } from "react";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});
const PageHit = ({ hit }) => (
  <div>
    <Link to={`/blog/post/${hit.slug}/`}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);
const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map((index) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
);
export default SearchResult;
```

### 検索コンポーネントの必要なウィジェット`react-instantsearch-dom`をインポートする

[$card](https://www.algolia.com/doc/api-reference/widgets/react/)

[`connectStateResults`](https://www.algolia.com/doc/api-reference/widgets/state-results/react/)でコンポーネントを接続します。<br/>
[`Highlight`](https://www.algolia.com/doc/api-reference/widgets/highlight/react/)はコンポーネントの結果。検索結果の強調表示された属性を表示するウィジェット。<br/>
[`Hits`](https://www.algolia.com/doc/api-reference/widgets/hits/react/)はコンポーネントの結果。結果のリストを表示するウィジェット。<br/>
[`Index`](https://www.algolia.com/doc/api-reference/widgets/index-widget/react/)はコンポーネントの基本。ウィジェットを特定のAlgoliaインデックスに適用できます。検索インターフェースを構築する場合に使用します。<br/>
[`Snippet`](https://www.algolia.com/doc/api-reference/widgets/snippet/react/)はコンポーネントの結果です。検索結果の`Snippet`属性が表示されます。スニペット 化された結果は 、一致した単語をハイライト前およびハイライト後のタグでラップします。スニペットは、一致した属性の一部、つまり一致した単語とその周囲のいくつかの単語を返します。<br/>
[`PoweredBy`](https://www.algolia.com/doc/api-reference/widgets/powered-by/react/)はコンポーネントのメタデータです。Algoliaのロゴを表示して当社のWebサイトにリダイレクトするウィジェット。

### 検索結果数を表示させる変数を作成（`HitCount`）

`connectStateResults(({ searchResults })`で[`searchResults`](https://www.algolia.com/doc/api-reference/widgets/state-results/react/#connector-param-provided-searchresults)を接続します。<br/>
[`nbHits`](https://www.algolia.com/doc/api-reference/widgets/stats/js/#connector-param-render-nbhits)はAlgoliaのレンダリング関数オプションです。タイプ：番号　クエリによって一致したヒットの数。<br/>
[`searchResults`](https://www.algolia.com/doc/api-reference/widgets/state-results/react/#connector-param-provided-searchresults) はAlgoliaのReactコンポーネントが提供するプロパティオプションです。タイプ：オブジェクト　Algoliaは複数のインデックスをサポートしています。すべてのインデックスを反復処理します。<br/>
`searchResults.nbHits`すべてのインデックスを反復処理し、クエリによって一致したヒットの数。<br/>
`const hitCount = searchResults && searchResults.nbHits`[`論理 `&&` 演算子`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND)で`searchResults`が`true`の場合、`searchResults.nbHits`を返し、それ以外の場合は`searchResults`を返す変数を定義します。<br/>
`hitCount !== 1 ? 's' : ''`厳密不等価演算子で検索ヒットした数が1ではない場合を参照し、`true`なら`'s'`を表示し、`false`なら`''`（空）を表示します。<br/>
`hitCount > 0 ? (<div className="HitCount">{hitCount} result{hitCount !== 1 ? s : ''}</div>) : null`三項演算子で`hitCount > 0 `を参照し、`true`なら`<div className="HitCount">{hitCount} result{hitCount !== 1 ? `s` : ``}</div>`を、`false`なら`null`を返します。

![result](//images.ctfassets.net/28yc8d4hnjoo/5vhgvbQyBFPqQC5oWAvh6c/1980d84cab8f01815014f89ba84d94df/result.png)

### 検索結果をスニペット 化して文字をハイライトさせる変数を作成（`PageHit`）

[`Highlight`](https://www.algolia.com/doc/api-reference/widgets/highlight/react/)ウィジェットを使用します。<br/>
`attribute="title"`でハイライトするレコードの属性を`title`に指定。<br/>
`Snippet`ウィジェットを使用します。<br/>
`attribute="excerpt"`でレコードの属性を`excerpt`に指定します。<br/>
`hit={hit}`で`hit`オブジェクト。プロパティ`hit`を使います。<br/>
`tagName="mark"`で文字列の強調表示された部分に使用する`HTML`タグを`mark`タグにします。

### ヒット数一覧する変数を作成（`HitsInIndex`）

`indexName={index.name}`で検索するインデックスを指定します。[`index`ウィジェットのコンポーネント](https://www.algolia.com/doc/api-reference/widgets/index-widget/react/#about)から[`name`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/name)を取得します。<br/>
`HitCount`と[`Hits`](https://www.algolia.com/doc/api-reference/widgets/hits/react/)を使用します。<br/>
`hitComponent={PageHit}`で結果から各ヒットを`PageHit`でレンダリングします。

### 検索結果コンポーネントを作成（`SearchResult`）

`HitsInIndex`と `PoweredBy`ウィジェットを使用して、変数`SearchResult`で定義します。
`import { default as React } from "react"`で`default`を`React`に挿入します。
`export default SearchResult`で作成します。

### CSSファイルを追加する

`search`フォルダの中に`styled-search-root.js`ファイルを新規作成します。

```js:title=styled-search-root.js
import styled from "styled-components";

export default styled.div`
  position: relative;
  margin: 0.6em 0;
`;
```

`form`を`div`でラップして`position: relative`と`margin: 0.6em 0`の`css`ファイルです。

### 検索フォームのCSSを作成する

`search`フォルダの中に`styled-search-box.js`ファイルを新規作成します。

```js:title=src/components/search/styled-search-box.js
import styled, { css } from "styled-components";
import SearchBox from "./search-box";

const open = css`
  background: ${({ theme }) => theme.background};
  cursor: text;
  padding-left: 4em;
  border: ${({ theme }) => theme.border};
`;

const closed = css`
  background: transparent;
  cursor: pointer;
  padding-left: 4em;
`;

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;
  .search {
    outline: none;
    box-shadow: inset 0 0 1.5px 0 rgba(0, 0, 0, 0.6);
    font-size: 1em;
    position: relative;
    transition: 100ms;
    height: 44px;
    width: 100%;
    border-radius: 30px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}
  }
  .searchButton {
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
  .SearchIcon {
    width: 1.5em;
    margin: 0.3em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`;
```

`styled-components`をインポートします。<br/>
検索ボックスファイル`search-box.js`をインポートします。<br/>
`const open = css''`でフォームにカーソルがアクティブになった時の`CSS`を作成します。<br/>
`const closed = css''`でフォームにカーソルから離れた時のCSSを作成します。<br/>
`export default styled(SearchBox)''`で`search-box.js`ファイルの`CSS`を作成します。`form`、各指定したクラスに`CSS`指定します。

### 検索結果一覧のCSSを作成する

`search`フォルダの中に`styled-search-result.js`ファイルを新規作成します。

```js:title=src/components/search/styled-search-result.js
import styled, { css } from "styled-components";
import SearchResult from "./search-result";

const Popover = css`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1em;
  border-radius: 2px;
  background: ${({ theme }) => theme.background};
`;

export default styled(SearchResult)`
  display: ${(props) => (props.show ? `block` : `none`)};
  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }

    li.ais-Hits-item {
      margin-bottom: 1em;

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    font-size: 80%;

    svg {
      width: 70px;
    }
  }
`;
```
`styled-components`をインポートします。<br/>
`search-result.js`ファイルをインポートします。<br/>
検索結果一覧ファイル`search-result.js`の`CSS`を作成します。<br/>
`display: ${(props) => (props.show ? block : 'none')}`で`props.show`を評価して`true`の場合、`block`を、`false`なら`none`を返すことで、検索結果が表示された時と検索がない時のスタイルで設定しています。

## サポートファイルを作成しコンポーネントを接続する

サポートファイルを作成します。モーダルの外側のクリックすると閉じるようにするために`useOnClickOutside hook`の実装を追加するためのファイルです。

```js:title=src/components/search/use-click-outside.js
import { useEffect } from "react";

const events = [`mousedown`, `touchstart`];
const isBrowser = typeof document !== "undefined";
const Outside = (ref, onClickOutside) => {
  const isOutside = (element) => !ref.current || !ref.current.contains(element);

  const onClick = (event) => {
    if (isOutside(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    for (const event of events) {
      if (isBrowser) {
        document.addEventListener(event, onClick);
      }
    }

    return () => {
      for (const event of events)
        if (isBrowser) {
          document.removeEventListener(event, onClick);
        }
    };
  });
};
export default Outside;
```

`import { useEffect } from "react"`で[`useEffect`](https://ja.reactjs.org/docs/hooks-effect.html) をインポートします。<br/>
`const events = [mousedown, `touchstart`]`で[`mousedown`](https://developer.mozilla.org/ja/docs/Web/API/Element/mousedown_event)と[`touchstart`](https://developer.mozilla.org/ja/docs/Web/API/Element/touchstart_event)の配列を作成します。<br/>
`const isBrowser = typeof document !== "undefined"`は[`Gatsby error`](https://www.gatsbyjs.com/docs/debugging-html-builds/)を修正するためのコードです。`document`が定義されているか確認します（ブラウザ内か`node.js`内か）
`const Outside = (ref, onClickOutside) => {};export default Outside`で`hooks`をコールバック関数として定義します。デフォルトをエクスポートします。`hooks`は、 `ref`と`onClickOutside`の2つの引数を受け入れます。`ref`は、可視性を切り替えたい要素への参照であり、`onClickOutside`は、`hooks`が呼び出されたときに実行したいアクションです。
`const isOutside = (element) => !ref.current || !ref.current.contains(element)で!ref.current`（可視性を切り替えたい要素への参照以外（参照）`!ref`を`current`した場合）を評価し、`!ref.current`が`true`なら`!ref.current`を返し、`false`なら`!ref.current.contains(element)`（参照`!ref`の子を`current`した場合）を返します。[contains()](http://www.webcreativepark.net/javascript/string/contains/)
`const onClick = (event) => {if (isOutside(event.target)) {onClickOutside();}}`で、`isOutside`以外が`event.targe`だった時、`onClickOutside()`関数が呼び出されます。`useEffect(() => {});`で`hooks`内に`useEffect`を作成します。`for (const event of events) {document.addEventListener(event, onClick)}`で、`document.addEventListener(event, onClick);`は、`document.addEventListener(`mousedown`, onClick);document.addEventListener(`touchstart`, onClick);`と同じ意味になります。[for...of](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of) [addEventListener()](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)
`return () => { for (const event of events) document.removeEventListener(event, onClick);};`は[クリーンアップ関数](https://ja.reactjs.org/docs/hooks-effect.html#effects-with-cleanup)で両方のイベントリスナーを削除します。[removeEventListener()](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/removeEventListener) 

## すべてのコンポーネントを接続して、検索できるようにする

`search`フォルダの中に`index.js`ファイルを新規作成します。

```js:title=src/components/search/index.js
import algoliasearch from "algoliasearch/lite";
import { createRef, default as React, useState, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { ThemeProvider } from "styled-components";
import StyledSearchBox from "./styled-search-box";
import StyledSearchResult from "./styled-search-result";
import StyledSearchRoot from "./styled-search-root";
import useClickOutside from "./use-click-outside";

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
  border: "2px solid #5870cb",
};
export default function SearchPage({ indices }) {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );
  useClickOutside(rootRef, () => setFocus(false));
  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          <StyledSearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  );
}
```

### 接続するためのインポート

`import { InstantSearch } from "react-instantsearch-dom";`で[検索UI](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)をインポートします。検索ボックスと検索結果をラップして、検索を調整します。`CSS`が使用する変数をエクスポートします。<br/>
`import { ThemeProvider } from "styled-components";`で`styled-components`をインポートします。<br/>
`CSS`ファイル`styled-search-box.js`と`styled-search-result.js`と`styled-search-root.js`をインポートします。<br/>
サポートファイル`use-click-outside.js`をインポートします。<br/>
[検索専用バージョン](https://www.algolia.com/doc/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/javascript/?client=javascript#initialize-the-client)として`import algoliasearch from "algoliasearch/lite"`をインポートします。<br/>
モーダルの外側のクリックすると閉じるようにする[`hook`](https://designcode.io/react-hooks-handbook-useonclickoutside-hook)を使うので[`createRef`](https://ja.reactjs.org/docs/refs-and-the-dom.html#callback-refs)と[`useState`](https://ja.reactjs.org/docs/hooks-state.html)をインポートします。<br/>
[`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo)をインポートします。検索をキャッシュしてAlgoliaに対して行われるリクエストの数を最小限に抑えるパフォーマンスのためです。<br/>
`const theme`で`search`フォルダ内に作成したスタイルシートファイル`styled-search-result.js`と`styled-search-box.js`の`theme`プロパリティの詳細です。<br/>
`export default function SearchPage({ indices }) { return ( );}`で`react`コンポーネントのベースを用意し、`indices`を[分割代入](https://typescript-jp.gitbook.io/deep-dive/future-javascript/destructuring)します。<br/>
`const rootRef = createRef()`で関数として定義。<br/>
`const [query, setQuery] = useState()`で`query`という`State`（状態）を作成します。<br/>
`const [hasFocus, setFocus] = useState(false)`で`hasFocus`という`State`（状態）を作成します。<br/>
`const searchClient`で[Algoliaで検索するため](https://www.algolia.com/doc/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/javascript/?client=javascript#initialize-the-client)に必要な`Search-Only API Key`と`Admin API Key`を登録します。<br/>
[`useMemo()`](https://reactjs.org/docs/hooks-reference.html#usememo)最良なパフォーマンスにします。<br/>
`useClickOutside(rootRef, () => setFocus(false))`で、ユーザーがページ上の他の場所をクリックした場合にコールバックを返し、その時`hooks`は閉じるようになります。`createRef()`とハンドラー関数を渡します。この関数は、 `setFocus`状態を `false`に設定するコールバック関数になります。<br/>
`<ThemeProvider theme={theme}></ThemeProvider>`で`theme={theme}`は`CSS`が使用する変数をエクスポートします。`ThemeProvider`はウィジェット階層のルートに配置します。<br/>
`<StyledSearchRoot ref={rootRef}></StyledSearchRoot>`で`StyledSearchRoot`はコンポーネント全体のルートにして、`ref={rootRef}`は[`useClickOutside()`](https://designcode.io/react-hooks-handbook-useonclickoutside-hook)に必要なので追加します。<br/>
[`<InstantSearch></InstantSearch>`](https://www.algolia.com/doc/guides/building-search-ui/installation/react/)で検索ボックス`search-box.js`と検索結果`search-result.js`をラップします。<br/>
[`searchClient={searchClient}`](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-searchclient)で検索クライアントを提供します。<br/>
`indexName={indices[0].name}`で検索するメインインデックス。`indices`[プロパリティのデータ名を取得](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/name)します。<br/>
`onSearchStateChange={({ query }) => setQuery(query)}`で[`onSearchStateChange`](https://www.algolia.com/doc/guides/building-search-ui/installation/react/)は検索状態が変化するたびに呼び出される関数。現在の状態`puery`を実行した時に状態の値を変更する関数`setQuery`を現在の状態`query`にする。
`<StyledSearchBox />`で`styled-search-box.js`ファイルコンポーネントを接続します。<br/>
`onFocus={() => setFocus(true)}`で`search-box.js`ファイルの`onFocus`プロパリティのデータです。実行した時に状態の値を変更する関数`setFocus`を`true`にする。<br/>
`hasFocus={hasFocus}`で[`hasFocus=`イベント](https://www.algolia.com/doc/guides/building-search-ui/installation/react/)は現在の状態`hasFocus`にします。
`<StyledSearchResult/>`で`styled-search-result.js`ファイルコンポーネントを接続します。<br/>
`show={query && query.length > 0 && hasFocus}`で`styled-search-result.js`ファイルの`display: ${(props) => (props.show ? block : `none`)};`の`show`のデータです。<br/>
[論理演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND)で `query && query.length` で`query`現在の状態が`true` に変換できる場合は 、 `query.length`現在の状態の長さに返し、それ以外の場合は`query`現在の状態を返します。<br/>
`0 && hasFocus`で`0`が`true`に変換出来る場合は、`hasFocus`現在の状態を返し、それ以外の場合は0を返します。<br/>
`query && query.length > 0 && hasFocus`で要素がある場合の意味と同じになります。<br/>
`indices={indices}`で`indices=`は`search-result.js`ファイルの`indices`プロパリティのデータで、`indices`プロパリティにします。