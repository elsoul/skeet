import chalk from 'chalk'
import inquirer from 'inquirer'
import { AIType, chat } from '@skeet-framework/ai'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetAIOptions } from '..'
import { AiLog } from '../ai/aiLog'
import { skeetAiPrompt } from '../ai/skeetPrompt'

export async function checkAi(
  options: SkeetAIOptions,
  logger: AiLog,
): Promise<void> {
  const log = logger.text() as SkeetLog
  const aiOptions = {
    ai: (options.ai as AIType) || ('Gemini' as AIType),
  }

  console.log('\n')

  console.log(chalk.blue('Skeet:'))

  const config = await readOrCreateConfig()
  const skeetPrompt = await skeetAiPrompt()
  await chat(
    skeetPrompt.context,
    skeetPrompt.examples,
    config.app.cloudStatus,
    aiOptions.ai,
  )
}
