---
id: backend-quickstart
title: Quickstart - Firestore
description: A simple guide to getting started with the Skeet framework.
---

This is a guide to quickly get started with the Skeet framework.

## Installing Skeet CLI

Skeet CLI is a command-line tool for efficiently using the Skeet framework. You can install it with the following command.

If pnpm is already installed, you can install it with the following command.

```bash
$ pnpm add -g @skeet-framework/cli
$ pnpm install -g firebase-tools
```

If pnpm is not installed, you can install it with the following command.

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.5)"
```

The above command will install the following:

- pnpm
- Java
- @skeet-framework/cli
- firebase-tools
- gh CLI

and edit .profile or .zshrc

## Installing Cloud SDK

Skeet uses Google Cloud SDK and Firebase CLI. Please install them from the following link.

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^471.0.0

After installation, you can check the installed version with the following command.

```bash
gcloud -v
Google Cloud SDK 471.0.0
alpha 2024.03.29
beta 2024.03.29
bq 2.1.3
core 2024.03.29
gcloud-crc32c 1.0.0
gsutil 5.27
```

## Initializing the CLI

Run the following command to initialize the gcloud CLI and gh CLI.

### Initializing the gcloud CLI

When you run the following command, your browser will open and you will be prompted to authenticate. Click the link and authenticate.

```bash
$ gcloud auth login
Your browser has been opened to visit:

    https://accounts.google.com/o/oauth2/auth?response_type=xxxxxxxxx
```

### Initializing the Firebase CLI

When you run the following command, you will be prompted to authenticate to log in to GitHub.

```
$ gh auth login
? What account do you want to log into?  [Use arrows to move, type to filter]
> GitHub.com
  GitHub Enterprise Server
```

## Create a Skeet Project

To create a new Skeet project, run the following command.

```bash
$ skeet new
? Enter the name of the app skeet-app
🚛 Downloading base template...📦 ⠹
   _____ __ __ __________________
  / ___// //_// ____/ ____/_  __/
  \__ \/ ,<  / __/ / __/   / /
 ___/ / /| |/ /___/ /___  / /
/____/_/ |_/_____/_____/ /_/    🛠️🛠️

⚡⚡⚡ Buidl TypeScript Fullstack App Fast ⚡⚡⚡

$ cd skeet-app
$ skeet init

You can ask AI Assistant for help

$ skeet ai --help
```

## Initialize the Skeet Project

Run the following command to initialize the Skeet project.

```bash
$ cd skeet-app
$ skeet init
? What's your GCP Project ID skeet-app
? Select Regions to deploy (Use arrow keys)
   🌏 Regions 🌏
❯ asia-east1
  asia-east2
  asia-northeast1
  asia-northeast2
  asia-northeast3
  asia-south1
(Move up and down to reveal more choices)
```

You will be asked to enter the project ID and select the region to deploy the project.

- Project ID
- Region

This step will create a new Google Cloud & Firebase project.

### - Upgrading Firebase Plan to Blaze

To maximize the benefits of the Skeet framework, you will need to upgrade to the Blaze plan.
Please upgrade to the Blaze plan from the link shown in the console.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan-en.png)

From the Firebase console's bottom left menu, select _Upgrade_.

- [Firebase Console](https://console.firebase.google.com/u/0/project/_/usage/details)

Once the project is initialized, you will be asked to log in to your Firebase account.
Please log in to your Firebase account by following the URL displayed in the console.

```bash
Visit this URL on this device to log in:
https://accounts.google.com/o/oauth2/auth?client_id=xxxxxxxxxxxx

Waiting for authentication...

✔  Success! Logged in as f.kawasaki@elsoul.nl
Now using project figaro5678

✔ Successfully Updated skeet-cloud.config.json 🎉
- Preparing the list of your Firebase apps
✔ Preparing the list of your Firebase apps
App already exists. Skipping...
.
.
.
Do you want to deploy Firebase Functions now? (y/N)
```

Now that you have logged in, you are ready to use the Skeet Framework.

At the end of the initialization, you will be asked if you want to deploy Firebase Functions.
We chose not to deploy them this time, so we answered `N`.

You can refer to the [Setup](/en/doc/skeet-firestore/setup) section for instructions on how to set up a complete cloud environment.

## Run the Skeet Project

Run the following command to start the Skeet project.

```bash
$ skeet s
✔  functions: Loaded functions definitions from source: authOnCreateUser, root.
✔  functions[asia-northeast1-authOnCreateUser]: auth function initialized.
✔  functions[asia-northeast1-root]: http function initialized (http://127.0.0.1:5001/figaro5678/asia-northeast1/root).
✔  functions: Using debug port 9229 for functions codebase skeet-func
>  Debugger listening on ws://127.0.0.1:9229/05eeda4e-58a8-48f5-b2a2-c23726d4c1c3
>  For help, see: https://nodejs.org/en/docs/inspector

┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌────────────────┬────────────────┬─────────────────────────────────┐
│ Emulator       │ Host:Port      │ View in Emulator UI             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Authentication │ 127.0.0.1:9099 │ http://127.0.0.1:4000/auth      │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Functions      │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Firestore      │ 127.0.0.1:8080 │ http://127.0.0.1:4000/firestore │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Hosting        │ 127.0.0.1:8000 │ n/a                             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Pub/Sub        │ 127.0.0.1:8085 │ n/a                             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Storage        │ 127.0.0.1:9199 │ http://127.0.0.1:4000/storage   │
└────────────────┴────────────────┴─────────────────────────────────┘
  Emulator Hub running at 127.0.0.1:4400
  Other reserved ports: 4500, 9150

Issues? Report them at https://github.com/firebase/firebase-tools/issues
```

The Firebase emulator will start, and the application will run on localhost.

Firebase Emulator UI at： [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

![Firebase Emulator UI](https://storage.googleapis.com/skeet-assets/imgs/firebase-emulator.png)

## Testing with the Skeet Console

Test your project with the Skeet console.

```bash
$ skeet c
firebase >
```

You can easily test Firebase Functions in this console.

Let's try calling the root function.

The `root` function is defined in `functions/skeet-func/src/routings/http/root.ts`.

```ts
import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { RootParams } from '@common/types/http/rootParams'

export const root = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      // Define your logic here
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Let's call the `root` function.

```bash
firebase > root()
Promise {
  <pending>,
  [Symbol(async_id_symbol)]: 9744,
  [Symbol(trigger_async_id_symbol)]: 4
}
firebase >
RESPONSE RECEIVED FROM FUNCTION: 200, {
  "status": "success"
}
```

The `root` function was called successfully, and `{ status: 'success' }` was returned.

## $ skeet check Command for AI Assistant Diagnosis

Run the following command to check the status of the cloud environment.

```bash
$ skeet check
🔍 Checking Your Cloud Status...
Skeet:
You have successfully created your Google Cloud and Firebase Projects in PROJECT_CREATED status.
Next step is setting up the first Firebase Functions using the following command:

$ skeet deploy
```

## Skeet AI Assistant

Skeet AI Assistant is a feature that allows you to communicate with an AI assistant while developing your project.
Skeet AI has three models available:

- Gemini
- OpenAI
- Claude

You can switch between these models using the `skeet ai` option.

```bash
$ skeet ai --help
Usage: skeet ai [options]

Call Skeet AI Assistant

Options:
  -g, --gemini  Use Gemini - default
  -o, --openai  Use OpenAI
  -c, --claude  Use Claude
  --mode        Call Mode Select Prompt
  -h, --help    display help for command
```

When you run `skeet ai`, the following prompt will appear. Try talking to it.

```bash
$ skeet ai
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ Gemini │
╚═════════╧════════╝

🤖 Skeet AI Mode
Type `mode` to change AI mode 🤖


Gemini is selected 🤖 (type 'q' to quit)


? What can I do for you?

You:
```

You can ask the AI assistant questions about your project's development or ask for code generation.

To switch to OpenAI, run the following command.

※ ⚠️ To use OpenAI, you need to set the following environment variables in `.env`.

- `CHAT_GPT_ORG`
- `CHAT_GPT_KEY`

```bash
$ skeet ai --openai
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ OpenAI │
╚═════════╧════════╝
```

To use Claude, run the following command.

※ ⚠️ To use Claude, you need to set the following environment variable in `.env`.

- `ANTHROPIC_API_KEY`

```bash
$ skeet ai --claude
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ Claude │
╚═════════╧════════╝
```

## Using AI Assistant in Interactive Mode

When you run `skeet ai --mode` or enter `_mode_` during `skeet ai`, you can select from five AI modes.

```bash
You: $ method
Skeet:
? 🤖 Select Mode (Use arrow keys)
❯ firestore
  prisma
  typedoc
  function
  method
```

These modes are:

- firestore: Firestore model file generation assistant
- prisma: Prisma schema file generation assistant
- typedoc: TypeDoc document generation assistant
- function: Firebase Functions function generation assistant
- method: TypeScript function generation assistant

Each mode has the specified AI prompt and can be used to generate code.

Now you are set up to use the Skeet framework 🎉

### - Cloud Usage of Skeet Framework

Skeet Framework requires a Firebase Blaze plan or higher.

Google Cloud Free Program should cover the usage fee for the development environment.

The Google Cloud Free Tier has two parts:

- A 90-day free trial with a $300 credit to use with any Google Cloud services.
- Always Free, which provides limited access to many common Google Cloud resources, free of charge.

[Free cloud features and trial offer](https://cloud.google.com/free/docs/free-cloud-features)

[Firabse Blaze Pricing Plans](https://firebase.google.com/pricing#blaze-calculator)

**⚠️ We also recommend setting things like budget alerts to avoid unexpected charges. ⚠️**

- [Avoid surprise bills](https://firebase.google.com/docs/projects/billing/avoid-surprise-bills)
