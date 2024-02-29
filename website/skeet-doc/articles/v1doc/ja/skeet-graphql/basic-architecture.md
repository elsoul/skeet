---
id: basic-architecture
title: 基本アーキテクチャ - GraphQL
description: Skeetフレームワーク GraphQL バックエンドの基本構造について説明します。アプリの各ディレクトリやCLIの各コマンドを解説しています。
---

Skeet Framework は SQL と NoSQL を組み合わせてアプリを構築できます。

ここでは、GraphQL のバックエンドを構築するための基本構造を説明します。

Skeet Framework GraphQL バックエンドの基本的な構造は以下の通りです。

| 一般的なバックエンドに必要な機能 | Skeet Framework GraphQL     |
| -------------------------------- | --------------------------- |
| データベース                     | Google Cloud SQL            |
| ログイン認証                     | Firebase Authentication     |
| API                              | GraphQL on Google Cloud Run |
| ロードバランサー                 | Cloud Load Balancer         |
| スケジュールタスク               | Cloud Scheduler             |
| Pub/Sub                          | Cloud Pub/Sub               |
| ドメイン                         | Cloud DNS                   |
| セキュリティ                     | Cloud Armor                 |

- [Prisma](https://prisma.io) による RDBMS（リレーショナルデータベース管理システム） の管理をサポート
- [GitHub Actions](https://github.com/features/actions) による CI/CD をサポート
- [Firebase Functions](https://firebase.google.com/docs/functions) によるサーバーレスなバックエンドをサポート
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) によるローカル開発をサポート
- [TypeScript](https://www.typescriptlang.org/) による型安全な開発をサポート

## Skeet Framework の基本構造

_src_ にフロントエンドのソースコードが配置されます。

_functions_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。

functions には複数の functions を追加することができます。

_graphql_ ディレクトリ以下には GraphQL API のソースコードが配置されます。

```bash
├── src
│   ├── public
│   └── types
├── graphql
│   ├── prisma
│   └── src
├── functions
│   └── skeet
├── package.json
├── skeet-cloud.config.json
└── firebase.json
```

| ディレクトリ            | 説明                                        |
| ----------------------- | ------------------------------------------- |
| src                     | フロントエンドのソースコード                |
| src/public              | フロントエンドのソースコード                |
| src/types               | フロントエンドの型定義                      |
| graphq/prisma           | Prisma のソースコード                       |
| graphq/src              | GraphQL のソースコード                      |
| functions               | Cloud Functions for Firebase のソースコード |
| functions/skeet         | OpenAI API 等に関する functions             |
| package.json            | バックエンドのパッケージ管理                |
| skeet-cloud.config.json | Skeet Framework の設定ファイル              |
| firebase.json           | Firebase の設定ファイル                     |

## Skeet GraphQL の基本構造

Skeet GraphQL は 以下のパッケージを使用しています。

- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/)
- [Prisma](https://www.prisma.io/)
- [Nexus](https://nexusjs.org/)
- [GraphQL Shield](https://the-guild.dev/graphql/shield)

_graphql_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。

例: _graphql_

```bash
.
├── Dockerfile
├── build.ts
├── devBuild.ts
├── dist
│   ├── index.js
│   ├── nexus-typegen.ts
│   └── schema.graphql
├── env.sample
├── jest.config.js
├── nodemon.json
├── package.json
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── graphql
│   ├── index.ts
│   ├── lib
│   └── schema
├── tests
│   ├── graphql
│   └── jest.setup.ts
├── tsconfig.json
└── yarn.lock
```

| ディレクトリ         | 説明                            |
| -------------------- | ------------------------------- |
| build.ts             | ビルドスクリプト                |
| devBuild.ts          | ビルドスクリプト                |
| dist                 | ビルド後のソースコード          |
| nodemon.json         | ローカルでの起動設定            |
| package.json         | バックエンドのパッケージ管理    |
| src                  | ソースコード                    |
| src/index.ts         | エントリーポイント              |
| src/lib              | ライブラリ                      |
| src/graphql          | GraphQL ファイル                |
| src/schema           | GraphQL Schema/Permission 設定  |
| src/scripts          | スクリプト                      |
| prisma               | Prisma ファイル                 |
| prisma/migrations    | Prisma マイグレーションファイル |
| prisma/schema.prisma | Prisma スキーマファイル         |
| prisma/seed.ts       | Prisma シードファイル           |
| tsconfig.json        | TypeScript の設定               |
| yarn.lock            | パッケージのロックファイル      |

## Skeet GraphQL ファイル

_./src_ ディレクトリ以下には GraphQL API のソースコードが配置されます。

```bash
./src
├── graphql
│   ├── authManager
│   ├── enums.ts
│   ├── index.ts
│   ├── modelManager
│   ├── responseManager
│   └── taskManager
├── index.ts
├── lib
│   ├── firebaseConfig.ts
│   └── getLoginUser.ts
└── schema
    ├── Node.ts
    ├── index.ts
    ├── nexus-typegen.ts
    ├── permissions.ts
    ├── schema.graphql
    └── schema.ts
```

## Skeet GraphQL マネージャーの基本構造

_./src/graphql_ ディレクトリ以下には GraphQL のクエリを管理するマネージャーが配置されます。

```bash
├── authManager
│   ├── index.ts
│   └── me.ts
├── enums.ts
├── index.ts
├── modelManager
│   ├── ChatRoom
│   ├── ChatRoomMessage
│   ├── User
│   ├── UserChatRoom
│   ├── enums.ts
│   └── index.ts
├── responseManager
│   └── index.ts
└── taskManager
    ├── index.ts
    └── postTweet.ts
```

| マネージャータイプ | 説明                                                         |
| ------------------ | ------------------------------------------------------------ |
| authManager        | 認証に関する mutation/query を管理します。                   |
| modelManager       | このディレクトリにモデルに関連する CRUD が自動生成されます。 |
| responseManager    | Worker に関する mutation/query を管理します。                |
| taskManager        | Task に関する mutation/query を管理します。                  |
| enums.ts           | Enum を管理します。                                          |

## Skeet DB スキーマ の基本構造

_./src/schema_ ディレクトリ以下には GraphQL のスキーマを管理するファイルが配置されます。

```bash
./src/schema
├── Node.ts
├── index.ts
├── nexus-typegen.ts
├── schema.graphql
├── permissions.ts
└── schema.ts
```

| ファイル名       | 説明                                                |
| ---------------- | --------------------------------------------------- |
| Node.ts          | Node インターフェースを管理します。                 |
| nexus-typegen.ts | Nexus によって自動生成されるファイルです。          |
| schema.graphql   | Nexus によって自動生成されるファイルです。          |
| permissions.ts   | GraphQL Shield を使った権限管理をするファイルです。 |
| schema.ts        | GraphQL のスキーマを管理するファイルです。          |

## Skeet CLI

Skeet CLI を使って新たに Cloud Functions for Firebase を追加したり、
yarn コマンドを 各ファンクションごとに実行することができます。

コマンド一覧

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create <appName>             Create Skeet Framework App
  server|s                     Run Skeet App
  deploy                       Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for multiple functions
  login [options]              Skeet Login Command - Create Firebase Login Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions Endpoint
  post [options] <queryType>   Skeet Post Command - Call Skeet GraphQL Endpoint
  g|generate                   Skeet Generate Comannd
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  list                         Get Skeet App List
  help [command]               display help for command
```
