import { readFileSync, writeFileSync } from 'fs'
import SkeetAI from '@/lib/skeetai'
import * as dotenv from 'dotenv'
dotenv.config()

const run = async () => {
  const ai = new SkeetAI({
    ai: 'OpenAI',
  })
  const filePath = `${__dirname}/skeetExamplesAll.json`
  const outputPath = `${__dirname}/skeetExamplesAll.jsonl`
  // const json = JSON.parse(readFileSync(filePath, 'utf8'))
  // const jsonl = []
  // const context = json.context
  // for await (const example of json.examples) {
  //   const line = {
  //     messages: [
  //       {
  //         role: 'system',
  //         content: context,
  //       },
  //       {
  //         role: 'user',
  //         content: example.input,
  //       },
  //       {
  //         role: 'assistant',
  //         content: example.output,
  //       },
  //     ],
  //   }
  //   jsonl.push(line)
  // }
  // const jsonlString = jsonl.map((obj) => JSON.stringify(obj)).join('\n')
  // writeFileSync(outputPath, jsonlString)
  const result = await ai.uploadFile(outputPath)
  console.log(result)
}

run()
