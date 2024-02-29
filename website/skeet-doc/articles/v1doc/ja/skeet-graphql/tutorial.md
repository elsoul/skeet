---
id: tutorial
title: チュートリアル - GraphQL
description: Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。
---

## チュートリアル - GraphQL

このチュートリアルでは Skeet Framework GraphQL を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と GraphQL, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

![https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

このチュートリアルでは 基本的なチャットボットアプリ を作成します。
クイックスタートでは Skeet Framework GraphQL の基本的な使い方を学びましたが、
このチュートリアルでは Skeet Framework の機能を使ってこれまでには簡単にできなかったことが、
どのように簡単にできるようになるかを学びます。
オープンソースとしてライブラリーを公開して下さっている開発者の方々には多大なる感謝を申し上げます。

Skeet Framework は、コンピューターリソースを効率的に使うことで、
開発者がより少ないコードでより多くのことを実現できるように設計されています。
さらに、昨今の地球では環境問題が深刻化しており、エネルギーを効率的に使うことは、
開発者の責務であると考えています。

このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

この章では クイックスタートで作成した 機械学習（OpenAI） の API を使ったチャットボットアプリに新しい機能を追加していきます。

## チュートリアルの目標

このチュートリアルでは、以下のことを学びます。

- RDB スキーマを定義する
- データベースのマイグレーションを実行する
- Scaffold で GraphQL ファイルを生成する
- 開発用ログイン認証キーを取得する
- GraphQL Playground を使って API リクエストを送信する
- Cloud Run へデプロイする

## チュートリアルの前提条件

[クイックスタート](/ja/doc/skeet-graphql/quickstart) が完了していない場合は先に完了させてください。

## 開発環境

Skeet Framework では エディタに VScode または Cursor を推奨しています。
フレームワークに沿って開発を進めることで、
GitHub Copilot 及び OpenAI を使った強力なコード補完サポートを受けることができます。

- [Cursor](https://cursor.sh/)
- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Chatbot には OpenAI の API を使います。

- [OpenAI](https://openai.com/)

Skeet GraphQL は スキーマ駆動開発 を推奨しています。
スキーマ駆動開発では、スキーマを定義することで、
開発者が意識するべきことを最小限に抑えることができます。

RDBMS には PostgreSQL または MySQL を使います。
ORM には Prisma を使います。

- [PostgreSQL](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)

### Vscode/Cursor の設定の例

Vscode の _settings.json_ に次の設定を追加することで、
開発を効率化することができます。
Cursor を使う場合は、VScode の設定をそのままインポートすることができます。

**⚠️ この設定はあくまで例です。 ⚠️**

```json
{
  "workbench.colorTheme": "One Monokai",
  "files.autoSave": "onFocusChange",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "explorer.confirmDelete": false,
  "editor.suggestSelection": "first",
  "editor.formatOnSave": true,
  "files.autoGuessEncoding": true,
  "launch": {
    "inputs": [],
    "configurations": [],
    "compounds": []
  },
  "indentRainbow.errorColor": "rgba(128,32,32,0)",
  "security.workspace.trust.untrustedFiles": "open",
  "json.schemas": [],
  "explorer.confirmDragAndDrop": false,
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnType": true,
  "terminal.integrated.defaultProfile.linux": "zsh",
  "terminal.integrated.enableMultiLinePasteWarning": false,
  "debug.disassemblyView.showSourceCode": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "workbench.iconTheme": "material-icon-theme",
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "editor.inlineSuggest.enabled": true,
  "settingsSync.ignoredExtensions": [],
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "scminput": false
  }
}
```

以下のファイルの設定に関しては _skeet create_ コマンドで自動で設定されます。

- .eslintrc.json
- .eslintignore
- .prettierrc
- .prettierignore
- tsconfig.json

## RDB スキーマを定義する

Skeet Framework では RDB スキーマを定義することで、
GraphQL のスキーマを自動生成することができます。

デフォルトのモデルは以下のパスに定義されています。

_graphql/prisma/schema.prisma_

OpenAI と VertexAI の API を使ったチャットボットアプリを作成するために必要なサンプルモデルが定義されています。

### skeet db generate コマンドを実行する

次のコマンドを実行し、prisma とデータベースの設定をします。

```bash
$ skeet db generate
```

### モデルを追加する

_schema.prisma_ に直接モデルを追加することもできますが、

_skeet ai_ コマンドの _$ prisma_ モードを実行することで、
Prisma のモデルのテンプレートを自動生成することができます。

また、_prettier-plugin-prisma_ のプラグインを使うことで、
Prisma のスキーマを自動フォーマットすることができます。

### skeet ai prisma モードの実行

_skeet ai_ コマンドを実行後、 _$ prisma_ と入力すると、
Prisma モードに入ります。

```bash
$ skeet ai
╔═════════════╤════════════════╗
│ Option      │ Value          │
╟─────────────┼────────────────╢
│ AI Type     │ VertexAI       │
╟─────────────┼────────────────╢
│ Model       │ chat-bison@001 │
╟─────────────┼────────────────╢
│ Max Tokens  │ 1000           │
╟─────────────┼────────────────╢
│ Temperature │ 0              │
╚═════════════╧════════════════╝
VertexAI is selected 🤖 (type "q" to quit)
You: $ prisma
Skeet:
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.
```

次のようにモデルを追加することができます。

````bash
You: $ prisma
Skeet:
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.
You: ブログの機能を追加したいので、PostとCommentというモデルを追加したいです。
Skeet: How about this one?

(Showing only the new parts of the models. prisma format (also there is vscode plugin) will add the relations automatically to the existing models.)

```prisma.schema
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
  User      User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

❓ Is this schema good for you? (Yes/No)
````

このように、skeet ai コマンドを使うことで、
モデルのテンプレートを自動生成することができます。
この内容で良ければ、_Yes_ と入力することで、
AI が　次に必要なマイグレーションコマンドを、
スキーマの内容からファイル名を自動生成して表示します。

```bash
❓ Is this schema good for you? (Yes/No) yes

Edit: ./graphql/prisma/schema.prisma

Then run: skeet db migrate addPostAndComment


❓ Do you want me to run the migration now? (Yes/No)
```

### prisma.schema を編集する

skeet framework では、_skeet db migrate <migrationName>_ コマンドを使って、
マイグレーションファイルを作成することができます。
上記のように、_skeet ai_ コマンドを実行すると、
<migrationName> を新しく追加するスキーマから推測して、
名前の候補を表示します。

スキーマをコピーして、_schema.prisma_ に貼り付けます。
保存を行うと、フォーマットが自動で行われ、リレーションが自動で追加されます。

### skeet db migrate <migrationName> コマンドを実行する

続いて、_yes_ と入力すると、コマンドが実行され、
マイグレーションファイルが作成されます。

```bash
❓ Do you want me to run the migration now? (Yes/No) yes
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "skeet-api-dev", schema "public" at "localhost:5432"

Applying migration `20230830074747_add_post_comment_and_user`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230830074747_add_post_comment_and_user/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... - Nexus Prisma
✔ Generated Prisma Client (v5.2.0) to ./node_modules/@prisma/client in 97ms
✔ Generated Nexus Prisma to ./node_modules/.nexus-prisma in 35ms

Then run: skeet g scaffold
❓ Do you want me to run scaffold now? (Yes/No)
```

### skeet g scaffold コマンドを実行する

マイグレーションファイルが作成されたら、
_skeet g scaffold_ コマンドを実行することで、
CRUD 機能を持つ GraphQL API を自動生成することができます。

```bash
❓ Do you want me to run scaffold now? (Yes/No) yes
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/mutation.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/model.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/query.ts 🎉
✔ successfully created - ./graphql/src/graphql/modelManager/Post/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/mutation.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/model.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/query.ts 🎉
✔ successfully created - ./graphql/src/graphql/modelManager/Comment/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/index.ts 🎉
```

このように、Skeet GraphQL では、
スキーマを定義することで、
GraphQL のスキーマを自動生成することができます。

### GraphQL Playground を開く

それでは _$ skeet s_ コマンドを実行して、
エミュレーターを起動しましょう。

skeet ai のプロンプトの中でも _$ skeet_ コマンドを実行することができます。
_-g_ オプションをつけることで、GraphQL のみを起動することができます。

```bash
You: $ skeet s -g
```

新しく GraphQL のスキーマを追加した場合は、
_$ skeet s_ コマンドを実行することで、新しい GraphQL スキーマが更新されます。

GraphQL Playground を開き、
スキーマが更新されていることを確認しましょう。

[http://localhost:3000/graphql](http://localhost:3000/graphql)

![https://storage.googleapis.com/skeet-assets/imgs/backend/graphql-playground-post.png](https://storage.googleapis.com/skeet-assets/imgs/backend/graphql-playground-post.png)

このように Apollo Server の Playground から、
GraphQL API をテストすることができます。

ここで作成した GraphQL クエリは、コピーしてそのまま _functions/skeet/src/queries_ にファイルを作成することで、 後に、_skeetGraphql_ 関数を使って API リクエストを送信することができます。

Skeet Framework GraphQL では GraphQL API ではデータにまつわる処理を行い、
functions では、タスクやサードパーティーの API に関する処理を行うことを推奨しています。

Functions にあるインスタンスから GraphQL API のデータにアクセスするためには、
_skeetGraphql_ 関数を使うことで、Apollo GraphQL Playground で生成したクエリをそのまま利用して、
GraphQL API にアクセスすることができます。

_skeetGraphql_ 関数は、_@skeet-framwork/utils_ パッケージに含まれています。

詳しい使い方は次のドキュメントを参照してください。

- [@skeet-framework/utils](/ja/doc/plugins/skeet-framework/utils)

## 開発用ログイン認証キーを取得する

それではさっそく開発の準備に入ります。
まずは Firebase エミュレーターを起動し、_ACCESS_TOKEN_ を取得します。

```bash
$ skeet s
```

別ウィンドウで次のコマンドを実行し、
_accessToken_ を取得します。

```bash
$ skeet login
🚸 === Copy & Paste below command to your terminal === 🚸

export ACCESS_TOKEN={accessToken}

🚸 =========           END           ========= 🚸
```

コンソールログに表示された accessToken を環境変数に設定することで、

_skeetGraphql_ 関数を使って API リクエストを送信することができます。

ログインコマンドが成功すると、

デフォルトで　*authOnCreateUser.ts* に定義されている

Auth インスタンスのトリガーが作動して

Firebase Firestore にユーザー情報が保存されます。

以下の URL にアクセスすると、
ユーザー情報が保存されていることが確認できます。

- [http://localhost:4000/auth](http://localhost:4000/auth)

_functions/skeet/routings/auth/authOnCreateUser.ts_

デフォルトの設定では、ユーザー作成時に Discord に通知が送信されます。

環境変数に Discord の _DISCORD_WEBHOOK_URL_ を設定することで、
通知を受け取ることができます。

```typescript
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  gravatarIconUrl,
  sendDiscord,
  skeetGraphql,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import { defineSecret } from 'firebase-functions/params'
import { inspect } from 'util'
import { CreateUserQuery } from '@/queries'
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

const { region } = skeetConfig

export const authOnCreateUser = functions
  .runWith({
    ...authPublicOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      if (!user.email) throw new Error(`no email`)
      const { uid, email, displayName, photoURL } = user
      const accessToken = 'skeet-access-token'
      const variables = {
        uid: uid,
        email: email,
        username: displayName || email?.split('@')[0],
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const createUserResponse = await skeetGraphql(
        accessToken,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateUserQuery,
        variables
      )

      console.log(
        inspect(createUserResponse, false, null, true /* enable colors */)
      )

      // Send Discord message when new user is created
      const content = `Skeet APP New user: ${variables.username} \nemail: ${variables.email}\niconUrl: ${variables.iconUrl}`
      if (process.env.NODE_ENV === 'production') {
        await sendDiscord(content)
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

Firestore にユーザーを作成後、GraphQL で使用しているリレーショナルデータベースにも、
同じ _uid_ でユーザー情報が保存されます。

GraphQL と Functions 間のデータのやり取りには _skeetGraphql_ 関数を使っています。

Functions にあるインスタンスから GraphQL API のデータにアクセスするためには、
_skeetGraphql_ 関数を使うことで、Apollo GraphQL Playground で生成したクエリをそのまま利用して、
GraphQL API にアクセスすることができます。

_skeetGraphql_ 関数は、_@skeet-framwork/utils_ パッケージに含まれています。

詳しい使い方は次のドキュメントを参照してください。

- [@skeet-framework/utils](/ja/doc/plugins/skeet-utils)

Skeet Framework GraphQL では GraphQL API ではデータにまつわる処理を行い、
functions では、タスクやサードパーティーの API に関する処理を行うことを推奨しています。

## ユーザー情報の取得

ユーザー情報は、

_await getLoginUser(req)_

を使って Firebase から取得します。

```typescript
import { getLoginUser } from '@/lib'

const user: UserAuthType = await getLoginUser(req)
```

getLoginUser の戻り値の型定義はデフォルトで次のようになっています。

```typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```

## Cloud Run へデプロイする

```bash
$ skeet deploy
```

## Skeet yarn build

Skeet yarn build コマンドで
a キーを押すと、全てのファンクションのビルドが行われます。

```bash
$ skeet yarn build
```

## Skeet Framework のデプロイ

Skeet Framework に 2 種類のデプロイ方法があります。

- GitHub Actions による CI/CD
- Skeet CLI によるデプロイ

## GitHub Actions による CI/CD

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
```

GitHub に push すると、GitHub Actions により、自動でデプロイが行われます。

**⚠️ [本番のデプロイ](/ja/doc/skeet-graphql/initial-deploy/) を完了させる必要があります。 ⚠️**

## Skeet CLI によるデプロイ

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ graphql
 ◯ skeet
```

デプロイする _service_ を選択し,
選択された _service_ のみをデプロイします。
a を押すと全ての _service_ を選択します。

これで、Skeet Framework のデプロイは完了です 🎉
あとはあなたのアイディアを実装するだけです 🎉
