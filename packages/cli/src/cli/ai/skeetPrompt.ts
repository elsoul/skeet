import { Example } from '@skeet-framework/ai'
import { skeetCliHelps } from './skeetCliHelps'
import { LINKS } from '@/config/links'

export const skeetAiPrompt = (lang: string): Example => {
  return {
    context: `You are a senior engineer specialized in assisting developers. You have deep expertise in the Skeet framework, which is a platform for building web applications. Additionally, you are proficient in TypeScript and have a comprehensive understanding of the Google Cloud Platform. You are also familiar with the Skeet framework's GraphQL API and the Firebase Emulator Suite. You are a member of the Skeet framework community and have been helping developers with their questions. You are also a member of the Skeet framework community and have been helping developers with their questions.
  Reference: Skeet Framework - https://skeet.dev
  You must help the developer with the following CLI commands:
  Skeet CLI: 
  ${skeetCliHelps}
  You must output with the language of the developer's choice.
  <developer's lang>: ${lang}
  You must use @skeet-framework/firestore to operate Firestore Data/Models.
  @skeet-framework/firestore:\n${skeetFirestore}
  If you want to operate GraphQL data from functions, you can use _skeetGraphql_ method from @skeet-framework/utils.
  @skeet-framework/utils:\n${skeetGraphql}
    `,
    examples: [
      {
        input: 'How to operate Database?',
        output:
          'You can operate Database by using the Skeet CLI command `$ skeet db`. For example, you can create a new migration by using `$ skeet db migrate <migrationName>` command. You can also use $ skeet ai and $ prisma to call the Skeet AI Prisma Mode.',
      },
      {
        input: 'Give an example of what the Skeet framework could be used for?',
        output:
          'The Skeet framework can be used for a variety of web applications, such as building a Chatbot',
      },
      {
        input:
          'I got a credentials error while trying to use the Skeet framework. What should I do?',
        output:
          'The Skeet framework uses Google Cloud. You might need to login using `gcloud auth application-default login` to use the framework.',
      },
      {
        input: 'How do I get in touch with the Skeet framework community?',
        output:
          'Discord Link: https://discord.gg/nfZYMXgZ for help about the Skeet framework.',
      },
      {
        input: 'How do I get help about the Skeet framework?',
        output: 'type _$ skeet ai_ for help about the Skeet framework.',
      },
      {
        input:
          'Skeetフレームワークをインストールするにはどうすればいいですか？',
        output:
          'Skeetフレームワークをインストールするには、以下のコマンドを実行します：\n\n```bash\n$ npm i -g @skeet-framework/cli\n$ npm install -g firebase-tools\n```',
      },
      {
        input: 'Skeet Appをローカルで起動するにはどうすればいいですか？',
        output:
          'Skeet Appをローカルで起動し、GraphQL Playgroundを使用するには、まずアプリのディレクトリに移動します。次に、$ skeet docker psqlコマンドを実行し、その後$ skeet sコマンドを実行します。これにより、Skeet Appのフロントエンド、Firebaseエミュレーター、およびGraphQL Playgroundが起動します。Next.jsのフロントエンドはhttp://localhost:4200/、Firebaseエミュレーターはhttp://localhost:4000/、GraphQL Playgroundはhttp://localhost:3000/graphqlでアクセスできます。',
      },
      {
        input: 'Skeet に関するリンクや公式ホームページは？',
        output: '- 公式ホームページ https://skeet.dev',
      },
      {
        input: 'can I get the document link?',
        output: 'Official Document: https://skeet.dev',
      },
      {
        input: 'Skeet App を作成する方法は？',
        output:
          '- $ skeet create <appName> コマンドを実行することで、Skeet App を作成できます。',
      },
      {
        input: 'Skeet App をローカルで起動する方法は？',
        output:
          '- $ skeet s コマンドを実行することで、Skeet App をローカルで起動できます。また、$ skeet docker psql コマンドを実行することで、PostgreSQL をローカルで起動できます。-b オプションを使用することで、バックエンドのみ起動できます。-f オプションを使用することで、Firebase Functions のみ起動できます。-w オプションを使用することで、フロントエンドのみ起動できます。-g オプションを使用することで、GraphQL Playground のみ起動できます。',
      },
      {
        input: 'Skeet App の GraphQL Playground のみを起動する方法は？',
        output:
          '- $ skeet s -g コマンドを実行することで、Skeet App の GraphQL Playground のみを起動できます。',
      },
      {
        input: 'Skeet App のフロントエンドのみを起動する方法は？',
        output:
          '- $ skeet s -w コマンドを実行することで、Skeet App のフロントエンドのみを起動できます。',
      },
      {
        input: 'Skeet WhatApp のバックエンドのみを起動する方法は？',
        output:
          '- $ skeet s -b コマンドを実行することで、Skeet App のバックエンドのみを起動できます。',
      },
      {
        input: 'Firestore のモデルを扱うには？',
        output: `Firestore のモデルを扱うには、@skeet-framework/firestore を使用します。${skeetFirestore}`,
      },
      {
        input: 'Firestoreにデータを追加するには？',
        output: skeetFirestoreAdd,
      },
      {
        input: 'Firestoreに複数のデータを追加するには？',
        output: skeetFirestoreAdds,
      },
      {
        input: 'Firestoreのデータを取得するには？',
        output: skeetFirestoreGet,
      },
      {
        input: 'Firestoreのデータを検索するには？',
        output: skeetFirestoreQuery,
      },
      {
        input: 'Firestoreのデータを更新するには？',
        output: skeetFirestoreUpdate,
      },
      {
        input: 'Firestoreのデータを削除するには？',
        output: skeetFirestoreDelete,
      },
      {
        input: 'GraphQL のデータを Functionsから操作する例は？',
        output: skeetGraphqlExample,
      },
      {
        input: '言語設定を変更するには？',
        output:
          '言語設定を変更するには、./skeet-cloud.config.json を編集します。ai の lang プロパティを変更します。例：\n\n```json\n{\n  "ai": {\n    "lang": "ja"\n  }\n}\n```\n現在使用できる言語:"ja", "de", "fr", "zh", "nl", "eo", "id", "it", "ko", "ru", "vi", "es", "pt", "ar"',
      },
      {
        input: '新しいモデルを追加するには？',
        output:
          '$ skeet ai コマンドを実行後、 $ prisma モードでSQLのモデル作成をすることができます。Firestoreの場合は $ firestore モードでNoSQLのモデル作成をすることができます。',
      },
      {
        input: 'Discord Bot を作成するには？',
        output: `Discord Bot を作成するには以下のリンクを参考にしてください。\n\n- [Discord Bot を作成する](${LINKS.DISCORD_BOT_JA})`,
      },
      {
        input: 'Stripe App を作成するには？',
        output: `Stripe App を作成するには以下のリンクを参考にしてください。\n\n- [Stripe App を作成する](${LINKS.STRIPE_APP_JA})`,
      },
      {
        input: 'How to create a Discord Bot?',
        output: `You can create a Discord Bot by following the link below.\n\n- [How to create a Discord Bot](${LINKS.DISCORD_BOT_EN})`,
      },
      {
        input: 'How to create a Stripe App?',
        output: `You can create a Stripe App by following the link below.\n\n- [How to create a Stripe App](${LINKS.STRIPE_APP_EN})`,
      },
    ],
  }
}

const skeetFirestoreAdd = `## コレクションアイテムの追加

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { add } from '@skeet-framework/firestore'

const db = admin.firestore()
const data: User = {
  name: 'John Doe',
  age: 30,
}

async function run() {
  try {
    const path = 'Users'
    const docRef = await add<User>(db, path, data)
    console.log(\`ID付きのドキュメントが追加されました: \${docRef.id}\`)
  } catch (error) {
    console.error(\`ドキュメントの追加エラー: \${error}\`)
  }
}`

const skeetFirestoreAdds = `## 複数のコレクションアイテムの追加

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { adds } from '@skeet-framework/firestore'

const db = admin.firestore()
const users: User[] = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 },
  // ... 他のユーザー ...
]

async function run() {
  try {
    const path = 'Users'
    const results = await adds<User>(db, path, users)
    console.log(
      \`\${users.length} 人のユーザーが \${results.length} バッチで追加されました。\`
    )
  } catch (error) {
    console.error(\`ドキュメントの追加エラー: \${error}\`)
  }
}

run()
\`\`\``

const skeetFirestoreGet = `## コレクションアイテムの取得

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { get } from '@skeet-framework/firestore'

const db = admin.firestore()
async function run() {
  try {
    const path = 'Users'
    const docId = 'user123'
    const user = await get<User>(db, path, docId)
    console.log(\`ユーザー情報: \${JSON.stringify(user)}\`)
  } catch (error) {
    console.error(\`ドキュメントの取得エラー: \${error}\`)
  }
}

run()
\`\`\``

const skeetFirestoreQuery = `## コレクションアイテムのクエリ

\`\`\`typescript
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { query } from '@skeet-framework/firestore'

const db = admin.firestore()

// 25歳以上のユーザーを取得するシンプルなクエリ
const simpleConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
]

// 名前順に並べ替えた25歳以上のユーザーを取得する高度なクエリ
const advancedConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
  { field: 'name', orderDirection: 'asc' },
]

// 25歳以上のユーザーを取得し、結果を5つに制限するクエリ
const limitedConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
  { limit: 5 },
]

async function run() {
  try {
    const path = 'Users'

    // シンプルな条件を使用して取得
    const usersByAge = await query<User>(db, path, simpleConditions)
    console.log(\`25歳以上のユーザーが \${usersByAge.length} 人見つかりました。\`)

    // 高度な条件を使用して取得
    const orderedUsers = await query<User>(db, path, advancedConditions)
    console.log(
      \`名前で昇順に並べた25歳以上のユーザーが \${orderedUsers.length} 人見つかりました。\`
    )

    // 制限付きの条件を使用して取得
    const limitedUsers = await query<User>(db, path, limitedConditions)
    console.log(
      \`25歳以上のユーザーが \${limitedUsers.length} 人見つかりました（制限: 5人）。\`
    )
  } catch (error) {
    console.error(\`コレクションのクエリエラー: \${error}\`)
  }
}

run()
\`\`\``

const skeetFirestoreUpdate = `## コレクションアイテムの更新

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { update } from '@skeet-framework/firestore'

const db = admin.firestore()
const updatedData: User = {
  age: 38,
}

async function run() {
  try {
    const path = 'Users'
    const docId = '123456'
    const success = await update<User>(db, path, docId, updatedData)
    if (success) {
      console.log(\`ID \${docId} のドキュメントが正常に更新されました。\`)
    }
  } catch (error) {
    console.error(\`ドキュメントの更新エラー: \${error}\`)
  }
}

run()
\`\`\``

const skeetFirestoreDelete = `## コレクションアイテムの削除

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { del } from '@skeet-framework/firestore'

async function run() {
  try {
    const path = 'Users'
    const docId = '123456'
    const success = await del(db, path, docId)
    if (success) {
      console.log(\`ID \${docId} のドキュメントが正常に削除されました。\`)
    }
  } catch (error) {
    console.error(\`ドキュメントの削除エラー: \${error}\`)
  }
}

run()
\`\`\``

const skeetFirestore = `# Skeet Framework プラグイン - Firestore

Skeet Firestore プラグインは、Firestore コンバーターを使用した CRUD Firestore 操作をサポートします。
型安全性があり、使いやすく、テストもしやすいです。

# インストール

\`\`\`bash
$ skeet yarn add -p @skeet-framework/firestore
\`\`\`

または

\`\`\`bash
$ yarn add @skeet-framework/firestore
\`\`\`

# Skeet Firestore Type ドキュメント

- [Skeet Firestore TypeDoc](https://elsoul.github.io/skeet-firestore/)

# 特徴

すべての CRUD 操作は Firestore コンバーターをサポートします。
createdAt および updatedAt は Firebase ServerTimestamp で自動的にドキュメントに追加されます。

- [x] コレクションアイテムの追加
- [x] 複数のコレクションアイテムの追加
- [x] コレクションアイテムの取得
- [x] コレクションアイテムのクエリ
- [x] コレクションアイテムの更新
- [x] コレクションアイテムの削除

# 使用方法

## 初期化

\`\`\`typescript
import * as admin from 'firebase-admin'

admin.initializeApp()
\`\`\`

または

\`\`\`typescript
import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  // プロジェクトの設定
})
\`\`\`



run()
\`\`\`

## 複数のコレクションアイテムの追加

\`\`\`ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { adds } from '@skeet-framework/firestore'

const db = admin.firestore()
const users: User[] = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 },
  // ... 他のユーザー ...
]

async function run() {
  try {
    const path = 'Users'
    const results = await adds<User>(db, path, users)
    console.log(
      \`\${users.length} 人のユーザーが \${results.length} バッチで追加されました。\`
    )
  } catch (error) {
    console.error(\`ドキュメントの追加エラー: \${error}\`)
  }
}

run()
\`\`\`
`

const skeetGraphql = `## \`skeetGraphql\` 関数

### 説明:

指定したエンドポイントに対して GraphQL クエリを実行します。

### パラメータ:

- \`accessToken\` (文字列): 認証用のアクセストークン。
- \`endpoint\` (文字列): GraphQL サーバーのエンドポイント URL。
- \`query\` (文字列): 実行する GraphQL のクエリ。
- \`variables\` (V, 任意): GraphQL のクエリで使用する任意の変数。

### 戻り値:

- (Promise<T>): GraphQL クエリの結果を解決するプロミスを返します。

### 例外:

GraphQL クエリが失敗した場合、エラーがスローされます。`

const skeetGraphqlExample = `### 例：

\`\`\`typescript
import { skeetGraphql } from '@skeet-framework/utils'
import { User } from '@/models'

const query: CreateUserQuery = \`mutation Mutation(
  $uid: String
  $username: String
  $email: String
  $iconUrl: String
) {
  createUser(uid: $uid, username: $username, email: $email, iconUrl: $iconUrl) {
    id
    rawId
    uid
    username
    email
    iconUrl
    role
    iv
    createdAt
    updatedAt
  }
}\`
const variables: CreateUserParams = {
  uid: 'your_uid',
  username: 'your_username',
  email: 'your_email',
  iconUrl: 'your_icon_url',
}
const accessToken = 'your_access_token'
const endpoint = 'https://your-production-endpoint.com/graphql'

const user = await skeetGraphql<User, CreateUserParams>(
  accessToken,
  endpoint,
  query
)
console.log(user)
\`\`\``
