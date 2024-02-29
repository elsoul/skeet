---
id: tutorial
title: チュートリアル - Firestore
description: Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。
---

## チュートリアル - Firestore

このチュートリアルでは Skeet Framework を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と Firebase Firestore, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

このチュートリアルでは 基本的なチャットボットアプリ を作成します。
クイックスタートでは Skeet Framework の基本的な使い方を学びましたが、
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

- 開発用ログイン認証キーを取得する
- Skeet Curl で API リクエストをテストする
- User 作成時にトリガーを作動させる
- @skeet-framework/firestore を使ってデータを操作する
- Firebase へデプロイする

## チュートリアルの前提条件

[セットアップ](/ja/doc/skeet-firestore/setup) が完了していない場合は先に完了させてください。

## 開発環境

Skeet Framework では エディタに VScode または Cursor を推奨しています。
フレームワークに沿って開発を進めることで、
GitHub Copilot 及び OpenAI を使った強力なコード補完サポートを受けることができます。

- [Cursor](https://cursor.sh/)
- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

Chatbot には OpenAI の API を使います。

- [OpenAI](https://openai.com/)

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


💃Let's try `$ skeet curl <MethodName>` to test request🕺

$ skeet curl createUserChatRoom
     or
$ skeet curl createUserChatRoom --data '{ "model": "gpt4", "maxTokens": 4200 }'
```

コンソールログに表示された accessToken を環境変数に設定することで、

_skeet curl_ コマンドを使って API リクエストを送信することができます。

開発の際にログイン認証キーの取得や、POST リクエストの送信にはコストがかかります。
Skeet Framework では以下の二つのコマンドを使って、
開発者がより効率的に開発を進めることができるように設計されています。

- skeet login
- skeet curl

## ユーザー作成時にトリガーを作動させる

ログインコマンドが成功すると、

デフォルトで　*authOnCreateUser.ts* に定義されている

Auth インスタンスのトリガーが作動して

Firebase Firestore にユーザー情報が保存されます。
必要に応じて、このトリガーを使って Slack や Discord に通知を送信することもできます。

_functions/skeet/routings/auth/authOnCreateUser.ts_

```typescript
import { db } from '@/index'
import { User } from '@/models'
import { add } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import { gravatarIconUrl } from '@skeet-framework/utils'
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
      const userRef = await add<User>(db, 'User', userParams, uid)
      console.log({ status: 'success', userId: userRef.id })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

## @skeet-framework/firestore を使ってデータを操作する

skeet framework では、_@skeet-framework/firestore_ を使って、
Firestore へのデータの追加、取得、更新、削除を行うことができます。

以下のようなコードで、データの追加、取得、更新、削除を Firestore の Converter を使って行うことができます。

```typescript
import { db } from '@/index'
import { User } from '@/models'
import { add, get, update, remove } from '@skeet-framework/firestore'

const userCollectionPath = 'User'
const userRef = await add<User>(db, userCollectionPath, userParams, uid)
const user = await get<User>(db, userCollectionPath, uid)
await update<User>(db, userCollectionPath, uid, { username: 'skeet' })
await remove<User>(db, userCollectionPath, uid)
```

詳しくは [@skeet-framework/firestore](/ja/doc/plugins/skeet-firestore) を参照してください。

## Skeet Curl で API リクエストをテストする

_skeet curl_ コマンドを使って API リクエストを送信してみましょう。

```bash
$ skeet curl createUserChatRoom
{
   "status" : "success",
   "userChatRoomId" : "dpToDGH4uF96KuCCuDOx"
}
```

UserChatRoom と UserChatRoomMessage が作成されました。
この UserChatRoomId を使って、チャットストリームを開始します。

## チャットストリームのコードを確認する

Skeet Functions のコードは、
functions ディレクトリに配置されています。
基本的に新規に追加する部分は、_routings_ ディレクトリに配置されています。

Http トリガーの場合は、_routings/http_ に配置されます。

```bash
$ tree functions
functions
├── skeet
│   ├── routings
│   │   ├── auth
│   │   │   └── authOnCreateUser.ts
│   │   ├── http
│   │   │   ├── addStreamUserChatRoomMessage.ts
│   │   │   ├── addUserChatRoomMessage.ts
│   │   │   ├── addVertexMessage.ts
│   │   │   ├── createUserChatRoom.ts
│   │   │   └── index.ts
.
.
```

デフォルトではフロントエンドから _addStreamUserChatRoomMessage_ が呼び出されます。

_functions/skeet/routings/http/addStreamUserChatRoomMessage.ts_

```typescript
import { db } from '@/index'
import { onRequest } from 'firebase-functions/v2/https'
import { getUserAuth } from '@/lib'
import { publicHttpOption } from '@/routings/options'
import { AddStreamUserChatRoomMessageParams } from '@/types/http/addStreamUserChatRoomMessageParams'
import { defineSecret } from 'firebase-functions/params'
import {
  UserChatRoom,
  UserChatRoomCN,
  UserCN,
  UserChatRoomMessage,
  UserChatRoomMessageCN,
} from '@/models'
import { OpenAI, OpenAIMessage } from '@skeet-framework/ai'
import { TypedRequestBody } from '@/types/http'
import { add, get, query, update } from '@skeet-framework/firestore'
import { inspect } from 'util'

const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const addStreamUserChatRoomMessage = onRequest(
  { ...publicHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()

    try {
      if (!organization || !apiKey)
        throw new Error(
          `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
        )

      // Get Request Body
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // Get User Info from Firebase Auth
      const user = await getUserAuth(req)

      // Get UserChatRoom
      const chatRoomPath = `${UserCN}/${user.uid}/${UserChatRoomCN}`
      const userChatRoom = await get<UserChatRoom>(
        db,
        chatRoomPath,
        body.userChatRoomId
      )

      // Add User Message to UserChatRoomMessage
      const messagesPath = `${chatRoomPath}/${body.userChatRoomId}/${UserChatRoomMessageCN}`
      await add<UserChatRoomMessage>(db, messagesPath, {
        userChatRoomId: body.userChatRoomId,
        content: body.content,
        role: 'user',
      })

      // Get UserChatRoomMessages for OpenAI Request

      const allMessages = await query<UserChatRoomMessage>(db, messagesPath, [
        {
          field: 'createdAt',
          orderDirection: 'desc',
        },
        {
          limit: 5,
        },
      ])
      allMessages.reverse()

      let promptMessages = allMessages.map((message: UserChatRoomMessage) => {
        return {
          role: message.role,
          content: message.content,
        }
      })
      promptMessages.unshift({
        role: 'system',
        content: userChatRoom.context,
      })
      console.log('promptMessages', promptMessages)
      const messages = {
        messages: promptMessages as OpenAIMessage[],
      }

      console.log('messages.length', messages.messages.length)

      const openAi = new OpenAI({
        organizationKey: organization,
        apiKey,
        model: userChatRoom.model,
        maxTokens: userChatRoom.maxTokens,
        temperature: userChatRoom.temperature,
        n: 1,
        topP: 1,
        stream: true,
      })
      // Update UserChatRoom Title
      if (messages.messages.length === 2) {
        const title = await openAi.generateTitle(body.content)
        await update<UserChatRoom>(db, chatRoomPath, body.userChatRoomId, {
          title,
        })
      }

      // Get OpenAI Stream
      const stream = await openAi.promptStream(messages)
      const messageResults: any[] = []
      for await (const part of stream) {
        const message = String(part.choices[0].delta.content)
        if (message === '' || message === 'undefined') continue
        console.log(inspect(message, false, null, true /* enable colors */))
        res.write(JSON.stringify({ text: message }))
        messageResults.push(message)
      }
      const message = messageResults.join('')
      await add<UserChatRoomMessage>(db, messagesPath, {
        userChatRoomId: body.userChatRoomId,
        content: message,
        role: 'assistant',
      })
      res.end()
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

この関数を先程の ChatRoomID を使って呼び出してみましょう。
ここでは _--raw_ オプションを使ってチャンクデータを表示しています。

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "dpToDGH4uF96KuCCuDOx", "content": "こんにちは" }' --raw
{ "text" : "streaming-data" }
```

ストリームデータが表示されていることが確認できます。

また、_skeet list https_ コマンドを使って、エンドポイントを確認することもできます。

```bash
$ skeet list https
┌──────────┬──────────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Function │ Endpoint                     │ ParamsPath                                                             │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addStreamUserChatRoomMessage │ ./functions/skeet/src/types/http/addStreamUserChatRoomMessageParams.ts │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addUserChatRoomMessage       │ ./functions/skeet/src/types/http/addUserChatRoomMessageParams.ts       │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addVertexMessage             │ ./functions/skeet/src/types/http/addVertexMessageParams.ts             │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ createUserChatRoom           │ ./functions/skeet/src/types/http/createUserChatRoomParams.ts           │
└──────────┴──────────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

## Firebase へデプロイする

はじめてデプロイする場合は _skeet init_ コマンドを使用し、
プロジェクトに必要な設定を行います。

ここではドメインを設定しないでデプロイします。
開発時にドメインを設定しない場合は _skeet init --login_ コマンドを使用します。

本番環境へデプロイする場合は [本番のデプロイ](/ja/doc/skeet-firestore/initial-deploy) を参照してください。

### プロジェクトにデプロイ先の GCP,Firebase を設定する

```bash
$ skeet init --login
? What's your GCP Project ID skeet-demo
? What's your Firebase Project ID skeet-demo
? Select Regions to deploy (Use arrow keys)
   🌏 Regions 🌏
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1
(Move up and down to reveal more choices)

✔ Successfully Updated skeet-cloud.config.json 🎉
- Preparing the list of your Firebase apps
✔ Preparing the list of your Firebase apps
- Creating your Web app
✔ Creating your Web app

- Downloading configuration data of your Firebase WEB app
✔ Downloading configuration data of your Firebase WEB app
✔ Successfully Updated firebase.json 🎉

Created service account [skeet-demo].
✔ Service account created successfully 🎉
```

### デプロイする

```bash
 $ skeet deploy
? Select Services to run functions command webapp, skeet

=== Deploying to 'skeet-demo'...

i  deploying hosting
✔  hosting[skeet-demo]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overview
Hosting URL: https://skeet-demo.web.app
$ npx ts-node build.ts
Done in 4.75s.

=== Deploying to 'skeet-demo'...

i  deploying firestore
i  firestore: reading indexes from firestore.indexes.json...
i  cloud.firestore: checking firestore.rules for compilation errors...
✔  cloud.firestore: rules file firestore.rules compiled successfully
i  firestore: latest version of firestore.rules already up to date, skipping upload...
✔  firestore: released rules firestore.rules to cloud.firestore

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overview

=== Deploying to 'skeet-demo'...

i  deploying functions

i  functions: updating Node.js 18 (2nd Gen) function skeet:addStreamUserChatRoomMessage(europe-west6)...
i  functions: updating Node.js 18 (2nd Gen) function skeet:addUserChatRoomMessage(europe-west6)...
i  functions: updating Node.js 18 (2nd Gen) function skeet:addVertexMessage(europe-west6)...
i  functions: updating Node.js 18 (1st Gen) function skeet:authOnCreateUser(europe-west6)...
i  functions: updating Node.js 18 (2nd Gen) function skeet:createUserChatRoom(europe-west6)...
✔  functions[skeet:authOnCreateUser(europe-west6)] Successful update operation.
✔  functions[skeet:addStreamUserChatRoomMessage(europe-west6)] Successful update operation.
✔  functions[skeet:addUserChatRoomMessage(europe-west6)] Successful update operation.
✔  functions[skeet:addVertexMessage(europe-west6)] Successful update operation.
✔  functions[skeet:createUserChatRoom(europe-west6)] Successful update operation.

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overview
```

無事に Firebase Functions にデプロイされました。

## 型定義の同期

Skeet Framework では、型定義をフロントエンドに同期させることができます。

```bash
$ skeet sync types
⏳ Syncing openai...
📃 Copying functions/openai/src/types/http/addUserChatRoomMessageParams.ts to src/types/http/openai/addUserChatRoomMessageParams.ts
✔️ File copied: src/types/http/openai/addUserChatRoomMessageParams.ts
📃 Copying functions/openai/src/types/http/createUserChatRoomParams.ts to src/types/http/openai/createUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/createUserChatRoomParams.ts
📃 Copying functions/openai/src/types/http/getUserChatRoomParams.ts to src/types/http/openai/getUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/getUserChatRoomParams.ts
```

このコマンドにより、バックエンドの _src/types/http_ にある型定義をフロントエンドの _src/types/http/{FunctionsName}_ にコピーします。

## モデルの同期

```bash
$ skeet sync models
  skeet
? Select Original Copy of Model skeet
latestModel: skeet
Syncing skeet...
Copying functions/skeet/src/models/index.ts to src/types/models/index.ts
✔️ File copied: src/types/models/index.ts
Copying functions/skeet/src/models/userModels.ts to src/types/models/userModels.ts
✔️ File copied: src/types/models/userModels.ts
Synced Models Types 🎉
```

このコマンドにより、バックエンドの _src/models_ にあるモデルをフロントエンドの _src/types/models_ にコピーします。
また、複数のファンクションがある場合は、最新のモデルを選択し、その他のファンクションのモデルにコピーします。

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

**⚠️ [本番のデプロイ](/ja/doc/skeet-firestore/initial-deploy/) を完了させる必要があります。 ⚠️**

## Skeet CLI によるデプロイ

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```

デプロイする _functions_ を選択し,
選択された _functions_ のみをデプロイします。
a を押すと全ての _functions_ を選択します。

これで、Skeet Framework のデプロイは完了です 🎉
あとはあなたのアイディアを実装するだけです 🎉
