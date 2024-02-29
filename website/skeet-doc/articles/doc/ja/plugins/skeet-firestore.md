---
id: skeet-firestore
title: Skeet Firestore
description: Skeet Framework の Firestore プラグインにおける型安全な Firestore 操作の使い方を解説します。
---

# Skeet Framework プラグイン - Firestore

Skeet Firestore プラグインは、Firestore コンバーターを使用した CRUD Firestore 操作をサポートします。
型安全性があり、使いやすく、テストもしやすいです。

# インストール

```bash
$ skeet yarn add -p @skeet-framework/firestore
```

または

```bash
$ yarn add @skeet-framework/firestore
```

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

```typescript
import * as admin from 'firebase-admin'

admin.initializeApp()
```

または

```typescript
import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  // プロジェクトの設定
})
```

## コレクションアイテムの追加

```ts
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
    console.log(`ID付きのドキュメントが追加されました: \${docRef.id}`)
  } catch (error) {
    console.error(`ドキュメントの追加エラー: \${error}`)
  }
}

run()
```

## 複数のコレクションアイテムの追加

```ts
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
      `${users.length} 人のユーザーが \${results.length} バッチで追加されました。`
    )
  } catch (error) {
    console.error(`ドキュメントの追加エラー: \${error}`)
  }
}

run()
```

## コレクションアイテムの取得

```ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { get } from '@skeet-framework/firestore'

const db = admin.firestore()
async function run() {
  try {
    const path = 'Users'
    const docId = 'user123'
    const user = await get<User>(db, path, docId)
    console.log(`ユーザー情報: \${JSON.stringify(user)}`)
  } catch (error) {
    console.error(`ドキュメントの取得エラー: \${error}`)
  }
}

run()
```

## コレクションアイテムのクエリ

```typescript
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
    console.log(`25歳以上のユーザーが \${usersByAge.length} 人見つかりました。`)

    // 高度な条件を使用して取得
    const orderedUsers = await query<User>(db, path, advancedConditions)
    console.log(
      `名前で昇順に並べた25歳以上のユーザーが \${orderedUsers.length} 人見つかりました。`
    )

    // 制限付きの条件を使用して取得
    const limitedUsers = await query<User>(db, path, limitedConditions)
    console.log(
      `25歳以上のユーザーが \${limitedUsers.length} 人見つかりました（制限: 5人）。`
    )
  } catch (error) {
    console.error(`コレクションのクエリエラー: \${error}`)
  }
}

run()
```

## コレクションアイテムの更新

```ts
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
      console.log(`ID \${docId} のドキュメントが正常に更新されました。`)
    }
  } catch (error) {
    console.error(`ドキュメントの更新エラー: \${error}`)
  }
}

run()
```

## コレクションアイテムの削除

```ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { del } from '@skeet-framework/firestore'

async function run() {
  try {
    const path = 'Users'
    const docId = '123456'
    const success = await del(db, path, docId)
    if (success) {
      console.log(`ID \${docId} のドキュメントが正常に削除されました。`)
    }
  } catch (error) {
    console.error(`ドキュメントの削除エラー: \${error}`)
  }
}

run()
```
