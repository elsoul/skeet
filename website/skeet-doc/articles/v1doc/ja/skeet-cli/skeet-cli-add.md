---
  id: skeet-cli-add
  title: Skeet Add Command
  description: skeet add command
---

Skeet Add Command creates a new function or method.

```bash
$ skeet help add
Usage: skeet add [options] [command]

Skeet Add Comannd to add new functions

Options:
  -h, --help                 display help for command

Commands:
  functions <functionsName>
  method <methodName>
  model <modelName>
  help [command]             display help for command
```

## Add Cloud Functions

Run the following command to add a function.

```bash
$ skeet add functions <functionName>
```

new function will be created in the following directory.

```bash
├── functions
│   ├── skeet
│   └── <functionName>
```

## Add Method

If you want to add a method to an existing Cloud Functions,
run the following command and select the instance type.

```bash
$ skeet add help method
Usage: skeet add method [options] <methodName>

Arguments:
  methodName  Method Name - e.g. addStreamUserChat

Options:
  -h, --help  display help for command
```

e.g http method name - _createArticle_

```bash
$ skeet add method createArticle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
❯ http
  firestore
  pubSub
  scheduler
  auth
```

Select the function to add the method to.

```bash
$ skeet add method createArticle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
❯ http
  firestore
  pubSub
  scheduler
  auth
```

Next, select the function to add the method to.

```bash
? Select Instance Type to add http
? Select Functions to add (Use arrow keys)
   = Functions =
❯ skeet
  solana
? Select Instance Type to add http
? Select Functions to add skeet
✔️ ./functions/skeet/src/types/http/createArticleParams.ts created!
✔️ ./functions/skeet/src/routings/http/createArticle.ts created!
```

New method and type definitions will be created.
