import chalk from 'chalk'

export module Logger {
  export const successHex = chalk.hex('#39A845')
  export const warningHex = chalk.hex('#FFD02E')
  export const errorHex = chalk.hex('#B5332E')
  export const syncHex = chalk.hex('#3073B7')
  export const greyHex = chalk.hex('#BEBDBD')
  export const indigoHex = chalk.hex('#3950A0')
  export const pinkHex = chalk.hex('#D8A1C4')

  export const success = async (text: string) => {
    console.log(successHex(text))
  }

  export const warning = async (text: string) => {
    console.log(warningHex(text))
  }

  export const error = async (text: string) => {
    console.log(errorHex(text))
  }

  export const errorString = async (text: string) => {
    return errorHex(text)
  }

  export const sync = async (text: string) => {
    console.log(syncHex(text))
  }

  export const grey = async (text: string) => {
    console.log(greyHex(text))
  }

  export const skeetAA = async () => {
    const row1SKEE = Logger.syncHex('   _____ __ __ ____________')
    const row1T = Logger.errorHex('______')
    const row2SKEE = Logger.syncHex('  / ___// //_// ____/ ____/')
    const row2T = Logger.errorHex('_  __/')
    const row3SKEE = Logger.syncHex('  \\__ \\/ ,<  / __/ / __/ ')
    const row3T = Logger.errorHex('  / / ')
    const row4SKEE = Logger.syncHex(' ___/ / /| |/ /___/ /___ ')
    const row4T = Logger.errorHex(' / /    ')
    const row5SKEE = Logger.syncHex('/____/_/ |_/_____/_____/')
    const row5T = Logger.errorHex(' /_/    🛠️🛠️')
    console.log(`${row1SKEE}${row1T}`)
    console.log(`${row2SKEE}${row2T}`)
    console.log(`${row3SKEE}${row3T}`)
    console.log(`${row4SKEE}${row4T}`)
    console.log(`${row5SKEE}${row5T}`)
  }

  export const welcomText = async (appName: string) => {
    const title = warningHex(
      '\n⚡⚡⚡ Buidl TypeScript Fullstack App Fast ⚡⚡⚡'
    )
    const text = `
$ cd ${appName}
$ skeet s
Go To : http://127.0.0.1:4000/`
    console.log(title)
    console.log(greyHex(text))
  }

  export const cmText = async () => {
    const text = `
    💃🤝🕺 We Support OpenSource Software Comunities 💃🤝🕺
  Why?  - OpenSouce Software Comunities should be deserved more 💎
  How?  - Incentivize for OpenSource Software Developments 💰
  What? - Solve/Create GitHub Issues as always 🛠️
  Epics Alpha: https://alpha.epics.dev/en/how-it-works/
  `
    console.log(successHex(text))
  }
}
