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

📗 Doc: https://skeet.dev/

📱 Demo App: https://skeeter.dev/

## 💃 What's Skeet? 🕺

⚡️ AI Auto-code Development ⚡️

Skeet is an open-source app development solution capable of AI auto-code development.

It allows for rapid development of Web/iOS/Android apps and supports a wide range of developments, including AI-powered chatbot apps, Web3 apps utilizing blockchain, and dApps.

AI is also used in the development flow, overcoming the learning curve that is a challenge in software frameworks.

Developers can quickly start building functional apps and publish them in the cloud.

## Overall Architecture Diagram

![Skeet Architecture](https://storage.googleapis.com/skeet-assets/imgs/SkeetArchitecture.png)

Skeet is an open-source framework for serverless app development crafted in TypeScript.

It offers the flexibility to select functionalities and the ability to build additional web or mobile interfaces and sophisticated data analytics foundations later on.

It supports Web3 development, eliminates complex infrastructure management, and facilitates auto-scaling and pay-as-you-go pricing.

The Skeet CLI leverages generative AI to reduce overall development costs, is ready for CI/CD automation, and provides enhanced security features.

Currently, it supports development on Google Cloud and Firebase.

## Installation

Oneliner installation (Install nodenv, node, npm, @skeet-framework/cli)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.4)"
```

If you already have Node.js installed, you can install Skeet CLI with npm:

```bash
$ pnpm add -g firebase-tools
$ pnpm add -g @skeet-framework/cli
```

## Enabling Google Cloud VertexAI/OpenAI

Create a new project in Google Cloud Platform and enable VertexAI.
You will need OpenAI API Key to use OpenAI.

Use the following command to enable VertexAI:

```bash
$ skeet init
```

```bash
$ skeet ai --help
```

or you can choose AI engine by passing options

```bash
$ skeet ai --openai
```

**You need to set CHAT_GPT_ORG/CHAT_GPT_KEY in your .env**

Then you can ask Skeet AI Assistant to create a new function, method, typedoc and more.

[![SkeetAI](https://storage.googleapis.com/skeet-assets/animation/skeet-ai-short.gif)](https://www.youtube.com/watch?v=e7J5HDhtpE4)

YouTube Video Link: https://www.youtube.com/watch?v=e7J5HDhtpE4

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^20.11.0
- [PNPM](https://pnpm.io/) ^8.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0

For Firebase Template

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [Java](https://www.java.com/en/download/)

## 📗 Usage 📗

### ① Install dependencies

```bash
$ curl -fsSL https://get.pnpm.io/install.sh | sh -
$ pnpm add -g @skeet-framework/cli
$ pnpm add -g firebase-tools
```

### ② Create Skeet App

```bash
$ skeet new
? Enter the name of the app (skeet-app)
```

### ③ Initialize Firebase/Google Cloud Project

```bash
$ skeet init
Initializing Cloud Configurations...
? What's your GCP Project ID (skeet-framework)
```

### ④ Call Your AI Assistant

Now you can call your AI Assistant to create a new function, method, typedoc, and more.

```bash
$ skeet ai --help
```

or You can call check command to check your configurations

```bash
$ skeet check
```

## Add Build-in Template

You can add a build-in template to your App.

```bash
$ skeet add --help
```

You can choose a template for the frontend and backend.

- [Next.js (React) with GraphQL template](https://github.com/elsoul/skeet-graphql)
- [Next.js (React) with Firestore template](https://github.com/elsoul/skeet-next)
- [Expo (React Native) with Firestore template](https://github.com/elsoul/skeet-app)
- [Solana Mobile Stack (Expo) + Web (Next.js) with Firestore template](https://github.com/elsoul/skeet-solana-mobile-stack)

![Solana Mobile Stack](https://storage.googleapis.com/skeet-assets/animation/SkeetSolanaMobileStack.gif)

![Chatbot](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

### Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

### Test Firebase Functions Endpoint

To call Firebase Functions Endpoint, you can use the following command:

e.g. Call root() function

```bash
$ skeet c
firebase > root()
```

## Development Environment

Now you have both frontend and backend running locally ⭐️

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

## Skeet Document

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
  help [command]               display help for command
```

## Powered by

- [Firebase - Serverless Platform](https://firebase.google.com/)
- [Firestore - NoSQL Database](https://firebase.google.com/docs/firestore)
- [Firebase Cloud Functions 2nd Gen - FaaS](https://firebase.google.com/docs/functions)
- [Firebase Storage - Cloud Storage](https://firebase.google.com/docs/storage)
- [Firebase Authentication - Auth](https://firebase.google.com/docs/auth)
- [Cloud SQL - Relational Database](https://cloud.google.com/sql)
- [Cloud Load Balancing - Routing](https://cloud.google.com/load-balancing)
- [Prisma - ORM](https://www.prisma.io/)
- [TypeScript - TypeCheck](https://www.typescriptlang.org/)
- [Vitest - Test](https://vitest.dev/)
- [ESLint - Linter](https://eslint.org/)
- [Prettier - Formatter](https://prettier.io/)
- [Next.js (React) - Web Frontend(SSG)](https://nextjs.org/)
- [Expo (React Native) - Mobile App](https://expo.dev/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet/blob/master/CODE_OF_CONDUCT.md).
