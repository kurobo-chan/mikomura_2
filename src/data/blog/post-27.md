---
title: ReactJSでスライドパズルを置く。
slug: "2022-01-15"
date: "2022-01-15"
tags: ["plugin"]
eyecatch: "../images/reactJS.png"
id: "27"
---

# 完成コード

```js:title=puzzlegame.js
import React from "react";
import { PuzzleGame, Puzzle } from "react-puzzle-game";
import image from "../images/animalface_nezumi.png";

export default function GameApp() {
  return (
    <React.Fragment>
      <div className="game">
        <PuzzleGame
          src={image}
          columnsCount={3}
          rowsCount={3}
          height={500}
          width={500}
          onFinish={() => alert("Finished!!")}
        >
          <Puzzle />
        </PuzzleGame>
      </div>
    </React.Fragment>
  );
}
```

## 説明

-  [`yarn add react-puzzle-game`](https://matthis-d.github.io/react-puzzle/)インストールします。
- `import { PuzzleGame, Puzzle } from "react-puzzle-game"`で、プラグインをインポートします。
- `import image from "../images/animalface_nezumi.png"`で、パズル化する`image`をインポートします。
- `Puzzle`で、細かく切った`image`を表示する部分になります。`PuzzleGame`でラップさせます。
- `src`で、パズル化する`image`を指定。
- `columnsCount`で、表示するカラム数を指定。
- `rowsCount`で表示する`row`数を指定。
- `height`と`width`で表示する高さ、幅をピクセル単位で指定します。
- `onFinish`で、パズルがクリアされたときに実行されるアクションを関数で指定します。


