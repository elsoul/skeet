import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { promptUser } from '../ai'
import { spawnSync } from 'child_process'

export const skeetMode = async (input: string, skeetAi: SkeetAI) => {
  console.log(chalk.blue('Skeet:'), chalk.white(`Running skeet command...`))

  const cmd = `${input.replace(/^\$ skeet/, 'skeet')}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  await promptUser(skeetAi.initOptions)
}
