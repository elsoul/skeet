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

Lanch Skeet AI Assistant with the following command:

```bash
$ skeet ai
```

or you can choose AI engine by passing options

```bash
$ skeet ai --openai
```

Then you can ask Skeet AI Assistant to create a new function, method, typedoc and more.

![SkeetAI](https://storage.googleapis.com/skeet-assets/animation/skeet-ai-short.gif)

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [GitHub CLI](https://cli.github.com/) ^2.29.0

For Firebase Template

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [Java](https://www.java.com/en/download/)

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

You can choose a template for the frontend and backend.

- [Next.js (React) with GraphQL template](https://github.com/elsoul/skeet-graphql)
- [Next.js (React) with Firestore template](https://github.com/elsoul/skeet-next)
- [Expo (React Native) with Firestore template](https://github.com/elsoul/skeet-app)
- [Solana Mobile Stack (Expo) + Web (Next.js) with Firestore template](https://github.com/elsoul/skeet-solana-mobile-stack)

![Solana Mobile Stack](https://storage.googleapis.com/skeet-assets/animation/SkeetSolanaMobileStack.gif)

or

Create Skeet App with only backend

```bash
$ skeet create <appName> --backend
```

You can choose a template for the backend.

- [Backend - GraphQL template](https://github.com/elsoul/skeet-graphql-only)
- [Backend - Firestore template](https://github.com/elsoul/skeet-functions-only)

![Chatbot](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

or

put options to run only backend, frontend, or GraphQL server

```bash
Usage: skeet server|s [options]

Run Skeet App

Options:
  -b, --backend    Run Backend only
  -f, --functions  Run Firebase Functions only
  -w, --web        Run Web App only
  -g, --graphql    Run GraphQL Server only
  -h, --help       display help for command
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

If you choose GraphQL template, you can use GraphQL Playground

📊 GraphQL Playground - [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Enabling Google Cloud VertexAI

Skeet is integrated with Google Cloud VertexAI. Use the following command to enable VertexAI:

```bash
$ skeet iam ai
```

## Launching Skeet AI Assistant

The Skeet AI Assistant is an interactive tool designed to handle various queries.

```bash
$ skeet ai --help
AI Playground

Options:
  -v, --vertex                   Vertex AI
  -o, --openai                   OpenAI
  -m, --model <string>           Model
  -token, --token <number>       Max Tokens
  -temp, --temperature <number>  Temperature
  -h, --help                     display help for command
```

Upon launching, you'll see a prompt like the one below. Try asking it something:

```bash
skeet ai --openai
╔═════════════╤════════╗
│ Option      │ Value  │
╟─────────────┼────────╢
│ AI Type     │ OpenAI │
╟─────────────┼────────╢
│ Model       │ gpt-4  │
╟─────────────┼────────╢
│ Max Token   │ 1000   │
╟─────────────┼────────╢
│ Temperature │ 0      │
╚═════════════╧════════╝

🤖 Skeet AI Mode
 `$ <mode>` to change AI mode 🤖

$ prisma
$ typedoc
$ translate
$ firestore
$ function
$ method
$ help
$ q

OpenAI is selected 🤖 (type 'q' to quit)
? What can I do for you?

You:
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

## Powered by

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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-cli This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
