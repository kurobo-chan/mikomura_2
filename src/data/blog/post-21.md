---
title: Reactサイトに現在の時刻と日にちと曜日を表示させる
slug: "2021-12-10"
date: "2021-12-10"
tags: ["javascript","react","gatsby","plugin"]
eyecatch: "../images/reactJS.png"
id: "21"
---

ReactJSで現在の時刻、日にち、曜日を表示させてみました。静的サイトジェネレーターはGatsbyJSを使っています。

## 🚀How to use

```js
import React from "react";
export default function DateTime() {
return ()
}
```

Reactコンポーネントのベースを用意します。
[`date-and-timeJavaScript`](https://github.com/knowledgecode/date-and-time)ライブラリを利用します。

```shell:title=shell
yarn add date-and-time
```

インストールします。`import date from "date-and-time";`でインポート
`const now = new Date();`で現在の時刻を登録 [Date()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)<br/>
[`compile()`](https://github.com/knowledgecode/date-and-time#compileformatstring)はライブラリのAPI、フォーマット文字列の変換をします。<br/>
[`locale()`](https://github.com/knowledgecode/date-and-time#localelocale)はライブラリのAPI、ベースとなる言語、使用する国 (地域)、およびコードセットから構成。<br/>
[`ja`](https://github.com/knowledgecode/date-and-time#localelocale)はロケールされてるサポートリストの中の日本に設定。<br/>
[`format()`](https://github.com/knowledgecode/date-and-time#formatdateobj-arg-utc)はライブラリのAPI,日付と時刻のフォーマット（日付→文字列）

## ✨完成コード

```js:title=datetime.js
import React from "react";
import date from "date-and-time";
import ja from "date-and-time/locale/ja";

export default function DateTime() {
  date.locale(ja);
  const now = new Date();
  const dateTime = date.compile("YYYY-MM-DD-dddd HH:mm:ss");
  const time = date.compile("HH:mm");
  const today = date.compile("MM月DD日");
  const week = date.compile("dddd");

  return (
    <div className="DateTime">
      <time className="time" dateTime={date.format(now, dateTime)}>
        {date.format(now, time)}
      </time>
      <time className="date" dateTime={date.format(now, dateTime)}>
        {date.format(now, today)}
        <span className="week">{date.format(now, week)}</span>
      </time>
    </div>
  );
}
```

