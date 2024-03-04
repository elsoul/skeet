<a href="https://skeet.dev">
  <img src="https://user-images.githubusercontent.com/20677823/221215449-93a7b5a8-5f33-4da8-9dd4-d0713db0a280.png" alt="Skeet Framework Logo">
</a>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/spreadsheet-utils">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/spreadsheet-utils">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/spreadsheet-utils">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/spreadsheet-utils">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-spreadsheet/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-spreadsheet/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

# Skeet Spreadsheet Utils

This plugin is a collection of utilities for Spreadsheet.
Especially works with [Skeet Framework](https://skeet.dev).

## Installation

```bash
npm install @skeet-framework/spreadsheet-utils
```

with Skeet Framework

```bash
skeet yarn add -p @skeet-framework/spreadsheet-utils
```

## Usage

The function assumes that the 'GOOGLE_APPLICATION_CREDENTIALS' environment variable is set with the path to the Google service account credentials JSON file.
It returns the data from the spreadsheet.

```typescript
import { addDataToSheet } from '@skeet-framework/spreadsheet-utils'

const spreadsheetId = 'spreadsheetId'
const sheetTitle = 'sheetTitle'
const run = async () => {
  const value = [
    ['Date', 'Name', 'Address', 'Amount(SOL)', 'Epoch', 'PostBalance(SOL)'],
    [1, 2, 3, 4, 5, 6],
  ]
  const data = await addDataToSheet(spreadsheetId, sheetTitle, value)
  console.log(data)
}

run()
```

more functions can be found in the

- [Skeet Spreadsheet Utils TypeDoc](https://elsoul.github.io/skeet-spreadsheet-utils/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-spreadsheet-utils This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md).
