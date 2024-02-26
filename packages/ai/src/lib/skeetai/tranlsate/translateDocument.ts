import { generatePrompt } from '@/lib/genPrompt'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '@/lib/types'
import { markdownTranslatePrompt, jsonTranslatePrompt } from './prompt'
import SkeetAI from '..'

export const translateDocument = async (
  content: string,
  skeetAi: SkeetAI,
  mode: 'markdown' | 'json',
  langFrom = 'ja',
  langTo = 'en',
) => {
  try {
    const example =
      mode === 'markdown'
        ? markdownTranslatePrompt(langFrom, langTo)
        : jsonTranslatePrompt(langFrom, langTo)

    const prompt = generatePrompt(
      example.context,
      example.examples,
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
    throw new Error(`skeetDocument: ${error}`)
  }
}
