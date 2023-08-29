import chalk from 'chalk'
import * as readline from 'readline'

export const yesOrNoMode = async (rl: readline.Interface, text: string) => {
  return new Promise((resolve) => {
    rl.question(chalk.white('\n' + text), (answer) => {
      resolve(answer.trim().toLowerCase() === 'yes')
    })
  })
}
