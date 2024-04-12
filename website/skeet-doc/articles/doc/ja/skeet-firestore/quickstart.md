---
id: backend-quickstart
title: クイックスタート - Firestore
description: Skeet フレームワークを使い始めるための設定について説明します。
---

Skeet フレームワークを使ってプロジェクトを迅速に開始するためのガイドです。

## Skeet CLI のインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。
すでに pnpm がインストールされている場合は、以下のコマンドでインストールできます。

```bash
$ pnpm add -g @skeet-framework/cli
```

pnpm がインストールされていない場合は、以下のコマンドでインストールできます。
(このコマンドは、pnpm, Java, @skeet-framework/cli, firebase-tools をインストールし .profile または .zshrc を編集します。)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.4)"
```

## Cloud SDK のインストール

Skeet は Google Cloud SDK と Firebase CLI を使用しています。以下のリンクからインストールしてください。

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^471.0.0

インストールが完了後、
以下のコマンドでインストールされたバージョンを確認することができます。

```bash
gcloud -v
Google Cloud SDK 471.0.0
alpha 2024.03.29
beta 2024.03.29
bq 2.1.3
core 2024.03.29
gcloud-crc32c 1.0.0
gsutil 5.27
```

## gh CLI のインストール

Skeet は GitHub CLI を使用しています。以下のリンクからインストールしてください。

- [GitHub CLI](https://cli.github.com/) ^2.47.0

MacOS の場合は、以下のコマンドでインストールできます。

```bash
$ brew install gh
```

## CLI の初期化

gcloud CLI と gh CLI を初期化するために以下のコマンドを実行します。

### gcloud CLI の初期化

以下のコマンドを実行すると、ブラウザが開いて認証を求められます。
リンクをクリックして認証を行ってください。

```bash
$ gcloud auth login
Your browser has been opened to visit:

    https://accounts.google.com/o/oauth2/auth?response_type=xxxxxxxxx
```

### gh CLI の初期化

以下のコマンドを実行すると、GitHub にログインするための認証が求められます。
対話式のプロンプトが表示されるので、任意のアカウントを選択してください。

```
$ gh auth login
? What account do you want to log into?  [Use arrows to move, type to filter]
> GitHub.com
  GitHub Enterprise Server
```

## Skeet プロジェクトの作成

Skeet プロジェクトを作成するには、以下のコマンドを実行します。

```bash
$ skeet new
? Enter the name of the app skeet-app
🚛 Downloading base template...📦 ⠹
   _____ __ __ __________________
  / ___// //_// ____/ ____/_  __/
  \__ \/ ,<  / __/ / __/   / /
 ___/ / /| |/ /___/ /___  / /
/____/_/ |_/_____/_____/ /_/    🛠️🛠️

⚡⚡⚡ Buidl TypeScript Fullstack App Fast ⚡⚡⚡

$ cd skeet-app
$ skeet init

You can ask AI Assistant for help

$ skeet ai --help
```

## Skeet プロジェクトの初期化

Skeet プロジェクトを初期化するには、以下のコマンドを実行します。

```bash
$ skeet init
? What's your GCP Project ID skeet-framework
```

対話式でプロンプトが表示されるので、プロジェクト ID を入力し、リージョンを選択してください。

このコマンドにより、Firebase プロジェクトと Google Cloud プロジェクトが作成され、
最初の Firebase Functions がデプロイされます。
その後、必要に応じて GitHub リポジトリの作成、GitHub Actions の設定が行われます。
あらかじめドメインを取得している場合は、VPN の作成からロードバランサーの設定までワンコマンドで行うことができます。

### Firebase Plan のアップグレード

## Skeet AI アシスタントの起動

Skeet AI アシスタントは、さまざまなクエリに対応するためのインタラクティブなツールです。

```bash
$ skeet ai
```

起動すると、以下のようなプロンプトが表示されます。
何か話しかけてみましょう。

```bash
╔══════════╤════════╗
│ Option   │ Value  │
╟──────────┼────────╢
│ AIの種類 │ Gemini │
╚══════════╧════════╝

🤖 Skeet AIモード
 `mode` と入力してAIモードを変更 🤖


Gemini が選択されました 🤖 ('q'を入力して終了)


? 何をお手伝いしましょうか？

あなた:
```

## Skeet AI Firestore モードの起動

skeet ai 起動中に, _mode_ と入力すると、
5 つのモードの中から AI のモードを選択することができます。
エンターキーで Firestore のモデルを生成するモードを選択してください。
起動すると、データベースのユースケースに関する情報を入力するように求められます。ここでは、「ブログサイトを作りたいです。」と入力してみましょう。

````bash
あなた: $ firestore
Skeet:
? 🤖 Select Mode (Use arrow keys)
❯ firestore
  prisma
  typedoc
  function
  method

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

?  このファイルを作成してもよろしいですか？:
 blogModels.ts Yes

✔️ 作成完了: common/models/blogModels.ts

Firestoreモードを終了します...
````

Yes を選択すると、`postModels.ts` が `common` ディレクトリ自動生成されます。

`Skeet Framework` は `pnpm` を使用しモノリポジトリ構成で複数のアプリを管理します。
`common` ディレクトリは、共通のモデルや関数を格納するディレクトリです。
各サービス間の通信の型安全を保つために、`common` ディレクトリにモデルや定数を格納します。
本番環境にデプロイする際には `esbuild` で `esm` 形式でビルドされ、`dist` ディレクトリに出力されます。
