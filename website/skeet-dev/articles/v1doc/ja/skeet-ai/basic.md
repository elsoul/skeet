---
  id: skeet-ai-basic
  title: Skeet AI モード
  description: skeet ai モード
---

Skeet Framework には、AI を使った機能が搭載されています。
Skeet AI を使うことで、AI を使ったデバッグや、AI を使ったコード生成が可能になります。
（_現時点では OpenAI のモデル gpt4 を推奨しています。_）

## Skeet AI YouTube - 1/7. 基本的な使い方（動画）

https://www.youtube.com/watch?v=_aAN1nZ8dwg

## Skeet AI

Skeet AI モードには、現在 6 つのモードがあります。
それぞれのモードは、AI を使って専門的な作業を自動化します。

- $prisma - Prisma スキーマ自動生成
- $method - 関数自動生成
- $typedoc - TypeDoc 自動生成
- $firestore - Firestore モデル自動生成
- $translate - AI 翻訳
- $function - Firebase Function 自動生成

## Skeet AI モードの起動

次のように skeet ai コマンドを実行し、AI モードを起動します。

```bash
$ skeet ai
╔══════════════╤════════════════╗
│ Option       │ Value          │
╟──────────────┼────────────────╢
│ AIの種類      │ VertexAI       │
╟──────────────┼────────────────╢
│ モデル        │ chat-bison@001 │
╟──────────────┼────────────────╢
│ 最大トークン   │ 1000           │
╟──────────────┼────────────────╢
│ 感情の大きさ   │ 0              │
╚══════════════╧════════════════╝

🤖 Skeet AIモード
 $ <mode> でAIモードを変更 🤖

$ prisma
$ typedoc
$ translate
$ firestore
$ function
$ method
$ help
$ q

VertexAI が選択されました 🤖 ('q'を入力して終了)


? 何をお手伝いしましょうか？

あなた: $ prisma
```

Skeet AI 起動中に、`$` で始まるコマンドを入力すると、AI モードを変更できます。

デフォルトの AI は VertexAI です。
オプションを変更することで、OpenAI を使用することもできます。

```bash
$ skeet ai --help
Usage: skeet ai [options]

AI Playground

Options:
  -v, --vertex                   Vertex AI
  -o, --openai                   OpenAI
  -m, --model <string>           Model
  -token, --token <number>       Max Tokens
  -temp, --temperature <number>  Temperature
  -h, --help                     display help for command
```

## Skeet AI の言語設定

Skeet AI は、_skeet-cloud.config.json_ に設定された言語を使用します。
現在は 17 の言語がサポートされています。
ai の lang プロパティを変更することで、AI の言語を変更できます。

_skeet-cloud.config.json_ の例:

```json
{
  // 中略
  "ai": {
    "lang": "ja",
    "ais": [
      {
        "name": "VertexAI",
        "availableModels": ["chat-bison@001", "chat-bison-32k"]
      }
    ]
  }
}
```
