import { AIType, OpenAI, SkeetAI, generatePrompt } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { Readable } from 'stream'
import { skeetOpenAiPrompt, skeetAiPrompt } from './skeetPrompt'
import { spawnSync } from 'child_process'
import { prismaMode } from './prisma'
import { vertexStream } from './vertexStream'
import { openaiStream } from './openaiStream'

let rl: readline.Interface | null = null

export async function promptUser(options = { ai: '' }): Promise<void> {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }
  const aiOptions = {
    ai: (options.ai as AIType) || ('VertexAI' as AIType),
    maxTokens: 1000,
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
      promptUser({
        ai: aiOptions.ai,
      })
      return
    }

    const skeetAi = new SkeetAI({
      ai: aiOptions.ai,
      maxTokens: aiOptions.maxTokens,
    })

    if (aiOptions.ai === 'VertexAI') {
      try {
        console.log(chalk.blue('Skeet:'))

        if (input.toLowerCase().match(/^\$ prisma$/)) {
          await prismaMode(rl!, aiOptions.ai, skeetAi)
          return
        }

        if (input.toLowerCase().match(/^\$ skeet/)) {
          console.log(
            chalk.white('Skeet:'),
            chalk.white(`Running skeet command...`)
          )

          const cmd = `${input.replace(/^\$ skeet/, 'skeet')}`
          spawnSync(cmd, { shell: true, stdio: 'inherit' })
          promptUser({
            ai: aiOptions.ai,
          })
          return
        }
        const prompt = generatePrompt(
          skeetAiPrompt.context,
          skeetAiPrompt.examples,
          input,
          aiOptions.ai
        )
        const response = await skeetAi.aiInstance.prompt(prompt)
        const stream = stringToStream(response)
        vertexStream(stream)
      } catch (error) {
        console.error('Error:', error)
        rl?.close()
      }
    } else {
      try {
        const openAi = new OpenAI({
          maxTokens: aiOptions.maxTokens,
          model: 'gpt-4',
        })
        console.log(chalk.green('You:'), chalk.white(input))
        console.log(chalk.blue('Skeet:'))
        const stream = await openAi.promptStream(skeetOpenAiPrompt(input))
        openaiStream(stream)
      } catch (error) {
        console.error('Error:', error)
        rl?.close()
      }
    }
  })
}

export async function promptUser2(options = { ai: '' }): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const aiOptions = {
    ai: options.ai || 'VertexAI',
    maxTokens: 1000,
  }
}

function stringToStream(str: string): Readable {
  const stream = new Readable()
  stream.push(str)
  stream.push(null) // EOF
  return stream
}

function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}
