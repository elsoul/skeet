import chalk from 'chalk'
import { skeetAiPrompt } from './skeetPrompt'
import inquirer from 'inquirer'
import { AiLog } from './aiLog'
import { SkeetAIOptions } from '.'
import { AIType, chat } from '@skeet-framework/ai'
import { modeSelect } from './modeSelect'
import { skeetMode } from './mode/skeetMode'

export async function promptUser(
  options: SkeetAIOptions,
  logger: AiLog,
): Promise<void> {
  const log = logger.text() as SkeetLog
  const aiOptions = {
    ai: (options.ai as AIType) || ('Gemini' as AIType),
  }

  console.log('\n')
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message:
        chalk.white(`${log.common.start}\n`) +
        chalk.green(`\n${log.common.you}:`),
    },
  ])

  if (userInput.input.toLowerCase() === 'q') {
    console.log(
      chalk.white(`⭐️ ${chalk.blue(aiOptions.ai)} ${log.common.shutdown}...`),
    )
    process.exit(0)
  }
  if (userInput.input.toLowerCase() === '') {
    await promptUser(aiOptions, logger)
    return
  }
  console.log(chalk.blue('Skeet:'))

  if (
    userInput.input.toLowerCase().match(/^\$ mode$/) ||
    userInput.input.toLowerCase() === 'mode'
  ) {
    await modeSelect(aiOptions, logger)
    return
  }

  if (userInput.input.toLowerCase().match(/^\$ skeet/)) {
    await skeetMode(userInput.input, aiOptions, logger)
    return
  }

  const skeetPrompt = skeetAiPrompt('en')
  await chat(skeetPrompt.context, skeetPrompt.examples, userInput.input)
  await promptUser(aiOptions, logger)
}
