---
title: GatsbyJSサイトでお問い合わせフォームを作る
slug: "2022-01-02"
date: "2022-01-02"
tags: ["react","contact form","gatsby","javascript","Netlify"]
eyecatch: "../images/Gatsby.png"
id: "25"
---

Gatsbyにはいくつかの方法でお問い合わせフォームを作成できますが、今回はNetlifyでホストしているので[Netlifyのフォーム処理機能](https://www.gatsbyjs.com/docs/building-a-contact-form/#netlify)を利用して作成しました。

## 完成コード

```js:title=contact.js
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { navigate } from "gatsby-link";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
export default function Contact() {
  const [state, setState] = React.useState({});
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <React.Fragment>
      <form
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <button type="submit" className="submitButton">
          <SendIcon className="material-icons" />
        </button>
        <div className="formList">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="あなたの名前"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formList">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="メールアドレス"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formList">
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="件名"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formList">
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={8}
            placeholder="ここに本文を作成"
            required
            defaultValue={""}
            onChange={handleChange}
          />
        </div>
      </form>
    </React.Fragment>
  );
}
```

### HTMLフォームの設定をします。

[$card](https://docs.netlify.com/forms/setup/#html-forms)

HTMLフォームにタグ属性として`data-netlify="true"`すると、 Netlifyサイトの管理パネルで送信の受信を開始できます。<br/>
フォームの`name`属性によってNetlifyアプリのインターフェースでのフォーム名が決まります。例：`name="contact"`フォーム属性`netlify-honeypot="bot-field"`と対応する非表示の入力を追加することで、Netlifyは受信する可能性のあるスパム送信を静かに拒否することを認識します。

### Gatsbyフレームワークで構築されたJavaScriptでレンダリングされたフォームを送信します。

[$card](https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax)

```js
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
```

リクエストの本文にフォームデータをURLエンコードする関数を作成します。リクエストには代わりにヘッダーを含める必要があります。Gatsbyリダイレクトとヘッダーを処理するプラグインをインストールします。

[$card](https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/)

```shell:title=shell
yarn add gatsby-plugin-netlify
```

```js:title=gatsby-config.js
plugins: [gatsby-plugin-netlify]
```

ヘッダーに`"Content-Type": "multipart/form-data"`を含めます。リクエストの`body`でエンコードされた`name`属性`form-name`を含めます。`then(() => navigate(form.getAttribute("action")))`でGatsbyの`navigate`機能を使用して、フォームの送信が成功したときに`/thanks/`ページにリダイレクトします。`const [state, setState] = React.useState({});`と`const handleChange = (e) => {setState({ ...state, [e.target.name]: e.target.value }); };React Hooks`を利用して`OnChange`イベントを設定します。

### 送信されたメールを確認する

[$card](https://docs.netlify.com/forms/notifications/)

Netlifyの管理画面> Site settings > Forms > Form npeotificationsまで行き、Add notificationsをクリックEmail notificationsを選択します。Netlifyの管理画面に戻り、Forms > Active forms で受信メールを確認することができます。


