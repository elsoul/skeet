---
id: initial-deploy
title: 本番のデプロイ - GraphQL
description: Skeet アプリを公開する方法について説明します。GitHub ActionsによるCommit毎のデプロイもワンコマンドで設定できます。
---

この章では VPN を作成し、ロードバランサーやネットワークセキュリティ、ルーティング、ドメイン設定など、
本番環境に必要な設定を行い、アプリケーションをデプロイします。

![画像](https://storage.googleapis.com/skeet-assets/animation/skeet-init-production.gif)

## 事前に用意するもの

この章ではチュートリアルで作成したアプリケーションに加え以下のものが必要になります。

- **ロードバランサーに設定するドメイン**

  ネームサーバーを変更できるドメインを用意してください。

- **GitHub アカウント**

  GitHub アカウントを用意し、ログイン認証をしてください。
  _skeet init_ コマンドで GitHub リポジトリが作成され、
  GitHub Actions によるデプロイが設定されます。

## GitHub CLI Auth ログイン

```bash
$ gh auth login
```

## Auth/Http インスタンスのオプションを更新

チュートリアルでは HTTP インスタンスを作成しましたが、
本番環境ではプライベートなネットワーク環境でロードバランサーからアクセスできるようにするために、

使用するオプションを _publicHttpOption_ から　*privateHttpOption* に変更します。

_functions/skeet/routings/http/createStreamChatMessage.ts_

```typescript
〜 中略 〜
import { privateHttpOption } from '@/routings'
export const createStreamChatMessage = onRequest(
  { ...privateHttpOption, secrets: [chatGptOrg, chatGptKey, SKEET_GRAPHQL_ENDPOINT_URL] },
  async (req: TypedRequestBody<CreateStreamChatMessageParams>, res) => {
〜 中略 〜
```

_functions/skeet/routings/auth/authOnCreateUser.ts_

```typescript
〜 中略 〜
import { privateHttpOption } from '@/routings'
export const authOnCreateUser = functions
  .runWith({
    ...authPrivateOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
〜 中略 〜
```

同様に、フロントエンドへ公開するインスタンスの関数のオプションも変更します。

## Skeet Init コマンドで本番のデプロイ

Skeet init コマンドで以下の設定を行います。

- Google Cloud プロジェクト ID の選択
- Firebase プロジェクト ID の選択
- リージョンの選択
- Firebase ログイン
- GitHub リポジトリ名を指定
- Google Cloud SQL のパスワード設定
- ネームサーバーのドメイン設定
- ロードバランサーのサブドメイン設定

```bash
$ skeet init
```

このコマンドにより

- GitHub リポジトリの作成
- GitHub リポジトリへコミット・プッシュ
- GitHub リポジトリの Actions の設定
- GitHub リポジトリの Secrets の設定
- Google Gloud IAM の設定
- Google Cloud DNS の設定
- Google Cloud SQL の設定
- Google Cloud Load Balancer の設定
- Google Cloud Armor の設定
- Google Cloud VPC Network の設定
- Google Cloud VPC Subnet Network の設定
- Google Cloud VPC Connector の設定

を自動で行います。

設定が完了するとコンソールログにネームサーバーのドメイン設定が表示されます。

```bash
🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸

ns-cloud-a1.googledomains.com.
ns-cloud-a2.googledomains.com.
ns-cloud-a3.googledomains.com.
ns-cloud-a4.googledomains.com.

👷 === https will be ready in about an hour after your DNS settings === 👷

✔ You are all set 🎉

📗 Doc: https://skeet.dev
```

## ネームサーバーの設定

上記で表示された４つのレコードをドメインのネームサーバーに設定します。
設定完了後３０分〜２時間程度でドメインの設定が反映されます。（ネームサーバーの設定によって異なります）

これで本番のデプロイが完了しました。

https://lb.your-domain.com/root にアクセスしてみましょう。

```json
{
  "status": "success",
  "message": "Skeet Backend is running!",
  "body": {}
}
```

と表示されれば成功です。

## ルーティングの追加・同期

エンドポイントを追加した場合には、デプロイ後にルーティングの同期を行う必要があります。
これにより、ロードバランサーの設定が更新されます。

```bash
$ skeet sync routings
```

このコマンドにより、

- ネットワークエンドポイントグループの作成
- バックエンドサービスの作成
- バックエンドサービスの追加
- セキュリティーポリシーの適用
- URL マップの作成

を自動で行っています。

## Cloud Armor の追加・同期

_skeet-cloud.config.json_ に記述されている Cloud Armor の設定を同期します。

_skeet-cloud.config.json_

```json
{
  "app": {
    "name": "skeet-example",
    "projectId": "skeet-example",
    "region": "asia-northeast1",
    "appDomain": "skeeter.dev",
    "functionsDomain": "lb.skeeter.dev",
    "hasLoadBalancer": true
  },
  "cloudRun": {
    "name": "skeet-skeet-graphql-api",
    "url": "https://sql.skeet.dev",
    "cpu": 1,
    "maxConcurrency": 80,
    "maxInstances": 100,
    "minInstances": 0,
    "memory": "4Gi"
  },
  "db": {
    "databaseVersion": "POSTGRES_15",
    "cpu": 1,
    "memory": "3840MiB",
    "storageSize": 10,
    "whiteList": ""
  },
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "your IP address",
            "action": "allow"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

デフォルトの設定では 現在接続しているグローバル IP のみ通信を許可しています。
必要に応じて変更してください。

```bash
$ skeet sync armors
```

新規に Google Cloud Armor を作成または、更新されます。
