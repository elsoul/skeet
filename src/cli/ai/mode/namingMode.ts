import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { promptUser } from '../ai'
import { yesOrNoMode } from './yesOrNoMode'

export const namingMode = async (skeetAi: SkeetAI, rl: readline.Interface) => {
  console.log(chalk.cyan('⚙️ Naming Mode ⚙️'))
  rl?.question(chalk.green('\nYou: '), async (input: string) => {
    const prompt = {
      context: `あなたは TypeScript の関数の名前をつけるスペシャリストです。ユーザーは作成したい関数の要約を尋ねてくるので、4文字から20文字ほどの作成したい事象に関連する関数名をキャメルケースで返却して下さい。`,
      examples: [
        {
          input: 'Create a user',
          output: 'createUser',
        },
        {
          input: 'Use GitHub API to get user data',
          output: 'getGitHubUserData',
        },
      ],
    }
    promptUser(skeetAi.initOptions)
  })
  return
}
