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
}
