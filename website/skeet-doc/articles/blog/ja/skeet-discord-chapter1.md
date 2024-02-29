Skeet と Firebase を用いて、サーバーレス環境での Discord ボット開発への扉を開きましょう！
このチャプターでは、Skeet の TypeScript ベースのフレームワークを使った効率的でシンプルなサーバーレス環境の設定方法を紹介します。
Google Cloud と Firebase の統合を通じて、Discord ボットに必要な強固な基盤を構築する方法を学びます。
また、サーバーレスアーキテクチャの基本概念と利点についても解説し、読者がサーバーレス技術の全体像を理解する手助けをします。

## 🧪 依存パッケージ 🧪

- [TypeScript](https://www.typescriptlang.org/) 5.0.4 以上
- [Node.js](https://nodejs.org/ja/) 18.17.1 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上
- [Java](https://www.java.com/en/download/)

※ Skeet において Java を書くことはありませんが、モバイルアプリを動かすために必要です

## Skeet 及び Firebase tools のインストール

```bash
npm install -g firebase-tools
npm i -g @skeet-framework/cli
```

## Skeet アプリの作成

Skeet Framework はフルスタックサーバーレスフレームワークですが、
このチャプターではバックエンドの最小限の構成から進めていきます。

```bash
$ skeet create <appName> --backend
```

![Skeet create backend](https://storage.googleapis.com/zenn-user-upload/655b9d599052-20231113.png)

## ローカルコンピューターでアプリ起動

```bash
$ cd <appName>
$ skeet s
```

Firebase エミュレーターが起動します。

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

## 🤖 アクティベート Google Cloud/Firebase アカウント 🤖

## Googel Cloud Project の作成

Create Google Cloud Project

https://console.cloud.google.com/projectcreate

## Firebase Project の追加

Add Firebase Project

https://console.firebase.google.com

## Firebase ビルドの有効化

以下の Firebase ビルドを有効化してください。

- Firestore の有効化
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- 環境を選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- リージョンを選択
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

## Skeet init コマンドの実行

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

## 環境変数の設定方法

- Firebase Blaze プランへのアップグレード

Skeet Framework では環境変数を Cloud Secret Manager 使って API キーなどの機密情報を管理します。

https://firebase.google.com/docs/functions/config-env?hl=ja&gen=2nd

このコマンドを利用するには、Firebase Blaze 以上のプランが必要です。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan.png)

Firebase コンソールの左下のメニューから、_アップグレード_ を選択します。

https://console.firebase.google.com/u/0/project/_/usage/details

## Skeet Framework のクラウド使用料について

Skeet Framework は Firebase Blaze プラン以上のプランが必要ですが、
通常、開発環境への使用料は以下の無料枠内で収まります。

Google Cloud の無料枠には 2 つの部分があります

- 90 日間の無料トライアル。Google Cloud サービスで使用できる 300 ドルのクレジットが付いています。
- Always Free は、多くの一般的な Google Cloud リソースへの制限付きアクセスを無料で提供します。

https://cloud.google.com/free/docs/free-cloud-features?hl=ja

https://firebase.google.com/pricing?hl=ja#blaze-calculator

**⚠️ 想定外の請求を回避するために、予算のアラートなどを設定することをおすすめします ⚠️**

想定外の請求を回避する

https://firebase.google.com/docs/projects/billing/avoid-surprise-bills
