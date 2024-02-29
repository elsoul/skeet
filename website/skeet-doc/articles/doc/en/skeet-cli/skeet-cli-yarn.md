---
  id: skeet-cli-yarn
  title: Skeet Yarn Command
  description: skeet yarn command
---

Skeet Yarn Command is a command to run yarn command for multiple functions.

```bash
skeet yarn --help
Usage: skeet yarn [options] <yarnCmd>

Skeet Yarn Comannd to run yarn command for multiple functions

Arguments:
  yarnCmd                Yarn Command - e.g. skeet yarn add -D @types/node

Options:
  -p, --p <packageName>  npm package name (default: "")
  -D                     Dependency environment (default: false)
  -h, --help             display help for command
```

## Skeet Yarn Install/Build

Select Functions to run yarn command
Press a key to toggle all functions

```bash
$ skeet yarn install/build
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```

## Add Yarn Package

Select Functions to add yarn package
Press a key to toggle all functions

```bash
$ skeet yarn add -p ${packageName}
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```

For Development

```bash
$ skeet yarn add -p ${packageName} -D
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```
