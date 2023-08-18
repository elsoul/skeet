import { OpenAI, SkeetAI, VertexAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { Readable } from 'stream'
import { skeetOpenAiPrompt, skeetVertexAiPrompt } from './skeetPrompt'
import { spawnSync } from 'child_process'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export async function promptUser(options = { ai: '' }): Promise<void> {
  const aiOptions = {
    ai: options.ai || 'VertexAI',
    maxTokens: 1000,
  }
  rl.question(chalk.green('\nYou: '), async (input: string) => {
    if (input.toLowerCase() === 'q') {
      console.log(
        chalk.white(`⭐️ ${chalk.blue(aiOptions.ai)} is shutting down...`)
      )
      rl.close()
      return
    }

    if (aiOptions.ai === 'VertexAI') {
      try {
        const vertexAi = new VertexAI({
          maxOutputTokens: aiOptions.maxTokens,
        })
        console.log(chalk.green('You:'), chalk.white(input))
        console.log(chalk.blue('Skeet:'))
        if (input.toLowerCase().match(/^prisma$/)) {
          console.log(chalk.cyan('Prisma Scheme Generating Mode 🤖'))
          console.log(`Please describe your Database use case.`)

          rl.question(chalk.green('\nYou: '), async (prismaInput: string) => {
            const skeetAi = new SkeetAI({ ai: 'VertexAI' })
            const prismaSchema = await skeetAi.prisma(prismaInput)
            console.log(chalk.blue('Skeet:\n') + chalk.white(prismaSchema))
            promptUser({
              ai: aiOptions.ai,
            })
          })
          return
        }

        if (input.toLowerCase().match(/^skeet/)) {
          console.log(
            chalk.white('Skeet:'),
            chalk.white(`Running skeet command...`)
          )
          const cmd = `${input}`
          const res = String(spawnSync(cmd, { shell: true, stdio: 'inherit' }))
          console.log(res)
          promptUser({
            ai: aiOptions.ai,
          })
          return
        }
        const response = await vertexAi.prompt(skeetVertexAiPrompt(input))
        const stream = stringToStream(response)

        let bufferedResponse = ''

        stream.on('data', (chunk) => {
          bufferedResponse += chunk.toString()

          let separatorIndex
          while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
            const messagePart = bufferedResponse.slice(0, separatorIndex).trim()
            console.log(chalk.white(messagePart))

            bufferedResponse = bufferedResponse.slice(separatorIndex + 1)
          }
        })

        stream.on('end', () => {
          if (bufferedResponse) {
            console.log(chalk.white(bufferedResponse.trim()))
          }
          promptUser({
            ai: aiOptions.ai,
          })
        })
      } catch (error) {
        console.error('Error:', error)
        rl.close()
      }
    } else {
      try {
        const openAi = new OpenAI({
          maxTokens: aiOptions.maxTokens,
          model: 'gpt-4',
        })
        console.log(chalk.green('You:'), chalk.white(input))
        console.log(chalk.blue('Skeet:'))
        let bufferedPayload = ''
        let bufferedMessage = ''
        const stream = await openAi.promptStream(skeetOpenAiPrompt(input))
        stream.on('data', (chunk: Buffer) => {
          bufferedPayload += chunk.toString()

          let separatorIndex
          while ((separatorIndex = bufferedPayload.indexOf('\n')) >= 0) {
            const completeData = bufferedPayload.slice(0, separatorIndex).trim()
            const dataPart = completeData.replace(/^data:\s*/, '')

            if (isValidJSON(dataPart)) {
              const delta = JSON.parse(dataPart)
              const messagePart = delta.choices[0].delta?.content || ''
              bufferedMessage += bufferedMessage
                ? messagePart
                : messagePart.trimStart()

              if (messagePart.includes('\n')) {
                console.log(chalk.white(bufferedMessage.trimEnd()))
                bufferedMessage = ''
              }
            }

            bufferedPayload = bufferedPayload.slice(separatorIndex + 1)
          }
        })
        stream.on('end', () => {
          if (bufferedMessage) {
            console.log(chalk.white(bufferedMessage))
          }
          promptUser({
            ai: aiOptions.ai,
          })
        })
      } catch (error) {
        console.error('Error:', error)
        rl.close()
      }
    }
  })
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
