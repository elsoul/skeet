---
id: skeet-firestore
title: Skeet Firestore
description: How to use type-safe Firestore in Skeet Framework.
---

# Skeet Framework Plugin - Firestore

Skeet Firestore Plugin for CRUD Firestore operation with Firestore Converter.
Type safe, easy to use, and easy to test.

# Installation

```bash
$ skeet yarn add -p @skeet-framework/firestore
```

or

```bash
$ yarn add @skeet-framework/firestore
```

# Skeet Firestore TypeDoc

- [Skeet Firestore TypeDoc](https://elsoul.github.io/skeet-firestore/)

# Features

All CRUD operations are supported with Firestore Converter.
createdAt and updatedAt are automatically added to the document with Firebase ServerTimestamp.

- [x] Add Collection Item
- [x] Adds Collection Items
- [x] Get Collection Item
- [x] Query Collection Items
- [x] Update Collection Item
- [x] Delete Collection Item

# Usage

## Initialize

```typescript
import * as admin from 'firebase-admin'

admin.initializeApp()
```

or

```typescript
import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  // Project configuration
})
```

## Add Collection Item

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
    console.log(`Document added with ID: ${docRef.id}`)
  } catch (error) {
    console.error(`Error adding document: ${error}`)
  }
}

run()
```

## Adds Collection Items

```ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { adds } from '@skeet-framework/firestore'

const db = admin.firestore()
const users: User[] = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 },
  // ... more users ...
]

async function run() {
  try {
    const path = 'Users'
    const results = await adds<User>(db, path, users)
    console.log(`Added ${users.length} users in ${results.length} batches.`)
  } catch (error) {
    console.error(`Error adding documents: ${error}`)
  }
}

run()
```

## Get Collection Item

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
    console.log(`User: ${JSON.stringify(user)}`)
  } catch (error) {
    console.error(`Error getting document: ${error}`)
  }
}

run()
```

## Query Collection Items

```typescript
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { query } from '@skeet-framework/firestore'

const db = admin.firestore()

// Simple query to get users over 25 years old
const simpleConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
]

// Advanced query to get users over 25 years old, ordered by their names
const advancedConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
  { field: 'name', orderDirection: 'asc' },
]

// Query to get users over 25 years old and limit the results to 5
const limitedConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
  { limit: 5 },
]

async function run() {
  try {
    const path = 'Users'

    // Using the simple conditions
    const usersByAge = await query<User>(db, path, simpleConditions)
    console.log(`Found ${usersByAge.length} users over 25 years old.`)

    // Using the advanced conditions
    const orderedUsers = await query<User>(db, path, advancedConditions)
    console.log(
      `Found ${orderedUsers.length} users over 25 years old, ordered by name.`
    )

    // Using the limited conditions
    const limitedUsers = await query<User>(db, path, limitedConditions)
    console.log(
      `Found ${limitedUsers.length} users over 25 years old, limited to 5.`
    )
  } catch (error) {
    console.error(`Error querying collection: ${error}`)
  }
}

run()
```

## Update Collection Item

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
      console.log(`Document with ID ${docId} updated successfully.`)
    }
  } catch (error) {
    console.error(`Error updating document: ${error}`)
  }
}

run()
```

## Delete Collection Item

```ts
import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { delete } from '@skeet-framework/firestore'

async function run() {
  try {
    const path = 'Users'
    const docId = '123456'
    const success = await delete(db, path, docId)
    if (success) {
      console.log(`Document with ID ${docId} deleted successfully.`)
    }
  } catch (error) {
    console.error(`Error deleting document: ${error}`)
  }
}
```
