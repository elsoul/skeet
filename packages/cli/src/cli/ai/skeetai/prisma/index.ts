import { prismaPrompt } from './prompt'
import { AIType, generatePrompt } from '@/lib/genPrompt'

export const skeetAiPrisma = async (
  aiType: AIType,
  content: string,
  modelPath: string,
) => {
  try {
    const example = await prismaPrompt(modelPath)
    const result = generatePrompt(
      aiType,
      example.context,
      example.examples,
      content,
    )
    return result
  } catch (error) {
    throw new Error(`skeetAiPrisma: ${error}`)
  }
}
