---
id: basic-architecture
title: Basic Architecture - GraphQL
description: Describes the basic structure of the Skeet framework GraphQL. Each directory of the application and each command of CLI are explained.
---

Skeet Framework can be assembled with a combination of SQL and NoSQL.

Here we describe the basic structure for building a GraphQL backend.

The basic structure of the Skeet Framework GraphQL backend is as follows.

| Common Backend Required Features | Skeet Framework GraphQL     |
| -------------------------------- | --------------------------- |
| Databases                        | Google Cloud SQL            |
| Login Authentication             | Firebase Authentication     |
| API                              | GraphQL on Google Cloud Run |
| Load Balancer                    | Cloud Load Balancer         |
| Schedule Tasks                   | Cloud Scheduler             |
| Pub/Sub                          | Cloud Pub/Sub               |
| Domains                          | Cloud DNS                   |
| Security                         | Cloud Armor                 |

- [Prisma](https://prisma.io) Support for managing RDBMS (Relational Database Management System)
- [GitHub Actions](https://github.com/features/actions) Support CI/CD
- [Firebase Functions](https://firebase.google.com/docs/functions) Supports serverless backend
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) Support local development
- [TypeScript](https://www.typescriptlang.org/) Supports type-safe development

## Basic Structure of Skeet Framework

_src_ contains the front-end source code.

Cloud Functions for Firebase projects are placed under the _functions_ directory.

You can add multiple functions to functions.

GraphQL API source code is placed under the _graphql_ directory.

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

| Directory               | Description                              |
| ----------------------- | ---------------------------------------- |
| src                     | Frontend source code                     |
| src/public              | Frontend source code                     |
| src/types               | Frontend type definitions                |
| graphq/prisma           | Prisma source code                       |
| graphq/src              | GraphQL source code                      |
| functions               | Cloud Functions for Firebase source code |
| functions/skeet         | functions related to the OpenAI API etc  |
| package.json            | Backend package management               |
| skeet-cloud.config.json | Skeet Framework configuration file       |
| firebase.json           | Firebase configuration file              |

## Basic Structure of Skeet GraphQL

Skeet GraphQL uses the following packages.

- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/)
- [Prisma](https://www.prisma.io/)
- [Nexus](https://nexusjs.org/)
- [GraphQL Shield](https://the-guild.dev/graphql/shield)

The Cloud Functions for Firebase project is placed under the _graphql_ directory.

e.g.: _graphql_

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

| Directory            | Description                        |
| -------------------- | ---------------------------------- |
| build.ts             | build script                       |
| devBuild.ts          | build script                       |
| dist                 | source code after build            |
| nodemon.json         | Local launch settings              |
| package.json         | Backend package management         |
| src                  | source code                        |
| src/index.ts         | entry point                        |
| src/lib              | Libraries                          |
| src/graphql          | GraphQL files                      |
| src/schema           | GraphQL Schema/Permission Settings |
| src/scripts          | scripts                            |
| prisma               | Prisma file                        |
| prisma/migrations    | Prisma migration file              |
| prisma/schema.prisma | Prisma schema file                 |
| prisma/seed.ts       | Prisma seed file                   |
| tsconfig.json        | TypeScript settings                |
| yarn.lock            | Package lock file                  |

## Skeet GraphQL File Structure

The GraphQL API source code is placed under the _./src_ directory.

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

## Skeet GraphQL Manager

Under the _./src/graphql_ directory is a manager that manages GraphQL queries.

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

| manager type    | description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| authManager     | Manage mutations/queries related to authentication.                     |
| modelManager    | CRUD related to the model is automatically generated in this directory. |
| responseManager | Manages mutations/queries on Workers.                                   |
| taskManager     | Manage mutations/queries on Tasks.                                      |
| enums.ts        | Manage Enums.                                                           |

## Basic Structure of Skeet DB Schema

Under the _./src/schema_ directory are files that manage GraphQL schemas.

```bash
./src/schema
├── Node.ts
├── index.ts
├── nexus-typegen.ts
├── schema.graphql
├── permissions.ts
└── schema.ts
```

| file name        | description                                         |
| ---------------- | --------------------------------------------------- |
| Node.ts          | Manages the Node interface.                         |
| nexus-typegen.ts | File automatically generated by Nexus.              |
| schema.graphql   | File automatically generated by Nexus.              |
| permissions.ts   | This file manages permissions using GraphQL Shield. |
| schema.ts        | A file that manages the GraphQL schema.             |

## Skeet CLI

Add new Cloud Functions for Firebase with Skeet CLI,
You can run a yarn command for each function.

Command list

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
