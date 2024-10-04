---
id: tutorial
title: Tutorial - Firestore
description: A tutorial on creating an AI chat application using the Skeet Framework.
---

## Tutorial - Firestore

In this tutorial, we will use the Skeet Framework to create a chat application. This is a comprehensive development tutorial that encompasses the programming language TypeScript, Firebase Firestore, and GitHub.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

We'll build a basic chatbot application in this tutorial. While the quick start guide introduced the fundamentals of the Skeet Framework, here we will delve into how the Framework's features simplify tasks that used to be more complex. We express our profound gratitude to the developers who have made their libraries available as open source.

The Skeet Framework is designed to enable developers to accomplish more with less code by efficiently utilizing computer resources. Furthermore, with the increasing environmental challenges our planet faces, it is a developer's responsibility to use energy efficiently.

The techniques you'll learn in this tutorial are fundamental to any Skeet Framework app, and mastering them will provide a deeper understanding of Skeet.

In this section, we'll enhance the chatbot application, which was built in the quick start using OpenAI's machine learning API, by adding new features.

## Tutorial Objectives

In this tutorial, you will learn to:

- Obtain the developer authentication key
- Test API requests with Skeet Curl
- Trigger actions upon User creation
- Manipulate data using @skeet-framework/firestore
- Deploy to Firebase

## Prerequisites for the Tutorial

If you haven't completed the [setup](/en/doc/skeet-firestore/setup), please do so first.

## Development Environment

The Skeet Framework recommends using VScode as the editor. By following the framework guidelines, Skeet Framework recommends VScode or Cursor as the editor.
By proceeding with development according to the framework,
Get powerful code completion support using GitHub Copilot and OpenAI.

- [Cursor](https://cursor.sh/)
- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

For the chatbot, we will be using the OpenAI API:

- [OpenAI](https://openai.com/)

## Obtaining the Developer Authentication Key

Let's dive into the development setup. First, launch the Firebase emulator and retrieve the _ACCESS_TOKEN_.

```bash
$ skeet s
```

In a separate window, run the following command to obtain the _accessToken_:

```bash
$ skeet login
🚸 === Copy & Paste below command to your terminal === 🚸

export ACCESS_TOKEN={accessToken}

🚸 =========           END           ========= 🚸

💃Let's try `$ skeet curl <MethodName>` to test request🕺

$ skeet curl createUserChatRoom
     or
$ skeet curl createUserChatRoom --data '{ "model": "gpt4", "maxTokens": 4200 }'
```

By setting the displayed accessToken as an environment variable, you can use the _skeet curl_ command to send API requests.

Acquiring the login authentication key and sending POST requests come at a cost. The Skeet Framework offers the following two commands to help developers streamline their development process:

- skeet login
- skeet curl

## Triggering Actions upon User Creation

Once the login command succeeds, the default _authOnCreateUser.ts_ defined trigger of the Auth instance activates, saving user information in Firebase Firestore. If needed, this trigger can also be used to send notifications to Slack or Discord.

```typescript
import { db } from '@/index'
import { User } from '@/models'
import { add } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import { gravatarIconUrl } from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
const region = skeetConfig.region

export const authOnCreateUser = functions
  .runWith(authPublicOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user
      const userParams = {
        uid,
        email: email || '',
        username: displayName || email?.split('@')[0] || '',
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const userRef = await add<User>(db, 'User', userParams, uid)
      console.log({ status: 'success', userId: userRef.id })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

## Manipulate data using @skeet-framework/firestore

In skeet framework, use _@skeet-framework/firestore_ to
You can add, retrieve, update, and delete data from Firestore.

You can add, retrieve, update, and delete data using Firestore's Converter with code like this:

```typescript
import { db } from '@/index'
import { User } from '@/models'
import { add, get, update, remove } from '@skeet-framework/firestore'

const userCollectionPath = 'User'
const userRef = await add<User>(db, userCollectionPath, userParams, uid)
const user = await get<User>(db, userCollectionPath, uid)
await update<User>(db, userCollectionPath, uid, { username: 'skeet' })
await remove<User>(db, userCollectionPath, uid)
```

See [@skeet-framework/firestore](/en/doc/plugins/skeet-firestore) for details.

## Test API requests with Skeet Curl

Let's send an API request using the _skeet curl_ command.

```bash
$ skeet curl createUserChatRoom
{
   "status" : "success",
   "userChatRoomId" : "dpToDGH4uF96KuCCuDOx"
}
```

UserChatRoom and UserChatRoomMessage created.
Start a chat stream with this UserChatRoomId.

## Check the code of the chat stream

The code for Skeet Functions is
located in the functions directory.
Basically, newly added parts are placed in the _routings_ directory.

For Http triggers, they are placed in _routings/http_.

```bash
$ tree functions
functions
├── skeet
│   ├── routings
│   │   ├── auth
│   │   │   └── authOnCreateUser.ts
│   │   ├── http
│   │   │   ├── addStreamUserChatRoomMessage.ts
│   │   │   ├── addUserChatRoomMessage.ts
│   │   │   ├── addVertexMessage.ts
│   │   │   ├── createUserChatRoom.ts
│   │   │   └── index.ts
.
.
```

_addStreamUserChatRoomMessage_ is called from the frontend by default.

_functions/skeet/routings/http/addStreamUserChatRoomMessage.ts_

```typescript
import { db } from '@/index'
import { onRequest } from 'firebase-functions/v2/https'
import { getUserAuth } from '@/lib'
import { publicHttpOption } from '@/routings/options'
import { AddStreamUserChatRoomMessageParams } from '@/types/http/addStreamUserChatRoomMessageParams'
import { defineSecret } from 'firebase-functions/params'
import {
  UserChatRoom,
  UserChatRoomCN,
  UserCN,
  UserChatRoomMessage,
  UserChatRoomMessageCN,
} from '@/models'
import { OpenAI, OpenAIMessage } from '@skeet-framework/ai'
import { TypedRequestBody } from '@/types/http'
import { add, get, query, update } from '@skeet-framework/firestore'
import { inspect } from 'util'

const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const addStreamUserChatRoomMessage = onRequest(
  { ...publicHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()

    try {
      if (!organization || !apiKey)
        throw new Error(
          `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
        )

      // Get the request body
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // Get user information
      const user = await getUserAuth(req)

      // Get UserChatRoom
      const chatRoomPath = `${UserCN}/${user.uid}/${UserChatRoomCN}`
      const userChatRoom = await get<UserChatRoom>(
        db,
        chatRoomPath,
        body.userChatRoomId
      )

      // Add message to UseChatRoomMessage
      const messagesPath = `${chatRoomPath}/${body.userChatRoomId}/${UserChatRoomMessageCN}`
      await add<UserChatRoomMessage>(db, messagesPath, {
        userChatRoomId: body.userChatRoomId,
        content: body.content,
        role: 'user',
      })

      // Get Messages to send to OpenAI
      const allMessages = await query<UserChatRoomMessage>(db, messagesPath, [
        {
          field: 'createdAt',
          orderDirection: 'desc',
        },
        {
          limit: 5,
        },
      ])
      allMessages.reverse()

      let promptMessages = allMessages.map((message: UserChatRoomMessage) => {
        return {
          role: message.role,
          content: message.content,
        }
      })
      promptMessages.unshift({
        role: 'system',
        content: userChatRoom.context,
      })
      console.log('promptMessages', promptMessages)
      const messages = {
        messages: promptMessages as OpenAIMessage[],
      }

      console.log('messages.length', messages.messages.length)

      // Create OpenAI instance
      const openAi = new OpenAI({
        organizationKey: organization,
        apiKey,
        model: userChatRoom.model,
        maxTokens: userChatRoom.maxTokens,
        temperature: userChatRoom.temperature,
        n: 1,
        topP: 1,
        stream: true,
      })

      // Update the chat room title if this is the first message
      if (messages.messages.length === 2) {
        const title = await openAi.generateTitle(body.content)
        await update<UserChatRoom>(db, chatRoomPath, body.userChatRoomId, {
          title,
        })
      }

      // Send messages to OpenAI
      const stream = await openAi.promptStream(messages)
      const messageResults: any[] = []
      for await (const part of stream) {
        const message = String(part.choices[0].delta.content)
        if (message === '' || message === 'undefined') continue
        console.log(inspect(message, false, null, true /* enable colors */))
        res.write(JSON.stringify({ text: message }))
        messageResults.push(message)
      }

      // Add messages to UserChatRoomMessage
      const message = messageResults.join('')
      await add<UserChatRoomMessage>(db, messagesPath, {
        userChatRoomId: body.userChatRoomId,
        content: message,
        role: 'assistant',
      })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Let's call this function with the ChatRoomID from earlier.
Here we use the _--raw_ option to display the chunk data.

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "dpToDGH4uF96KuCCuDOx", "content": "Hello" }' --raw
{ "text" : "streaming-data" }
```

You can confirm that the stream data is displayed.

You can also use the _skeet list https_ command to see your endpoints.

```bash
$ skeet list https
┌──────────┬──────────────────────────────┬────────────────────────────────────────────────────────────────────────┐
│ Function │ Endpoint                     │ ParamsPath                                                             │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addStreamUserChatRoomMessage │ ./functions/skeet/src/types/http/addStreamUserChatRoomMessageParams.ts │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addUserChatRoomMessage       │ ./functions/skeet/src/types/http/addUserChatRoomMessageParams.ts       │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ addVertexMessage             │ ./functions/skeet/src/types/http/addVertexMessageParams.ts             │
├──────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
│ skeet    │ createUserChatRoom           │ ./functions/skeet/src/types/http/createUserChatRoomParams.ts           │
└──────────┴──────────────────────────────┴────────────────────────────────────────────────────────────────────────┘
```

## Deploy to Firebase

If you are deploying for the first time, use the _skeet init_ command,
Make the necessary settings for your project.

Deploy without setting the domain here.

Make sure you have created Firestore and FirebaseAuth from the links provided in the console.

```bash
$ skeet init
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1
⚠️ Please make sure if you create Firestore & FirebaseAuth ⚠️

Click the link to check 👇
Firestore: https://console.firebase.google.com/project/skeet-demo/firestore
FirebaseAuth: https://console.firebase.google.com/project/skeet-demo/authentication

📗 Doc: https://skeet.dev/doc/skeet-firestore/initial-deploy/

? Are you sure if you already set them up? yes
? Do you want to setup your domain? no
Function URL (skeet:root(europe-west6)): https://root-iolvuu5bzq-oa.a.run.app
i  functions: cleaning up build files...

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overvie
```

You have successfully deployed to Firebase Functions.

## Synchronization of type definitions

Skeet Framework allows you to synchronize type definitions to the front end.

```bash
$ skeet sync types
⏳ Syncing openai...
📃 Copying functions/openai/src/types/http/addUserChatRoomMessageParams.ts to src/types/http/openai/addUserChatRoomMessageParams.ts
✔️ File copied: src/types/http/openai/addUserChatRoomMessageParams.ts
📃 Copying functions/openai/src/types/http/createUserChatRoomParams.ts to src/types/http/openai/createUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/createUserChatRoomParams.ts
📃 Copying functions/openai/src/types/http/getUserChatRoomParams.ts to src/types/http/openai/getUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/getUserChatRoomParams.ts
```

This command copies the type definitions in _src/types/http_ on the backend to _src/types/http/{FunctionsName}_ on the frontend.

## Sync Models

```bash
$ skeet sync models
  skeet
? Select Original Copy of Model skeet
latestModel: skeet
Syncing skeet...
Copying functions/skeet/src/models/index.ts to src/types/models/index.ts
✔️ File copied: src/types/models/index.ts
Copying functions/skeet/src/models/userModels.ts to src/types/models/userModels.ts
✔️ File copied: src/types/models/userModels.ts
Synced Models Types 🎉
```

This command copies the model from _src/models_ on the backend to _src/types/models_ on the frontend.
Also, if you have multiple functions, select the latest model and copy it to the model of the other functions.

## Skeet yarn build

With the Skeet yarn build command
Press the a key to build all functions.

```bash
$ skeet yarn build
```

## Deploying Skeet Framework

Skeet Framework has two deployment methods.

- CI/CD with GitHub Actions
- Deploy with Skeet CLI

## CI/CD with GitHub Actions

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
```

GitHub Actions automatically deploy when you push to GitHub.

**⚠️ [Deploy for Production](/en/doc/skeet-firestore/initial-deploy/) must be completed. ⚠️**

## Deploy with Skeet CLI

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```

Select the _functions_ to deploy,
Deploy only selected _functions_.
Press a to select all _functions_.

Skeet Framework is now deployed 🎉
Now all you have to do is implement your idea 🎉
