---
id: setup
title: セットアップ - Firestore
description: Skeet フレームワークを使い始めるための設定について説明します。
---

この章では、Skeet フレームワークのクラウド環境をセットアップし、
Firebase Functions から OpenAI API を呼び出す方法を説明します。

ドメインを設定し、SSL 証明書を取得するので、
あらかじめ取得してあるドメインを使用するか、新規にドメインを取得してください。
ドメインの以下の項目の設定ができることを前提としています。

- ネームサーバー

ネームサーバーの設定ができない場合は、
以下の項目の設定が必要になります。

- A レコード
- CAA レコード

ロードバランサーを使って以下のようなエンドポイントから関数を呼び出すことができるようになります。

`https://lb.<your-domain>/skeet-fucn/root`

さらに、CloudArmor を合わせて組み合わせることでエンドポイントごとにセキュリティポリシーを設定することができるようになります。

本番のアプリケーションには DOSS 攻撃などのセキュリティ対策が必要です。
エンドポイントごとにサーバーリソースの設定とセキュリティポリシーの設定を行い、
効率的にサーバーリソースを管理しましょう。

## 🕺 Skeet とは？ 💃

⚡️ Do more, manage less ⚡️

アプリの開発・運用コストを下げ、もっと多くのプランを実現させましょう。

Skeet はオープンソースのフルスタックアプリ開発ソリューションです。
すぐにアプリのロジックからスタートでき、インフラに関する心配は無用です。

Skeet Framework は SQL と NoSQL を組み合わせてアプリを構築できます。

ここでは、`skeet init` を使って VPN と ロードバランサーを設定する方法を説明します。
さらに CloudArmor を使ってアプリを保護するセキュリティポリシーも自動で設定します。

![Skeet Architecture](https://storage.googleapis.com/skeet-assets/imgs/SkeetArchitecture.png)

## 🧪 依存パッケージ 🧪

- [TypeScript](https://www.typescriptlang.org/) 5.4.0 以上
- [Node.js](https://nodejs.org/ja/) 20.11.0 以上
- [Pnpm](https://pnpm.io/) 8.0.0 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 471.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.47.0 以上
- [Java](https://www.java.com/en/download/)

※ Skeet において Java を書くことはありませんが、開発時の Firebase エミュレーターの実行やモバイルアプリを動かすために必要です

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

## $ skeet init コマンドでクラウド環境を一発で構築する

これまで Cloud のサービスを適切に設定するためには、
複雑な権限と API の設定が必要でしたが、Skeet Framework では
Skeet init コマンドで以下の設定を自動で行います。

- Google Cloud プロジェクトの作成
- Google Gloud IAM の設定
- Firebase Functions のデプロイ
- GitHub Actions の設定
- VPC ネットワーク の設定
- Cloud DNS の設定
- ロードバランサーの設定
- クラウドアーマーの設定

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

## Firebase Blaze プランへのアップグレード

Skeet Framework の力を最大限に引き出すには、Firebase Blaze プラン以上のプランが必要です。
コンソールログに表示されるリンクにアクセスし、プランをアップグレードしてください。

```bash
⚠️ Please update your firebase plan to Blaze to fully utilize the features of Skeet Framework.

To update the plan, visit the following link 👇

https://console.firebase.google.com/u/0/project/skeet420/usage/details

? Did you update your firebase plan to Blaze? Yes
```

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan.png)

Firebase コンソールの左下のメニューから、_アップグレード_ を選択します。

- [Firebase コンソール](https://console.firebase.google.com/u/0/project/_/usage/details)

プロジェクトが作成されると、プランをアップグレードしたかの確認が求められます。
y で進むとブラウザが開いて Firebase の認証を求められるので、リンクをクリックして認証を行ってください。

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

次に、最初の Firebase Functions をデプロイするかを尋ねられるので、
y を選択し進みます。

```bash
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet420/overview
🚀 Deployed Your First Firebase Functions!

🔗 Your Function URL: https://europe-west3-skeet420.cloudfunctions.net/root

✔️ Updating skeet-cloud.config.json with status: FUNCTIONS_CREATED
? Do you want to create a Github Repo and Actions? Yes
? Repository Name: elsoul/skeet420
```

デプロイが完了するとログにエンドポイントが表示され、
GitHub リポジトリの作成を求められます。

GitHub リポジトリを作成するには、Yes を選択して、
リポジトリ名を入力してください。

GitHub リポジトリが作成され、GitHub Actions が自動で設定されます。

```bash
✔️ Updating skeet-cloud.config.json with status: GITHUB_ACTIONS_CREATED
? Do you want to setup Cloud VPN and Load Balancer?
(※Domain will be required for Load Balancer setup) Yes
```

さらに、Cloud VPN と Load Balancer の設定を行うかを尋ねられます。
Yes を選択して進みます。

```bash
? What's your domain address for App fr.figaro.one
? What's your domain address for Domain Name Server figaro.one
? What's your subdomain address for Load Balancer backend.figaro.one
```

ドメインの設定を行うために、以下の項目を入力してください。

- App ドメイン 例：app.figaro.one
- DNS ドメイン 例：figaro.one
- Load Balancer ドメイン 例：backend.figaro.one

```bash
🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸

ns-cloud-d1.googledomains.com.
ns-cloud-d2.googledomains.com.
ns-cloud-d3.googledomains.com.
ns-cloud-d4.googledomains.com.

👷 === https will be ready in about an hour after your DNS settings === 👷

If you are not utilizing Google DNS, it is necessary to manually configure the A and CAA records.
Please set up the three records listed below:

DNS Records Setup:
--------------------------------
1. A Record:
   Address: x.x.x.x

2. CAA Records:
   - 0 issue "pki.goog"
   - 0 issue "letsencrypt.org"

✔ You are all set 🎉

📗 Doc: https://skeet.dev
```

ロードバランサーの作成が成功すると
DNS 設定を行うためのネームサーバーが表示されます。
Google DNS を使用する場合は 取得したドメイン会社の管理画面で
ログに表示されたネームサーバーのレコードを設定してください。

Google DNS を使用しない場合は、A レコードと CAA レコードを手動で設定してください。

1. A Record:
   Address: Your Load Balancer IP Address

2. CAA Records:
   - 0 issue "pki.goog"
   - 0 issue "letsencrypt.org"

※ SSL 認証が完了するまでに 1 時間程度かかります。

https://<your-domain>/skeet-func/root にアクセスして、
すべての設定が正常に行われているか確認してください。

```bash
{
  "status": "success"
}
```

と表示されれば、設定が完了です。

## Firebase Functions の開発環境でのテスト

skeet c コマンドで Firebase Functions の開発環境でのテストを行うことができます。
以下のコマンドで firebase shell が起動します。

```bash
$ skeet c
> firebase
```

デフォルトで定義してある `root` 関数を呼び出してみましょう。

```bash
firebase > root()
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

### Firebase ビルドの有効化

フロントエンドアプリを追加する場合や、Firebase Auth/Firestore を使用する場合は、
以下の３つの Firebase ビルドを有効化してください。

#### Firebase 認証 の有効化

- Firebase Authentication の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Email/Password ログインの有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

#### Firebase Firestore の有効化

- Firestore の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- 環境を選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- リージョンを選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

#### Firebase Storage の有効化

- Firebase Storage の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-storage.png)

- 環境を選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-storage.png)

- リージョンを選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-storage.png)

## シークレットキーの設定方法

Skeet Framework では、firebase secret を環境変数として使用し、
`.env` ファイルを持たずしてシークレットキーをチームで共有することができます。

_skeet add secret <secretKey>_ コマンドを使って firebase secret を設定することができます。

ここでは例として OpenAI の Organization ID を環境変数に設定します。

### OpenAI の Organization ID と API Key の設定

```bash
$ skeet add secret
? Enter Secret Key (CHAT_GPT_ORG)
? Enter Secret Value [hidden] <yourOpenAIOrganizationID>
✅ Successfully added secret: CHAT_GPT_ORG in ./skeet-cloud.config.json
✔  Created a new secret version ../secrets/CHAT_GPT_ORG/versions/1
```

同様に CHAT_GPT_KEY も設定します。

```bash
$ skeet add secret
? Enter Secret Key (CHAT_GPT_KEY)
? Enter Secret Value [hidden] <yourOpenAIKey>
✅ Successfully added secret: CHAT_GPT_KEY in ./skeet-cloud.config.json
✔  Created a new secret version ../secrets/CHAT_GPT_KEY/versions/1
```

設定したシークレットを確認するには以下のコマンドを実行してください。

```bash
$ skeet get secret
? Select secret keys (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
❯◯ CHAT_GPT_ORG
 ◯ CHAT_GPT_KEY
```

スペースキーを押して選択し、Enter キーを押すと設定したシークレットが表示されます。

## 設定したシークレットを Firebase Functions で使用する

`functions/skeet-func/src/routings/https/root.ts` に以下のように Organization ID と API Key を設定します。

さらに、デフォルトでは HTTP インスタンスは public なネットワーク環境で作成されますが、
本番環境ではプライベートなネットワーク環境でロードバランサーからアクセスできるようにするために、

使用するオプションを _publicHttpOption_ から　*privateHttpOption* に変更します。

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { privateHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { RootParams } from '@common/types/http/rootParams'
import { defineSecret } from 'firebase-functions/params'
import {
  ChatCompletionMessageParam,
  defaultOpenAIConfig,
  openAIChat,
} from '@skeet-framework/ai'

const CHAT_GPT_ORG = defineSecret('CHAT_GPT_ORG')
const CHAT_GPT_KEY = defineSecret('CHAT_GPT_KEY')

export const root = onRequest(
  { ...privateHttpOption, secrets: ['CHAT_GPT_ORG', 'CHAT_GPT_KEY'] },
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      const context =
        'You are an assistant to cheer up people.You reply with the maximum of positive words.'
      const contents: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: context,
        },
        {
          role: 'user',
          content:
            'Hiiiiiiii, there! How are you doing today?\nLFGGGGGGGGGGGGGGG🚀',
        },
        {
          role: 'assistant',
          content: 'I am doing great!LFGGGGGGGGGGGGGGG🚀\nHow are you?',
        },
        {
          role: 'user',
          content: "What's up?",
        },
      ]
      let config = defaultOpenAIConfig
      config.organizationKey = CHAT_GPT_ORG.value()
      config.apiKey = CHAT_GPT_KEY.value()
      config.stream = false
      const result = await openAIChat(contents, config)
      res.json({ status: 'success', result })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

skeet console で root 関数を呼び出して、Organization ID と API Key が正常に設定されているか確認してください。

```bash
$ skeet console
firebase > root()
RESPONSE RECEIVED FROM FUNCTION: 200, {
  "status": "success",
  "result": "Hello, Earthling! (Or whatever planet you hail from!) What's up today? Any exciting news or updates you'd like to share? I'm all ears, ready to be dazzled by your awesomeness! Let's make today spectacular! 💫"
}
```

無事にコンソールに OpenAI のレスポンスが表示されれば、Organization ID と API Key の設定が成功しています。

#### - OpenAI の API Key を作成・取得について

OpenAI の API Key は以下のリンクを参考に作成してください。

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

## まとめ

この章では、Skeet フレームワークのクラウド環境をセットアップし、
Cloud Functions から OpenAI API を呼び出す方法を学びました。

次のチュートリアルでは、より実践的に開発を進めるための便利な機能を紹介します。
