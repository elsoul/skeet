import chalk from 'chalk'
import { AIType, chat } from '@skeet-framework/ai'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetAIOptions } from '..'
import { skeetAiPrompt } from '../ai/skeetPrompt'

export async function checkAi(options: SkeetAIOptions): Promise<void> {
  console.log(chalk.blue('🔍 Checking Your Cloud Status...'))

  const aiOptions = {
    ai: (options.ai as AIType) || ('Gemini' as AIType),
  }

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
