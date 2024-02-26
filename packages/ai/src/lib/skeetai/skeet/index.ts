import { generatePrompt } from '@/lib/genPrompt'
import { readFileSync } from 'fs'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '@/lib/types'
import SkeetAI from '..'

export const skeetPrompt = async (content: string, skeetAi: SkeetAI) => {
  try {
    const json = JSON.parse(
      readFileSync(`${__dirname}/examples/skeetExamples.json`, 'utf8'),
    )

    const prompt = generatePrompt(
      json.context,
      json.examples,
      content,
      skeetAi.ai,
    )

    if (skeetAi.ai === 'VertexAI') {
      const aiInstance = skeetAi.aiInstance as VertexAI
      return await aiInstance.prompt(prompt as VertexPromptParams)
    } else {
      const aiInstance = skeetAi.aiInstance as OpenAI
      return await aiInstance.prompt(prompt as OpenAIPromptParams)
    }
  } catch (error) {
    throw new Error(`skeetPrompt: ${error}`)
  }
}
