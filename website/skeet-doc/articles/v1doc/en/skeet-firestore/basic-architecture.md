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

- Support for Firestore type definitions from [Typesaurus](https://typesaurus.com)
- Support CI/CD with [GitHub Actions](https://github.com/features/actions)
- Supports local development with [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- Supports type-safe development with [TypeScript](https://www.typescriptlang.org/)

## Basic Structure of Skeet Framework

Since the Skeet Framework backend is serverless,
You can start writing from functions right away.

_src_ will contain the frontend source code.

The Cloud Functions for Firebase project will be placed under the _functions_ directory.

You can add multiple functions to functions.

```bash
├── src
│   ├── public
│   └── types
├── functions
│   └── skeet
├── package.json
├── skeet-cloud.config.json
└── firebase.json
```

| Directory               | Description                              |
| ----------------------- | ---------------------------------------- |
| src                     | Frontend source code                     |
| src/public              | Frontend source code                     |
| src/types               | Frontend type definitions                |
| functions               | Cloud Functions for Firebase source code |
| functions/skeet         | functions related to OpenAI API etc      |
| package.json            | Backend package management               |
| skeet-cloud.config.json | Skeet Framework configuration file       |
| firebase.json           | Firebase Settings                        |

## Basic Structure of Skeet Functions

Skeet Functions are based on Cloud Functions for Firebase.
The Cloud Functions for Firebase project will be placed under the _functions_ directory.
You can add multiple functions to functions.

e.g. _functions/skeet_

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
│   ├── models
│   ├── routings
│   ├── scripts
│   ├── types
│   └── utils
├── tsconfig.json
└── yarn.lock
```

| Directory     | Description                |
| ------------- | -------------------------- |
| build.ts      | build script               |
| devBuild.ts   | build script               |
| dist          | Source code after build    |
| nodemon.json  | Local launch configuration |
| package.json  | Backend package management |
| src           | source code                |
| src/index.ts  | entry point                |
| src/lib       | Libraries                  |
| src/models    | models                     |
| src/routings  | routings                   |
| src/scripts   | scripts                    |
| src/types     | type definitions           |
| src/utils     | Utilities                  |
| tsconfig.json | TypeScript configuration   |
| yarn.lock     | Package lock file          |

## Instance types for Skeet Functions

| Instance type | Description                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------- |
| Http          | Function that receives HTTP requests                                                          |
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

Now you can use _skeet curl_ to call the Cloud Functions endpoint.

```bash
$ skeet help curl
Usage: skeet curl [options] <methodName>

Skeet Curl Command - Call Cloud Functions Endpoint for Dev

Arguments:
  methodName                  Method Name - e.g. skeet curl createUserChatRoom

Options:
  -d,--data [data]            JSON Request Body - e.g. '{ "model": "gpt4", "maxTokens": 420 }'
  -r, --raw                   Show chunk data (default: false)
  -p, --production            For Production (default: false)
  -f,--functions [functions]  For Production Functions Name (default: false)
  -h, --help                  display help for command
```

## Model definition

Define Models

_src/models/{modelName}Models.ts_

- [Typesaurus](https://typesaurus.com) for type definitions.

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

// Define Collection Name
export const userCollectionName = 'User'
export const userChatRoomCollectionName = 'UserChatRoom'
export const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

// CollectionId: User
// DocumentId: uid
export type User = {
  uid: string
  username: string
  email: string
  iconUrl: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

// CollectionId: UserChatRoom
// DocumentId: auto
export type UserChatRoom = {
  userRef: Ref<User>
  title: string
  model: string
  maxTokens: number
  temperature: number
  stream: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

// CollectionId: UserChatRoomMessage
// DocumentId: auto
export type UserChatRoomMessage = {
  userChatRoomRef: Ref<UserChatRoom>
  role: string
  content: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
```

To Add/Get/Query/Remove Data,

install

_@skeet-framework/firestore_

```ts
import {
  addCollectionItem,
  getCollectionItem,
} from '@skeet-framework/firestore'
```

- [@skeet-framework/firestore](/en/doc/plugins/skeet-firestore)

## Skeet CLI

Skeet CLI is a command line tool for Skeet Framework.

Command List

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Open-Source Serverless App framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create <appName>             Create Skeet Framework App
  server|s                     Run Skeet App
  deploy                       Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for multiple functions
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  login [options]              Skeet Login Command - Create Firebase Login Token
  get                          Get Skeet App List
  curl [options] <methodName>  Skeet Curl Command - Call Cloud Functions Endpoint for Dev
  test                         Skeet Jest Test Command
  help [command]               display help for command
```
