import { prismaPrompt } from './prompt'
import { commonPrompt } from '@/lib/skeetai/commonPrompt'
import SkeetAI from '@/lib/skeetai'

export const skeetAiPrisma = async (content: string, skeetAi: SkeetAI) => {
  try {
    const example = prismaPrompt()
    const result = await commonPrompt(
      example,
      content,
      skeetAi.ai,
      skeetAi.aiInstance,
    )
    return result
  } catch (error) {
    throw new Error(`skeetAiPrisma: ${error}`)
  }
}
