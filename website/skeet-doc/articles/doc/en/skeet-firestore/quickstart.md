---
id: backend-quickstart
title: Quickstart - Firestore
description: A simple guide to getting started with the Skeet framework.
---

## Installing Skeet CLI

Skeet CLI is a command line tool for efficiently using the Skeet framework. You can install it with the following command.
If npm is already installed, you can install it with the following command.

```bash
$ npm i -g @skeet-framework/cli
```

If npm is not installed, you can install it with the following command.
(This command installs pnpm, Java, @skeet-framework/cli and edits .profile/.zshrc.)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/install-v2.0.1)"
```

## Creating a Google Cloud Project

By creating a Google Cloud Project, you can utilize various resources of Google Cloud. Please refer to the official Google Cloud documentation to create a new project.

- [Creating a Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects?hl=en)

## Enabling Google Cloud VertexAI

Skeet is integrated with Google Cloud VertexAI. Please enable VertexAI using the following command.

```bash
$ skeet iam ai
```

## Launching Skeet AI Assistant

The Skeet AI Assistant is an interactive tool for handling various queries.

```bash
$ skeet ai
```

Upon launching, you will see a prompt like the one below. Try speaking to it.

```bash
╔══════════════╤════════════════╗
│ Option       │ Value          │
╟──────────────┼────────────────╢
│ AI Type      │ VertexAI       │
╟──────────────┼────────────────╢
│ Model        │ chat-bison@001 │
╟──────────────┼────────────────╢
│ Max Tokens   │ 1000           │
╟──────────────┼────────────────╢
│ Emotion Size │ 0              │
╚══════════════╧════════════════╝

🤖 Skeet AI Mode
 $ <mode> to change AI mode 🤖

$ prisma
$ typedoc
$ translate
$ firestore
$ function
$ method
$ help
$ q

VertexAI has been selected 🤖 (Enter 'q' to quit)


? How can I assist you?

You:
```

## Launching Skeet AI Firestore Mode

While Skeet AI is running, if you type _$ firestore_, it will switch to a mode for generating Firestore models. When launched, you will be asked to provide information about your database use case. Let's try entering "I want to create a blog site."

````bash
You: $ firestore
Skeet:
🔥 Firestore Model Generation Mode 🔥
? Please describe your use case for Firestore.

Example: I want to create a blog app.

You: I want to create a blog app.
Skeet: How about this?

```postModels.ts
import { Timestamp, FieldValue } from '@skeet-framework/firestore'
import { UserCN } from '@/models/userModels'

// CollectionId: Post
// DocumentId: auto
// Path: User/${UserId}/Post
export const PostCN = 'Post'
export const genPostPath = (userId: string) => `${UserCN}/${userId}/${PostCN}`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}
```

? May I create this file?:
postModels.ts (Use arrow keys)
❯ Yes
No
````

If you select Yes, `postModels.ts` will be automatically generated.
