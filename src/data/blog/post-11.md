---
title: yarn installでエラーが発生しました。
slug: "2021-07-27"
date: "2021-07-27"
tags: ["error","nodeJS"]
eyecatch: "../images/nodeJS.png"
id: "11"
---

Google fontsをyarn installした時に「`error extract-files@11.0.0: The engine "node" is incompatible with this module. Expected version "^12.20 || >= 14.13". Got "12.18.3"`」というエラーが発生時の解決方法です。

## nodeを最新バージョンにする

「`error extract-files@11.0.0: The engine "node" is incompatible with this module. Expected version "^12.20 || >= 14.13". Got "12.18.3"`」を訳してみると「 `"node"` はこのモジュールと互換性がありません。期待されたバージョンは` "^12.20 || >= 14.13"` でした。結果は `"12.18.3"` でした。」
なので、`node -v`でバージョン確認します。
結果はやはり `"12.18.3"` になってたので、最新バージョンの`node`をインストールします。

[$card](https://nodejs.org/en/download/)

windowsの場合、`Windows Installer (.msi)`を選んでインストールするだけです。