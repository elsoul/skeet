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

## Skeet - Open-Source Serverless App Framework for efficient development

Skeet is an Open-Source Serverless Framework for zero-maintenance apps on Firebase 🔥

- [TypeScript - TypeCheck](https://www.typescriptlang.org/)
- [Firebase - Serverless Platform](https://firebase.google.com/)
- [Firestore - NoSQL Database](https://firebase.google.com/docs/firestore)
- [Firebase Cloud Functions 2nd Gen - FaaS](https://firebase.google.com/docs/functions)
- [Firebase Storage - Cloud Storage](https://firebase.google.com/docs/storage)
- [Firebase Authentication - Auth](https://firebase.google.com/docs/auth)
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

![Skeet Create Command](https://storage.googleapis.com/skeet-assets/imgs/samples/SkeetCreateSelectTemplate.png)

You can choose a template for the frontend.

- [Next.js (React) with GraphQL template](https://github.com/elsoul/skeet-graphql)
- [Next.js (React) with Firestore template](https://github.com/elsoul/skeet-next)
- [Expo (React Native) with Firestore template](https://github.com/elsoul/skeet-app)

※ This tutorial uses the Expo version, but you can use the same procedure even using the Next.js version.

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default Skeet App ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### ① Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Activate Firebase Build

#### - Activate Firebase Authentication

- Activate Firebase Authentication
  ![Firebase Authentication](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![Google Sign in](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

#### - Activate Firebase Firestore

- Activate Firestore
  ![Firestore](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![Firestore](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![Firestore](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

#### - Firebase Storage

- Activate Firebase Storage
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-storage.png)

- Select Native Mode
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-storage.png)

- Select Region
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-storage.png)

### ④ Skeet init to setup project

Run _skeet init_ command and select your GCP Project ID and Regions to setup.

Then, please visit the URL to authenticate your Firebase account.

```bash
$ skeet init --only-dev
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1

Visit this URL on this device to log in:

https://accounts.google.com/o/oauth2/auth?project...

Waiting for authentication...
```

### ⑤ How to setup Secret Key

#### - Set Secret Key in Cloud Secret Manager

Skeet Framework uses [Cloud Secret Manager](https://firebase.google.com/docs/functions/config-env?hl=en&gen=2nd) environment variables to manage sensitive information such as API keys.

This command requires a Firebase Blaze or higher plan.

![Firebase](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan-en.png)

From the Firebase console's bottom left menu, select _Upgrade_.

- [Firebase Console](https://console.firebase.google.com/u/0/project/_/usage/details)

using the _skeet add secret <secretKey>_ command

Set the OpenAI API key as an environment variable.

```bash
$ skeet add secret CHAT_GPT_ORG
? Enter value for CHAT_GPT_ORG: <yourOpenAIKey>
```

Set CHAT_GPT_KEY as well.

```bash
$ skeet add secret CHAT_GPT_KEY
? Enter value for CHAT_GPT_KEY: <yourOpenAIKey>
```

You can also write it in _functions/openai/.env_ to try it easily,
This method does not translate to production environments.

#### - Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![OpenAI ChatGPT API](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

Now you are ready to use Skeet ChatApp 🎉

## 📱 User Login Auth 📱

```bash
$ skeet s
```

Run Skeet App locally and access to

[http://localhost:19006/register](http://localhost:19006/register)

Let's create a new user account with your email address and password.

![User Register](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

After registration, you will see the console log like below.

![Email Validation](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

Click the link in the console log to verify your email address.

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

Successfully verified your email address.

![Firebase Auth](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ Create AI Chat Room ✉️

After login, access this page to create a chat room.

[http://localhost:19006/rooms](http://localhost:19006/rooms)

Let's create a chat room with the following settings.

OpenAI Chat Room Settings

| item             | description                       | type                |
| ---------------- | --------------------------------- | ------------------- |
| Model            | Select OpenAI API's Model         | gpt3.5-turbo / gpt4 |
| Max Tokens       | Set OpenAI API's Max Tokens       | number              |
| Temperature      | Set OpenAI API's Temperature      | number              |
| System Charactor | Set OpenAI API's System Charactor | string              |

![OpenAI ChatGPT AI Chat](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

Now you are all set 🎉

![OpenAI ChatGPT AI Chat](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-stream.gif)

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
  login [options]              Skeet Login Command - Create Firebase Login Token
  curl [options] <methodName>  Skeet Curl Command - Call Cloud Functions Endpoint for Dev
  post [options] <queryType>   Skeet Post Command - Call Skeet GraphQL Endpoint for Dev
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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-cli This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
