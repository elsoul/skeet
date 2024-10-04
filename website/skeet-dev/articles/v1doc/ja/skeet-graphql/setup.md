---
id: setup
title: セットアップ - GraphQL
description: Skeet フレームワークを使い始めるための設定について説明します。
---

## 🕺 Skeet とは？ 💃

⚡️ Do more, manage less ⚡️

アプリの開発・運用コストを下げ、もっと多くのプランを実現させましょう。

Skeet はオープンソースのフルスタックアプリ開発ソリューションです。
すぐにアプリのロジックからスタートでき、インフラに関する心配は無用です。

📱 Demo App made by Skeet: https://skeeter.dev/

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif)

## 🧪 依存パッケージ 🧪

- [TypeScript](https://www.typescriptlang.org/) 5.0.4 以上
- [Node.js](https://nodejs.org/ja/) 18.17.1 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上
- [Java](https://www.java.com/en/download/)

※ Skeet において Java を書くことはありませんが、モバイルアプリを動かすために必要です

## 📗 使い方 📗

### ① パッケージのインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。
すでに npm がインストールされている場合は、以下のコマンドでインストールできます。

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

npm がインストールされていない場合は、以下のコマンドでインストールできます。
(このコマンドは、nodenv, node, npm, @skeet-framework/cli をインストールし .profile/.zshrc を編集します。)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/v1.0.2-install)"
$ npm install -g firebase-tools
```

### ② Skeet アプリの作成

```bash
$ skeet create <appName>
```

![Skeet Create Select Template](/doc-images/cli/skeet-create-list.png)

フロントエンドのテンプレートを選択できます。

- [Next.js (React)](https://nextjs.org/)
- [Expo (React Native)](https://expo.dev/)

※ 本チュートリアルでは Expo 版を利用していますが、Next.js 版を利用しても同じ手順で利用可能です。

また、オプションをつけることで、バックエンドのみのテンプレートを選択できます。

```bash
$ skeet create <appName> --backend
```

![Skeet Create Select Template](/doc-images/cli/skeet-create-backend-list.png)

### ③ ローカルで起動

```bash
$ cd <appName>
$ skeet s
```

Skeet App フロントエンドと Firebase エミュレーターが起動します。

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

** ⚠️ Skeet App を完全に使用するには、_アクティベート Skeet ChatApp_ ステップを完了する必要があります ⚠️ **

## 🤖 アクティベート Skeet ChatApp 🤖

### ① Googel Cloud Project の作成

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Firebase Project の追加

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Firebase ビルドの有効化

以下の３つの Firebase ビルドを有効化してください。

#### - Firebase 認証

- Firebase Authentication の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Email/Password ログインの有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

#### - Firebase Firestore

- Firestore の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- 環境を選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- リージョンを選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

#### - Firebase Storage

- Firebase Storage の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-storage.png)

- 環境を選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-storage.png)

- リージョンを選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-storage.png)

### ④ Skeet init コマンドの実行

_skeet init_ コマンドに _--login_ オプションを付けて実行し、
プロジェクト ID と リージョンを選択してください。
そして、表示された URL にアクセスし、Firebase アカウントへログインします。

```bash
// Please login to Google Cloud if you have not
$ gcloud auth login

$ skeet init --login
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1

Visit this URL on this device to log in:

https://accounts.google.com/o/oauth2/auth?project...

Waiting for authentication...
```

### ⑤ 環境変数の設定方法

#### - Firebase Blaze プランへのアップグレード

Skeet Framework では環境変数を [Cloud Secret Manager](https://firebase.google.com/docs/functions/config-env?hl=ja&gen=2nd) 使って API キーなどの機密情報を管理します。

このコマンドを利用するには、Firebase Blaze 以上のプランが必要です。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan.png)

Firebase コンソールの左下のメニューから、_アップグレード_ を選択します。

- [Firebase コンソール](https://console.firebase.google.com/u/0/project/_/usage/details)

#### - Skeet Framework のクラウド使用料について

Skeet Framework は Firebase Blaze プラン以上のプランが必要ですが、
通常、開発環境への使用料は以下の無料枠内で収まります。

Google Cloud の無料枠には 2 つの部分があります

- 90 日間の無料トライアル。Google Cloud サービスで使用できる 300 ドルのクレジットが付いています。
- Always Free は、多くの一般的な Google Cloud リソースへの制限付きアクセスを無料で提供します。

[Google Cloud の無料プログラム](https://cloud.google.com/free/docs/free-cloud-features?hl=ja)

[Firabse Blaze プランの料金](https://firebase.google.com/pricing?hl=ja#blaze-calculator)

**⚠️ また、想定外の請求を回避するために、予算のアラートなどを設定することをおすすめします。 ⚠️**

- [想定外の請求を回避する](https://firebase.google.com/docs/projects/billing/avoid-surprise-bills)

#### - シークレットキーの設定

_skeet add secret <secretKey>_ コマンドを使って

OpenAI の Organization ID を環境変数に設定します。

```bash
$ skeet add secret CHAT_GPT_ORG
? Enter value for CHAT_GPT_ORG: <yourOpenAIOrganizationID>
```

同様に CHAT_GPT_KEY も設定します。

```bash
$ skeet add secret CHAT_GPT_KEY
? Enter value for CHAT_GPT_KEY: <yourOpenAIKey>
```

また、簡易的に試すには、_functions/skeet/.secret.local_ か _functions/skeet/.env_ に記述することもできますが、
この方法は、本番環境には反映されません。

#### - OpenAI の API Key を作成・取得

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

これで Skeet App を使う準備ができました 🎉

## 📱 ユーザー登録・ログイン認証 📱

```bash
$ skeet s
```

ローカルで skeetApp を起動している状態で、

[http://localhost:19006/register](http://localhost:19006/register)
(Next.js の場合: [http://localhost:4200/auth/register](http://localhost:4200/auth/register))

にアクセスしてください。

メールアドレスとパスワードを入力してユーザー登録を行います。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

作成が成功すると、コンソールログに以下のようなメッセージが表示されます。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

リンクをクリックし、メールアドレスの認証を行ってください。

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

成功すると、リンク先のページに以下のようなメッセージが表示されます。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ OpenAI チャットルームの作成 ✉️

ログイン後、[http://localhost:19006/user/open-ai-chat](http://localhost:19006/user/open-ai-chat) にアクセスしてください。
(Next.js の場合: [http://localhost:4200/user/chat](http://localhost:4200/user/chat))

そして、チャットルームを作成します。

以下の設定を選択して、チャットルームを作成してください。

チャットルームの設定

| 項目名           | 説明                                          | 型                    |
| ---------------- | --------------------------------------------- | --------------------- |
| Model            | OpenAI API のモデルを選択します。             | gpt-3.5-turbo / gpt-4 |
| Max Tokens       | OpenAI API の Max Tokens を設定します。       | number                |
| Temperature      | OpenAI API の Temperature を設定します。      | number                |
| System Charactor | OpenAI API の System Charactor を設定します。 | string                |

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

これで、チャットルームが使えるようになりました 🎉

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-stream.gif)
