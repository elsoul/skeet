import chalk from 'chalk'
import { promptUser } from '../ai'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'
import { execAsync } from '@skeet-framework/utils'

export const skeetMode = async (
  input: string,
  options: SkeetAIOptions,
  logger: AiLog,
) => {
  console.log(chalk.blue('Skeet:'), chalk.white(`Running skeet command...`))

  const cmd = `${input.replace(/^\$ skeet/, 'skeet')}`
  await execAsync(cmd)
  await promptUser(options, logger)
}
