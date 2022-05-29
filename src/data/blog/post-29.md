---
title: Reactでサイトに現在の位置と天気を表示させる
slug: "2021-11-09"
date: "2021-11-09"
tags: ["API","react","gatsby","javascript"]
eyecatch: "../images/reactJS.png"
id: "29"
---

# 完成コード

サイトに現在の地域名とその地域の天気の情報と気温を表示させる方法をReactJSで表示させてみました。
静的サイトジェネレーターはGatsbyJSを使っています。

## 完成コード

```js:title=weather.js
import React from "react";
import { useEffect, useState } from "react";

export default function Weather() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },

          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    fetchData();
  }, [lat, long]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <span className="referencePoint">
          {items.name}
          <i className="fas fa-map-marker-alt" />
        </span>
        <div className="weather">
          <span className="currentTemp">{Math.round(items.main?.temp)}℃</span>
          <span className="maxMinTemp">
            {Math.round(items.main?.temp_min)}/
            {Math.round(items.main?.temp_max)}℃
          </span>
          {(items.weather || []).map((wea) => (
            <figure className="iconTemp" key={wea.id}>
              <img
                src={`http://openweathermap.org/img/wn/${wea.icon}@2x.png`}
                alt={wea.main}
              />
            </figure>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
```

## 説明

```js
import React from "react";
export default function Weather() {
 return ()
}
```

でReactコンポーネントのベースを用意します。

### 位置情報を取得

そして、現在の位置情報を取得するためにJavaScriptの[位置情報API](https://developer.mozilla.org/ja/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)を使います。<br/>
JavaScriptでは、データベースやファイルへのアクセスが非同期処理させます。なので、`async function`で非同期関数を定義します。<br/>
`navigator.geolocation.getCurrentPosition()`オブジェクトを使います。Reactでは[`useEffect`フックを使うことで外部APIを利用することが可能](https://ja.reactjs.org/docs/faq-ajax.html)です。<br/>
React hooksの`useState`で管理するので<br/>
`const [lat, setLat] = useState([]);`<br/>
`const [long, setLong] = useState([]);`で定義して、<br/>
`setLat(position.coords.latitude);`で緯度<br/>
`setLong(position.coords.longitude);`で経度<br/>
を登録します。<br/>
天気情報取得は[OpenWeatherMAP](https://openweathermap.org/)を利用します。<br/>
[`fetch()`](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch) メソッドで[React](https://ja.reactjs.org/docs/faq-ajax.html)で外部APIを使えるようにします。`async function`で非同期関数を定義しているで、このままでは外部APIはデータの取得を待たずに次の処理へと進み、問題が発生します。なので`fatch()`を`await`式にします。これで`async function`で、[Current Weather DataのドキュメントAPIからBy geographic coordinatesのAPI callのURL](https://openweathermap.org/current)を使用します。

```js
`https://api.openweathermap.org/data/2.5/weatherlat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`
```

- `lat`で緯度の変数`lat`
- `lon`で経度ぼ変数`long`を代入
- `units`で温度を摂氏`metric`で取得
- `appid`でアプリIDを入力します。アプリID取得にはメンバー登録（無料）が必要です。

### 環境変数

`process.env.REACTAPPOW_API_KEY`でアプリIDを環境変数で入力します。<br/>
環境変数登録方法はGatsbyではルートフォルダに`.env.development`ファイルと`.env.production`ファイルを新規作成します。<br/>
各ファイルに`REACTAPPOW_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`と環境変数を入力し登録します。<br/>
`.env.development`は開発中にこのファイルからロードされます。<br/>
`.env.production`はビルド時にこのファイルからロードされます。<br/>

### 表示条件を指定

```js
.then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },

          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    fetchData();
  }, [lat, long]);
```
- `.then((res) => res.json())`でデータの情報を`JSON`で返します。
- `setIsLoaded(true);`ロード時の変数
- `setItems(result);``JSON`情報の変数
- `setError(error);`エラー時の変数
- `fatchData()`で実行
- `[lat,long]`第二引数で緯度と経度の値が変更されたタイミングで`fatchData()`を実行します。

### エラーメッセージを設定する

```js
if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return ()
```

`(error)`の場合は`error.message`エラーメッセージを返します。<br/>
そうではない`(!isLoaded)`場合は変数`isLoaded`が`false`の時は`「Loading...」`を返します。[論理否定`(!)`演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT)<br/>
そうではない場合は以下の`return()`を返します。

### データを出力する

```js
<React.Fragment>
        <span className="referencePoint">
          {items.name}
          <i className="fas fa-map-marker-alt" />
        </span>
        <div className="weather">
          <span className="currentTemp">{Math.round(items.main?.temp)}℃</span>
          <span className="maxMinTemp">
            {Math.round(items.main?.temp_min)}/
            {Math.round(items.main?.temp_max)}℃
          </span>
          {(items.weather || []).map((wea) => (
            <figure className="iconTemp" key={wea.id}>
              <img
                src={`http://openweathermap.org/img/wn/${wea.icon}@2x.png`}
                alt={wea.main}
              />
            </figure>
          ))}
        </div>
      </React.Fragment>
```

[`React.Fragment`](https://ja.reactjs.org/docs/fragments.html)で括ることで余分な`<div>`タグを使わずに済みます。<br/>
`https://api.openweathermap.org/data/2.5/weatherq=London&units=metric&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
一度テストでこのテスト用のURLをブラウザで開いてみます。<br/>
するとこのようにJSONデータで天気情報が表示されます。

![jsondata](//images.ctfassets.net/28yc8d4hnjoo/5yE4oEfu7o61ABjoSduGuK/ed8db9031aabdc177fd5c8a6e1d83a0f/json.jpg)

- 情報が変数`items`に入ってますので、ここから必要な情報を指定します。
- `items.name`で地域名を指定
- 気温は`items.main.temp`ですが表示されません。[`items.main?.temp`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining)にします。
- すると表示されますが小数点が付いてきます。[`Math.round()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round)で四捨五入で表示させます。
- `temp_min`は最低気温
- `temp_max`は最高気温
- `icon`で[イメージ画像を表示](https://openweathermap.org/weather-conditions)させます。
- `items.weather`のデータは複数の情報がリスト状になってますので、`map`メソッドで出力します。
- しかし、`(items.weather).map((wea) => ()`では表示されず、`?.`を使うとエラーになります。
- `{(items.weather || []).map((wea) => ())}`のように論理演算子で`false`なら空を返します。
- `map`メソッドを使うとユニークな`key`を与えてくださいというエラーが出ますので`key={wea.id}`を追加します。
- `alt`属性は`wea.main`で現在の天気名を表示