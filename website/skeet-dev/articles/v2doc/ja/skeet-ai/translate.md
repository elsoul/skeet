---
  id: skeet-ai-translate
  title: Skeet AI Translate モード
  description: skeet ai translate モード
---

Translate モードは、AI を使ってマークダウン形式のファイルや、
JSON 形式のファイルを翻訳します。

## Skeet AI YouTube - 6/7. Translate モードの使い方（動画）

https://www.youtube.com/watch?v=t3W4oYPaLNE

## Translate モードの起動

```bash
You: $ translate
Skeet:
🌐 翻訳モード 🌐
tmp/ai/translate.json を読み込んでいます...

このコマンドは最も最近更新されたファイルを表示します

$ skeet get files --limit 5 --translate

 現在のセット:
{
  "langFrom": "en",
  "langsTo": [
    "ja"
  ],
  "paths": [
    "/Users/fumi/Dev/ts/skeet-sql/skeet-cloud.config.json",
    "/Users/fumi/Dev/ts/skeet-sql/functions/skeet/package.json",
    "/Users/fumi/Dev/ts/skeet-sql/tmp/data/firebase-export-metadata.json",
    "/Users/fumi/Dev/ts/skeet-sql/tmp/data/storage_export/buckets.json",
    "/Users/fumi/Dev/ts/skeet-sql/tmp/data/auth_export/config.json"
  ]
}
? 実行する準備はできていますか？ (Use arrow keys)
❯ Yes
  No
```
