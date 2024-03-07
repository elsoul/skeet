<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/ai">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/ai">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/ai">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/ai">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-ai/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-ai/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## Skeet Framework Plugin - AI

Skeet AI Plugin for Multile Chat Models.

chat function can call Gemini and OpenAI with the same arguments, making it easy to compare the results of Gemini and OpenAI.

This plugin wraps the following AI models.

- [Vertex AI(Google Cloud)](https://cloud.google.com/vertex-ai/)
- [Open AI(ChatGPT)](https://openai.com/)

Fast and easy to deploy with Skeet Framework.

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^20.0.0
- [Pnpm](https://pnpm.io/) ^8.0.0
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0

## Installation

```bash
$ pnpm add @skeet-framework/ai
```

# Initial Setup - Vertex AI (Google Cloud)

Enable API and Permissions on GCP.

if you havent installed Skeet CLI, install it.

```bash
$ gcloud auth application-default
$ pnpm add -g @skeet-framework/cli
```

and run `skeet iam ai` command.

```bash
$ skeet iam ai
? What's your GCP Project ID your-project-id
? Select Regions to deploy asia-east1
✔ Successfully created ./skeet-cloud.config.json 🎉
🚸 === Copy & Paste below command to your terminal === 🚸

export GCLOUD_PROJECT=your-project-id
export REGION="us-central1"

🚸 =========           END           ========= 🚸
```

And set environment variables following the console's output.

**Note: options overwrite the environment variables**

# Initial Setup - Open AI (ChatGPT)

## Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![OpenAI ChatGPT API](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

## Usage

chat function can call Gemini and OpenAI with the same arguments, making it easy to compare the results of Gemini and OpenAI.

```ts
import { chat } from '@skeet-framework/ai'

const context = 'You are a helpful assistant.'
const examples = [
  {
    input: 'What is the capital of France?',
    output: 'The capital of France is Paris.',
  },
  {
    input: 'What is the capital of Spain?',
    output: 'The capital of Spain is Madrid.',
  },
  {
    input: 'What is the capital of Italy?',
    output: 'The capital of Italy is Rome.',
  },
]
const input = 'What is the capital of France?'

const gemini = await chat(context, examples, input, 'Gemini')
const openai = await chat(context, examples, input, 'OpenAI')
```

# Skeet AI Docs

- [Skeet AI TypeDoc](https://elsoul.github.io/skeet-ai/)

## Skeet Framework Document

- [https://skeet.dev](https://skeet.dev)

## Skeet TypeScript Serverless Framework

GraphQL, CloudSQL, Cloud Functions, TypeScript, Jest Test, Google Cloud Load Balancer, Cloud Armor

## What's Skeet?

TypeScript Serverless Framework 'Skeet'.

The Skeet project was launched with the goal of reducing software development, operation, and maintenance costs.

Build Serverless Apps faster.
Powered by TAI, Cloud Functions, Typesaurus, Jest, Prettier, and Google Cloud.

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [GitHub CLI](https://cli.github.com/)

```bash
$ npm i -g @skeet-framework/cli
$ skeet create web-app
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
