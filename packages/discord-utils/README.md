<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/discord-utils">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/discord-utils">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/discord-utils">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/discord-utils">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-discord-utils/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-discord-utils/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## Skeet Framework Plugin - Discord Utils

## 🧪 Dependency 🧪

- [Discordjs](https://github.com/discordjs/discord.js) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0

## Installation

```bash
$ yarn add @skeet-framework/discord-utils
```

with Skeet Framework CLI

```bash
$ skeet yarn add -p @skeet-framework/discord-utils
```

## Usage

```ts
const token = 'your_discord_token_here'
const channelId = 'your_channel_id_here'
const body = {
  content: 'Hello, world!',
}

const run = async () => {
  try {
    const message = await messageChannel(token, channelId, body)
    console.log(`Message sent with ID: ${message.id}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

run()
```

more examples can be found in typedoc;

- [https://elsoul.github.io/skeet-discord-utils/](https://elsoul.github.io/skeet-discord-utils/)

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

- [Discordjs](https://github.com/discordjs/discord.js)
- [Node](https://nodejs.org/)

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
