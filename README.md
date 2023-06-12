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

Doc: https://skeet.dev/

## What's Skeet?

Reduce app development and maintenance costs.

The Skeet project was launched with the goal of reducing software development, operation, and maintenance costs.

Build Serverless Apps faster.
Powered by TypeScript, Firebase Cloud FireStore, Jest, Prettier, and Google Cloud Functions 2nd Generation.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [GitHub CLI](https://cli.github.com/)
- [Skeet Framework Plugin - Firestore](https://skeet.dev/doc/backend/skeet-firestore/)

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

### Install Skeet CLI

```bash
$ npm i -g @skeet-framework/cli
```

### Create Skeet App

```bash
$ skeet create ${appName}
```

### Run local

```bash
$ cd ${appName}
$ skeet s
```

Now you can access;

[http://localhost:4000/](http://localhost:4000/)

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

- [Skeet Doc](https://skeet.dev/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-cli This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
