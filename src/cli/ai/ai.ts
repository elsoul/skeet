import {
  AIType,
  OpenAI,
  OpenAIPromptParams,
  SkeetAI,
  VertexAI,
  VertexPromptParams,
  generatePrompt,
} from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { skeetAiPrompt } from './skeetPrompt'
import { vertexStream } from './vertexStream'
import { openaiStream } from './openaiStream'
import { prismaMode } from './mode/prismaMode'
import { SkeetAIOptions } from '@skeet-framework/ai'
import { skeetMode } from './mode/skeetMode'
import { typedocMode } from './mode/typedocMode'

let rl: readline.Interface | null = null

export async function promptUser(options: SkeetAIOptions): Promise<void> {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }
  const aiOptions = {
    ai: (options.ai as AIType) || ('VertexAI' as AIType),
    maxTokens: 1000,
    model: options.model || 'chat-bison@001',
  }

  rl.question(chalk.green('\nYou: '), async (input: string) => {
    if (input.toLowerCase() === 'q') {
      console.log(
        chalk.white(`⭐️ ${chalk.blue(aiOptions.ai)} is shutting down...`)
      )
      rl?.close()
      return
    }
    if (input.toLowerCase() === '') {
      promptUser(aiOptions)
      return
    }
    console.log(chalk.blue('Skeet:'))
    const skeetAi = new SkeetAI(aiOptions)

    if (input.toLowerCase().match(/^\$ prisma$/)) {
      await prismaMode(skeetAi, rl!)
      return
    }
    if (input.toLowerCase().match(/^\$ skeet/)) {
      await skeetMode(input, skeetAi)
      return
    }
    if (input.toLowerCase().match(/^\$ typedoc/)) {
      await typedocMode(skeetAi, rl!)
      return
    }
    if (input.toLowerCase().match(/^\$ debug/)) {
      return
    }
    const prompt = generatePrompt(
      skeetAiPrompt.context,
      skeetAiPrompt.examples,
      input,
      aiOptions.ai
    )

    if (aiOptions.ai === 'VertexAI') {
      try {
        const ai = skeetAi.aiInstance as VertexAI
        const stream = await ai.promptStream(prompt as VertexPromptParams)
        vertexStream(stream, skeetAi.initOptions)
      } catch (error) {
        console.error('Error:', error)
        rl?.close()
      }
    } else {
      try {
        const ai = skeetAi.aiInstance as OpenAI
        const stream = await ai.promptStream(prompt as OpenAIPromptParams)
        openaiStream(stream, skeetAi.initOptions)
      } catch (error) {
        console.error('Error:', error)
        rl?.close()
      }
    }
  })
}
