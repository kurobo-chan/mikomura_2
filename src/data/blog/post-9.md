---
title: グーテンベルクのブロックごとにデザインをアレンジする
slug: "2021-07-26"
date: "2021-07-26"
tags: ["wordPress"]
eyecatch: "../images/wordpress.png"
id: "09"
---

ワードプレスのフロント画面とエディタ画面（管理画面）の両方に同じCSSを適用させてグーテンベルクのブロックごとにデザインをアレンジする手順です。

## フロント画面とエディタ画面の両方に適用するCSSファイルを作成する

1. テーマフォルダにフロントとエディタの両方に適用するCSSファイルを新規作成する。（ここでは`style-both.css`という空ファイルを作成）
2. `function.php`で`style-both.css`ファイルをフロントとエディタの両方に読み込ませる設定をします。

```php
function mytheme_both()
{
    wp_enqueue_style(
        'mytheme-style-both',
        get_template_directory_uri() . '/style-both.css',
        array(),
        filemtime(get_template_directory() . '/style-both.css')
    );
}
addaction('enqueue_block_assets', 'mytheme_both');
```

 wp_enqueue_styleでCSSファイルを指定し、addaction('enqueue_block_assets', 'mytheme_both');で実行します。

3. フロントとエディタの両方にCSSファイルが読み込まれたことを確認する

![front](//images.ctfassets.net/28yc8d4hnjoo/4c7j1rXC7eQ5hCT50U200y/c817954dd2ec4b74c759f86da38af8b5/front.jpg)

![editor](//images.ctfassets.net/28yc8d4hnjoo/3UypqEQwDcmhWa7NPPynRL/99c84d7a5a9829f4f544c9627e5e6f05/editor.jpg)

## CSSの設定を「ブロックスタイル」でアレンジする

エディタ管理画面の設定で選択するだけでアレンジします。内部的にはクラス名に対してCSSを適用しますが、クラス名を覚えておく必要がありません。

1. テーマフォルダに新規のJavaScriptファイルを作成します。（ここでは`mystyle.js`という空ファイルを作成）
2. JavaScriptファイルをエディタに読み込ませる。

```php
function myjs_enqueue()
{
    wp_enqueue_script(
        'myjs-style',
        get_template_directory_uri() . '/mystyle.js',
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        filemtime(get_template_directory() . '/mystyle.js')
    );
}
addaction('enqueue_block_editor_assets', 'myjs_enqueue');
```

`wp_enqueue_script();`で指定して、`add_action('enqueue_block_editor_assets','myjs_enqueue')`で実行します。

3. エディタにJavaScriptファイルが読み込まれたことを確認する。

![editor-js](//images.ctfassets.net/28yc8d4hnjoo/5IfzhVIAmvlYZ2nZJpMNiX/b5e6ae25f806aef13afde6e0743d5268/editor.jpg)

## ブロックスタイルを作成する

1. 追加したJavaScriptファイルにブロックスタイルを作成するための設定をします。
ここではテキストシャドウを適用するスタイルを作成しています。

```php
wp.domReady(function () {
  wp.blocks.registerBlockStyle("core/paragraph", {
    name: "textShadow",
    label: "テキストシャドウ",
  });
});
```

`wp.bloccks.registerBlockStyle()`で作成して、アレンジしたいブロック名`core/paragraph`を指定して、スタイル名を`name`で（ここでは`textShadow`）指定し、エディタに表示するラベルを`label`で指定（ここではテキストシャドウ）します。アレンジするブロック名を確認する方法は、エディタのコードで確認できます。`data-type`属性でブロック名、`aria-label`属性で編集画面に表示されるブロックラベルを確認することができます。

2. エディタのカバーブロックを選択すると、ブロックスタイルに「テキストシャドウ」という項目が追加されています。

![styleblock](//images.ctfassets.net/28yc8d4hnjoo/2RZWpMdsm3XmSsnT4b5fqh/3f4b5f39a3a95d018dd068453661aa81/styleblock.jpg)

3. テキストシャドウを選択するとフロントとエディタのブロックに「is-style-スタイル名」という形式のクラス名が追加されています。

![block-editer](//images.ctfassets.net/28yc8d4hnjoo/5tuhQPKn9KHbow42xe2yVp/cef3f70c12c036e66b86eb9140559a51/block-editor.jpg)

![block-front](//images.ctfassets.net/28yc8d4hnjoo/7Hn0oO1k7NKuVOaPuRzu1h/0c7376c678349a9bb6a83db8fd5d42d3/block-front.jpg)

## カバーブロックにテキストシャドウを適用する

`style-both.css`ファイルに`is-style-textShadow`と指定されたブロックをアレンジします。

```css
@charset "UTF-8";
/* テキストシャドウ */
.is-style-textShadow {
    color: var(--white);
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.8);
}
```

エディタの項目の選択で表示が変わることを確認して設定は完了です。

[$card](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/)