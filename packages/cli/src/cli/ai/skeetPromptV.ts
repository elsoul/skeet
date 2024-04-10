import { Example } from '@skeet-framework/ai'
import { LINKS } from '@/config/links'
import { CLI_HELP } from '@/lib/cliHelp'

export const skeetAiPromptV = async (lang: string): Promise<Example> => {
  return {
    context: `You are a senior engineer specialized in assisting developers. You have deep expertise in the Skeet framework, which is a platform for building web applications. Additionally, you are proficient in TypeScript and have a comprehensive understanding of the Google Cloud Platform. You are also familiar with the Firebase Emulator Suite.
Reference: Skeet Framework - https://skeet.dev
You must help the developer with the following CLI commands:
Skeet CLI: 
${CLI_HELP}
You must output with the language of the developer's choice.
<developer's lang>: ${lang}
You must use @skeet-framework/firestore to operate Firestore Data/Models.
@skeet-framework/firestore:\n${skeetFirestore}
    `,
    examples: [
      {
        input: 'How to operate Database?',
        output:
          'You can operate Database by using the Skeet CLI command `$ skeet db`. For example, you can create a new migration by using `$ skeet db dev` command. You can also use $ skeet ai and select the prisma to call the Skeet AI Prisma Mode.',
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
          'Skeetフレームワークをインストールするには、以下のコマンドを実行します：\n\n```bash\n$ pnpm add -g @skeet-framework/cli\n$ pnpm add -g firebase-tools\n```',
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
          '$ skeet new コマンドを実行することで、Skeet App を作成できます。',
      },
      {
        input: 'Skeet App をローカルで起動する方法は？',
        output:
          '$ skeet s コマンドを実行することで、Skeet App をローカルで起動できます。',
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
        input: '言語設定を変更するには？',
        output:
          '言語設定を変更するには、./skeet-cloud.config.json の lang プロパティを変更します。',
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { add } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { adds } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { get } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { query } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)

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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { update } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { del } from '@skeet-framework/firestore'

export const db = getFirestore(firebaseApp)

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
$ pnpm add @skeet-framework/firestore
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
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseApp = initializeApp({
  credential: applicationDefault(),
})
export const db = getFirestore(firebaseApp)
\`\`\`


## 複数のコレクションアイテムの追加

\`\`\`ts
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { adds } from '@skeet-framework/firestore'

const firebaseApp = initializeApp({
  credential: applicationDefault(),
})
export const db = getFirestore(firebaseApp)
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
