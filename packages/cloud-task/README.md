<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/cloud-task">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/cloud-task">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/cloud-task">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/cloud-task">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-cloud-task/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-cloud-task/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

# Skeet Solana Utils

This plugin is a collection of utilities for Solana.
Especially works with [Skeet Framework](https://skeet.dev).

## Installation

```bash
pnpm add -g @skeet-framework/cloud-task
```

## Usage

Checks whether a validator is active on the Solana network.

```typescript
import { createTask } from '@skeet-framework/cloud-task'

const project = 'your-project-id'
const location = 'your-location'
const queue = 'your-queue'
const endpoint = 'https://your.endpoint.url'
const body = { key: 'value' }
const inSeconds = 60 // 1 minute from now
const result = await createTask(
  project,
  location,
  queue,
  endpoint,
  body,
  inSeconds,
)
console.log(result)
```

more functions can be found in the

- [Skeet Cloud Task TypeDoc](https://elsoul.github.io/skeet-cloud-task/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
