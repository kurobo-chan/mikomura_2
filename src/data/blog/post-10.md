---
title: WordPressでscriptファイルを</body>直前に読み込ませる
slug: "2021-07-28"
date: "2021-07-28"
tags: ["wordPress"]
eyecatch: "../images/wordpress.png"
id: "10"
---

JavaScriptファイルを読み込む時はWordPress関数`wp_enqueue_scripts`を使用しますが、`head`内に読み込みがされます。これを`body`直前に読み込ませます。<br/>
`?php wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer ); ?`
の`$in_footer`の記述をします。この値を`true`にするだけです。<br/>
逆に`false`を記述すると`head`内に読み込みます。<br/>
初期値：`false`になってます。

[$card](https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_enqueue_script)

```php
function catcafe_enqueue()
{
    wp_enqueue_script(
        'catcafe-script',
        get_template_directory_uri() . '/script.js',
        array(),
        filemtime(get_template_directory() . '/script.js'),
        true //</body> 終了タグの前で読み込み
    );
}
add_action('wp_enqueue_scripts', 'catcafe_enqueue');
```