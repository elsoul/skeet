---
id: backend-quickstart
title: クイックスタート - Firestore
description: Skeet フレームワークを使い始めるための設定について説明します。
---

Skeet フレームワークを使ってプロジェクトを迅速に開始するためのガイドです。

## Skeet CLI のインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。
すでに npm がインストールされている場合は、以下のコマンドでインストールできます。

```bash
$ npm i -g @skeet-framework/cli
```

npm がインストールされていない場合は、以下のコマンドでインストールできます。
(このコマンドは、pnpm, Java, @skeet-framework/cli をインストールし .profile/.zshrc を編集します。)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.1)"
```

## Google Cloud Project の作成

Google Cloud Project を作成することで、Google Cloud の各種リソースを利用することができます。公式の Google Cloud ドキュメントを参照して、新しいプロジェクトを作成してください。

- [Google Cloud プロジェクトの作成](https://cloud.google.com/resource-manager/docs/creating-managing-projects?hl=ja)

## Google Cloud VertexAI の有効化

Skeet は Google Cloud VertexAI と統合されています。以下のコマンドを使用して VertexAI を有効にしてください。

```bash
$ skeet iam ai
```

## Skeet AI アシスタントの起動

Skeet AI アシスタントは、さまざまなクエリに対応するためのインタラクティブなツールです。

```bash
$ skeet ai
```

起動すると、以下のようなプロンプトが表示されます。
何か話しかけてみましょう。

```bash
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

あなた:
```

## Skeet AI Firestore 　モードの起動

skeet ai 起動中に, _$ firestore_ と入力すると、
Firestore のモデルを生成するモードになります。
起動すると、データベースのユースケースに関する情報を入力するように求められます。ここでは、「ブログサイトを作りたいです。」と入力してみましょう。

````bash
あなた: $ firestore
Skeet:
🔥 Firestore モデル生成モード 🔥
? Firestoreの使用ケースを説明してください。

例： ブログアプリを作りたい。

あなた: ブログアプリを作りたい。
Skeet: これはいかがでしょうか？

```postModels.ts
import { Timestamp, FieldValue } from '@skeet-framework/firestore'
import { UserCN } from '@/models/userModels'

// CollectionId: Post
// DocumentId: auto
// Path: User/${UserId}/Post
export const PostCN = 'Post'
export const genPostPath = (userId: string) => `${UserCN}/${userId}/${PostCN}`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}
```

? このファイルを作成してもよろしいですか？:
postModels.ts (Use arrow keys)
❯ Yes
No
````

Yes を選択すると、`postModels.ts` が自動生成されます。
