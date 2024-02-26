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

Build generative AI apps quickly and responsibly with Model API, a simple, secure, and multiple AI models are available.

This plugin wraps the following AI models.

- [Vertex AI(Google Cloud)](https://cloud.google.com/vertex-ai/)
- [Open AI(ChatGPT)](https://openai.com/)

Fast and easy to deploy with Skeet Framework.

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0

## Installation

```bash
$ yarn add @skeet-framework/ai
```

with Skeet Framework CLI

```bash
$ skeet yarn add -p @skeet-framework/ai
```

# Initial Setup - Vertex AI (Google Cloud)

Enable API and Permissions on GCP.

if you havent installed Skeet CLI, install it.

```bash
$ gcloud auth application-default
$ npm i -g @skeet-framework/cli
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

## Quick Start

VertexAI

```ts
import { SkeetAI } from '@skeet-framework/ai'

const skeetAi = new SkeetAI({
  ai: 'VetexAI',
})
const result = await skeetAi.chat('Hello')
console.log(result)
```

OpenAI

**Note: You need finished [Initial Setup - Open AI (ChatGPT)](/README.md#initial-setup---open-ai-chatgpt) to use OpenAI API**

```ts
import { SkeetAI } from '@skeet-framework/ai'

const skeetAi = new SkeetAI({
  ai: 'OpenAI',
})
const result = await skeetAi.chat('Hello')
console.log(result)
```

## Vertex AI - Prompt Example

Example `app.ts`

```ts
import { VertexAI, VertexPromptParams } from '@skeet-framework/ai'

const run = async () => {
  const context =
    'You are a developer familiar with the Skeet framework for building web applications.'
  const examples = [
    {
      input:
        'What is the Skeet framework and what benefits does it offer for app development?',
      output:
        'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
    },
  ]
  const content = 'Tell me about the Skeet framework.'
  const prompt = generatePrompt(
    context,
    examples,
    content,
    'VertexAI',
  ) as VertexPromptParams

  const vertexAi = new SkeetAI({
    ai: 'VertexAI',
  })
  const response = await vertexAi.prompt(prompt)
  console.log('Question:\n', prompt.messages[0].content)
  console.log('Answer:\n', response)

  const content =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const promptTitle = await vertexAi.generateTitlePrompt(content)
  const title = await vertexAi.prompt(promptTitle)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
}

run()
```

Run

```bash
$ npx ts-node app.ts
```

# Initial Setup - Open AI (ChatGPT)

## Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![OpenAI ChatGPT API](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

# Usage

## OpenAI

set environment variables

```bash
$ export CHAT_GPT_ORG=org-id
$ export CHAT_GPT_KEY=your-api-key
```

Example `app.ts`

```ts
import { OpenAI, OpenAIPromptParams } from '@skeet-framework/ai'

const run = async () => {
  const context = 'You are a developer familiar with the Skeet framework for building web applications.'
  const examples = [
    {
      input:
        'What is the Skeet framework and what benefits does it offer for app development?',
      output:
        'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
    },
  ]
  const content = 'Tell me about the Skeet framework.'
  const prompt = generatePrompt(
    context,
    examples,
    content,
    'OpenAI'
  ) as OpenAIPromptParams

  const openAi = new SkeetAI({
    ai: 'OpenAI',
  })
  const response = await openAi.prompt(prompt)
  console.log('Question:\n', prompt.messages[0].content)
  console.log('Answer:\n', response)

  const content =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const promptTitle = await openAi.generateTitlePrompt(content)
  const title = await openAi.prompt(promptTitle)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
```

Run

```bash
$ npx ts-node app.ts
```

## Fine-tuning

Fine-tuning is a technique that allows you to customize the model to your specific use case by providing examples of the desired behavior.

### Fine-tuning - OpenAI

Create a JSONL file with the following format.

_./fine-tuning.jsonl_

```jsonl
{"messages":[{"role":"system","content":"You are a senior engineer specialized in assisting developers."},{"role":"user","content":"Give an example of what the Skeet framework could be used for?"},{"role":"assistant","content":"The Skeet framework can be used for a variety of web applications, such as building a Chatbot"}]}
{"messages":[{"role":"system","content":"You are a senior engineer specialized in assisting developers."},{"role":"user","content":"I got a credentials error while trying to use the Skeet framework. What should I do?"},{"role":"assistant","content":"The Skeet framework uses Google Cloud. You might need to login using `gcloud auth application-default login` to use the framework."}]}
```

Example `tuning.ts`

```ts
import { OpenAI } from '@skeet-framework/ai'

const openAi = new SkeetAI({
  ai: 'OpenAI',
})

// Upload JSONL file
const filePath = './fine-tuning.jsonl'
const uploadFile = await openAi.uploadFile(filePath)

// Create Fine-tuning Job
const model = 'gpt-3.5-turbo-0613'
const job = await openAi.createFineTuningJob(uploadFile.id, model)

// Check Fine-tuning Job Status
const jobStatus = await openAi.showFineTuningJob(job.id)
console.log(jobStatus)
```

You can use the fine-tuned model after the job is completed.

## Skeet AI Transration

This method is used to translate .json/.md files from one language to another.

```ts
import { SkeetAI } from '@skeet-framework/ai'

const skeetAi = new SkeetAI()

const translatePaths = {
  paths: ['./README.md', './doc.json'],
  langFrom: 'en',
  langTo: 'ja',
}

await skeetAi.translates(
  translatePaths.paths,
  translatePaths.langFrom,
  translatePaths.langTo,
)
```

This function will generate a translated file in the same directory as the original file.

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
