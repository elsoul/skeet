---
id: basic-architecture
title: Basic Architecture - Firestore
description: Describes the basic structure of the Skeet framework. Each directory of the application and each command of CLI are explained.
---

The basic structure of the Skeet Framework backend is as follows.

| Features required for common backends | Skeet Framework                      |
| ------------------------------------- | ------------------------------------ |
| Database                              | Firestore                            |
| Login Authentication                  | Firebase Authentication              |
| API                                   | Cloud Functions for Firebase 2nd Gen |
| Load Balancer                         | Cloud Load Balancer                  |
| Schedule Tasks                        | Cloud Scheduler                      |
| Pub/Sub                               | Cloud Pub/Sub                        |
| Domains                               | Cloud DNS                            |
| Security                              | Cloud Armor                          |

- Support CI/CD with [GitHub Actions](https://github.com/features/actions)
- Supports local development with [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- Supports type-safe development with [TypeScript](https://www.typescriptlang.org/)
- Supports package management with [PNPM](https://pnpm.io/)

## Basic Structure of Skeet Framework

Since the Skeet Framework backend is serverless,
You can start writing from functions right away.

_website_, _webapp_, _mobile_ will contain the frontend source code.

The Cloud Functions for Firebase project will be placed under the _functions_ directory.

You can add multiple functions to functions.

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

| Directory               | Description                              |
| ----------------------- | ---------------------------------------- |
| common                  | Common source code                       |
| webapp                  | Web application source code              |
| website                 | Website source code                      |
| mobile                  | Mobile application source code           |
| functions               | Cloud Functions for Firebase source code |
| sql                     | SQL source code                          |
| package.json            | Backend package management               |
| skeet-cloud.config.json | Skeet Framework configuration file       |
| tsconfig.json           | TypeScript configuration                 |
| vitest.config.ts        | Vite Test configuration file             |
| pnpm-workspace.yaml     | PNPM configuration file                  |
| firebase.json           | Firebase configuration file              |

## Basic Structure of Skeet Functions

Skeet Functions are based on Cloud Functions for Firebase.
The Cloud Functions for Firebase project will be placed under the _functions_ directory.
You can add multiple functions to functions.

e.g. _functions/skeet-func_

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

| Directory     | Description                  |
| ------------- | ---------------------------- |
| build.ts      | Build script                 |
| devBuild.ts   | Development build script     |
| dist          | Build output directory       |
| nodemon.json  | Nodemon configuration        |
| package.json  | Functions package management |
| src           | Source code directory        |
| src/index.ts  | Entry point                  |
| src/lib       | Library                      |
| src/routings  | Routings                     |
| src/scripts   | Scripts                      |
| src/utils     | Utilities                    |
| tsconfig.json | TypeScript configuration     |

## Instance types for Skeet Functions

| Instance type | Description                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------- |
| Http          | Function that receives HTTP requests                                                          |
| OnCall        | Function that receives Callable functions                                                     |
| PubSub        | function that receives PubSub messages                                                        |
| Scheduler     | Scheduled Functions                                                                           |
| Firestore     | Functions that receive triggers for creating, updating, deleting, etc. documents in Firestore |
| Auth          | Functions that receive triggers for creating, deleting, etc. users in Firebase Auth           |

## Basic Structure of Skeet Routings

Routing settings differ depending on the instance type.
Also, Cloud Functions for Firebase option settings are located under routings/options.

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

### Http Instance Settings

Http Default Option

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

Define Http Instance Settings _routings/http/{httpInstance}.ts_

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
        message: 'Skeet Backend is running!',
        name: req.body.name || 'Anonymous',
      })
    } catch (error) {
      const errorLog = `root - ${error}`
      console.log(errorLog)
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Define Http Instance Type _src/types/http/{httpInstance}Params.ts_

_types/http/rootParams.ts_

```ts
export type RootParams = {
  name?: string
}
```

### PubSub Instance Settings

PubSub Default Option

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

Define PubSub Instance Settings _routings/pubsub/{pubsubInstance}.ts_

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

Define PubSub Instance Types _src/types/pubsub/{pubsubInstance}Params.ts_

_types/pubsub/pubsubExampleParams.ts_

```ts
export type PubsubExampleParams = {
  message?: string
}
```

### Scheduler Instance Settings

Scheduler Default Option

_routings/options/scheduler/schedulerOptions.ts_

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

Define Scheduler Instance Settings*routings/scheduler/{schedulerInstance}.ts*

_routings/scheduler/schedulerExample.ts_

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

### Firestore Instance Settings1

Firestore Default Option

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

Define Firestore Instance Settings in _routings/firestore/{firestoreInstance}_

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

Cloud Firestore function triggers

| Event Type        | Trigger                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| onDocumentCreated | Triggered when a document is written to for the first time.                            |
| onDocumentDeleted | Triggered when a document already exists and has any value changed.                    |
| onDocumentUpdated | Triggered when a document is deleted.                                                  |
| onDocumentWritten | Triggered when onDocumentCreated, onDocumentUpdated or onDocumentDeleted is triggered. |

### Configure Auth instance

Auth Default Option

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

In the Auth instance's default function,
When a Firebase user is created,
Create user documentation.

Auth instance settings are described in _routings/auth/auth{MethoName}.ts_.

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

### Firebase user registration/login in Dev environment

In the Dev environment,
For Firebase user registration and login,
Use the _skeet login_ command.

Run Skeet App in Dev environment

```bash
$ skeet s
```

Open a new terminal and run the _skeet login_ command.

```bash
$ skeet login
```

![画像](https://storage.googleapis.com/skeet-assets/animation/skeet-login-compressed.gif)

Firebase user registration and Firestore user registration are completed.

_ACCESS_TOKEN_ is stored in the local environment variable.

## Model definition

Define Models

_common/models/{modelName}Models.ts_

Or use the _skeet ai_ command to automatically generate the Firestore data model.

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

For type-safe development with Firestore,
Skeet Framework uses the Firestore Data Converter.

- [Firestore Data Converter](https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter)

The NoSQL data model is so flexible that
Model definition is not required, but

for each model

- CollectionId
- DocumentId

is recommended to be described as a comment.
Increased readability,

In addition, code completion in CodePilot will work.

_models/userModels.ts_

```ts
import { Ref, Timestamp } from '@skeet-framework/firestore'

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

To Add/Get/Query/Remove Data,

install

_@skeet-framework/firestore_

```ts
import { add, get } from '@skeet-framework/firestore'
```

- [@skeet-framework/firestore](/en/doc/plugins/skeet-firestore)

## Skeet CLI

Skeet CLI is a command line tool for Skeet Framework.

Command List

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
