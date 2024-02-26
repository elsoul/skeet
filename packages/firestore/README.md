<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/firestore">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/firestore">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/firestore">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/firestore">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-firestore/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-firestore/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

# Skeet Framework Plugin - Firestore

Skeet Firestore Plugin for CRUD Firestore operation with Firestore Converter.
Type safe, easy to use, and easy to test.
This plugin is for serverside with Firebase Admin SDK.
(Client side helper functions for Firestore is in ./lib/skeet/firestore on the Skeet Client)

# Installation

```bash
$ skeet yarn add -p @skeet-framework/firestore
```

or

```bash
$ yarn add @skeet-framework/firestore
```

# Skeet Firestore Docs

- [https://skeet.dev/doc/backend/skeet-firestore/](https://skeet.dev/doc/backend/skeet-firestore/)

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

## Add Collection Item

```ts
import { firestore } from 'firebase-admin'
import { add } from '@skeet-framework/firestore'

const db = firestore()
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
import { adds } from '@skeet-framework/firestore'

const db = firestore()
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
import { query, QueryCondition } from '@skeet-framework/firestore'

const db = admin.firestore()

// Simple query to get users over 25 years old
const simpleConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
]

// Advanced query to get users over 25 years old, ordered by desc
// Limitations: If you include a filter with a range comparison (<, <=, >, >=), your first ordering must be on the same field
// So we can't use multiple fields with a range comparison for now.
// https://firebase.google.com/docs/firestore/query-data/order-limit-data
const advancedConditions: QueryCondition[] = [
  { field: 'age', operator: '>', value: 25 },
  { field: 'age', orderDirection: 'desc' },
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

# Skeet Framework Document

- [https://skeet.dev](https://skeet.dev)

# Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

# License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

# Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-firestore/blob/master/CODE_OF_CONDUCT.md).
