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

# Skeet Solana Utils

This plugin is a collection of utilities for Solana.
Especially works with [Skeet Framework](https://skeet.dev).

## Installation

```bash
npm install @skeet-framework/solana-utils
```

with Skeet Framework

```bash
skeet yarn add -p @skeet-framework/solana-utils
```

## Usage

Checks whether a validator is active on the Solana network.

```typescript
import { isValidatorActive } from '@skeet-framework/solana-utils'

const rpcUrl = 'https://api.mainnet-beta.solana.com'
const vateAccountPubkey = 'vateAccountPubkey'
const status = await isValidatorActive(rpcUrl, vateAccountPubkey)
console.log(status)
```

Retrieves the last staking reward for a given stake account on the Solana blockchain.

```typescript
import { getLastStakingReward } from '@skeet-framework/solana-utils'

const rpcUrl = 'https://api.mainnet-beta.solana.com'
const stakeAccountPubkey = 'stakeAccountPubkey'
const reward = await getLastStakingReward(rpcUrl, stakeAccountPubkey)
console.log(reward)
```

more functions can be found in the

- [Skeet Solana Utils TypeDoc](https://elsoul.github.io/skeet-solana-utils/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).

```

```
