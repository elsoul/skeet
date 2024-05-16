## Tutorial - GraphQL

In this tutorial, we will create a chat app using the Skeet Framework GraphQL. This is a comprehensive cloud app development tutorial that includes the programming language TypeScript, GraphQL, and GitHub.

![https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

In this tutorial, we will create a basic chatbot app. In the Quick Start, you learned the basics of using Skeet Framework GraphQL, but in this tutorial, you will learn how the features of the Skeet Framework can make things that were not easy before, easy. We express our deep gratitude to the developers who have published the library as open source.

The Skeet Framework is designed to allow developers to achieve more with less code by efficiently using computer resources. Furthermore, in today's world where environmental issues are becoming serious, we believe that it is the responsibility of developers to use energy efficiently.

The techniques you will learn in this tutorial are basic for any Skeet Framework app and mastering them will give you a deep understanding of Skeet.

In this chapter, we will add new features to the chatbot app using the machine learning (OpenAI) API that we created in the Quick Start.## Tutorial Objectives

In this tutorial, you will learn how to:

- Define an RDB schema
- Execute database migrations
- Generate GraphQL files using Scaffold
- Obtain a development login authentication key
- Send API requests using the GraphQL Playground
- Deploy to Cloud Run## Prerequisites for the Tutorial

Please complete the [Quick Start](/en/doc/skeet-graphql/quickstart) if you have not done so already.## Development Environment

The Skeet Framework recommends using VScode as your editor. By following the framework, you can receive powerful code completion support using GitHub Copilot.

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

For chatbots, we use the OpenAI API.

- [OpenAI](https://openai.com/)

Skeet GraphQL recommends schema-driven development. With schema-driven development, you can minimize what developers need to focus on by defining a schema.

For RDBMS, we use PostgreSQL or MySQL. For ORM, we use Prisma.

- [PostgreSQL](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/?via=ELSOULLABO)## Installation of Skeet CLI

Skeet CLI is a command-line tool for efficiently using the Skeet framework. You can install it with the following command.

```bash
$ npm i -g @skeet-framework/cli
```

### Example of Vscode settings

By adding the following settings to Vscode's _settings.json_, you can streamline development.

**⚠️ These settings are just an example. ⚠️**

```json
{
  "workbench.colorTheme": "One Monokai",
  "files.autoSave": "onFocusChange",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "explorer.confirmDelete": false,
  "editor.suggestSelection": "first",
  "editor.formatOnSave": true,
  "files.autoGuessEncoding": true,
  "launch": {
    "inputs": [],
    "configurations": [],
    "compounds": []
  },
  "indentRainbow.errorColor": "rgba(128,32,32,0)",
  "security.workspace.trust.untrustedFiles": "open",
  "json.schemas": [],
  "explorer.confirmDragAndDrop": false,
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnType": true,
  "terminal.integrated.defaultProfile.linux": "zsh",
  "terminal.integrated.enableMultiLinePasteWarning": false,
  "debug.disassemblyView.showSourceCode": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "workbench.iconTheme": "material-icon-theme",
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "editor.inlineSuggest.enabled": true,
  "settingsSync.ignoredExtensions": [],
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "scminput": false
  }
}
```

The settings for the following files will be automatically set by the _skeet create_ command.

- .eslintrc.json
- .eslintignore
- .prettierrc
- .prettierignore
- tsconfig.json## Defining RDB Schema

With Skeet Framework, you can automatically generate GraphQL schemas by defining RDB schemas.

The default model is as follows.

_graphql/prisma/schema.prisma_

```typescript
generator client {
  provider = "prisma-client-js"
}

generator nexusPrisma {
  provider = "nexus-prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  MASTER
}

model User {
  id                 Int                  @id @default(autoincrement())
  uid                String               @unique
  username           String?
  email              String               @unique
  iconUrl            String?
  role               Role                 @default(USER)
  iv                 String?
  createdAt          DateTime             @default(now())
  updatedAt          DateTime             @updatedAt
  chatRoomMessages   ChatRoomMessage[]
  userChatRooms      UserChatRoom[]
  UserVertexChatRoom UserVertexChatRoom[]

  @@index([username])
}

model ChatRoom {
  id               Int               @id @default(autoincrement())
  name             String?
  title            String?
  model            String            @default("gpt4")
  maxTokens        Int               @default(500)
  temperature      Int               @default(0)
  stream           Boolean           @default(false)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  chatRoomMessages ChatRoomMessage[]
  userChatRooms    UserChatRoom[]
}

model ChatRoomMessage {
  id         Int      @id @default(autoincrement())
  role       String
  content    String
  userId     Int
  chatRoomId Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  User       User     @relation(fields: [userId], references: [id])
  ChatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])
}

model UserChatRoom {
  userId     Int
  chatRoomId Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  User       User     @relation(fields: [userId], references: [id])
  ChatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])

  @@id([userId, chatRoomId])
}

model VertexChatRoom {
  id                    Int                     @id @default(autoincrement())
  name                  String?
  title                 String?
  model                 String                  @default("chat-bison@001")
  maxTokens             Int                     @default(256)
  temperature           Float                   @default(0.2)
  topP                  Float                   @default(0.95)
  topK                  Int                     @default(40)
  context               String                  @default("You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.")
  isShared              Boolean                 @default(false)
  createdAt             DateTime                @default(now())
  updatedAt             DateTime                @updatedAt
  VertexChatRoomExample VertexChatRoomExample[]
  VertexChatRoomMessage VertexChatRoomMessage[]
  UserVertexChatRoom    UserVertexChatRoom[]

  @@index([name])
  @@index([title])
}

model VertexChatRoomExample {
  id               Int            @id @default(autoincrement())
  vertexChatRoomId Int
  input            String         @default("What is the Skeet framework?")
  output           String         @default("The Skeet framework is a Typescript framework for building web applications using Typescript and React.")
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
  VertexChatRoom   VertexChatRoom @relation(fields: [vertexChatRoomId], references: [id])

  @@unique([vertexChatRoomId, input, output])
  @@index([input])
  @@index([output])
}

model UserVertexChatRoom {
  userId           Int
  vertexChatRoomId Int
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
  User             User           @relation(fields: [userId], references: [id])
  VertexChatRoom   VertexChatRoom @relation(fields: [vertexChatRoomId], references: [id])

  @@id([userId, vertexChatRoomId])
}

model VertexChatRoomMessage {
  id               Int            @id @default(autoincrement())
  role             String
  content          String
  vertexChatRoomId Int
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
  VertexChatRoom   VertexChatRoom @relation(fields: [vertexChatRoomId], references: [id])

  @@index([content])
}
```

Sample models necessary for creating a chatbot app using OpenAI and VertexAI APIs are defined.### Running the skeet db generate command

Execute the following command to configure prisma and the database.

````bash
$ skeet db generate
```### Adding Models

You can add models directly to _schema.prisma_, but by running the _$ prisma_ mode of the _skeet ai_ command, you can automatically generate templates for Prisma models.

Also, by using the _prettier-plugin-prisma_ plugin, you can automatically format Prisma schemas.### Running skeet ai in Prisma Mode

After running the _skeet ai_ command, entering _$ prisma_ will put you in Prisma Mode.

```bash
$ skeet ai
╔═════════════╤════════════════╗
│ Option      │ Value          │
╟─────────────┼────────────────╢
│ AI Type     │ VertexAI       │
╟─────────────┼────────────────╢
│ Model       │ chat-bison@001 │
╟─────────────┼────────────────╢
│ Max Tokens  │ 1000           │
╟─────────────┼────────────────╢
│ Temperature │ 0              │
╚═════════════╧════════════════╝
VertexAI is selected 🤖 (type "q" to quit)
You: $ prisma
Skeet:
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.
````

You can add models as follows.

````bash
You: $ prisma
Skeet:
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.
You: I want to add a blog feature, so I want to add Post and Comment models.
Skeet: How about this one?

(Showing only the new parts of the models. prisma format (also there is vscode plugin) will add the relations automatically to the existing models.)

```prisma.schema
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
  User      User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

❓ Is this schema good for you? (Yes/No)
````

In this way, you can use the skeet ai command to automatically generate model templates.
If you are satisfied with this content, entering _Yes_ will cause the AI to automatically generate and display the next necessary migration command from the schema content.

````bash
❓ Is this schema good for you? (Yes/No) yes

Edit: ./graphql/prisma/schema.prisma

Then run: skeet db migrate addPostAndComment


❓ Do you want me to run the migration now? (Yes/No)
```### Editing prisma.schema

With the skeet framework, you can create migration files using the _skeet db migrate <migrationName>_ command. When you run the _skeet ai_ command as above, it suggests name candidates by inferring from the new schema to add <migrationName>.

Copy the schema and paste it into _schema.prisma_. When you save, the format is automatically done, and the relations are automatically added.### Execute the skeet db migrate <migrationName> command

Next, if you input _yes_, the command will be executed, and a migration file will be created.

```bash
❓ Do you want me to run the migration now? (Yes/No) yes
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "skeet-api-dev", schema "public" at "localhost:5432"

Applying migration `20230830074747_add_post_comment_and_user`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230830074747_add_post_comment_and_user/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... - Nexus Prisma
✔ Generated Prisma Client (v5.2.0) to ./node_modules/@prisma/client in 97ms
✔ Generated Nexus Prisma to ./node_modules/.nexus-prisma in 35ms

Then run: skeet g scaffold
❓ Do you want me to run scaffold now? (Yes/No)
```### Running the skeet g scaffold command

Once the migration file is created, you can automatically generate a GraphQL API with CRUD functionality by executing the _skeet g scaffold_ command.

```bash
❓ Do you want me to run scaffold now? (Yes/No) yes
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/mutation.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/model.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Post/query.ts 🎉
✔ successfully created - ./graphql/src/graphql/modelManager/Post/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/mutation.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/model.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/Comment/query.ts 🎉
✔ successfully created - ./graphql/src/graphql/modelManager/Comment/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/index.ts 🎉
✔ successfully created ✔ - ./graphql/src/graphql/modelManager/index.ts 🎉
````

In this way, with Skeet GraphQL, you can automatically generate GraphQL schemas by defining the schema.### Opening the GraphQL Playground

Now, let's run the _$ skeet s_ command to start the emulator.

You can also run the _$ skeet_ command within the skeet ai prompt.

```bash
You: $ skeet s
```

If you have added a new GraphQL schema, it will be updated by running the _$ skeet s_ command.

Open the GraphQL Playground and confirm that the schema has been updated.

[http://localhost:4000/graphql](http://localhost:4000/graphql)

![https://storage.googleapis.com/skeet-assets/imgs/backend/graphql-playground-post.png](https://storage.googleapis.com/skeet-assets/imgs/backend/graphql-playground-post.png)

In this way, you can test the GraphQL API from the Apollo Server Playground.

The GraphQL queries created here can be copied and used to create files in _functions/skeet/src/queries_. Later, you can use the _skeetGraphql_ function to send API requests.

In Skeet Framework GraphQL, it is recommended to handle data-related processing in the GraphQL API, and to handle tasks and third-party API processing in functions.

To access the data of the GraphQL API from the instances in Functions, you can use the _skeetGraphql_ function. This allows you to use the queries generated in the Apollo GraphQL Playground to access the GraphQL API directly.

The _skeetGraphql_ function is included in the _@skeet-framwork/utils_ package.

For detailed usage, please refer to the following document.

- [@skeet-framework/utils](/en/doc/plugins/skeet-framework/utils)## Obtaining Development Login Authentication Key

Let's get started with the development preparation. First, start the Firebase emulator and obtain the _ACCESS_TOKEN_.

```bash
$ skeet s
```

In a separate window, execute the following command to obtain the _accessToken_.

```bash
$ skeet login
🚸 === Copy & Paste below command to your terminal === 🚸

export ACCESS_TOKEN={accessToken}

🚸 =========           END           ========= 🚸
```

By setting the accessToken displayed in the console log as an environment variable, you can send API requests using the _skeetGraphql_ function.

When the login command is successful, the trigger of the Auth instance defined in _authOnCreateUser.ts_ by default is activated, and user information is saved in Firebase Firestore.

You can confirm that the user information is saved by accessing the following URL.

- [http://localhost:4000/auth](http://localhost:4000/auth)

_functions/skeet/routings/auth/authOnCreateUser.ts_

By default, a notification is sent to Discord when a user is created. By setting the _DISCORD_WEBHOOK_URL_ of Discord as an environment variable, you can receive notifications.

```typescript
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  gravatarIconUrl,
  sendDiscord,
  skeetGraphql,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import { defineSecret } from 'firebase-functions/params'
import { inspect } from 'util'
import { CreateUserQuery } from '@/queries'
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

const { region } = skeetConfig

export const authOnCreateUser = functions
  .runWith({
    ...authPublicOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      if (!user.email) throw new Error(`no email`)
      const { uid, email, displayName, photoURL } = user
      const accessToken = 'skeet-access-token'
      const variables = {
        uid: uid,
        email: email,
        username: displayName || email?.split('@')[0],
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const createUserResponse = await skeetGraphql(
        accessToken,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateUserQuery,
        variables
      )

      console.log(
        inspect(createUserResponse, false, null, true /* enable colors */)
      )

      // Send Discord message when new user is created
      const content = `Skeet APP New user: ${variables.username} \nemail: ${variables.email}\niconUrl: ${variables.iconUrl}`
      if (process.env.NODE_ENV === 'production') {
        await sendDiscord(content)
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

After creating a user in Firestore, the user information is also saved in the relational database used by GraphQL with the same _uid_.

The _skeetGraphql_ function is used for data exchange between GraphQL and Functions.

To access data from the GraphQL API from instances in Functions, you can use the _skeetGraphql_ function to use the query generated in the Apollo GraphQL Playground to access the GraphQL API.

The _skeetGraphql_ function is included in the _@skeet-framwork/utils_ package.

For detailed usage, please refer to the following document.

- [@skeet-framework/utils](/en/doc/plugins/skeet-utils)

In Skeet Framework GraphQL, it is recommended to handle data-related processing in the GraphQL API and handle tasks and third-party API processing in functions.## Retrieving User Information

User information can be retrieved from Firebase using

_await getLoginUser(req)_

```typescript
import { getLoginUser } from '@/lib'

const user: UserAuthType = await getLoginUser(req)
```

The return type definition of getLoginUser is by default as follows:

````typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```## Deploying to Cloud Run

```bash
$ skeet deploy
```## Skeet yarn build

The Skeet yarn build command allows you to build all functions by pressing the 'a' key.

```bash
$ skeet yarn build
```## Deploying Skeet Framework

There are two ways to deploy the Skeet Framework.

- CI/CD with GitHub Actions
- Deployment with Skeet CLI## CI/CD with GitHub Actions

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
````

Once you push to GitHub, the deployment will be carried out automatically by GitHub Actions.

**⚠️ You must complete the [Deploy for Production](/en/doc/skeet-firestore/initial-deploy/). ⚠️**## Deploying with Skeet CLI

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ graphql
 ◯ skeet
```

Select the _service_ to deploy,
only the selected _service_ will be deployed.
Press 'a' to select all _services_.

With this, the deployment of the Skeet Framework is complete 🎉
All that's left is to implement your ideas 🎉
