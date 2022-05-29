---
title: OpenWeatherMAPで取得した天気情報をアイコンで表示する
slug: "2022-02-03"
date: "2022-02-03"
tags: ["plugin","react"]
eyecatch: "../images/reactJS.png"
id: "28"
---

# 完成コード

OpenWeatherMapはデフォルトで天気画像が付いていますが、プラグインを使ってアイコンで表示させます。

```shell:title=shell
yarn add react-icons-weather
```

でインストールして

```js:title=weather.js
import WeatherIcon from "react-icons-weather";
```

表示したいページにインポートします。

## How to use

[$card](/blog/post/react-weatherapi)

```js:title=weather.js
const WeatherComponent = () => {
  return (
    <div>
     {(items.current?.weather || []).map((wea) => (
              <figure className="weather-icon" key={wea.id}>
                <WeatherIcon name="owm" iconId={wea.id} />
                <figcaption className="weather-name">{wea.main}</figcaption>
              </figure>
            ))}
    </div>
  )
}
```

`iconId`は`icon`ではなく、`id`となります。