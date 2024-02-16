import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { promptUser } from '../ai'
import { spawnSync } from 'child_process'
import { AiLog } from '../aiLog'

export const skeetMode = async (
  input: string,
  skeetAi: SkeetAI,
  logger: AiLog
) => {
  console.log(chalk.blue('Skeet:'), chalk.white(`Running skeet command...`))

  const cmd = `${input.replace(/^\$ skeet/, 'skeet')}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  await promptUser(skeetAi.initOptions, logger)
}
