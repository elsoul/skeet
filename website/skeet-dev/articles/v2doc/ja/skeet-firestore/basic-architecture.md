---
id: basic-architecture
title: 基本アーキテクチャ - Firestore
description: Skeetフレームワークの基本構造について説明します。アプリの各ディレクトリやCLIの各コマンドを解説しています。
---

Skeet Framework は SQL と NoSQL を組み合わせてアプリを構築できます。

PNPM を使ってパッケージを管理し、
TypeScript で型安全な開発を行います。

Skeet Framework の基本的な構造は以下の通りです。

| 一般的なバックエンドに必要な機能 | Skeet Framework                        |
| -------------------------------- | -------------------------------------- |
| データベース                     | Firestore or SQL                       |
| ログイン認証                     | Firebase Authentication                |
| API                              | Cloud Functions for Firebase 第 2 世代 |
| ロードバランサー                 | Cloud Load Balancer                    |
| スケジュールタスク               | Cloud Scheduler                        |
| Pub/Sub                          | Cloud Pub/Sub                          |
| ドメイン                         | Cloud DNS                              |
| セキュリティ                     | Cloud Armor                            |

- [GitHub Actions](https://github.com/features/actions) による CI/CD をサポート
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) によるローカル開発をサポート
- [TypeScript](https://www.typescriptlang.org/) による型安全な開発をサポート
- [PNPM](https://pnpm.io/) によるパッケージ管理をサポート

## Skeet Framework の基本構造

Skeet Framework はサーバーレスなため、
すぐにファンクションから書き始めることができます。

_website_, _webapp_, _mobile_ にフロントエンドのソースコードが配置されます。

_functions_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。

functions には複数の functions を追加することができます。

```bash
root
├── common
├── functions
├── mobile
├── sql
├── webapp
├── website
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── skeet-cloud.config.json
└── vitest.config.ts
```

| ディレクトリ            | 説明                                        |
| ----------------------- | ------------------------------------------- |
| common                  | 共通の型や関数、モデル                      |
| webapp                  | Web アプリのソースコード                    |
| website                 | Web サイトのソースコード                    |
| mobile                  | モバイルアプリのソースコード                |
| functions               | Cloud Functions for Firebase のソースコード |
| sql                     | SQL API のソースコード                      |
| package.json            | パッケージ管理                              |
| skeet-cloud.config.json | Skeet Framework の設定ファイル              |
| tsconfig.json           | TypeScript の設定ファイル                   |
| vitest.config.ts        | Vite テストの設定ファイル                   |
| pnpm-workspace.yaml     | PNPM の設定ファイル                         |
| firebase.json           | Firebase の設定ファイル                     |

## Skeet Functions の基本構造

Skeet Functions は Cloud Functions for Firebase をベースにしています。
_functions_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。
functions には複数の functions を追加することができます。

例: _functions/skeet-func_

```bash
.
├── build.ts
├── devBuild.ts
├── dist
│   └── index.js
├── nodemon.json
├── package.json
├── src
│   ├── index.ts
│   ├── lib
│   └── routings
└── tsconfig.json
```

| ディレクトリ  | 説明                         |
| ------------- | ---------------------------- |
| build.ts      | ビルドスクリプト             |
| devBuild.ts   | ビルドスクリプト             |
| dist          | ビルド後のソースコード       |
| nodemon.json  | ローカルでの起動設定         |
| package.json  | バックエンドのパッケージ管理 |
| src           | ソースコード                 |
| src/index.ts  | エントリーポイント           |
| src/lib       | ライブラリ                   |
| src/routings  | ルーティング                 |
| src/scripts   | スクリプト                   |
| src/utils     | ユーティリティ               |
| tsconfig.json | TypeScript の設定            |

## Skeet Functions のインスタンスタイプ

| インスタンスタイプ | 説明                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| Http               | HTTP リクエストを受け取る関数                                          |
| OnCall             | 関数を呼び出す関数                                                     |
| PubSub             | PubSub メッセージを受け取る関数                                        |
| Scheduler          | スケジュールされた関数                                                 |
| Firestore          | Firestore のドキュメントの作成、更新、削除などのトリガーを受け取る関数 |
| Auth               | Firebase ユーザーアカウントの作成と削除などのトリガーを受け取る関数    |

## Skeet Rountings の基本構造

インスタンスのタイプによって、ルーティングの設定が異なります。
また、Cloud Functions for Firebase のオプション設定は routings/options 以下に配置されています。

```bash
├── auth
│   ├── authOnCreateUser.ts
│   └── index.ts
├── firestore
│   ├── firestoreExample.ts
│   └── index.ts
├── http
│   ├── addUserChatRoomMessage.ts
│   ├── createUserChatRoom.ts
│   ├── getUserChatRoomMessages.ts
│   ├── index.ts
│   └── root.ts
├── onCall
│   ├── onCallExample.ts
│   └── index.ts
├── index.ts
├── options
│   ├── authOptions.ts
│   ├── firestoreOptions.ts
│   ├── httpOptions.ts
│   ├── index.ts
│   ├── pubsubOptions.ts
│   └── schedulerOptions.ts
├── pubsub
│   ├── index.ts
│   └── pubsubExample.ts
└── scheduler
    ├── index.ts
    └── schedulerExample.ts
```

### Http インスタンスの設定

Http のデフォルトオプション設定

_routings/options/http/httpOptions.ts_

```ts
import { HttpsOptions } from 'firebase-functions/v2/https'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`
const cors = true

export const publicHttpOption: HttpsOptions = {
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  timeoutSeconds: 540,
  invoker: 'public',
  labels: {
    skeet: 'http',
  },
}

export const privateHttpOption: HttpsOptions = {
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 80,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_AND_GCLB',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  cors,
  timeoutSeconds: 540,
  invoker: 'private',
  labels: {
    skeet: 'http',
  },
}
```

Http インスタンスの設定は、_routings/http/{httpInstance}_ に記述します。

_routings/http/root.ts_

```ts
import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/index'
import { RootParams } from '@/types/http/rootParams'

export const root = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      res.json({
        status: 'success',
      })
    } catch (error) {
      const errorLog = `root - ${error}`
      console.log(errorLog)
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Http インスタンスの型定義は、_src/types/http/{httpInstance}Params.ts_ に記述します。

_common/types/http/rootParams.ts_

```ts
export type RootParams = {
  name?: string
}
```

### PubSub インスタンスの設定

PubSub デフォルトオプション設定

_routings/options/pubsub/pubsubOptions.ts_

```ts
import { PubSubOptions } from 'firebase-functions/v2/pubsub'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const pubsubDefaultOption = (topic: string): PubSubOptions => ({
  topic,
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  timeoutSeconds: 540,
  labels: {
    skeet: 'pubsub',
  },
})
```

PubSub インスタンスルーティングは、_routings/pubsub/{pubsubInstance}_ に記述します。

_routings/pubsub/pubsubExample.ts_

```ts
import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { PubsubExampleParams } from '@/types/pubsub/pubsubExampleParams'

export const pubsubTopic = 'pubsubExample'

export const pubsubExample = onMessagePublished(
  pubsubDefaultOption(pubsubTopic),
  async (event) => {
    try {
      const pubsubObject = parsePubSubMessage<PubsubExampleParams>(event)
      console.log({
        status: 'success',
        topic: pubsubTopic,
        event,
        pubsubObject,
      })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  }
)
```

PubSub インスタンスの型定義は、_src/types/pubsub/{pubsubInstance}Params.ts_ に記述します。

_common/types/pubsub/pubsubExampleParams.ts_

```ts
export type PubsubExampleParams = {
  message?: string
}
```

### Schedule インスタンスの設定

Schedule デフォルトオプション設定

_routings/options/schedule/scheduleOptions.ts_

```ts
import { ScheduleOptions } from 'firebase-functions/v2/scheduler'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const scheduleDefaultOption: ScheduleOptions = {
  region,
  schedule: 'every 1 hours',
  timeZone: 'UTC',
  retryCount: 3,
  maxRetrySeconds: 60,
  minBackoffSeconds: 1,
  maxBackoffSeconds: 10,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  timeoutSeconds: 540,
  labels: {
    skeet: 'schedule',
  },
}
```

Schedule インスタンスの設定は、_routings/schedule/{scheduleInstance}_ に記述します。

_routings/schedule/scheduleExample.ts_

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const scheduleExample = onSchedule(
  scheduleDefaultOption,
  async (event) => {
    try {
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

### Firestore インスタンスの設定

Firestore デフォルトオプション設定

_routings/options/firestore/firestoreOptions.ts_

```ts
import { DocumentOptions } from 'firebase-functions/v2/firestore'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const firestoreDefaultOption = (document: string): DocumentOptions => ({
  document,
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  timeoutSeconds: 540,
  labels: {
    skeet: 'firestore',
  },
})
```

Firestore インスタンスの設定は、_routings/firestore/{firestoreInstance}_ に記述します。

_routings/firestore/firestoreExample.ts_

```ts
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const firestoreExample = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log('firestoreExample triggered')
    try {
      console.log(event.params)
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

Firestore Trigger のタイプ

| イベントタイプ    | トリガー                                 |
| ----------------- | ---------------------------------------- |
| onDocumentCreated | ドキュメントが作成されたとき             |
| onDocumentDeleted | ドキュメントが削除されたとき             |
| onDocumentUpdated | ドキュメントが更新されたとき             |
| onDocumentWritten | ドキュメントが作成、更新、削除されたとき |

### Auth インスタンスの設定

Auth デフォルトオプション設定

_routings/options/auth/authOptions.ts_

```ts
import { RuntimeOptions } from 'firebase-functions/v1'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId

const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const authPublicOption: RuntimeOptions = {
  memory: '1GB',
  maxInstances: 100,
  minInstances: 0,
  timeoutSeconds: 300,
  labels: {
    skeet: 'auth',
  },
}

export const authPrivateOption: RuntimeOptions = {
  memory: '1GB',
  maxInstances: 100,
  minInstances: 0,
  timeoutSeconds: 300,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  labels: {
    skeet: 'auth',
  },
}
```

Auth インスタンスのデフォルトファンクションでは、
Firebase ユーザーが作成されたときに、
ユーザーのドキュメントを作成します。

Auth インスタンスの設定は、_routings/auth/auth{MethoName}.ts_ に記述します。

_routings/auth/authOnCreateUser.ts_

```ts
import { User } from '@/models'
import { addCollectionItem } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import { gravatarIconUrl } from '@/utils/placeholder'
import skeetConfig from '../../../skeetOptions.json'
const region = skeetConfig.region

export const authOnCreateUser = functions
  .runWith(authPublicOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user
      const userParams = {
        uid,
        email: email || '',
        username: displayName || email?.split('@')[0] || '',
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const userRef = await addCollectionItem<User>('User', userParams, uid)
      console.log({ status: 'success', userRef })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

### Dev 環境での Firebase ユーザー登録・ログイン

Dev 環境では、
Firebase ユーザーの登録・ログインに、
_skeet login_ コマンドを使用します。

Skeet アプリを起動します。

```bash
$ skeet s
```

別ウィンドウでターミナルを開き、
_skeet login_ コマンドを実行します。

```bash
$ skeet login
```

![画像](https://storage.googleapis.com/skeet-assets/animation/skeet-login-compressed.gif)

Firebase ユーザー登録と Firestore ユーザー登録が完了します。

コンソールに表示される コードをコピーしてターミナルに貼り付けます。

_ACCESS_TOKEN_ が環境変数に設定されます。

## モデルの定義

モデルの定義は、
コレクションのツリー構造を

_common/models/{modelName}Models.ts_

に記述します。

また、_skeet ai_ コマンドを使用して、_firestore_ のデータモデルを自動生成することができます。
以下のコマンドで Skeet AI Firestore モードを起動し、作成したいモデルの説明を入力します。

```bash
$ skeet ai --mode
? 🤖 Select Mode
  prisma
  typedoc
❯ firestore
  function
  method

🔥 Firestore Model Generating Mode 🔥
? Please describe your Firestore use case.

e.g. I want to create a blog app.

You:
```

型定義には [Firestore Data Converter](https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter) を使用しています。

NoSQL データモデルは非常に柔軟であるため、
モデルの定義は必須ではありませんが、

それぞれのモデルに

- CollectionId
- DocumentId

をコメントで記述しておくことを推奨します。
可読性が上がり、

さらに CodePilot でのコード補完が効くようになります。

_common/models/userModels.ts_

```ts
import { Timestamp, FieldValue } from '@skeet-framework/firestore'

// CollectionId: User
// DocumentId: auto
// Path: User
export const UserCN = 'User'
export const genUserPath = () => `${UserCN}`
export type User = {
  id?: string
  uid: string
  username: string
  email: string
  iconUrl: string
  userChatRoomIds?: string[]
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}
```

データの取得、更新、削除は、
_@skeet-framework/firestore_ プラグインを使用して行います。

```ts
import { add, get } from '@skeet-framework/firestore'
```

詳しくは、[Skeet Firestore](/ja/doc/plugins/skeet-firestore) を参照してください。

## Skeet CLI

Skeet CLI を使って新たに Cloud Functions for Firebase を追加したり、
yarn コマンドを 各ファンクションごとに実行することができます。

コマンド一覧

```bash
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups
  login                        Skeet Login Command - Create Firebase Login Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions Endpoint
  g|generate                   Skeet Generate Comannd
  log [options]                Deploy Skeet APP to Firebase
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 Call Skeet AI Assistant
  config                       Config commands
  run [options]                Run commands
  new|n [options]              Create Skeet Framework App
  console|c                    Call Firebase Console to Test Functions
  check                        Check Cloud Configurations
  test                         Run tests
  help [command]               display help for command
```
