import { OpenAI, VertexAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { Readable } from 'stream'
import { skeetOpenAiPrompt, skeetVertexAiPrompt } from './skeetPrompt'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export async function promptUser(options = { ai: '' }): Promise<void> {
  const aiOptions = {
    ai: options.ai || 'vertexai',
    maxTokens: 1000,
  }
  rl.question(
    chalk.white('\nYou (type "q" to quit): '),
    async (input: string) => {
      if (input.toLowerCase() === 'q') {
        console.log(chalk.yellow(`⭐️ ${aiOptions.ai} is shutting down...`))
        rl.close()
        return
      }

      if (aiOptions.ai === 'vertexai') {
        try {
          const vertexAi = new VertexAI({
            maxOutputTokens: aiOptions.maxTokens,
          })
          console.log(chalk.blue('You:'), chalk.white(input))
          console.log(chalk.green('Skeet:'))
          const response = await vertexAi.prompt(skeetVertexAiPrompt(input))
          const stream = stringToStream(response)

          let bufferedResponse = ''

          stream.on('data', (chunk) => {
            bufferedResponse += chunk.toString()

            let separatorIndex
            while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
              const messagePart = bufferedResponse
                .slice(0, separatorIndex)
                .trim()
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
          console.log(chalk.blue('You:'), chalk.white(input))
          console.log(chalk.green('Skeet:'))
          let bufferedPayload = ''
          let bufferedMessage = ''
          const stream = await openAi.promptStream(skeetOpenAiPrompt(input))
          stream.on('data', (chunk: Buffer) => {
            bufferedPayload += chunk.toString()

            let separatorIndex
            while ((separatorIndex = bufferedPayload.indexOf('\n')) >= 0) {
              const completeData = bufferedPayload
                .slice(0, separatorIndex)
                .trim()
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
    }
  )
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
