import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { promptUser } from '../ai'
import { yesOrNoMode } from './yesOrNoMode'
import { existsSync, readFileSync } from 'fs'

export const initMode = async (skeetAi: SkeetAI, rl: readline.Interface) => {
  console.log(chalk.cyan('⚙️ Skeet Initialize Mode ⚙️'))
  console.log(
    chalk.white(
      `Please give me a file path for the functions you want to document.`
    )
  )
  rl?.question(chalk.green('\nYou: '), async (input: string) => {
    const fileString =
      existsSync(input) === false ? input : readFileSync(input, 'utf8')
    const aiResponse = await skeetAi.typedoc(fileString)
    console.log(
      chalk.blue('Skeet:' + chalk.white(' How about this one?\n\n')) +
        `${chalk.white('```typescript\n')}` +
        chalk.white(aiResponse) +
        `${chalk.white('\n```')}`
    )
    const text = '\n❓ Is this document good for you? (Yes/No) '
    const isYes = (await yesOrNoMode(rl, text)) as boolean
    if (!isYes) {
      initMode(skeetAi, rl)
      return
    }
    promptUser(skeetAi.initOptions)
  })
  return
}
