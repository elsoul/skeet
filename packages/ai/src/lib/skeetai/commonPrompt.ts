import { AIType, generatePrompt } from '@/lib/genPrompt'
import { AiInstance, Example } from '@/lib/types/skeetaiTypes'
import { VertexAI } from '@/lib/vertexai'
import { OpenAI } from '@/lib/openai'
import { OpenAIPromptParams, VertexPromptParams } from '../types'

export const commonPrompt = async (
  example: Example,
  content: string,
  thisAi: AIType,
  thisAiInstance: AiInstance,
) => {
  try {
    const prompt = generatePrompt(
      example.context,
      example.examples,
      content,
      thisAi,
    )

    if (thisAi === 'VertexAI') {
      const aiInstance = thisAiInstance as VertexAI
      return await aiInstance.prompt(prompt as VertexPromptParams)
    } else {
      const aiInstance = thisAiInstance as OpenAI
      return await aiInstance.prompt(prompt as OpenAIPromptParams)
    }
  } catch (error) {
    throw new Error(`run: ${error}`)
  }
}
