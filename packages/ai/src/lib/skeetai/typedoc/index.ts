import { typedocPrompt } from './prompt'
import { commonPrompt } from '../commonPrompt'
import SkeetAI from '@/lib/skeetai'

export const skeetGenTypedoc = async (content: string, skeetAi: SkeetAI) => {
  try {
    const example = typedocPrompt()
    const result = await commonPrompt(
      example,
      content,
      skeetAi.ai,
      skeetAi.aiInstance,
    )
    return result
  } catch (error) {
    throw new Error(`skeetPrompt: ${error}`)
  }
}
