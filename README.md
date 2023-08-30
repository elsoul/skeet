<p align="center">
  <a href="https://skeet.dev/en/">
    <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=ELSOUL_LABO2">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>
  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/cli">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/cli">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-cli/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## Skeet - Open-Source Serverless Full-stack App Development Solution

Skeet is an Open-Source Serverless Framework for full-stack apps on Firebase and Google Cloud 🔥

- [Firebase - Serverless Platform](https://firebase.google.com/)
- [Firestore - NoSQL Database](https://firebase.google.com/docs/firestore)
- [Firebase Cloud Functions 2nd Gen - FaaS](https://firebase.google.com/docs/functions)
- [Firebase Storage - Cloud Storage](https://firebase.google.com/docs/storage)
- [Firebase Authentication - Auth](https://firebase.google.com/docs/auth)
- [Cloud SQL - Relational Database](https://cloud.google.com/sql)
- [Cloud Load Balancing - Routing](https://cloud.google.com/load-balancing)
- [Prisma - ORM](https://www.prisma.io/)
- [GraphQL - Query Language](https://graphql.org/)
- [Apollo - GraphQL Server](https://www.apollographql.com/)
- [TypeScript - TypeCheck](https://www.typescriptlang.org/)
- [Jest - Test](https://jestjs.io/)
- [ESLint - Linter](https://eslint.org/)
- [Prettier - Formatter](https://prettier.io/)
- [Next.js (React) - Web Frontend(SSG)](https://nextjs.org/)
- [Expo (React Native) - Mobile App](https://expo.dev/)

📗 Doc: https://skeet.dev/

📱 Demo App: https://skeeter.dev/

With Skeet's tutorial, you can quickly build and deploy web, iOS, and Android apps using Firebase.

## 💃 What's Skeet? 🕺

⚡️ Do more, manage less ⚡️

Reduce app development and operation costs and realize more plans.

Skeet is an open-source full-stack app development solution.

You can start writing app logic immediately without worrying about infrastructure.

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif)

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0
- [Java](https://www.java.com/en/download/)

※ We don't write Java but we need it for mobile apps working

## 📗 Usage 📗

### ① Install Skeet/Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### ② Create Skeet App

```bash
$ skeet create <appName>
```

![Skeet Create Command](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-create-v0.22.png)

You can choose a template for the frontend.

- [Next.js (React) with GraphQL template](https://github.com/elsoul/skeet-graphql)
- [Next.js (React) with Firestore template](https://github.com/elsoul/skeet-next)
- [Expo (React Native) with Firestore template](https://github.com/elsoul/skeet-app)
- [Solana Mobile Stack (Expo) + Web (Next.js) with Firestore template](https://github.com/elsoul/skeet-solana-mobile-stack)

![Solana Mobile Stack](https://storage.googleapis.com/skeet-assets/animation/SkeetSolanaMobileStack.gif)

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

If you choose GraphQL template, you can use GraphQL Playground

📊 GraphQL Playground - [http://localhost:3000/graphql](http://localhost:3000/graphql)

![Skeet GraphQL](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

## Enabling Google Cloud VertexAI

Skeet is integrated with Google Cloud VertexAI. Use the following command to enable VertexAI:

```bash
$ skeet iam ai
```

## Launching Skeet AI Assistant

The Skeet AI Assistant is an interactive tool designed to handle various queries:

```bash
$ skeet ai
```

Upon launching, you'll see a prompt like the one below. Try asking it something:

````
VertexAI is selected 🤖 (type "q" to quit)

You: How to install skeet?
Skeet:
To install Skeet, you can use the following command:

```bash
$ npm install -g @skeet-framework/cli
```

This will install the Skeet CLI tool globally on your machine.

You:

````

## Launching Skeet AI Prisma

While _skeet ai_ is running, entering _$ prisma_ will switch to database schema generation mode. Upon launching, you'll be prompted to describe your database use case. For instance, try entering, "I want to create a blog site."

```bash
$ skeet ai
VertexAI is selected 🤖 (type "q" to quit)

You: $ prisma
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.

You: I want to create a blog site.
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
}

Edit: ./graphql/prisma/schema.prisma
```

A Prisma schema has been generated.

![skeet-prisma](https://storage.googleapis.com/skeet-assets/animation/skeet-prisma.gif)

## Editing Prisma Schema

The Prisma schema is saved in _./graphql/prisma/schema.prisma_. Edit the schema outputted earlier as required.

If you haven't used the skeet template yet, create it with the following command:

```bash
$ skeet create <appName>
```

Use this schema to migrate your database.

## Creating/Running DB Migration

With Skeet, you can perform database migrations using Prisma:

```bash
$ skeet db migrate <migrationName>
```

Your database migration is now complete.

## Creating GraphQL API

Skeet can automatically generate a GraphQL API from the schema:

```bash
$ skeet g scaffold
```

## Launching the GraphQL API

Skeet allows you to run the GraphQL API locally:

```bash
$ skeet s
```

You can access the GraphQL API at:

- [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Synchronizing Types

Skeet can automatically generate TypeScript type definitions from the GraphQL API:

```bash
$ skeet sync types
```

## Skeet Docment

- [https://skeet.dev/](https://skeet.dev/)

## Skeet CLI

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  test                         Skeet Jest Test Command
  create <appName>             Create Skeet Framework App
  server|s                     Run Skeet App
  deploy                       Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for multiple functions
  login                        Skeet Login Command - Create Firebase Login Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions Endpoint
  g|generate                   Skeet Generate Comannd
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  help [command]               display help for command
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-cli This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
