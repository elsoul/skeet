---
id: backend-quickstart
title: クイックスタート - GraphQL
description: Skeet フレームワークの簡単な始め方を説明します。
---

Skeet フレームワークを使ってプロジェクトを迅速に開始するためのガイドです。

![skeet-prisma](https://storage.googleapis.com/skeet-assets/animation/skeet-prisma.gif)

## Skeet CLI のインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。
すでに npm がインストールされている場合は、以下のコマンドでインストールできます。

```bash
$ npm i -g @skeet-framework/cli
```

npm がインストールされていない場合は、以下のコマンドでインストールできます。
(このコマンドは、nodenv, node, npm, @skeet-framework/cli をインストールし .profile/.zshrc を編集します。)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/v1.0.2-install)"
```

## Docker のインストール

Skeet は、Docker を利用してローカルでの開発をサポートしています。
Docker がインストールされていない場合は、以下のを参考にインストールしてください。

- [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Desktop for Linux](https://docs.docker.com/engine/install/)

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
│ AIの種類     │ VertexAI       │
╟──────────────┼────────────────╢
│ モデル       │ chat-bison@001 │
╟──────────────┼────────────────╢
│ 最大トークン │ 1000           │
╟──────────────┼────────────────╢
│ 感情の大きさ │ 0              │
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

## Skeet AI Prisma の起動

skeet ai 起動中に, _$ prisma_ と入力すると、
データベースのスキーマを生成するモードになります。
起動すると、データベースのユースケースに関する情報を入力するように求められます。ここでは、「ブログサイトを作りたいです。」と入力してみましょう。

```bash
$ skeet ai
VertexAI is selected 🤖 (type "q" to quit)

You: $ prisma
Skeet:
🤖 Prismaスキーマ生成モード 🤖
? あなたのPrismaの使用例を説明してください。

例： ブログアプリを作りたい。

or

例： 次のフィールドを持つ新しいモデル、Clientを作りたい：id、名前、メール、パスワード、作成日、更新日。

あなた:
You: ブログサイトを作りたいです。
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Comment   Comment[]
  User      User      @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  postId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Post      Post     @relation(fields: [postId], references: [id])
}

Edit: ./graphql/prisma/schema.prisma
```

Prisma のスキーマが生成されました。

## Prisma スキーマの編集

Prisma のスキーマは、
_./graphql/prisma/schema.prisma_
に保存されています。
先ほど出力されたスキーマを編集してください。

まだ skeet テンプレートを利用していない場合は、
以下のコマンドで skeet テンプレートを作成してください。

```bash
$ skeet create <appName>
```

このスキーマを元に、データベースのマイグレーションを行います。

## DB マイグレーションの作成/実行

Skeet は、Prisma を利用してデータベースのマイグレーションを行うことができます。

```bash
$ skeet db migrate <migrationName>
```

これで、データベースのマイグレーションが完了しました。

## GraphQL API の作成

Skeet は、スキーマから GraphQL API を自動生成することができます。

```bash
$ skeet g scaffold
```

## GraphQL API の起動

Skeet は、GraphQL API をローカルで起動することができます。

```bash
$ skeet s
```

以下の URL で GraphQL API にアクセスできます。

- [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Type の同期

Skeet は、GraphQL API から TypeScript の型定義を自動生成することができます。

```bash
$ skeet sync types
```
