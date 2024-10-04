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
$ pnpm install -g firebase-tools
```

pnpm がインストールされていない場合は、以下のコマンドでインストールできます。

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.5)"
```

上記コマンドにより、以下のパッケージがインストールされます。

- pnpm
- Java
- @skeet-framework/cli
- firebase-tools
- gh CLI

そして .profile または .zshrc の編集が行われます。

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

Skeet プロジェクトを初期化するには、
以下のコマンドを実行してください。

```bash
$ cd skeet-app
$ skeet init
? What's your GCP Project ID skeet-app
? Select Regions to deploy (Use arrow keys)
   🌏 Regions 🌏
❯ asia-east1
  asia-east2
  asia-northeast1
  asia-northeast2
  asia-northeast3
  asia-south1
(Move up and down to reveal more choices)
```

対話式でプロンプトが表示されるので、

- プロジェクト ID
- リージョン

を選択してください。

このコマンドにより、Firebase プロジェクトと Google Cloud プロジェクトが作成されます。

### - Firebase Blaze プランへのアップグレード

Skeet Framework の力を最大限に引き出すには、Firebase Blaze プラン以上のプランが必要です。
コンソールログに表示されるリンクにアクセスし、プランをアップグレードしてください。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan.png)

Firebase コンソールの左下のメニューから、_アップグレード_ を選択します。

- [Firebase コンソール](https://console.firebase.google.com/u/0/project/_/usage/details)

プロジェクトが作成されると、
ブラウザが開いて Firebase の認証を求められるので、リンクをクリックして認証を行ってください。

```bash
Visit this URL on this device to log in:
https://accounts.google.com/o/oauth2/auth?client_id=xxxxxxxxxxxx

Waiting for authentication...

✔  Success! Logged in as f.kawasaki@elsoul.nl
Now using project figaro5678

✔ Successfully Updated skeet-cloud.config.json 🎉
- Preparing the list of your Firebase apps
✔ Preparing the list of your Firebase apps
App already exists. Skipping...
.
.
.
Do you want to deploy Firebase Functions now? (y/N)
```

ログインが完了すると、無事に Skeet Framework を使用する準備が整います。

続いて、Firebase Functions をデプロイするかを尋ねられますが、
一旦ここでは `No` を選択します。

[セットアップ](/ja/doc/skeet-firestore/setup) の章で、完全なクラウド環境を構築する方法について説明します。

## Skeet プロジェクトの起動

Skeet プロジェクトを起動するには、以下のコマンドを実行します。

```bash
$ skeet s
✔  functions: Loaded functions definitions from source: authOnCreateUser, root.
✔  functions[asia-northeast1-authOnCreateUser]: auth function initialized.
✔  functions[asia-northeast1-root]: http function initialized (http://127.0.0.1:5001/figaro5678/asia-northeast1/root).
✔  functions: Using debug port 9229 for functions codebase skeet-func
>  Debugger listening on ws://127.0.0.1:9229/05eeda4e-58a8-48f5-b2a2-c23726d4c1c3
>  For help, see: https://nodejs.org/en/docs/inspector

┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌────────────────┬────────────────┬─────────────────────────────────┐
│ Emulator       │ Host:Port      │ View in Emulator UI             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Authentication │ 127.0.0.1:9099 │ http://127.0.0.1:4000/auth      │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Functions      │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Firestore      │ 127.0.0.1:8080 │ http://127.0.0.1:4000/firestore │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Hosting        │ 127.0.0.1:8000 │ n/a                             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Pub/Sub        │ 127.0.0.1:8085 │ n/a                             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Storage        │ 127.0.0.1:9199 │ http://127.0.0.1:4000/storage   │
└────────────────┴────────────────┴─────────────────────────────────┘
  Emulator Hub running at 127.0.0.1:4400
  Other reserved ports: 4500, 9150

Issues? Report them at https://github.com/firebase/firebase-tools/issues
```

Firebase エミュレーターが起動し、ローカルホストでアプリケーションが実行されます。
以下の URL にアクセスして、エミュレーターの UI を確認してください。

エミュレーター UI： [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

![Firebase Emulator UI](https://storage.googleapis.com/skeet-assets/imgs/firebase-emulator.png)

## Skeet コンソールによるテスト

Skeet コンソールを使用して、エミュレーターをテストすることができます。
以下のコマンドを実行して、コンソールを起動してください。

```bash
$ skeet c
firebase >
```

このコンソール内では、Firebase Functions を簡単にテストすることができます。
デフォルトで用意されている関数をテストしてみましょう。

`functions/skeet-func/src/routings/http/root.ts` に定義されている

root 関数を呼び出してみます。

root 関数は、HTTP リクエストを受け取り、`{ status: 'success' }` を返す関数です。

```ts
import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { RootParams } from '@common/types/http/rootParams'

export const root = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      // Define your logic here
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

skeet console 　から以下のコマンドを実行して、root 関数を呼び出してみましょう。

```bash
firebase > root()
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 9744,
  [Symbol(trigger_async_id_symbol)]: 4
}
firebase >
RESPONSE RECEIVED FROM FUNCTION: 200, {
  "status": "success"
}
```

無事に関数が呼び出され、`{ status: 'success' }` が返されました。

## $ skeet check コマンドによる AI アシスタントの診断

Skeet CLI には、クラウド設定状況を AI アシスタントに診断してもらう機能があります。
以下のコマンドを実行して、AI アシスタントに診断してもらいましょう。

```bash
$ skeet check
🔍 Checking Your Cloud Status...
Skeet:
You have successfully created your Google Cloud and Firebase Projects in PROJECT_CREATED status.
Next step is setting up the first Firebase Functions using the following command:

$ skeet deploy
```

## Skeet AI アシスタントの起動

Skeet AI アシスタントは、Skeet CLI に組み込まれた AI モデルです。
Skeet AI アシスタントは、プロジェクトの開発に関する質問に答えたり、
コードの生成を支援したりすることができます。
現在は以下の３つのモデルに対応しています。

- Gemini
- OpenAI
- Claude

```bash
$ skeet ai --help
Usage: skeet ai [options]

Call Skeet AI Assistant

Options:
  -g, --gemini  Use Gemini - default
  -o, --openai  Use OpenAI
  -c, --claude  Use Claude
  --mode        Call Mode Select Prompt
  -h, --help    display help for command
```

`skeet ai` を起動すると、以下のようなプロンプトが表示されます。
何か話しかけてみましょう。

```bash
$ skeet ai
╔══════════╤════════╗
│ Option   │ Value  │
╟──────────┼────────╢
│ AIの種類 │ Gemini  │
╚══════════╧════════╝

🤖 Skeet AIモード
 `mode` と入力してAIモードを変更 🤖


Gemini が選択されました 🤖 ('q'を入力して終了)


? 何をお手伝いしましょうか？

あなた:
```

デフォルトのモデルは Gemini ですが、オプションを指定して OpenAI や Claude を選択することもできます。

OpenAI を選択してみましょう。

※ ⚠️ OpenAI を使用するには、OpenAI API キーが必要です。

- `CHAT_GPT_ORG`
- `CHAT_GPT_KEY`

を `.env` に設定して下さい。

```bash
$ skeet ai --openai
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ OpenAI │
╚═════════╧════════╝
```

Claude を選択する場合は、以下のように指定します。

※ ⚠️ Claude を使用するには、Claude API キーが必要です。

- `ANTHROPIC_API_KEY`

を `.env` に設定して下さい。

```bash
$ skeet ai --claude
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ Claude │
╚═════════╧════════╝
```

## Skeet AI モードの起動

skeet ai 起動中に, _mode_ と入力、または `skeet ai --mode` を実行すると、
5 つの AI モードを選択することができます。

```bash
あなた: $ method
Skeet:
? 🤖 Select Mode (Use arrow keys)
❯ firestore
  prisma
  typedoc
  function
  method
```

各モードには以下の機能があります。

- firestore: Firestore のモデルファイル生成アシスト
- prisma: Prisma のスキーマファイル生成アシスト
- typedoc: TypeDoc 形式のドキュメント生成アシスト
- function: Firebase Functions の関数生成アシスト
- method: TypeScript の関数生成アシスト

インタラクティブに AI アシスタントとコミュニケーションを取りながら、
プロジェクトの開発を進めていきましょう。

これで Skeet フレームワークを使い始める準備が整いました 🎉

### - Skeet Framework のクラウド使用料について

Skeet Framework は Firebase Blaze プラン以上のプランが必要ですが、
通常、開発環境への使用料は以下の無料枠内で収まります。

Google Cloud の無料枠には 2 つの部分があります

- 90 日間の無料トライアル。Google Cloud サービスで使用できる 300 ドルのクレジットが付いています。
- Always Free は、多くの一般的な Google Cloud リソースへの制限付きアクセスを無料で提供します。

[Google Cloud の無料プログラム](https://cloud.google.com/free/docs/free-cloud-features?hl=ja)

[Firabse Blaze プランの料金](https://firebase.google.com/pricing?hl=ja#blaze-calculator)

**⚠️ また、想定外の請求を回避するために、予算のアラートなどを設定することをおすすめします。 ⚠️**

- [想定外の請求を回避する](https://firebase.google.com/docs/projects/billing/avoid-surprise-bills)
