![Skeet Framework Logo](https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png)

<p align="center">
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

## Skeet TypeScript Serverless Framework

TypeScript, Firebase Cloud FireStore, Jest Test, Google Cloud Functions 2nd Generation

📗 Doc: https://skeet.dev/

## What's Skeet?

⚡️ Reduce App Development and Maintenance Costs ⚡️

Skeet is a full-stack TypeScript serverless application framework.

Skeet was born to reduce the cost of software development and operation.

Start developing and deploying serverless apps quickly.

Get ready to use scalable Cloud Firestore and Cloud Functions securely right away.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0

## Cloud Network Architecture

Automated to build all the Google Cloud VPC network settings;

- Firewall
- VPC Network
- Subnet Network
- VPC Connector
- Load Balancer
- Cloud Armor
- Cloud DNS

## Usage

### Install Skeet CLI and Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### Create Skeet App

```bash
$ skeet create <appName>
```

### Run local

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default skeetApp ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### 1. Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### 2. Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 3. Activate Firebase Authentication

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

### 4. Activate Firebase Firestore

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

### 5. Skeet init to activate Skeet ChatApp

Run _skeet init_ command and select your GCP Project ID and Regions to setup.

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
```

### 6. Create OpenAI API Key(https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

Add your OpenAI API Key and Org to _.env_ file

_./functions/openai/.env_

```bash
SKEET_APP_NAME=skeet-demo
PROJECT_ID=skeet-demo-12356
REGION=europe-west6
CHAT_GPT_KEY=your-openai-api-key
CHAT_GPT_ORG=your-openai-api-org
```

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

Now you are ready to use Skeet ChatApp 🎉

```bash
$ skeet s
```

Please check the [Skeet Doc](https://skeet.dev/) for more details.

📗 [Skeet Doc](https://skeet.dev/)

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
  server|s                     Run Firebase Emulator for Skeet APP
  deploy                       Deploy Skeet APP to Firebase Cloud Functions
  init [options]               Initialize Google Cloud Setups for Skeet APP
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for multiple functions
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  login [options]              Skeet Login Command - Create Firebase Login Token
  list                         Show Skeet App List
  curl [options] <methodName>  Skeet Curl Command - Call Cloud Functions Endpoint for Dev
  test                         Skeet Jest Test Command
  help [command]               display help for command
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-cli This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
